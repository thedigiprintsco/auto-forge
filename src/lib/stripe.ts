import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder'

export const stripe = new Stripe(stripeSecretKey, {
  // @ts-expect-error Stripe version might be newer than types
  apiVersion: '2025-01-27-acacia',
  appInfo: {
    name: 'EtherForge',
    version: '0.1.0',
  },
})
