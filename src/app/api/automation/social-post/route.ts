import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { ForgeBot, Product as ForgeProduct } from '@/lib/forge-bot';
import { getBufferProfiles, createBufferUpdate } from '@/lib/buffer';

export async function POST(request: Request) {
  try {
    const { testProfileId, isTest, action } = await request.json();
    
    const supabase = await createClient();
    const bufferToken = process.env.BUFFER_ACCESS_TOKEN;

    if (!bufferToken || bufferToken === 'placeholder') {
      return NextResponse.json({ 
        success: false, 
        message: 'Buffer Access Token is missing or placeholder. Please set it in .env.local' 
      }, { status: 400 });
    }

    if (action === 'get_profiles') {
      try {
        const profiles = await getBufferProfiles(bufferToken);
        return NextResponse.json({ success: true, profiles });
      } catch (err) {
        return NextResponse.json({ success: false, message: 'Failed to fetch profiles from Buffer' });
      }
    }

    // 1. Fetch products from Supabase
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(10);

    if (productsError || !products || products.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No products found in database.' 
      }, { status: 404 });
    }

    // 2. Select a product (random for now)
    const dbProduct = products[Math.floor(Math.random() * products.length)];

    // 3. Generate post content using ForgeBot
    const bot = new ForgeBot();
    
    // Map DB product to ForgeBot Product interface
    const forgeProduct: ForgeProduct = {
      id: dbProduct.id,
      title: dbProduct.name,
      value_prop: dbProduct.description, // Fallback
      description: dbProduct.description,
      price: dbProduct.price_cents / 100,
      type: dbProduct.category_id || 'Digital Asset',
      features: dbProduct.features || [],
      slug: dbProduct.slug
    };

    const post = await bot.generatePost(forgeProduct);

    // 4. Send to Buffer
    let profileIds = [];
    if (isTest && testProfileId) {
      profileIds = [testProfileId];
    } else {
      const profiles = await getBufferProfiles(bufferToken);
      profileIds = profiles.map(p => p.id);
    }

    if (profileIds.length === 0) {
       return NextResponse.json({ 
        success: false, 
        message: 'No Buffer profiles connected.' 
      }, { status: 400 });
    }

    const result = await createBufferUpdate(
      bufferToken,
      profileIds,
      post.content,
      dbProduct.image_url ? { photo: `${process.env.NEXT_PUBLIC_SITE_URL}${dbProduct.image_url}` } : undefined
    );

    return NextResponse.json({
      success: true,
      message: 'Social post sent to Buffer successfully.',
      product: dbProduct.name,
      buffer_result: result
    });

  } catch (error: unknown) {
    console.error('Social Post Automation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
