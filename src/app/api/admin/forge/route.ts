import { NextResponse } from 'next/server';
import { generateProduct } from '@/lib/ai-generator';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const { niche, type, action, productData } = await request.json();

    // Action: Generate
    if (action === 'generate') {
      if (!niche || !type) {
        return NextResponse.json({ error: 'Niche and type are required for generation' }, { status: 400 });
      }

      const product = await generateProduct(niche, type);
      return NextResponse.json({ 
        success: true, 
        data: product 
      });
    }

    // Action: Save
    if (action === 'save') {
      if (!productData) {
        return NextResponse.json({ error: 'Product data is required for saving' }, { status: 400 });
      }

      const supabase = await createClient();
      
      const slug = productData.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^a-z0-9-]/g, '');

      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: productData.title,
          slug: slug,
          description: productData.description,
          price_cents: Math.round(productData.price * 100),
          type: productData.type,
          download_url: `https://notion.so/etherforge/${slug}`, // Placeholder Notion link
          is_active: false, // Default to draft
          metadata: {
            value_prop: productData.value_prop,
            features: productData.features,
            content_preview: productData.content_preview,
            seo_metadata: productData.seo_metadata
          }
        }])
        .select();

      if (error) {
        throw error;
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Product saved to store as draft',
        data: data[0]
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error: unknown) {
    console.error('Forge API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
