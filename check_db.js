const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error, count } = await supabase
    .from('support_requests')
    .select('*', { count: 'exact' });

  if (error) {
    console.error('Error fetching support_requests:', error);
    return;
  }

  console.log('Total support requests:', count);
  console.log('Recent requests:', JSON.stringify(data, null, 2));
}

check();
