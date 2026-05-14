import { NextResponse } from 'next/server';
import { generateSocialPost } from '@/lib/forge-bot';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 1. Fetch products (from JSON for now, as DB might not be ready)
    const productsPath = path.join(process.cwd(), '../../initial-products.json');
    let products = [];
    
    if (fs.existsSync(productsPath)) {
      const data = fs.readFileSync(productsPath, 'utf8');
      products = JSON.parse(data);
    } else {
      // Fallback if file not found in build context
      console.error('initial-products.json not found at', productsPath);
      return NextResponse.json({ error: 'Initial products not found' }, { status: 500 });
    }

    if (products.length === 0) {
      return NextResponse.json({ error: 'No products available' }, { status: 404 });
    }

    // 2. Select a random product
    const product = products[Math.floor(Math.random() * products.length)];

    // 3. Generate post
    const postContent = await generateSocialPost(product);

    // 4. Mock "Posting" Action
    console.log('--- FORGE BOT TRIGGERED ---');
    console.log(`Product: ${product.title}`);
    console.log(`Generated Post:\n${postContent}`);
    console.log('---------------------------');

    // 5. Response
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      triggered_by: 'cron',
      product: product.title,
      generated_post: postContent,
      action: 'mock_posted'
    });
  } catch (error: unknown) {
    console.error('Forge Bot error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
