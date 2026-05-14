import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { generateSocialPost } from '@/lib/forge-bot';
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
    const product = products[Math.floor(Math.random() * products.length)];

    // 3. Generate post content
    // The existing generateSocialPost expects { title, value_prop }
    // Our product has { name, description }
    const postContent = await generateSocialPost({ 
      title: product.name, 
      value_prop: product.description 
    });

    // 4. Send to Buffer
    let profileIds = [];
    if (isTest && testProfileId) {
      profileIds = [testProfileId];
    } else {
      // In a real scenario, we might want to post to all connected profiles
      // or specific ones based on configuration.
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
      postContent,
      product.image_url ? { photo: `${process.env.NEXT_PUBLIC_SITE_URL}${product.image_url}` } : undefined
    );

    return NextResponse.json({
      success: true,
      message: 'Social post sent to Buffer successfully.',
      product: product.name,
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
