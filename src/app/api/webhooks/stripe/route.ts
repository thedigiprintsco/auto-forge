import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = (await headers()).get('stripe-signature') as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Webhook Error: ${message}`)
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  const supabase = await createClient()

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const metadata = session.metadata
    const productId = metadata?.productId
    const userId = metadata?.userId

    // 1. Create the order record
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: userId,
        total_amount_cents: session.amount_total,
        stripe_checkout_id: session.id,
        status: 'completed',
      })
      .select()
      .single()

    if (orderError) {
      console.error('Error creating order:', orderError)
      return NextResponse.json({ error: 'Order creation failed' }, { status: 500 })
    }

    // 2. Create the order item
    await supabase.from('order_items').insert({
      order_id: order.id,
      product_id: productId,
      price_cents: session.amount_total,
    })

    console.log(`Order ${order.id} completed successfully for product ${productId}`)
    
    // 3. TODO: Trigger email delivery (using Resend or similar)
  }

  return NextResponse.json({ received: true })
}
