import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testApiCheckout() {
  // Get a product ID
  const { data: product } = await supabase.from('products').select('id').limit(1).single();
  if (!product) {
    console.error('No products found');
    return;
  }

  console.log(`Testing checkout for product: ${product.id}`);

  // We can't easily call the API route because it's a Next.js route and needs a request object.
  // But we can simulate the logic inside it.
  
  const productId = product.id;
  const { data: productDetails, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

  if (error || !productDetails) {
    console.error('Product not found in DB:', error);
    return;
  }

  console.log('Product found:', productDetails.name);

  // Check orders table insert
  const orderData = {
    customer_id: null,
    total_amount_cents: productDetails.price_cents,
    stripe_checkout_id: 'test_session_id',
    status: 'pending',
    affiliate_id: null
  };

  console.log('Testing order insertion...');
  const { error: insertError } = await supabase.from('orders').insert(orderData);
  
  if (insertError) {
    console.error('FAILED to insert order:', insertError);
  } else {
    console.log('Order insertion SUCCESSFUL');
  }
}

testApiCheckout();
