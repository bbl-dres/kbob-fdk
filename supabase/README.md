# Supabase Migration Guide

This guide walks you through setting up Supabase as the database backend for the KBOB Fachdatenkatalog.

## Prerequisites

- A Supabase account (https://supabase.com)
- Your Supabase project: https://supabase.com/dashboard/project/sdomjwahhqrlyqyfyyeo

## Setup Steps

### Step 1: Get Your Supabase Anon Key

1. Go to your Supabase project dashboard
2. Click on **Settings** (gear icon) in the left sidebar
3. Click on **API** under "Project Settings"
4. Copy the **anon public** key (under "Project API keys")

### Step 2: Create Database Tables

1. Go to the **SQL Editor** in your Supabase dashboard
2. Open the file `supabase/migrations/001_create_tables.sql`
3. Copy the entire contents and paste into the SQL Editor
4. Click **Run** to execute the SQL

This creates the following tables:
- `elements` - Building elements with LOI specifications
- `usecases` - BIM use cases
- `documents` - Document types and retention policies
- `models` - BIM models
- `epds` - Environmental Product Declarations

### Step 3: Seed the Database

1. Generate the seed SQL file (if not already done):
   ```bash
   node supabase/generate-seed.js
   ```

2. Go to the **SQL Editor** in Supabase
3. Open the file `supabase/migrations/002_seed_data.sql`
4. Copy the entire contents and paste into the SQL Editor
5. Click **Run** to execute the SQL

The final query will show you how many records were inserted:
```
table_name | count
-----------+-------
elements   | 15
usecases   | 30
documents  | 130
models     | 10
epds       | 10
```

### Step 4: Configure the Application

1. Open `js/config.js`
2. Replace `YOUR_SUPABASE_ANON_KEY` with your actual anon key:

```javascript
const CONFIG = {
    supabase: {
        url: 'https://sdomjwahhqrlyqyfyyeo.supabase.co',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // Your actual key
    },
    dataSource: 'supabase',
    // ...
};
```

### Step 5: Test the Application

1. Open the application in a browser
2. Check the browser console - you should see:
   ```
   Loading data from Supabase...
   Data loaded from Supabase successfully
   ```

## Fallback to JSON Files

If Supabase is not configured or fails, the application automatically falls back to loading data from local JSON files. This ensures the application works offline or during development.

To force JSON file usage, set `dataSource` to `'json'` in `js/config.js`:

```javascript
dataSource: 'json',
```

## File Structure

```
supabase/
├── README.md                        # This file
├── generate-seed.js                 # Script to generate SQL from JSON
└── migrations/
    ├── 001_create_tables.sql        # Database schema
    └── 002_seed_data.sql            # Data seed (generated)
```

## Database Schema

### Tables

| Table | Description | Key Fields |
|-------|-------------|------------|
| `elements` | Building elements | id, title, category, tags (JSONB), classifications (JSONB) |
| `usecases` | BIM use cases | id, title, phases (JSONB), roles (JSONB) |
| `documents` | Document types | id, title, formats (JSONB), retention |
| `models` | BIM models | id, title, classifications (JSONB), phases (JSONB) |
| `epds` | EPD records | id, title, gwp, unit, classifications (JSONB) |

### Row Level Security (RLS)

All tables have RLS enabled with public read access. This means:
- Anyone can read data (using the anon key)
- Only authenticated users with proper permissions can write data

### Indexes

GIN indexes are created on JSONB columns (tags, phases, classifications) for efficient querying.

## Troubleshooting

### "Supabase library not loaded"
Make sure the Supabase CDN script is loaded in `index.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

### "Supabase anon key not configured"
Update `js/config.js` with your actual anon key.

### Data not loading from Supabase
1. Check browser console for errors
2. Verify the tables were created in Supabase
3. Verify the data was seeded
4. Check that RLS policies are in place

### CORS errors
Supabase handles CORS automatically. If you see CORS errors, ensure you're using the correct project URL.
