import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const productsPath = '/home/team/shared/initial-products.json';
const outputPath = 'scripts/deep-content.json';

async function generateDeepContent(product: any) {
  console.log(`Generating deep content for: ${product.title}...`);
  
  const prompt = `
    You are an expert digital product creator and consultant for a premium brand called "EtherForge".
    I need you to write a comprehensive, high-value guide for the following product:
    
    Product Title: ${product.title}
    Value Proposition: ${product.value_prop}
    Description: ${product.description}
    Features: ${product.features.join(', ')}
    Type: ${product.type}
    
    This guide will be the actual content of a PDF that customers pay $${product.price} for. 
    It must be extremely valuable, well-structured, and feel like a "masterclass" in a PDF.
    
    Structure the guide as follows:
    1. Introduction & The EtherForge Philosophy (Why this matters for digital wealth and autonomy).
    2. The Core Principles (The theoretical foundation).
    3. Step-by-Step Implementation Guide (How to actually use the product/template/prompts to get results).
    4. Advanced Strategies & Force Multipliers (How to take it to the next level).
    5. Case Study / Example (A realistic scenario of someone using this to succeed).
    6. Resources & Next Steps.
    
    Write at least 2000 words of high-quality, actionable content. Use clear headings, bullet points, and a professional yet empowering tone.
    
    Return the content as a JSON object with the following structure:
    {
      "title": "${product.title}",
      "sections": [
        { "heading": "...", "content": "..." },
        ...
      ]
    }
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a world-class digital product creator.' },
      { role: 'user', content: prompt }
    ],
    response_format: { type: 'json_object' }
  });

  const content = JSON.parse(response.choices[0].message.content || '{}');
  return content;
}

async function run() {
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  const deepContent: any[] = [];

  // To avoid hitting rate limits or taking too long, let's do them one by one
  for (const product of products) {
    try {
      const content = await generateDeepContent(product);
      deepContent.push(content);
      // Save progress
      fs.writeFileSync(outputPath, JSON.stringify(deepContent, null, 2));
    } catch (error) {
      console.error(`Error generating content for ${product.title}:`, error);
    }
  }

  console.log('All deep content generated and saved to deep-content.json');
}

run();
