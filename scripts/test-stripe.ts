import Stripe from 'stripe';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20' as any,
});

async function testStripe() {
  console.log('Testing Stripe session creation...');
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Test Product',
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://theetherforge.net/success',
      cancel_url: 'https://theetherforge.net/cancel',
    });
    console.log('Session created successfully!');
    console.log('URL:', session.url);
  } catch (err) {
    console.error('Stripe error:', err);
  }
}

testStripe();
