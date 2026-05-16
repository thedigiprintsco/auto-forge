import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Fixing product download links...');
  
  const { data: products, error } = await supabase.from('products').select('id, slug, name');
  if (error) {
    console.error(error);
    return;
  }

  for (const product of products) {
    let filename = `${product.slug}.pdf`;
    
    // Special cases
    if (product.slug === 'saas-launch-checklist-ui-kit') {
      filename = 'saas-launch-checklist-&-ui-kit.pdf';
    } else if (product.slug === 'biohackers-performance-journal') {
      filename = 'biohacker’s-performance-journal.pdf';
    }

    const downloadUrl = `/downloads/${filename}`;
    console.log(`Updating ${product.name}: ${downloadUrl}`);
    
    const { error: updateError } = await supabase
      .from('products')
      .update({ download_url: downloadUrl })
      .eq('id', product.id);
      
    if (updateError) {
      console.error(`Error updating ${product.name}:`, updateError);
    }
  }
  
  console.log('Finished fixing download links.');
}
run();
