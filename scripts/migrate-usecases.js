/**
 * Script to migrate usecases.json to the new DATABASE.md schema
 * Run: node scripts/migrate-usecases.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Read source data
const usecasesPath = path.join(__dirname, '..', 'data', 'usecases.json');
const usecases = JSON.parse(fs.readFileSync(usecasesPath, 'utf8'));

console.log('Loaded', usecases.length, 'usecases');

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

// Migrate roles array
function migrateRoles(roles) {
    if (!Array.isArray(roles)) return [];
    return roles.map(role => ({
        actor: i18n(role.actor),
        responsible: i18nArray(role.responsible),
        contributing: i18nArray(role.contributing),
        informed: i18nArray(role.informed)
    }));
}

// Migrate prerequisites object
function migratePrerequisites(prerequisites) {
    if (!prerequisites) return null;
    return {
        client: i18nArray(prerequisites.client),
        contractor: i18nArray(prerequisites.contractor)
    };
}

// Migrate practice example object
function migratePracticeExample(example) {
    if (!example) return null;
    return {
        name: i18n(example.title || example.name),
        description: i18n(example.description),
        image: example.image || ''
    };
}

// Migrate a single usecase
function migrateUsecase(uc) {
    // Generate new UUID, keep old id as code
    const newId = generateUUID();
    const code = uc.id;

    return {
        id: newId,
        code: code,
        version: uc.version || '1.0',
        last_change: uc.lastChange || new Date().toISOString().split('T')[0],
        name: i18n(uc.title),
        image: uc.image || '',
        domain: i18n(uc.category),
        description: i18n(uc.description),
        tags: i18nArray(uc.tags),
        phases: uc.phases || [],
        process_url: uc.process_url || '',
        examples: uc.examples || [],
        standards: uc.standards || [],
        goals: i18nArray(uc.goals),
        inputs: i18nArray(uc.inputs),
        outputs: i18nArray(uc.outputs),
        roles: migrateRoles(uc.roles),
        definition: i18n(uc.definition),
        prerequisites: migratePrerequisites(uc.prerequisites),
        implementation: i18nArray(uc.implementation),
        practiceExample: migratePracticeExample(uc.practiceExample),
        qualityCriteria: i18nArray(uc.qualityCriteria),
        related_elements: [],
        related_documents: []
    };
}

// Migrate all usecases
console.log('\nMigrating usecases...');
const migratedUsecases = usecases.map(migrateUsecase);

// Write migrated usecases
const outputPath = path.join(__dirname, '..', 'data', 'usecases.json');
fs.writeFileSync(outputPath, JSON.stringify(migratedUsecases, null, 2));
console.log('Written to:', outputPath);

// Stats
console.log('\n=== MIGRATION COMPLETE ===');
console.log('Total usecases:', migratedUsecases.length);

const withRoles = migratedUsecases.filter(u => u.roles && u.roles.length > 0).length;
const withPrerequisites = migratedUsecases.filter(u => u.prerequisites !== null).length;
const withPracticeExample = migratedUsecases.filter(u => u.practiceExample !== null).length;
const withProcess = migratedUsecases.filter(u => u.process_url).length;

console.log('With roles:', withRoles);
console.log('With prerequisites:', withPrerequisites);
console.log('With practice example:', withPracticeExample);
console.log('With process URL:', withProcess);

// Domain breakdown
const domainCounts = {};
migratedUsecases.forEach(u => {
    const domain = u.domain.de;
    domainCounts[domain] = (domainCounts[domain] || 0) + 1;
});
console.log('\nDomain breakdown:');
Object.entries(domainCounts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
    console.log(`  ${k}: ${v}`);
});

// Phase breakdown
const phaseCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
migratedUsecases.forEach(u => {
    (u.phases || []).forEach(p => {
        phaseCounts[p] = (phaseCounts[p] || 0) + 1;
    });
});
console.log('\nPhase breakdown:');
Object.entries(phaseCounts).forEach(([k, v]) => {
    console.log(`  Phase ${k}: ${v}`);
});

// Sample output
console.log('\n=== SAMPLE USECASE ===');
console.log(JSON.stringify(migratedUsecases[0], null, 2));
