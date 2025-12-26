/**
 * Script to fix JSON files to strictly match DATABASE.md schema
 * Run: node scripts/fix-schema-compliance.js
 */

const fs = require('fs');
const path = require('path');

// ============================================
// FIX USECASES
// ============================================
function fixUsecases() {
    const filePath = path.join(__dirname, '..', 'data', 'usecases.json');
    const usecases = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log('Fixing usecases.json...');
    console.log('  Before:', usecases.length, 'usecases');

    const fixed = usecases.map(uc => {
        // Schema-compliant fields only
        return {
            id: uc.id,
            code: uc.code,
            version: uc.version,
            last_change: uc.last_change,
            name: uc.name,
            image: uc.image,
            domain: uc.domain,
            description: uc.description,
            tags: uc.tags,
            phases: uc.phases,
            goals: uc.goals,
            inputs: uc.inputs,
            outputs: uc.outputs,
            roles: uc.roles,
            prerequisites: uc.prerequisites,
            implementation: uc.implementation,
            quality_criteria: uc.qualityCriteria || uc.quality_criteria || [],  // Rename camelCase to snake_case
            process_url: uc.process_url,
            related_elements: uc.related_elements || [],
            related_documents: uc.related_documents || []
        };
    });

    fs.writeFileSync(filePath, JSON.stringify(fixed, null, 2));
    console.log('  Removed: definition, practiceExample, examples, standards');
    console.log('  Renamed: qualityCriteria → quality_criteria');
    console.log('  After:', fixed.length, 'usecases');
}

// ============================================
// FIX EPDS
// ============================================
function fixEpds() {
    const filePath = path.join(__dirname, '..', 'data', 'epds.json');
    const epds = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log('\nFixing epds.json...');
    console.log('  Before:', epds.length, 'EPDs');

    const fixed = epds.map(epd => {
        // Schema-compliant fields only (no subcategory, uuid, related_elements for EPDs)
        return {
            id: epd.id,
            code: epd.code,
            version: epd.version,
            last_change: epd.last_change,
            name: epd.name,
            image: epd.image,
            domain: epd.domain,
            description: epd.description,
            tags: epd.tags,
            unit: epd.unit,
            gwp: epd.gwp,
            ubp: epd.ubp,
            penrt: epd.penrt,
            pert: epd.pert,
            density: epd.density,
            biogenic_carbon: epd.biogenic_carbon
        };
    });

    fs.writeFileSync(filePath, JSON.stringify(fixed, null, 2));
    console.log('  Removed: subcategory, uuid, related_elements');
    console.log('  After:', fixed.length, 'EPDs');
}

// ============================================
// FIX MODELS
// ============================================
function fixModels() {
    const filePath = path.join(__dirname, '..', 'data', 'models.json');
    const models = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log('\nFixing models.json...');
    console.log('  Before:', models.length, 'models');

    const fixed = models.map(model => {
        // Schema-compliant fields only (no inline elements array)
        return {
            id: model.id,
            code: model.code,
            version: model.version,
            last_change: model.last_change,
            name: model.name,
            image: model.image,
            domain: model.domain,
            description: model.description,
            tags: model.tags,
            phases: model.phases,
            related_elements: model.related_elements || []
        };
    });

    fs.writeFileSync(filePath, JSON.stringify(fixed, null, 2));
    console.log('  Removed: elements (inline array)');
    console.log('  After:', fixed.length, 'models');
}

// ============================================
// RUN ALL FIXES
// ============================================
console.log('=== SCHEMA COMPLIANCE FIXES ===\n');

fixUsecases();
fixEpds();
fixModels();

console.log('\n=== ALL FIXES COMPLETE ===');
