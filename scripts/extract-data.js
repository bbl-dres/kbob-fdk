/**
 * Script to extract classifications and attributes from elements.json
 * Run: node scripts/extract-data.js
 */

const fs = require('fs');
const path = require('path');

// Read elements.json
const elementsPath = path.join(__dirname, '..', 'data', 'elements.json');
const elements = JSON.parse(fs.readFileSync(elementsPath, 'utf8'));

// Also read documents.json for additional classifications
const documentsPath = path.join(__dirname, '..', 'data', 'documents.json');
const documents = JSON.parse(fs.readFileSync(documentsPath, 'utf8'));

console.log('Loaded', elements.length, 'elements and', documents.length, 'documents');

// ============================================
// EXTRACT CLASSIFICATIONS
// ============================================

const classificationMap = new Map();

// Map system names to DATABASE.md format
const systemMapping = {
    'eBKP-H': 'eBKP-H',
    'DIN276': 'DIN276',
    'Uniformat II 2010': 'Uniformat II',
    'Uniformat II': 'Uniformat II',
    'KBOB': 'KBOB',
    'GEFMA': 'GEFMA',
    'SIA': 'SIA',
    'GIF': 'GIF',
    'RCIS': 'RCIS'
};

function parseClassificationCode(fullCode) {
    // Parse codes like "D8010.10 – Integrated Automation Control"
    // or "KG 466 – hydraulikanlagen"
    const match = fullCode.match(/^([A-Z0-9.\s]+)\s*[–-]\s*(.+)$/i);
    if (match) {
        return {
            code: match[1].trim(),
            name: match[2].trim()
        };
    }
    return { code: fullCode, name: fullCode };
}

function addClassification(system, fullCode) {
    const mappedSystem = systemMapping[system] || system;
    const parsed = parseClassificationCode(fullCode);
    const key = `${mappedSystem}|${parsed.code}`;

    if (!classificationMap.has(key)) {
        classificationMap.set(key, {
            system: mappedSystem,
            code: parsed.code,
            name: parsed.name
        });
    }
}

// Extract from elements
elements.forEach(el => {
    if (el.classifications) {
        Object.entries(el.classifications).forEach(([system, codes]) => {
            if (Array.isArray(codes)) {
                codes.forEach(code => addClassification(system, code));
            }
        });
    }
});

// Extract from documents
documents.forEach(doc => {
    if (doc.classifications) {
        Object.entries(doc.classifications).forEach(([system, codes]) => {
            if (Array.isArray(codes)) {
                codes.forEach(code => addClassification(system, code));
            }
        });
    }
});

// Generate classifications.json
const classifications = [];
let clfId = 1;
classificationMap.forEach((clf, key) => {
    classifications.push({
        id: `clf-${String(clfId++).padStart(4, '0')}`,
        system: clf.system,
        code: clf.code,
        name: { de: clf.name, fr: '', it: '', en: '' },
        description: { de: '', fr: '', it: '', en: '' }
    });
});

// Sort by system and code
classifications.sort((a, b) => {
    if (a.system !== b.system) return a.system.localeCompare(b.system);
    return a.code.localeCompare(b.code);
});

console.log('\n=== CLASSIFICATIONS ===');
const systemCounts = {};
classifications.forEach(c => {
    systemCounts[c.system] = (systemCounts[c.system] || 0) + 1;
});
Object.entries(systemCounts).forEach(([sys, count]) => {
    console.log(`  ${sys}: ${count} codes`);
});
console.log(`Total: ${classifications.length} classifications`);

// Write classifications.json
const classificationsPath = path.join(__dirname, '..', 'data', 'classifications.json');
fs.writeFileSync(classificationsPath, JSON.stringify(classifications, null, 2));
console.log('Written to:', classificationsPath);

// ============================================
// EXTRACT ATTRIBUTES (from information arrays)
// ============================================

const attributeMap = new Map();

function parseIfcMapping(ifcStr) {
    if (!ifcStr) return { pset: null, property: null };
    // Parse strings like "Pset_*Common.Status" or "IfcRoot.is_a()"
    const dotIndex = ifcStr.lastIndexOf('.');
    if (dotIndex > 0) {
        return {
            pset: ifcStr.substring(0, dotIndex),
            property: ifcStr.substring(dotIndex + 1)
        };
    }
    return { pset: ifcStr, property: null };
}

function mapDataType(format) {
    const mapping = {
        'String': 'string',
        'string': 'string',
        'Text': 'string',
        'Integer': 'number',
        'Number': 'number',
        'Float': 'number',
        'Double': 'number',
        'Boolean': 'boolean',
        'bool': 'boolean',
        'Enumeration': 'enum',
        'List': 'string', // Lists become strings for now
        'Date': 'string'
    };
    return mapping[format] || 'string';
}

elements.forEach(el => {
    if (el.information && Array.isArray(el.information)) {
        el.information.forEach(info => {
            const key = info.name;
            if (!attributeMap.has(key)) {
                const ifc = parseIfcMapping(info.ifc);
                attributeMap.set(key, {
                    name: info.name,
                    desc: info.desc || '',
                    format: info.format || 'String',
                    ifc_pset: ifc.pset,
                    ifc_property: ifc.property,
                    usageCount: 1
                });
            } else {
                attributeMap.get(key).usageCount++;
            }
        });
    }
});

// Generate attributes.json
const attributes = [];
let attrId = 1;
attributeMap.forEach((attr, key) => {
    attributes.push({
        id: `attr-${String(attrId++).padStart(4, '0')}`,
        name: { de: attr.name, fr: '', it: '', en: '' },
        description: { de: attr.desc, fr: '', it: '', en: '' },
        data_type: mapDataType(attr.format),
        unit: null,
        ifc_pset: attr.ifc_pset,
        ifc_property: attr.ifc_property,
        enumeration_values: []
    });
});

// Sort by name
attributes.sort((a, b) => a.name.de.localeCompare(b.name.de, 'de'));

console.log('\n=== ATTRIBUTES ===');
console.log(`Total: ${attributes.length} unique attributes`);
console.log('Sample attributes:');
attributes.slice(0, 10).forEach(a => {
    console.log(`  - ${a.name.de} (${a.data_type}) [${a.ifc_pset || 'no pset'}]`);
});

// Write attributes.json
const attributesPath = path.join(__dirname, '..', 'data', 'attributes.json');
fs.writeFileSync(attributesPath, JSON.stringify(attributes, null, 2));
console.log('Written to:', attributesPath);

console.log('\nDone!');
