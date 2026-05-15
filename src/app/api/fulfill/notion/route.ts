import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const sessionId = searchParams.get('sessionId')

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session ID' }, { status: 400 })
  }

  const supabase = await createClient()

  // 1. Find the order and its items
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('id, status, user_id')
    .eq('stripe_checkout_id', sessionId)
    .single()

  if (orderError || !order) {
    console.error('Order not found:', sessionId, orderError)
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  if (order.status !== 'completed') {
    return NextResponse.json({ error: 'Order not yet completed' }, { status: 403 })
  }

  // 2. Get the product (assuming one product per order for simplicity, or get the first one)
  const { data: orderItem, error: itemError } = await supabase
    .from('order_items')
    .select('product_id')
    .eq('order_id', order.id)
    .single()

  if (itemError || !orderItem) {
    return NextResponse.json({ error: 'Product not found in order' }, { status: 404 })
  }

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('name, download_url, type')
    .eq('id', orderItem.product_id)
    .single()

  if (productError || !product || product.type !== 'notion') {
    return NextResponse.json({ error: 'Not a Notion product' }, { status: 400 })
  }

  // 3. Log the access
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  const ua = req.headers.get('user-agent') || 'unknown'

  await supabase.from('template_access_logs').insert({
    order_id: order.id,
    product_id: orderItem.product_id,
    ip_address: ip,
    user_agent: ua
  })

  // 4. Redirect to the Notion template link
  return NextResponse.redirect(product.download_url)
}
