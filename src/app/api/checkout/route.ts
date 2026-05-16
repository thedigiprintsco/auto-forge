import { createClient } from '@/utils/supabase/server'
import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json()
    const supabase = await createClient()

    // Fetch product details
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()

    if (error || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Get current user (if any)
    const { data: { user } } = await supabase.auth.getUser()

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    if (!siteUrl) {
      throw new Error('NEXT_PUBLIC_SITE_URL is required')
    }

    // Get affiliate code from cookie
    const affiliateCode = req.cookies.get('ef_affiliate_code')?.value
    let affiliateId = null

    if (affiliateCode) {
      const { data: affiliate } = await supabase
        .from('affiliates')
        .select('id')
        .eq('referral_code', affiliateCode)
        .eq('status', 'active')
        .single()
      
      if (affiliate) {
        affiliateId = affiliate.id
      }
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price_cents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#bundles`,
      customer_email: user?.email,
      metadata: {
        productId: product.id,
        userId: user?.id || '',
        affiliateId: affiliateId || '',
      },
    })

    // Create a pending order record for abandoned cart tracking
    try {
      const { error: insertError } = await supabase.from('orders').insert({
        customer_id: user?.id || null,
        total_amount_cents: product.price_cents,
        stripe_checkout_id: session.id,
        status: 'pending',
        affiliate_id: affiliateId,
        metadata: {
          email: user?.email || null,
          productName: product.name,
          productId: product.id
        }
      })

      if (insertError) {
        console.warn('First order insert attempt failed, trying fallback:', insertError)
        // Fallback: Try without metadata and affiliate_id if they are causing issues
        await supabase.from('orders').insert({
          customer_id: user?.id || null,
          total_amount_cents: product.price_cents,
          stripe_checkout_id: session.id,
          status: 'pending'
        })
      }
    } catch (insertErr) {
      console.error('Failed to create pending order:', insertErr)
      // We don't want to block the checkout if order tracking fails
    }

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (err: unknown) {
    console.error('Checkout error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'An unknown error occurred' },
      { status: 500 }
    )
  }
}
