import Stripe from 'stripe'

// We wrap this in a way that doesn't crash the build process
// but provides clear error messages at runtime.
const getStripeKey = () => {
  const key = process.env.STRIPE_SECRET_KEY
  
  // During build time on Vercel, environment variables might not be available
  // or might be intentionally omitted for security. We only want to crash 
  // at RUNTIME when a request is actually made.
  if (!key && typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
    // We'll log a warning but return a dummy string to avoid crashing the build
    // The actual route will catch the invalid key and return a 500
    console.warn('WARNING: STRIPE_SECRET_KEY is missing. This is fine during build but will fail at runtime.')
    return 'sk_missing_at_build_time'
  }
  
  return key || 'sk_missing'
}

export const stripe = new Stripe(getStripeKey(), {
  // @ts-expect-error Stripe version might be newer than types
  apiVersion: '2024-06-20',
  appInfo: {
    name: 'EtherForge',
    version: '0.1.0',
  },
})
