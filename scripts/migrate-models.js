/**
 * Script to migrate models.json to the new DATABASE.md schema
 * Run: node scripts/migrate-models.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Read source data
const modelsPath = path.join(__dirname, '..', 'data', 'models.json');
const models = JSON.parse(fs.readFileSync(modelsPath, 'utf8'));

console.log('Loaded', models.length, 'models');

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

// Migrate inline element definitions to i18n format
function migrateElements(elements) {
    if (!Array.isArray(elements)) return [];
    return elements.map(el => ({
        name: i18n(el.name),
        description: i18n(el.description),
        phases: el.phases || []
    }));
}

// Migrate a single model
function migrateModel(model) {
    // Generate new UUID, keep old id as code
    const newId = generateUUID();
    const code = model.id;

    return {
        id: newId,
        code: code,
        version: model.version || '1.0',
        last_change: model.lastChange || new Date().toISOString().split('T')[0],
        name: i18n(model.title),
        image: model.image || '',
        domain: i18n(model.category),
        description: i18n(model.description),
        tags: i18nArray(model.tags),
        phases: model.phases || [],
        elements: migrateElements(model.elements),
        related_elements: []
    };
}

// Migrate all models
console.log('\nMigrating models...');
const migratedModels = models.map(migrateModel);

// Write migrated models
const outputPath = path.join(__dirname, '..', 'data', 'models.json');
fs.writeFileSync(outputPath, JSON.stringify(migratedModels, null, 2));
console.log('Written to:', outputPath);

// Stats
console.log('\n=== MIGRATION COMPLETE ===');
console.log('Total models:', migratedModels.length);

const withPhases = migratedModels.filter(m => m.phases.length > 0).length;
const withElements = migratedModels.filter(m => m.elements.length > 0).length;

console.log('With phases:', withPhases);
console.log('With inline elements:', withElements);

// Domain breakdown
const domainCounts = {};
migratedModels.forEach(m => {
    const domain = m.domain.de;
    domainCounts[domain] = (domainCounts[domain] || 0) + 1;
});
console.log('\nDomain breakdown:');
Object.entries(domainCounts).forEach(([k, v]) => {
    console.log(`  ${k}: ${v}`);
});

// Sample output
console.log('\n=== SAMPLE MODEL ===');
console.log(JSON.stringify(migratedModels[0], null, 2));
