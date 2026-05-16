import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || process.env.STRIP_SECRET_KEY

if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY is missing! Checkout will fail.')
}

export const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder', {
  // @ts-expect-error Stripe version might be newer than types
  apiVersion: '2024-06-20',
  appInfo: {
    name: 'EtherForge',
    version: '0.1.0',
  },
})
