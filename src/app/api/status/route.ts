import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    status: 'online', 
    version: '2.0.2',
    timestamp: new Date().toISOString(),
    env: {
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      stripeKeySnippet: process.env.STRIPE_SECRET_KEY ? `${process.env.STRIPE_SECRET_KEY.slice(0, 7)}...${process.env.STRIPE_SECRET_KEY.slice(-5)}` : 'missing',
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || 'not set'
    }
  })
}
