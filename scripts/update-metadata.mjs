import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase environment variables missing')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function updateProducts() {
  const productsData = JSON.parse(fs.readFileSync('/home/team/shared/initial-products.json', 'utf8'))

  for (const product of productsData) {
    console.log(`Updating ${product.title}...`)
    
    // Find the product by slug
    const slug = product.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')
    
    // Determine image URL
    let image_url = product.image_url || '/hero.png'
    if (slug === 'solopreneur-os') image_url = '/solopreneur-os-thumb.png'
    if (slug === 'ai-marketing-power-pack') image_url = '/ai-marketing-power-pack-thumb.png'
    if (slug === 'adhd-focus-system') image_url = '/adhd-focus-system-thumb.png'
    if (slug === 'ai-agency-starter-kit') image_url = '/ai-agency-thumb.png'
    if (slug === 'ultimate-content-creator-hub') image_url = '/creator-hub-thumb.png'
    if (slug === 'biohackers-performance-journal') image_url = '/biohacker-thumb.png'
    if (slug === 'zero-to-one-automation-blueprints') image_url = '/automation-blueprints-thumb.png'
    if (slug === 'the-digital-asset-playbook') image_url = '/asset-playbook-thumb.png'
    if (slug === 'minimalist-finance-tracker') image_url = '/finance-tracker-thumb.png'
    if (slug === 'saas-launch-checklist--ui-kit') image_url = '/saas-launch-thumb.png'

    // Determine download URL
    let download_url = ''
    if (product.type === 'notion' || product.title.toLowerCase().includes('os') || product.title.toLowerCase().includes('hub')) {
      download_url = `https://notion.so/etherforge/${slug}`
    } else {
      download_url = `https://theetherforge.net/downloads/${slug}.pdf`
    }

    const { data, error } = await supabase
      .from('products')
      .update({
        image_url,
        download_url,
        metadata: {
          value_prop: product.value_prop,
          features: product.features,
          content_preview: product.content_preview,
          seo_metadata: product.seo_metadata,
          marketing: product.marketing
        }
      })
      .eq('slug', slug)

    if (error) {
      console.error(`Error updating ${product.title}:`, error)
    } else {
      console.log(`Updated ${product.title}`)
    }
  }
}

updateProducts()
