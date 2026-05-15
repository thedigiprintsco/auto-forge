import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const productsPath = '/home/team/shared/initial-products.json';
const outputDir = '/home/team/shared/etherforge/public/downloads';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

async function generateFulfillmentContent(product: any): Promise<string> {
  console.log(`Generating detailed content for: ${product.title}...`);
  
  const prompt = `
    You are the EtherForge Content Architect. 
    You are creating the actual fulfillment content for a digital product called "${product.title}".
    
    Value Proposition: ${product.value_prop}
    Description: ${product.description}
    Features: ${product.features.join(', ')}
    Type: ${product.type}
    
    Based on the product type and features, generate a high-value, professional 3-4 page document content.
    
    If it's a "prompts" pack, provide 30+ high-quality, complex prompts with explanations on how to use them.
    If it's a "guide" or "playbook", provide 5+ detailed chapters with actionable steps and "Forge Tips".
    If it's an "agency starter kit", provide 3 different outreach scripts, a 5-step roadmap, and a "Common Pitfalls" section.
    If it's a "notion" template, provide a detailed "Getting Started" guide, a 30-day implementation plan, and advanced workflow tips.
    
    EtherForge Tone: Sovereign, Direct, Systems-focused, Ambitious, Premium.
    
    Format the output as clear sections with headings (using # for H1, ## for H2, ### for H3). Do not include introductory conversational text.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return response.choices[0].message.content || "Content generation failed.";
  } catch (err) {
    console.error(`OpenAI failed for ${product.title}:`, err);
    return "Detailed content generation failed. Please contact support.";
  }
}

async function generateAdvancedPDF(product: any, content: string) {
  const fileName = `${product.title.toLowerCase().replace(/ /g, '-')}.pdf`;
  const filePath = path.join(outputDir, fileName);
  const doc = new PDFDocument({ margin: 50 });

  doc.pipe(fs.createWriteStream(filePath));

  // --- Header ---
  doc.fontSize(25).text('EtherForge', { align: 'right' });
  doc.fontSize(10).fillColor('gray').text('Building the Infrastructure of Digital Wealth', { align: 'right' });
  doc.moveDown(2);

  // --- Title & Metadata ---
  doc.fillColor('black').fontSize(24).text(product.title);
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor('gray').text(product.value_prop);
  doc.moveDown();
  
  doc.rect(50, doc.y, 500, 2).fill('#1e3a8a'); // Aesthetic blue line
  doc.moveDown(1.5);

  // --- AI Generated Content ---
  doc.fillColor('black').fontSize(11);
  
  // Simple markdown-ish parser for headers in the generated content
  const lines = content.split('\n');
  lines.forEach(line => {
    if (line.startsWith('### ')) {
      doc.moveDown();
      doc.fontSize(14).font('Helvetica-Bold').text(line.replace('### ', ''), { underline: true });
      doc.fontSize(11).font('Helvetica').moveDown(0.5);
    } else if (line.startsWith('## ')) {
      doc.moveDown();
      doc.fontSize(16).font('Helvetica-Bold').text(line.replace('## ', ''));
      doc.fontSize(11).font('Helvetica').moveDown(0.5);
    } else if (line.startsWith('# ')) {
      doc.moveDown();
      doc.fontSize(18).font('Helvetica-Bold').text(line.replace('# ', ''));
      doc.fontSize(11).font('Helvetica').moveDown(0.5);
    } else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      doc.text(`  • ${line.trim().substring(2)}`);
    } else {
      doc.text(line);
    }
  });

  // --- Footer ---
  const pageCount = doc.bufferedPageRange().count;
  doc.fontSize(10).fillColor('gray');
  
  // Add footer to all pages (this is a simplified way, for real multi-page we'd need more logic)
  doc.moveDown(2);
  doc.text('© 2024 EtherForge | Internal Fulfillment Asset', { align: 'center' });
  doc.text('Confidential & Licensed to Purchaser', { align: 'center' });

  doc.end();
  console.log(`Generated Advanced PDF: ${fileName}`);
}

async function run() {
  for (const product of products) {
    const fileName = `${product.title.toLowerCase().replace(/ /g, '-')}.pdf`;
    const filePath = path.join(outputDir, fileName);
    
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 5000) {
      console.log(`Skipping ${product.title}, already generated.`);
      continue;
    }

    const content = await generateFulfillmentContent(product);
    await generateAdvancedPDF(product, content);
    
    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  console.log('All advanced fulfillment assets generated.');
}

run();
