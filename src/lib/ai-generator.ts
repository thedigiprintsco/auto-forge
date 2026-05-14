import { z } from 'zod';
import OpenAI from 'openai';

const ProductSchema = z.object({
  title: z.string(),
  value_prop: z.string(),
  description: z.string(),
  price: z.number(),
  type: z.enum(['notion', 'prompts', 'bundle', 'guide']),
  features: z.array(z.string()),
  content_preview: z.object({
    structure: z.array(z.string()).optional(),
    sample_content: z.string().optional(),
  }),
  seo_metadata: z.object({
    keywords: z.array(z.string()),
    meta_description: z.string(),
  }),
});

export type GeneratedProduct = z.infer<typeof ProductSchema>;

export async function generateProduct(niche: string, type: string): Promise<GeneratedProduct> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn('AI API key missing, using mock generation.');
    return mockGenerateProduct(niche, type);
  }

  const openai = new OpenAI({ apiKey });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are the EtherForge Product Architect. 
          Your goal is to design a high-margin digital product for a specific niche.
          
          EtherForge Brand Guidelines:
          - Aesthetic: Premium, Modern, Professional, Tech-forward.
          - Philosophy: Systems over Hustle, AI-powered Autonomy.
          - Tone: Sovereign, Direct, Insightful.
          
          Format your response as a JSON object that matches the following schema:
          {
            "title": "Clear, punchy name",
            "value_prop": "One sentence benefit",
            "description": "Engaging product description (2-3 paragraphs)",
            "price": number (fair price between 19 and 97),
            "type": "notion" | "prompts" | "bundle" | "guide",
            "features": ["feature 1", "feature 2", "feature 3", "feature 4"],
            "content_preview": {
              "structure": ["module 1", "module 2", "module 3"],
              "sample_content": "A short excerpt or description of the actual value provided"
            },
            "seo_metadata": {
              "keywords": ["keyword1", "keyword2"],
              "meta_description": "Compelling meta description"
            }
          }`
        },
        {
          role: 'user',
          content: `Generate a ${type} product for the following niche: ${niche}`
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('Empty response from AI');
    
    const parsed = JSON.parse(content);
    return ProductSchema.parse(parsed);
  } catch (error) {
    console.error('AI Generation failed, falling back to mock:', error);
    return mockGenerateProduct(niche, type);
  }
}

function mockGenerateProduct(niche: string, type: string): GeneratedProduct {
  const data = {
    title: `Premium ${niche} ${type}`,
    value_prop: `The ultimate solution for ${niche} professionals.`,
    description: `This high-margin ${type} is designed to solve the core challenges of ${niche} by leveraging AI-powered autonomy.`,
    price: 47.00,
    type: type as 'notion' | 'prompts' | 'bundle' | 'guide',
    features: [
      "Customizable Dashboard",
      "AI-Automated Workflows",
      "Priority Support"
    ],
    content_preview: {
      structure: ["Setup Guide", "Main Database", "Resources"],
      sample_content: "Welcome to your new autonomous workflow..."
    },
    seo_metadata: {
      keywords: [niche, type, "automation", "EtherForge"],
      meta_description: `Get the best ${niche} ${type} at EtherForge.`
    }
  };
  return ProductSchema.parse(data);
}
