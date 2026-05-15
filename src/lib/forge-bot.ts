import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

import { getBufferProfiles, createBufferUpdate } from './buffer';

export interface Product {
  id?: string;
  title: string;
  value_prop: string;
  description: string;
  price: number;
  type: string;
  features: string[];
  slug?: string;
}

export interface SocialPost {
  platform: 'X' | 'LinkedIn' | 'TikTok';
  content: string;
  imageUrl?: string;
}

/**
 * The Forge Bot logic for autonomous marketing content generation.
 */
export class ForgeBot {
  private productsPath = '/home/team/shared/initial-products.json';
  private supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
  );
  
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'placeholder',
  });

  private anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || 'placeholder',
  });

  /**
   * Selects a random product from the available inventory.
   * Tries Supabase first, then falls back to JSON.
   */
  async selectProduct(): Promise<Product | null> {
    try {
      // 1. Try Supabase
      const { data, error } = await this.supabase
        .from('products')
        .select('*')
        .limit(20);

      if (!error && data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const item = data[randomIndex];
        
        // Map DB fields to Product interface
        return {
          id: item.id,
          title: item.name || item.title,
          value_prop: item.metadata?.value_prop || item.description,
          description: item.description,
          price: (item.price_cents || 0) / 100,
          type: item.type || item.category_id || 'Digital Asset',
          features: item.metadata?.features || item.features || [],
          slug: item.slug
        };
      }

      // 2. Fallback to JSON
      if (fs.existsSync(this.productsPath)) {
        const jsonData = fs.readFileSync(this.productsPath, 'utf8');
        const products: Product[] = JSON.parse(jsonData);
        const randomIndex = Math.floor(Math.random() * products.length);
        return products[randomIndex];
      }
      
      return null;
    } catch (error) {
      console.error('Error selecting product:', error);
      return null;
    }
  }

  /**
   * Generates a viral social media post using an LLM.
   */
  async generatePost(product: Product): Promise<SocialPost> {
    console.log(`Generating post for: ${product.title} (${product.type})`);
    
    const platforms: SocialPost['platform'][] = ['X', 'LinkedIn'];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    
    const utmParams = `utm_source=forge-bot&utm_medium=social&utm_campaign=daily-automation&utm_content=${product.type}`;
    const productUrl = `https://etherforge.ai/products/${product.slug || product.title.toLowerCase().replace(/ /g, '-')}`;
    const trackedUrl = `${productUrl}?${utmParams}`;

    let content = "";
    const prompt = `
      Write a viral ${platform} post for a digital product called "${product.title}".
      Value Proposition: ${product.value_prop}
      Description: ${product.description}
      Key Features: ${product.features.join(', ')}
      Target Audience: Entrepreneurs, AI enthusiasts, high-performers.
      Tone: Professional, ambitious, slightly industrial/tech-focused (EtherForge brand).
      Include the link: ${trackedUrl}
      
      Constraint: Max 280 characters for X, professional but engaging for LinkedIn.
      Do not use generic AI buzzwords. Focus on "Systems over Hustle" and "Autonomy".
    `;

    try {
      if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'placeholder') {
        const response = await this.openai.chat.completions.create({
          model: "gpt-4o",
          messages: [{ role: "user", content: prompt }],
        });
        content = response.choices?.[0]?.message?.content || "";
      } else if (process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY !== 'placeholder') {
        const response = await this.anthropic.messages.create({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 1024,
          messages: [{ role: "user", content: prompt }],
        });
        content = (response.content as any)?.[0]?.text || "";
      } else {
        // Mock fallback
        console.warn('AI API key missing, using template fallback.');
        if (platform === 'X') {
          content = `🚀 Just dropped: ${product.title}\n\n"${product.value_prop}"\n\nStop trading time for money. Start building assets. 🏗️\n\nCheck it out here: ${trackedUrl} #EtherForge #Autonomy`;
        } else {
          content = `Scaling a business is about systems, not hustle.\n\nWe just released ${product.title}, designed specifically to help you: \n${product.features.map(f => `• ${f}`).join('\n')}\n\nOutcome: ${product.value_prop}\n\nAvailable now at EtherForge: ${trackedUrl}`;
        }
      }
    } catch (err) {
      console.error('LLM generation failed, using mock.', err);
      content = `New at EtherForge: ${product.title}. ${product.value_prop}. Check it out: ${trackedUrl}`;
    }

    return { platform, content };
  }

  /**
   * Generates a visual asset for the post.
   */
  async generateImage(product: Product): Promise<string | undefined> {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'placeholder') {
      console.log('Skipping image generation: No API key.');
      return undefined;
    }

    try {
      const response = await this.openai.images.generate({
        model: "dall-e-3",
        prompt: `A professional, high-end promotional graphic for a digital product called "${product.title}". Aesthetic: Deep Space, Electric Blue, industrial minimalist. Theme: AI-powered autonomy and wealth creation. No text in the image. 4k resolution, cinematic lighting.`,
        n: 1,
        size: "1024x1024",
      });

      return response.data?.[0]?.url;
    } catch (err) {
      console.error('Image generation failed.', err);
      return undefined;
    }
  }

  /**
   * "Posts" the content to the designated platform.
   */
  async postContent(post: SocialPost): Promise<boolean> {
    console.log(`[FORGE BOT] Posting to ${post.platform}:`);
    console.log('-------------------');
    console.log(post.content);
    if (post.imageUrl) console.log(`Image URL: ${post.imageUrl}`);
    console.log('-------------------');
    
    // Integration with Buffer
    const bufferToken = process.env.BUFFER_PERSONAL_API_KEY;
    if (bufferToken && bufferToken !== 'placeholder') {
      try {
        console.log('Fetching Buffer profiles via GraphQL...');
        const profiles = await getBufferProfiles(bufferToken);
        const profileIds = profiles.map(p => p.id);
        
        if (profileIds.length > 0) {
          console.log(`Sending update to ${profileIds.length} profiles...`);
          await createBufferUpdate(
            bufferToken,
            profileIds,
            post.content,
            post.imageUrl ? { photo: post.imageUrl } : undefined
          );
          return true;
        } else {
          console.warn('No Buffer profiles found.');
        }
      } catch (err) {
        console.error('Buffer GraphQL posting failed:', err);
        return false;
      }
    }

    return true; // Mock success if no token
  }

  /**
   * Gets a fallback static background from the designer kit based on product type or specific title.
   */
  getStaticBackground(product: Product): string | undefined {
    // Specific high-res thumbnails from Designer
    const titleLower = product.title.toLowerCase();
    if (titleLower.includes('solopreneur os')) return '/solopreneur-os-thumb.png';
    if (titleLower.includes('ai marketing')) return '/ai-marketing-power-pack-thumb.png';
    if (titleLower.includes('adhd focus')) return '/adhd-focus-system-thumb.png';

    const mapping: Record<string, string> = {
      'notion': '/design/social-kit/notion-post-bg.png',
      'prompts': '/design/social-kit/ai-prompts-post-bg.png',
      'bundle': '/design/social-kit/bundle-post-bg.png',
      'pdf': '/design/social-kit/product-feature-card.png',
      'guide': '/design/social-kit/product-feature-card.png'
    };

    const path = mapping[product.type.toLowerCase()] || '/design/social-kit/product-feature-card.png';
    return path;
  }

  /**
   * Run the full autonomous cycle.
   */
  async runCycle() {
    const product = await this.selectProduct();
    if (!product) return { success: false, message: 'No product selected' };
    
    const post = await this.generatePost(product);
    
    // Try dynamic generation first
    post.imageUrl = await this.generateImage(product);
    
    // Fallback to static designer asset if dynamic fails or is skipped
    if (!post.imageUrl) {
      const staticPath = this.getStaticBackground(product);
      if (staticPath) {
        post.imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${staticPath}`;
      }
    }
    
    const posted = await this.postContent(post);
    
    return {
      success: posted,
      product: product.title,
      platform: post.platform,
      hasImage: !!post.imageUrl,
      isDynamic: !post.imageUrl?.includes('/design/social-kit/'),
      timestamp: new Date().toISOString()
    };
  }
}
