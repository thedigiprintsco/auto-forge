import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // @ts-expect-error Stripe version might be newer than types
  apiVersion: '2025-01-27-acacia',
  appInfo: {
    name: 'EtherForge',
    version: '0.1.0',
  },
})
