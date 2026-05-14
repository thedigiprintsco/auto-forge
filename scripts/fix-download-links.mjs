import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase environment variables missing')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function fixDownloadLinks() {
  console.log('Fetching products...')
  const { data: products, error: fetchError } = await supabase
    .from('products')
    .select('id, name, slug, type')

  if (fetchError) {
    console.error('Error fetching products:', fetchError)
    return
  }

  console.log(`Found ${products.length} products. Updating links...`)

  for (const product of products) {
    let download_url = ''
    
    if (product.type === 'notion' || product.name.toLowerCase().includes('os') || product.name.toLowerCase().includes('hub') || product.name.toLowerCase().includes('system')) {
      download_url = `https://notion.so/etherforge/${product.slug}`
    } else if (product.type === 'prompts' || product.type === 'guide' || product.type === 'pdf') {
      download_url = `https://theetherforge.net/downloads/${product.slug}.pdf`
    } else {
      download_url = `https://theetherforge.net/products/${product.slug}/access`
    }

    console.log(`Updating ${product.name} -> ${download_url}`)

    const { error: updateError } = await supabase
      .from('products')
      .update({ download_url })
      .eq('id', product.id)

    if (updateError) {
      console.error(`Error updating ${product.name}:`, updateError)
    }
  }

  console.log('All product download links have been updated.')
}

fixDownloadLinks()
