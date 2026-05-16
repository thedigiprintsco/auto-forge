import fetch from 'node-fetch';

async function testCheckout() {
  const productId = '4fb6b485-c831-4979-86c0-69f3a11defd3'; // Valid product ID
  
  console.log('Testing checkout for product:', productId);
  
  try {
    const response = await fetch('http://localhost:3000/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Data:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Fetch failed:', err);
  }
}

testCheckout();
