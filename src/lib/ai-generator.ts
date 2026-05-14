import { z } from 'zod';

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
  const apiKey = process.env.CLAUDE_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn('AI API key missing, using mock generation.');
    return mockGenerateProduct(niche, type);
  }

  // Implementation for Claude/OpenAI would go here.
  // For v1, we focus on the structure and the mock capability.
  // This will be replaced with a real fetch call in v1.1
  return mockGenerateProduct(niche, type);
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
