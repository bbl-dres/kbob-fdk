/**
 * Generate SQL seed file from JSON data
 * Run with: node supabase/generate-seed.js
 */

const fs = require('fs');
const path = require('path');

// Helper to escape single quotes for SQL
function escapeSql(str) {
    if (str === null || str === undefined) return 'NULL';
    if (typeof str === 'string') {
        return `'${str.replace(/'/g, "''")}'`;
    }
    if (typeof str === 'number') {
        return str.toString();
    }
    if (typeof str === 'boolean') {
        return str ? 'true' : 'false';
    }
    return 'NULL';
}

// Convert JSON to PostgreSQL JSONB string
function toJsonb(obj) {
    if (obj === null || obj === undefined) return "'[]'::jsonb";
    const json = JSON.stringify(obj).replace(/'/g, "''");
    return `'${json}'::jsonb`;
}

// Load JSON files
const dataDir = path.join(__dirname, '..', 'data');

const elements = JSON.parse(fs.readFileSync(path.join(dataDir, 'elements.json'), 'utf8'));
const usecases = JSON.parse(fs.readFileSync(path.join(dataDir, 'usecases.json'), 'utf8'));
const documents = JSON.parse(fs.readFileSync(path.join(dataDir, 'documents.json'), 'utf8'));
const models = JSON.parse(fs.readFileSync(path.join(dataDir, 'models.json'), 'utf8'));
const epds = JSON.parse(fs.readFileSync(path.join(dataDir, 'epds.json'), 'utf8'));

let sql = `-- KBOB Fachdatenkatalog - Data Seed
-- Generated from JSON files
-- Run this in Supabase SQL Editor after running 001_create_tables.sql

-- Clear existing data (optional - comment out if you want to preserve data)
TRUNCATE elements, usecases, documents, models, epds CASCADE;

-- ===========================================
-- ELEMENTS DATA
-- ===========================================
`;

// Generate elements inserts
for (const el of elements) {
    sql += `INSERT INTO elements (id, title, image, category, description, tags, classifications, ifc_mapping, geometry, information, documentation)
VALUES (
    ${escapeSql(el.id)},
    ${escapeSql(el.title)},
    ${escapeSql(el.image || '')},
    ${escapeSql(el.category)},
    ${escapeSql(el.description || '')},
    ${toJsonb(el.tags || [])},
    ${toJsonb(el.classifications || [])},
    ${toJsonb(el.ifcMapping || [])},
    ${toJsonb(el.geometry || [])},
    ${toJsonb(el.information || [])},
    ${toJsonb(el.documentation || [])}
);\n\n`;
}

sql += `-- ===========================================
-- USECASES DATA
-- ===========================================
`;

// Generate usecases inserts
for (const uc of usecases) {
    sql += `INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    ${escapeSql(uc.id)},
    ${escapeSql(uc.title)},
    ${escapeSql(uc.image || '')},
    ${escapeSql(uc.category)},
    ${escapeSql(uc.description || '')},
    ${toJsonb(uc.tags || [])},
    ${toJsonb(uc.phases || [])},
    ${escapeSql(uc.process_url || '')},
    ${toJsonb(uc.examples || [])},
    ${toJsonb(uc.standards || [])},
    ${toJsonb(uc.goals || [])},
    ${toJsonb(uc.inputs || [])},
    ${toJsonb(uc.outputs || [])},
    ${toJsonb(uc.roles || [])}
);\n\n`;
}

sql += `-- ===========================================
-- DOCUMENTS DATA
-- ===========================================
`;

// Generate documents inserts
for (const doc of documents) {
    sql += `INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    ${escapeSql(doc.id)},
    ${escapeSql(doc.title)},
    ${escapeSql(doc.image || '')},
    ${escapeSql(doc.category)},
    ${escapeSql(doc.description || '')},
    ${toJsonb(doc.tags || [])},
    ${toJsonb(doc.formats || [])},
    ${escapeSql(doc.retention || '')},
    ${toJsonb(doc.phases || [])}
);\n\n`;
}

sql += `-- ===========================================
-- MODELS DATA
-- ===========================================
`;

// Generate models inserts
for (const model of models) {
    sql += `INSERT INTO models (id, title, image, category, description, tags, classifications, phases)
VALUES (
    ${escapeSql(model.id)},
    ${escapeSql(model.title)},
    ${escapeSql(model.image || '')},
    ${escapeSql(model.category)},
    ${escapeSql(model.description || '')},
    ${toJsonb(model.tags || [])},
    ${toJsonb(model.classifications || [])},
    ${toJsonb(model.phases || [])}
);\n\n`;
}

sql += `-- ===========================================
-- EPDS DATA (Environmental Product Declarations)
-- ===========================================
`;

// Generate epds inserts
for (const epd of epds) {
    sql += `INSERT INTO epds (id, title, image, category, description, tags, classifications, gwp, unit, phases)
VALUES (
    ${escapeSql(epd.id)},
    ${escapeSql(epd.title)},
    ${escapeSql(epd.image || '')},
    ${escapeSql(epd.category)},
    ${escapeSql(epd.description || '')},
    ${toJsonb(epd.tags || [])},
    ${toJsonb(epd.classifications || [])},
    ${epd.gwp !== undefined ? epd.gwp : 'NULL'},
    ${escapeSql(epd.unit || '')},
    ${toJsonb(epd.phases || [])}
);\n\n`;
}

sql += `-- ===========================================
-- Verify data was inserted
-- ===========================================
SELECT 'elements' as table_name, COUNT(*) as count FROM elements
UNION ALL
SELECT 'usecases', COUNT(*) FROM usecases
UNION ALL
SELECT 'documents', COUNT(*) FROM documents
UNION ALL
SELECT 'models', COUNT(*) FROM models
UNION ALL
SELECT 'epds', COUNT(*) FROM epds;
`;

// Write the SQL file
const outputPath = path.join(__dirname, 'migrations', '002_seed_data.sql');
fs.writeFileSync(outputPath, sql, 'utf8');

console.log(`Generated ${outputPath}`);
console.log(`- Elements: ${elements.length}`);
console.log(`- Usecases: ${usecases.length}`);
console.log(`- Documents: ${documents.length}`);
console.log(`- Models: ${models.length}`);
console.log(`- EPDs: ${epds.length}`);
