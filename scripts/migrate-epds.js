/**
 * Script to migrate epds.json to the new DATABASE.md schema
 * Run: node scripts/migrate-epds.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Read source data
const epdsPath = path.join(__dirname, '..', 'data', 'epds.json');
const epds = JSON.parse(fs.readFileSync(epdsPath, 'utf8'));

console.log('Loaded', epds.length, 'EPDs');

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

// Migrate a single EPD
function migrateEpd(epd) {
    // Generate new UUID, keep old id as code
    const newId = generateUUID();
    const code = epd.id;

    const migrated = {
        id: newId,
        code: code,
        version: epd.version || '1.0',
        last_change: epd.lastChange || new Date().toISOString().split('T')[0],
        name: i18n(epd.title),
        image: epd.image || '',
        domain: i18n(epd.category),
        subcategory: i18n(epd.subcategory),
        description: i18n(epd.description),
        tags: i18nArray(epd.tags),
        uuid: epd.uuid || '',
        unit: epd.unit || '',
        gwp: epd.gwp,
        ubp: epd.ubp,
        penrt: epd.penrt,
        pert: epd.pert,
        density: epd.density || null,
        biogenic_carbon: epd.biogenicCarbon || null,
        related_elements: []
    };

    return migrated;
}

// Migrate all EPDs
console.log('\nMigrating EPDs...');
const migratedEpds = epds.map(migrateEpd);

// Write migrated EPDs
const outputPath = path.join(__dirname, '..', 'data', 'epds.json');
fs.writeFileSync(outputPath, JSON.stringify(migratedEpds, null, 2));
console.log('Written to:', outputPath);

// Stats
console.log('\n=== MIGRATION COMPLETE ===');
console.log('Total EPDs:', migratedEpds.length);

const withBiogenicCarbon = migratedEpds.filter(e => e.biogenic_carbon !== null).length;
const withDensity = migratedEpds.filter(e => e.density !== null).length;

console.log('With biogenic carbon:', withBiogenicCarbon);
console.log('With density:', withDensity);

// Domain/subcategory breakdown
const domainCounts = {};
migratedEpds.forEach(e => {
    const domain = e.domain.de;
    const subcategory = e.subcategory.de;
    const key = subcategory ? `${domain} › ${subcategory}` : domain;
    domainCounts[key] = (domainCounts[key] || 0) + 1;
});
console.log('\nCategory breakdown:');
Object.entries(domainCounts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
    console.log(`  ${k}: ${v}`);
});

// Unit breakdown
const unitCounts = {};
migratedEpds.forEach(e => {
    unitCounts[e.unit] = (unitCounts[e.unit] || 0) + 1;
});
console.log('\nUnit breakdown:');
Object.entries(unitCounts).forEach(([k, v]) => {
    console.log(`  ${k}: ${v}`);
});

// Sample output
console.log('\n=== SAMPLE EPD ===');
console.log(JSON.stringify(migratedEpds[0], null, 2));
