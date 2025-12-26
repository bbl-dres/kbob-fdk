/**
 * Script to migrate elements.json to the new DATABASE.md schema
 * Run: node scripts/migrate-elements.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Read source data
const elementsPath = path.join(__dirname, '..', 'data', 'elements.json');
const classificationsPath = path.join(__dirname, '..', 'data', 'classifications.json');
const attributesPath = path.join(__dirname, '..', 'data', 'attributes.json');

const elements = JSON.parse(fs.readFileSync(elementsPath, 'utf8'));
const classifications = JSON.parse(fs.readFileSync(classificationsPath, 'utf8'));
const attributes = JSON.parse(fs.readFileSync(attributesPath, 'utf8'));

console.log('Loaded', elements.length, 'elements');
console.log('Loaded', classifications.length, 'classifications');
console.log('Loaded', attributes.length, 'attributes');

// Build lookup maps
const classificationBySystemCode = new Map();
classifications.forEach(clf => {
    const key = `${clf.system}|${clf.code}`;
    classificationBySystemCode.set(key, clf.id);
});

const attributeByName = new Map();
attributes.forEach(attr => {
    const name = attr.name.de;
    attributeByName.set(name, attr.id);
});

// Helper to create i18n object
function i18n(germanValue) {
    return {
        de: germanValue || '',
        fr: '',
        it: '',
        en: ''
    };
}

// Helper to create i18n array
function i18nArray(germanArray) {
    if (!Array.isArray(germanArray)) return [];
    return germanArray.map(v => i18n(v));
}

// Helper to generate UUID v4
function generateUUID() {
    return crypto.randomUUID();
}

// Map system names to DATABASE.md format
const systemMapping = {
    'eBKP-H': 'eBKP-H',
    'DIN276': 'DIN276',
    'Uniformat II 2010': 'Uniformat II',
    'Uniformat II': 'Uniformat II',
    'KBOB': 'KBOB'
};

// Parse classification code from full string
function parseClassificationCode(fullCode) {
    const match = fullCode.match(/^([A-Z0-9.\s]+)\s*[–-]/i);
    if (match) {
        return match[1].trim();
    }
    return fullCode.split(' ')[0];
}

// Find classification ID
function findClassificationId(system, fullCode) {
    const mappedSystem = systemMapping[system] || system;
    const code = parseClassificationCode(fullCode);
    const key = `${mappedSystem}|${code}`;
    return classificationBySystemCode.get(key);
}

// Migrate a single element
function migrateElement(element) {
    // Generate new UUID (or use existing if you want to preserve IDs)
    const newId = generateUUID();

    // Find classification references
    const relatedClassifications = [];
    if (element.classifications) {
        Object.entries(element.classifications).forEach(([system, codes]) => {
            if (Array.isArray(codes)) {
                codes.forEach(code => {
                    const clfId = findClassificationId(system, code);
                    if (clfId) {
                        relatedClassifications.push({ id: clfId });
                    }
                });
            }
        });
    }

    // Find attribute references
    const relatedAttributes = [];
    if (element.information && Array.isArray(element.information)) {
        element.information.forEach(info => {
            const attrId = attributeByName.get(info.name);
            if (attrId) {
                relatedAttributes.push({
                    id: attrId,
                    phases: info.phases || []
                });
            }
        });
    }

    // Migrate geometry to i18n format
    const migratedGeometry = [];
    if (element.geometry && Array.isArray(element.geometry)) {
        element.geometry.forEach(geo => {
            migratedGeometry.push({
                name: i18n(geo.name),
                desc: i18n(geo.desc),
                phases: geo.phases || []
            });
        });
    }

    // Migrate tool_elements (from ifcMapping)
    const toolElements = [];
    if (element.ifcMapping && Array.isArray(element.ifcMapping)) {
        element.ifcMapping.forEach(m => {
            toolElements.push({
                element: i18n(m.element),
                ifc: m.ifc || null,
                revit: m.revit || null,
                archicad: null
            });
        });
    }

    // Migrate documentation to i18n format (keeping structure for now)
    const migratedDocumentation = [];
    if (element.documentation && Array.isArray(element.documentation)) {
        element.documentation.forEach(doc => {
            migratedDocumentation.push({
                name: i18n(doc.name),
                desc: i18n(doc.desc),
                phases: doc.phases || []
            });
        });
    }

    // Determine phases from nested arrays if not at root level
    let phases = element.phases || [];
    if (phases.length === 0) {
        const phasesSet = new Set();
        (element.geometry || []).forEach(g => (g.phases || []).forEach(p => phasesSet.add(p)));
        (element.information || []).forEach(i => (i.phases || []).forEach(p => phasesSet.add(p)));
        (element.documentation || []).forEach(d => (d.phases || []).forEach(p => phasesSet.add(p)));
        phases = Array.from(phasesSet).sort((a, b) => a - b);
    }

    return {
        id: newId,
        version: element.version || '1.0',
        last_change: element.lastChange || new Date().toISOString().split('T')[0],
        name: i18n(element.title),
        image: element.image || '',
        domain: i18n(element.category),
        description: i18n(element.description),
        tags: i18nArray(element.tags),
        phases: phases,
        geometry: migratedGeometry,
        tool_elements: toolElements,
        documentation: migratedDocumentation,
        related_documents: [],
        related_epds: [],
        related_attributes: relatedAttributes,
        related_classifications: relatedClassifications,
        related_usecases: []
    };
}

// Migrate all elements
console.log('\nMigrating elements...');
const migratedElements = elements.map(migrateElement);

// Write migrated elements
const outputPath = path.join(__dirname, '..', 'data', 'elements.json');
fs.writeFileSync(outputPath, JSON.stringify(migratedElements, null, 2));
console.log('Written to:', outputPath);

// Stats
console.log('\n=== MIGRATION COMPLETE ===');
console.log('Total elements:', migratedElements.length);

const withClassifications = migratedElements.filter(e => e.related_classifications.length > 0).length;
const withAttributes = migratedElements.filter(e => e.related_attributes.length > 0).length;
const withGeometry = migratedElements.filter(e => e.geometry.length > 0).length;
const withToolElements = migratedElements.filter(e => e.tool_elements.length > 0).length;
const withDocumentation = migratedElements.filter(e => e.documentation.length > 0).length;

console.log('With classifications:', withClassifications);
console.log('With attributes:', withAttributes);
console.log('With geometry:', withGeometry);
console.log('With tool_elements:', withToolElements);
console.log('With documentation:', withDocumentation);

// Sample output
console.log('\n=== SAMPLE ELEMENT ===');
console.log(JSON.stringify(migratedElements[0], null, 2));
