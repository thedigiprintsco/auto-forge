import { NextResponse } from 'next/server';
import { generateProduct } from '@/lib/ai-generator';
// import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const { niche, type } = await request.json();

    if (!niche || !type) {
      return NextResponse.json({ error: 'Niche and type are required' }, { status: 400 });
    }

    const product = await generateProduct(niche, type);

    // In a real implementation, we would save to Supabase here
    // const supabase = await createClient();
    // const { data, error } = await supabase.from('products').insert([product]).select();
    
    // For v1, we return the generated product so the user can review it.
    return NextResponse.json({ 
      success: true, 
      message: 'Product generated successfully (v1)',
      data: product 
    });
  } catch (error: unknown) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
