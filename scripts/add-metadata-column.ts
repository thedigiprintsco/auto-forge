import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Attempting to add metadata column to orders table...');
  
  // Try to use a common RPC if it exists, or just catch error
  const { data, error } = await supabase.rpc('run_sql', { 
    sql: 'ALTER TABLE orders ADD COLUMN IF NOT EXISTS metadata JSONB;' 
  });
  
  if (error) {
    console.error('Error running SQL via RPC:', error);
    console.log('You might need to add the column manually in the Supabase Dashboard.');
  } else {
    console.log('SQL ran successfully:', data);
  }
}
run();
