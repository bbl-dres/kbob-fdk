/**
 * KBOB Fachdatenkatalog - Configuration
 * Supabase and application settings
 */

const CONFIG = {
    // Supabase configuration
    supabase: {
        url: 'https://sdomjwahhqrlyqyfyyeo.supabase.co',
        // The anon key is safe to expose in frontend code
        // It only allows operations permitted by Row Level Security policies
        anonKey: 'YOUR_SUPABASE_ANON_KEY' // Replace with your actual anon key
    },

    // Public API endpoint (edge function - no auth required for GET)
    apiUrl: 'https://sdomjwahhqrlyqyfyyeo.supabase.co/functions/v1/kbob-api',

    // Data source: 'supabase' or 'json'
    // Set to 'json' to fall back to local JSON files
    dataSource: 'supabase',

    // Enable caching of Supabase responses
    enableCache: true,

    // Cache duration in milliseconds (5 minutes)
    cacheDuration: 5 * 60 * 1000
};

// Freeze config to prevent accidental modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.supabase);
