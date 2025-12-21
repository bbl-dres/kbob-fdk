-- ============================================
-- KBOB Fachdatenkatalog - Database Seed Script
-- For Supabase (PostgreSQL)
-- ============================================

-- Drop existing tables (uncomment if needed)
-- DROP TABLE IF EXISTS elements CASCADE;
-- DROP TABLE IF EXISTS documents CASCADE;
-- DROP TABLE IF EXISTS usecases CASCADE;
-- DROP TABLE IF EXISTS models CASCADE;
-- DROP TABLE IF EXISTS epds CASCADE;

-- ============================================
-- TABLE: elements
-- ============================================
CREATE TABLE IF NOT EXISTS elements (
    id TEXT PRIMARY KEY,
    version TEXT,
    last_change DATE,
    title TEXT NOT NULL,
    image TEXT,
    category TEXT,
    description TEXT,
    tags TEXT[],
    classifications JSONB,
    ifc_mapping JSONB,
    geometry JSONB,
    information JSONB,
    documentation JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: documents
-- ============================================
CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    version TEXT,
    last_change DATE,
    title TEXT NOT NULL,
    image TEXT,
    category TEXT,
    description TEXT,
    tags TEXT[],
    formats TEXT[],
    retention TEXT,
    phases INTEGER[],
    classifications JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: usecases
-- ============================================
CREATE TABLE IF NOT EXISTS usecases (
    id TEXT PRIMARY KEY,
    version TEXT,
    last_change DATE,
    title TEXT NOT NULL,
    image TEXT,
    category TEXT,
    description TEXT,
    tags TEXT[],
    phases INTEGER[],
    process_url TEXT,
    examples JSONB,
    standards TEXT[],
    goals TEXT[],
    inputs TEXT[],
    outputs TEXT[],
    roles JSONB,
    definition TEXT,
    prerequisites JSONB,
    implementation TEXT[],
    practice_example JSONB,
    quality_criteria TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: models
-- ============================================
CREATE TABLE IF NOT EXISTS models (
    id TEXT PRIMARY KEY,
    version TEXT,
    last_change DATE,
    title TEXT NOT NULL,
    image TEXT,
    category TEXT,
    description TEXT,
    tags TEXT[],
    phases INTEGER[],
    elements JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: epds (Ökobilanzdaten)
-- ============================================
CREATE TABLE IF NOT EXISTS epds (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    category TEXT,
    subcategory TEXT,
    description TEXT,
    tags TEXT[],
    version TEXT,
    last_change DATE,
    uuid TEXT,
    unit TEXT,
    gwp NUMERIC,
    ubp NUMERIC,
    penrt NUMERIC,
    pert NUMERIC,
    density TEXT,
    biogenic_carbon NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Enable Row Level Security (RLS)
-- ============================================
ALTER TABLE elements ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE usecases ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE epds ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies: Public read access
-- ============================================
CREATE POLICY "Allow public read access" ON elements FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public read access" ON documents FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public read access" ON usecases FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public read access" ON models FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public read access" ON epds FOR SELECT TO anon USING (true);

-- ============================================
-- SAMPLE DATA: documents (first 3 entries)
-- ============================================
INSERT INTO documents (id, version, last_change, title, image, category, description, tags, formats, retention, phases, classifications) VALUES
('O01001', '1.0', '2024-06-15', 'Immobilienhandbuch', 'assets/img/document/organization.jpg', 'Organisation', 'Das Immobilienhandbuch regelt die Abläufe, Zuständigkeiten, Kompetenzen sowie die Formen der Zusammenarbeit im Immobilienmanagement', ARRAY['Betrieb', 'Dokumentation'], ARRAY['PDF-A', 'Office-Format'], 'bis Ersatz', ARRAY[4], '{"GEFMA": ["100 – Immobilienmanagement"], "SIA": ["D 0165 – Dokumentation Hochbau"]}'::jsonb),
('O01002', '1.1', '2024-07-22', 'Organigramm Stammorganisation', 'assets/img/document/organization.jpg', 'Organisation', 'Grafische Darstellung des logischen Aufbaus einer Stammorganisation', ARRAY['Betrieb', 'Dokumentation'], ARRAY['PDF-A', 'Office-Format'], 'bis Ersatz', ARRAY[4], NULL),
('O01003', '1.2', '2024-08-10', 'Adressverzeichnis Stammorganisation', 'assets/img/document/organization.jpg', 'Organisation', 'Verzeichnis aller Namen und Adressen einer Stammorganisation', ARRAY['Betrieb', 'Dokumentation'], ARRAY['PDF-A', 'Office-Format'], 'bis Bearbeitungszweck entfällt', ARRAY[4], NULL)
ON CONFLICT (id) DO UPDATE SET
    version = EXCLUDED.version,
    last_change = EXCLUDED.last_change,
    title = EXCLUDED.title,
    image = EXCLUDED.image,
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    tags = EXCLUDED.tags,
    formats = EXCLUDED.formats,
    retention = EXCLUDED.retention,
    phases = EXCLUDED.phases,
    classifications = EXCLUDED.classifications;

-- ============================================
-- SAMPLE DATA: models (first 3 entries)
-- ============================================
INSERT INTO models (id, version, last_change, title, image, category, description, tags, phases, elements) VALUES
('m1', '1.0', '2024-06-15', 'Architekturmodell', 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=200&fit=crop', 'Fachmodelle', 'Digitales 3D-Modell der architektonischen Planung mit Räumen, Wänden, Decken und Öffnungen', ARRAY['Koordination', 'Visualisierung'], ARRAY[1,2,3,4], '[{"name": "Wand", "description": "Tragende und nichttragende Wände inkl. Innenwände", "phases": [2,3,4]}, {"name": "Decke", "description": "Geschossdecken und Flachdächer", "phases": [2,3,4]}, {"name": "Fenster", "description": "Fensterelemente mit Rahmen und Verglasung", "phases": [2,3,4]}, {"name": "Tür", "description": "Innen- und Aussentüren", "phases": [2,3,4]}]'::jsonb),
('m2', '1.1', '2024-07-22', 'Tragwerksmodell', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=200&fit=crop', 'Fachmodelle', 'BIM-Modell der tragenden Struktur mit statischen Bauteilen und Bewehrung', ARRAY['Nachweise', 'Koordination'], ARRAY[2,3,4], '[{"name": "Fundament", "description": "Einzel- und Streifenfundamente", "phases": [2,3,4]}, {"name": "Stütze", "description": "Tragende Stützen aus Beton oder Stahl", "phases": [2,3,4]}, {"name": "Träger", "description": "Decken- und Dachträger", "phases": [2,3,4]}]'::jsonb),
('m3', '1.2', '2024-08-10', 'HLKS-Modell', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=200&fit=crop', 'Fachmodelle', 'Integriertes Modell für Heizung, Lüftung, Klima und Sanitär', ARRAY['Koordination', 'Betrieb'], ARRAY[2,3,4], '[{"name": "Lüftungskanal", "description": "Rechteck- und Rundkanäle für Lüftungsanlagen", "phases": [2,3,4]}, {"name": "Heizungsrohr", "description": "Rohrleitungen für Heizungsverteilung", "phases": [2,3,4]}, {"name": "Sanitärleitung", "description": "Trink- und Abwasserleitungen", "phases": [2,3,4]}]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
    version = EXCLUDED.version,
    last_change = EXCLUDED.last_change,
    title = EXCLUDED.title,
    image = EXCLUDED.image,
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    tags = EXCLUDED.tags,
    phases = EXCLUDED.phases,
    elements = EXCLUDED.elements;

-- ============================================
-- SAMPLE DATA: epds (first 3 entries)
-- ============================================
INSERT INTO epds (id, title, image, category, subcategory, description, tags, version, last_change, uuid, unit, gwp, ubp, penrt, pert, density, biogenic_carbon) VALUES
('kbob-01-042', 'Betonfertigteil, Normalbeton, ab Werk', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=200&fit=crop', 'Baumaterialien', 'Beton', 'KBOB Ökobilanzdaten für Betonfertigteil, Normalbeton, ab Werk', ARRAY['Nachhaltigkeit', 'Nachweise'], '1.2', '2024-07-15', 'F6DCDEFA-AFE6-44CB-8B68-3527ABFDC011', 'kg', 0.177, 282.0, 0.432, 0.0948, '2500', NULL),
('kbob-11-008', 'Keramik-/Steinzeugplatte, 9 mm', 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=200&fit=crop', 'Baumaterialien', 'Bodenbeläge', 'KBOB Ökobilanzdaten für Keramik-/Steinzeugplatte, 9 mm', ARRAY['Nachhaltigkeit', 'Kosten'], '1.0', '2024-03-22', '414EEBBE-85C4-4869-A411-29C0097ADA38', 'm2', 18.2, 86800.0, 83.1, 4.49, '18', NULL),
('kbob-10-014', 'Aerogel-Vlies', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=200&fit=crop', 'Baumaterialien', 'Dämmstoffe', 'KBOB Ökobilanzdaten für Aerogel-Vlies', ARRAY['Nachhaltigkeit', 'Nachweise'], '2.0', '2024-09-10', '9EC4E12B-5E75-4A0B-84DA-A1A5F152A4BC', 'kg', 48.7, 73600.0, 230.0, 12.6, '150', NULL)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    image = EXCLUDED.image,
    category = EXCLUDED.category,
    subcategory = EXCLUDED.subcategory,
    description = EXCLUDED.description,
    tags = EXCLUDED.tags,
    version = EXCLUDED.version,
    last_change = EXCLUDED.last_change,
    uuid = EXCLUDED.uuid,
    unit = EXCLUDED.unit,
    gwp = EXCLUDED.gwp,
    ubp = EXCLUDED.ubp,
    penrt = EXCLUDED.penrt,
    pert = EXCLUDED.pert,
    density = EXCLUDED.density,
    biogenic_carbon = EXCLUDED.biogenic_carbon;

-- ============================================
-- SAMPLE DATA: usecases (first entry)
-- ============================================
INSERT INTO usecases (id, version, last_change, title, image, category, description, tags, phases, process_url, standards, goals, inputs, outputs, roles, definition, prerequisites, implementation, quality_criteria) VALUES
('uc000', '1.0', '2024-06-15', 'Minimalstandard', 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop', 'Koordination', 'Verbindliche Basisanforderungen für jedes Bauprojekt: Informationsanforderungen, Abwicklungsplanung und Projektkoordination, unabhängig von Bauvolumen oder Methodik.', ARRAY['Koordination'], ARRAY[1,2,3,4], 'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52', ARRAY['SIA 2051', 'ISO 19650'], ARRAY['Einheitliche Projektgrundlagen schaffen', 'Klare Informationsanforderungen definieren', 'Verbindliche Abwicklungsplanung sicherstellen'], ARRAY['Projektauftrag', 'Organisatorische Rahmenbedingungen', 'Vorlagen AIA/BAP'], ARRAY['Auftraggeber-Informationsanforderungen (AIA)', 'BIM-Abwicklungsplan (BAP)', 'Projektorganisation'], '[{"actor": "Projektleiter", "responsible": ["Definition der Projektziele", "Freigabe AIA"], "contributing": ["Abstimmung mit Stakeholdern"], "informed": []}, {"actor": "BIM-Manager", "responsible": ["Erstellung AIA und BAP", "Definition Informationsanforderungen"], "contributing": [], "informed": ["Projektänderungen"]}]'::jsonb, 'Der Minimalstandard definiert die verbindlichen Basisanforderungen für jedes Bauprojekt unabhängig von dessen Grösse oder gewählter Methodik.', '{"client": ["Grundsatzentscheid zur digitalen Projektabwicklung", "Bereitstellung von Ressourcen für die BIM-Koordination"], "contractor": ["Grundkenntnisse in digitaler Zusammenarbeit", "Bereitschaft zur strukturierten Informationslieferung"]}'::jsonb, ARRAY['Erstellung der Auftraggeber-Informationsanforderungen (AIA)', 'Entwicklung des BIM-Abwicklungsplans (BAP) gemeinsam mit den Projektbeteiligten', 'Definition der Projektorganisation und Verantwortlichkeiten'], ARRAY['Vollständige und freigegebene AIA vorhanden', 'BAP von allen Beteiligten unterzeichnet', 'Funktionierende gemeinsame Datenumgebung'])
ON CONFLICT (id) DO UPDATE SET
    version = EXCLUDED.version,
    last_change = EXCLUDED.last_change,
    title = EXCLUDED.title,
    image = EXCLUDED.image,
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    tags = EXCLUDED.tags,
    phases = EXCLUDED.phases,
    process_url = EXCLUDED.process_url,
    standards = EXCLUDED.standards,
    goals = EXCLUDED.goals,
    inputs = EXCLUDED.inputs,
    outputs = EXCLUDED.outputs,
    roles = EXCLUDED.roles,
    definition = EXCLUDED.definition,
    prerequisites = EXCLUDED.prerequisites,
    implementation = EXCLUDED.implementation,
    quality_criteria = EXCLUDED.quality_criteria;

-- ============================================
-- NOTE: For bulk import of all JSON data, use:
--
-- Option 1: Supabase Dashboard
--   Go to Table Editor > Import Data > Upload JSON
--
-- Option 2: Use the Supabase API with fetch/axios
--   POST to https://your-project.supabase.co/rest/v1/tablename
--   with headers: apikey, Authorization, Content-Type: application/json
--
-- Option 3: Use supabase-js client
--   const { data, error } = await supabase
--     .from('tablename')
--     .upsert(jsonData);
-- ============================================
