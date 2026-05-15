'use server'

import { createClient } from '@/utils/supabase/server'

export async function getDownloadUrl(sessionId: string) {
  if (!sessionId) return { error: 'No session ID provided' }

  const supabase = await createClient()

  // Find the order by stripe_checkout_id
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('id, status')
    .eq('stripe_checkout_id', sessionId)
    .single()

  if (orderError || !order) {
    console.error('Order not found for session:', sessionId, orderError)
    return { error: 'Order still processing. Please refresh in a moment.' }
  }

  if (order.status !== 'completed') {
    return { error: 'Order is still processing. Please wait.' }
  }

  // Get the product associated with this order
  const { data: orderItem, error: itemError } = await supabase
    .from('order_items')
    .select('product_id')
    .eq('order_id', order.id)
    .single()

  if (itemError || !orderItem) {
    console.error('Order item not found:', itemError)
    return { error: 'Could not find products for this order.' }
  }

  // Get the download URL for the product
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('download_url, name')
    .eq('id', orderItem.product_id)
    .single()

  if (productError || !product) {
    console.error('Product not found:', productError)
    return { error: 'Could not find product details.' }
  }

  return { downloadUrl: product.download_url, productName: product.name }
}
