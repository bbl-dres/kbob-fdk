/**
 * Script to migrate documents.json to the new DATABASE.md schema
 * Run: node scripts/migrate-documents.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Read source data
const documentsPath = path.join(__dirname, '..', 'data', 'documents.json');
const classificationsPath = path.join(__dirname, '..', 'data', 'classifications.json');

const documents = JSON.parse(fs.readFileSync(documentsPath, 'utf8'));
const classifications = JSON.parse(fs.readFileSync(classificationsPath, 'utf8'));

console.log('Loaded', documents.length, 'documents');
console.log('Loaded', classifications.length, 'classifications');

// Build lookup maps
const classificationBySystemCode = new Map();
classifications.forEach(clf => {
    const key = `${clf.system}|${clf.code}`;
    classificationBySystemCode.set(key, clf.id);
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
    'KBOB': 'KBOB',
    'GEFMA': 'GEFMA',
    'SIA': 'SIA',
    'GIF': 'GIF',
    'RCIS': 'RCIS'
};

// Parse classification code from full string
function parseClassificationCode(fullCode) {
    // Parse codes like "100 – Immobilienmanagement" or "D 0165 – Dokumentation Hochbau"
    const match = fullCode.match(/^([A-Z0-9.\s]+)\s*[–-]\s*/i);
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

// Parse retention string to integer
// 0 = indefinitely, null = not specified, > 0 = years
function parseRetention(retentionStr) {
    if (!retentionStr) return null;

    // "bis Ersatz" or "unbefristet" → 0 (keep indefinitely)
    if (retentionStr.includes('bis Ersatz') || retentionStr.includes('unbefristet')) {
        return 0;
    }

    // "keine Aufbewahrung" → null (not specified / no retention needed)
    if (retentionStr.includes('keine Aufbewahrung')) {
        return null;
    }

    // "bis Bearbeitungszweck entfällt" → 0 (keep until no longer needed = indefinitely)
    if (retentionStr.includes('bis Bearbeitungszweck entfällt')) {
        return 0;
    }

    // Parse "X Jahre" pattern
    const yearsMatch = retentionStr.match(/(\d+)\s*Jahre?/i);
    if (yearsMatch) {
        return parseInt(yearsMatch[1], 10);
    }

    // Default: not specified
    return null;
}

// Migrate a single document
function migrateDocument(doc) {
    // Generate new UUID, keep old id as code
    const newId = generateUUID();
    const code = doc.id;

    // Find classification references
    const relatedClassifications = [];
    if (doc.classifications && typeof doc.classifications === 'object') {
        Object.entries(doc.classifications).forEach(([system, codes]) => {
            if (Array.isArray(codes)) {
                codes.forEach(codeStr => {
                    const clfId = findClassificationId(system, codeStr);
                    if (clfId) {
                        relatedClassifications.push({ id: clfId });
                    }
                });
            }
        });
    }

    return {
        id: newId,
        code: code,
        version: doc.version || '1.0',
        last_change: doc.lastChange || new Date().toISOString().split('T')[0],
        name: i18n(doc.title),
        image: doc.image || '',
        domain: i18n(doc.category),
        description: i18n(doc.description),
        tags: i18nArray(doc.tags),
        phases: doc.phases || [],
        formats: doc.formats || [],
        retention: parseRetention(doc.retention),
        related_elements: [],
        related_classifications: relatedClassifications
    };
}

// Migrate all documents
console.log('\nMigrating documents...');
const migratedDocuments = documents.map(migrateDocument);

// Write migrated documents
const outputPath = path.join(__dirname, '..', 'data', 'documents.json');
fs.writeFileSync(outputPath, JSON.stringify(migratedDocuments, null, 2));
console.log('Written to:', outputPath);

// Stats
console.log('\n=== MIGRATION COMPLETE ===');
console.log('Total documents:', migratedDocuments.length);

const withClassifications = migratedDocuments.filter(d => d.related_classifications.length > 0).length;
const withPhases = migratedDocuments.filter(d => d.phases.length > 0).length;
const withRetention = migratedDocuments.filter(d => d.retention !== null).length;

console.log('With classifications:', withClassifications);
console.log('With phases:', withPhases);
console.log('With retention specified:', withRetention);

// Retention breakdown
const retentionCounts = {};
migratedDocuments.forEach(d => {
    const key = d.retention === null ? 'null' : (d.retention === 0 ? 'indefinitely' : `${d.retention} years`);
    retentionCounts[key] = (retentionCounts[key] || 0) + 1;
});
console.log('\nRetention breakdown:');
Object.entries(retentionCounts).forEach(([k, v]) => {
    console.log(`  ${k}: ${v}`);
});

// Sample output
console.log('\n=== SAMPLE DOCUMENT ===');
console.log(JSON.stringify(migratedDocuments[0], null, 2));
