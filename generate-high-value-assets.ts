import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateContent(prompt: string, systemPrompt: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7,
  });
  return response.choices[0].message.content || '';
}

async function run() {
  const { data: products, error } = await supabase.from('products').select('*');
  if (error || !products) {
    console.error('Error fetching products:', error);
    return;
  }

  for (const product of products) {
    console.log(`\n=== Generating high-value assets for: ${product.name} (${product.slug}) ===`);
    
    const baseDir = path.join(process.cwd(), 'public', 'downloads', product.slug);
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }

    // 1. Generate Implementation Roadmap (Iterative)
    console.log('Generating Implementation Roadmap (Section by Section)...');
    const roadmapSections = [
      "Executive Summary & Core Philosophy (Aim for 1000 words)",
      "Phase 1: Foundation & Setup (Aim for 1500 words)",
      "Phase 2: Core Workflow Implementation (Aim for 1500 words)",
      "Phase 3: AI Integration & Automation (Aim for 1500 words)",
      "Phase 4: Scaling & Optimization (Aim for 1500 words)",
      "Troubleshooting, FAQ & Long-term Maintenance (Aim for 1000 words)"
    ];
    
    let fullRoadmap = `# ${product.name}: Official Implementation Roadmap\n\n`;
    
    for (const sectionTitle of roadmapSections) {
      console.log(`  - Generating section: ${sectionTitle}`);
      const sectionContent = await generateContent(
        `Write a detailed section for the implementation roadmap of "${product.name}".
        Product Description: ${product.description}
        Section to write: ${sectionTitle}
        
        Requirements:
        - Use professional, premium, and sovereign tone.
        - Be extremely specific and actionable.
        - Use Markdown formatting.
        - Ensure this section is very long and detailed.`,
        "You are the Lead Systems Architect at EtherForge. You build high-margin digital products for sovereign individuals."
      );
      fullRoadmap += `\n\n## ${sectionTitle}\n\n${sectionContent}\n`;
    }
    fs.writeFileSync(path.join(baseDir, 'roadmap.md'), fullRoadmap);

    // 2. Generate Prompt Library (Iterative)
    console.log('Generating Prompt Library (In Batches)...');
    let fullPromptLibrary = `# ${product.name}: Expert Prompt Library\n\nThis library contains 50+ hyper-engineered prompts to maximize your productivity with this system.\n\n`;
    
    for (let i = 0; i < 5; i++) {
      console.log(`  - Generating prompt batch ${i + 1}/5`);
      const batchContent = await generateContent(
        `Create 10 hyper-engineered LLM prompts for "${product.name}".
        Each prompt should include:
        - Title
        - Context & Goal
        - The Prompt Content (using [VARIABLES])
        - How to use it
        
        Ensure these are multi-step, complex prompts that provide immense value.
        Batch: ${i + 1} (Prompts ${i * 10 + 1} to ${(i + 1) * 10})`,
        "You are a Senior Prompt Engineer specialized in AI-powered business autonomy."
      );
      fullPromptLibrary += `\n\n${batchContent}\n`;
    }
    fs.writeFileSync(path.join(baseDir, 'prompt-library.md'), fullPromptLibrary);

    // 3. Generate Automation Blueprints
    console.log('Generating Automation Blueprints...');
    const blueprints = await generateContent(
      `Generate 5 detailed Make.com/Zapier blueprint concepts for "${product.name}".
      Provide them in a structured JSON-like format within Markdown.
      Include:
      - Automation Name
      - ROI Potential
      - Trigger & Action steps
      - Export-ready Blueprint Logic (mocked JSON)`,
      "You are an Automation Specialist at EtherForge."
    );
    fs.writeFileSync(path.join(baseDir, 'automations.md'), blueprints); // Changed to .md for better readability in package

    // 4. Create ZIP
    console.log('Creating ZIP archive...');
    const zipName = `${product.slug}.zip`;
    const zipPath = path.join(process.cwd(), 'public', 'downloads', zipName);
    
    if (fs.existsSync(zipPath)) {
      fs.unlinkSync(zipPath);
    }

    try {
      execSync(`cd public/downloads && zip -r ${zipName} ${product.slug}`);
      console.log(`ZIP created: ${zipPath}`);
    } catch (e) {
      console.error('Failed to create ZIP:', e);
    }

    // 5. Update Supabase
    console.log('Updating Supabase record...');
    const { error: updateError } = await supabase
      .from('products')
      .update({ 
        download_url: `/downloads/${zipName}`,
        type: 'bundle' 
      })
      .eq('id', product.id);
    
    if (updateError) {
      console.error('Update error:', updateError);
    } else {
      console.log('Product updated successfully.');
    }
  }
}

run();
