/**
 * KBOB Fachdatenkatalog - Supabase Client
 * Database client and data fetching utilities
 */

// Supabase client instance
let supabaseClient = null;

// Data cache
const dataCache = {
    elements: null,
    usecases: null,
    documents: null,
    models: null,
    epds: null,
    timestamp: null
};

/**
 * Initialize the Supabase client
 */
function initSupabase() {
    if (supabaseClient) return supabaseClient;

    if (!window.supabase) {
        console.error('Supabase library not loaded');
        return null;
    }

    if (CONFIG.supabase.anonKey === 'YOUR_SUPABASE_ANON_KEY') {
        console.warn('Supabase anon key not configured. Falling back to JSON files.');
        return null;
    }

    supabaseClient = window.supabase.createClient(
        CONFIG.supabase.url,
        CONFIG.supabase.anonKey
    );

    return supabaseClient;
}

/**
 * Check if cache is valid
 */
function isCacheValid() {
    if (!CONFIG.enableCache) return false;
    if (!dataCache.timestamp) return false;
    return (Date.now() - dataCache.timestamp) < CONFIG.cacheDuration;
}

/**
 * Fetch all elements from Supabase
 */
async function fetchElements() {
    if (isCacheValid() && dataCache.elements) {
        return dataCache.elements;
    }

    const client = initSupabase();
    if (!client) return null;

    const { data, error } = await client
        .from('elements')
        .select('*')
        .order('id');

    if (error) {
        console.error('Error fetching elements:', error);
        return null;
    }

    // Transform snake_case to camelCase for compatibility
    const transformed = data.map(transformElementFromDb);
    dataCache.elements = transformed;
    return transformed;
}

/**
 * Fetch all usecases from Supabase
 */
async function fetchUsecases() {
    if (isCacheValid() && dataCache.usecases) {
        return dataCache.usecases;
    }

    const client = initSupabase();
    if (!client) return null;

    const { data, error } = await client
        .from('usecases')
        .select('*')
        .order('id');

    if (error) {
        console.error('Error fetching usecases:', error);
        return null;
    }

    // Transform snake_case to camelCase for compatibility
    const transformed = data.map(transformUsecaseFromDb);
    dataCache.usecases = transformed;
    return transformed;
}

/**
 * Fetch all documents from Supabase
 */
async function fetchDocuments() {
    if (isCacheValid() && dataCache.documents) {
        return dataCache.documents;
    }

    const client = initSupabase();
    if (!client) return null;

    const { data, error } = await client
        .from('documents')
        .select('*')
        .order('id');

    if (error) {
        console.error('Error fetching documents:', error);
        return null;
    }

    dataCache.documents = data;
    return data;
}

/**
 * Fetch all models from Supabase
 */
async function fetchModels() {
    if (isCacheValid() && dataCache.models) {
        return dataCache.models;
    }

    const client = initSupabase();
    if (!client) return null;

    const { data, error } = await client
        .from('models')
        .select('*')
        .order('id');

    if (error) {
        console.error('Error fetching models:', error);
        return null;
    }

    dataCache.models = data;
    return data;
}

/**
 * Fetch all EPDs from Supabase
 */
async function fetchEpds() {
    if (isCacheValid() && dataCache.epds) {
        return dataCache.epds;
    }

    const client = initSupabase();
    if (!client) return null;

    const { data, error } = await client
        .from('epds')
        .select('*')
        .order('id');

    if (error) {
        console.error('Error fetching epds:', error);
        return null;
    }

    dataCache.epds = data;
    return data;
}

/**
 * Fetch all data from Supabase in parallel
 */
async function fetchAllDataFromSupabase() {
    const client = initSupabase();
    if (!client) {
        return null;
    }

    try {
        const [elements, usecases, documents, models, epds] = await Promise.all([
            fetchElements(),
            fetchUsecases(),
            fetchDocuments(),
            fetchModels(),
            fetchEpds()
        ]);

        // Check if any fetch failed
        if (!elements || !usecases || !documents || !models || !epds) {
            return null;
        }

        // Update cache timestamp
        dataCache.timestamp = Date.now();

        return { elements, usecases, documents, models, epds };
    } catch (error) {
        console.error('Error fetching data from Supabase:', error);
        return null;
    }
}

/**
 * Transform element data from database format to application format
 * Converts snake_case column names to camelCase
 */
function transformElementFromDb(row) {
    return {
        id: row.id,
        title: row.title,
        image: row.image,
        category: row.category,
        description: row.description,
        tags: row.tags || [],
        classifications: row.classifications || [],
        ifcMapping: row.ifc_mapping || [],
        geometry: row.geometry || [],
        information: row.information || [],
        documentation: row.documentation || []
    };
}

/**
 * Transform usecase data from database format to application format
 */
function transformUsecaseFromDb(row) {
    return {
        id: row.id,
        title: row.title,
        image: row.image,
        category: row.category,
        description: row.description,
        tags: row.tags || [],
        phases: row.phases || [],
        process_url: row.process_url,
        examples: row.examples || [],
        standards: row.standards || [],
        goals: row.goals || [],
        inputs: row.inputs || [],
        outputs: row.outputs || [],
        roles: row.roles || []
    };
}

/**
 * Clear the data cache
 */
function clearDataCache() {
    dataCache.elements = null;
    dataCache.usecases = null;
    dataCache.documents = null;
    dataCache.models = null;
    dataCache.epds = null;
    dataCache.timestamp = null;
}

/**
 * Check if Supabase is properly configured
 */
function isSupabaseConfigured() {
    return CONFIG.supabase.anonKey !== 'YOUR_SUPABASE_ANON_KEY' &&
           CONFIG.dataSource === 'supabase';
}
