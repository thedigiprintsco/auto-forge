import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Checking orders table schema...');
  const { data, error } = await supabase.from('orders').select('*').limit(0);
  if (error) {
    console.error('Error fetching orders schema:', error);
    return;
  }
  
  // To get columns when table is empty, we can try to insert a dummy row or use another method.
  // Actually, Supabase error message already told us 'metadata' is missing.
  
  // Let's try to get all column names from the 'orders' table using a more direct SQL approach if possible, 
  // but we don't have direct SQL access here.
  
  // Instead, let's just use the 'test-order-insert.ts' results which are definitive.
  // 'metadata' is missing.
}
run();
