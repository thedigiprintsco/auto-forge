import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  // We throw an explicit error here so the logs show EXACTLY what is wrong
  throw new Error('CRITICAL: STRIPE_SECRET_KEY is not defined in environment variables.')
}

export const stripe = new Stripe(stripeSecretKey, {
  // @ts-expect-error Stripe version might be newer than types
  apiVersion: '2024-06-20',
  appInfo: {
    name: 'EtherForge',
    version: '0.1.0',
  },
})
// Force redeploy Sat May 16 14:31:03 UTC 2026
