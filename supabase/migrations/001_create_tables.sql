-- KBOB Fachdatenkatalog - Database Schema
-- Migration: Create all tables
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/sdomjwahhqrlyqyfyyeo/sql)

-- ===========================================
-- ELEMENTS TABLE
-- Building elements with LOI specifications
-- ===========================================
CREATE TABLE IF NOT EXISTS elements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    category TEXT NOT NULL,
    description TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    classifications JSONB DEFAULT '[]'::jsonb,
    ifc_mapping JSONB DEFAULT '[]'::jsonb,
    geometry JSONB DEFAULT '[]'::jsonb,
    information JSONB DEFAULT '[]'::jsonb,
    documentation JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- USECASES TABLE
-- BIM use cases across project lifecycle
-- ===========================================
CREATE TABLE IF NOT EXISTS usecases (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    category TEXT NOT NULL,
    description TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    phases JSONB DEFAULT '[]'::jsonb,
    process_url TEXT,
    examples JSONB DEFAULT '[]'::jsonb,
    standards JSONB DEFAULT '[]'::jsonb,
    goals JSONB DEFAULT '[]'::jsonb,
    inputs JSONB DEFAULT '[]'::jsonb,
    outputs JSONB DEFAULT '[]'::jsonb,
    roles JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- DOCUMENTS TABLE
-- Document types and retention policies
-- ===========================================
CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    category TEXT NOT NULL,
    description TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    formats JSONB DEFAULT '[]'::jsonb,
    retention TEXT,
    phases JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- MODELS TABLE
-- BIM models (architectural, structural, etc.)
-- ===========================================
CREATE TABLE IF NOT EXISTS models (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    category TEXT NOT NULL,
    description TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    classifications JSONB DEFAULT '[]'::jsonb,
    phases JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- EPDS TABLE
-- Environmental Product Declarations
-- ===========================================
CREATE TABLE IF NOT EXISTS epds (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    category TEXT NOT NULL,
    description TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    classifications JSONB DEFAULT '[]'::jsonb,
    gwp NUMERIC,
    unit TEXT,
    phases JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- INDEXES for better query performance
-- ===========================================

-- Elements indexes
CREATE INDEX IF NOT EXISTS idx_elements_category ON elements(category);
CREATE INDEX IF NOT EXISTS idx_elements_tags ON elements USING GIN(tags);

-- Usecases indexes
CREATE INDEX IF NOT EXISTS idx_usecases_category ON usecases(category);
CREATE INDEX IF NOT EXISTS idx_usecases_tags ON usecases USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_usecases_phases ON usecases USING GIN(phases);

-- Documents indexes
CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);
CREATE INDEX IF NOT EXISTS idx_documents_tags ON documents USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_documents_phases ON documents USING GIN(phases);

-- Models indexes
CREATE INDEX IF NOT EXISTS idx_models_category ON models(category);
CREATE INDEX IF NOT EXISTS idx_models_tags ON models USING GIN(tags);

-- EPDs indexes
CREATE INDEX IF NOT EXISTS idx_epds_category ON epds(category);
CREATE INDEX IF NOT EXISTS idx_epds_tags ON epds USING GIN(tags);

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- Enable public read access
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE elements ENABLE ROW LEVEL SECURITY;
ALTER TABLE usecases ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE epds ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anon users can read)
CREATE POLICY "Allow public read access on elements" ON elements
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on usecases" ON usecases
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on documents" ON documents
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on models" ON models
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on epds" ON epds
    FOR SELECT USING (true);

-- ===========================================
-- UPDATED_AT TRIGGER
-- Automatically update the updated_at timestamp
-- ===========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_elements_updated_at BEFORE UPDATE ON elements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_usecases_updated_at BEFORE UPDATE ON usecases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_models_updated_at BEFORE UPDATE ON models
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_epds_updated_at BEFORE UPDATE ON epds
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
