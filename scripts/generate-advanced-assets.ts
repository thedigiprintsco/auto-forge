import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { ZipArchive } = require('archiver');

dotenv.config({ path: '.env.local' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const productsPath = '/home/team/shared/initial-products.json';
const outputDir = '/home/team/shared/etherforge/public/downloads';
const chartsDir = '/home/team/shared/design/fulfillment/charts';

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
    
    Generate high-value, professional 3-4 page document content.
    EtherForge Tone: Sovereign, Direct, Systems-focused, Ambitious, Premium.
    Format the output as clear sections with headings (# H1, ## H2, ### H3).
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
    return "Detailed content generation failed.";
  }
}

async function generateAdvancedPDF(product: any, content: string): Promise<string> {
  const fileName = `${product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`;
  const filePath = path.join(outputDir, fileName);
  const doc = new PDFDocument({ margin: 50 });
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);
  doc.fontSize(25).text('EtherForge', { align: 'right' });
  doc.fontSize(10).fillColor('gray').text('Building the Infrastructure of Digital Wealth', { align: 'right' });
  doc.moveDown(2);
  doc.fillColor('black').fontSize(24).text(product.title);
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor('gray').text(product.value_prop);
  doc.moveDown();
  doc.rect(50, doc.y, 500, 2).fill('#1e3a8a');
  doc.moveDown(1.5);
  doc.fillColor('black').fontSize(11);
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
    } else {
      doc.text(line);
    }
  });
  doc.moveDown(2);
  doc.fontSize(10).fillColor('gray');
  doc.text('© 2026 EtherForge | Internal Fulfillment Asset', { align: 'center' });
  doc.end();
  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
}

async function createZipBundle(product: any, pdfPath: string): Promise<string> {
  const slug = product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const zipName = `${slug}.zip`;
  const zipPath = path.join(outputDir, zipName);
  const output = fs.createWriteStream(zipPath);
  const archive = new ZipArchive({ zlib: { level: 9 } });
  return new Promise((resolve, reject) => {
    output.on('close', () => resolve(zipPath));
    archive.on('error', reject);
    archive.pipe(output);
    archive.file(pdfPath, { name: 'WELCOME_GUIDE.pdf' });
    
    // Add Charts if they exist
    const chartFile = `${slug}-flow.png`;
    const chartPath = path.join(chartsDir, chartFile);
    if (fs.existsSync(chartPath)) {
      archive.file(chartPath, { name: 'IMPLEMENTATION_FLOW.png' });
    }

    if (product.type === 'bundle' || product.type === 'prompts') {
      archive.append('Use these templates to scale your operations.', { name: 'INSTRUCTIONS.txt' });
    } else if (product.type === 'automation') {
      archive.append('Import these blueprints into Make.com or Zapier.', { name: 'AUTOMATION_README.txt' });
      archive.append('{"blueprint": "data"}', { name: 'blueprints/lead_gen.json' });
    }
    archive.finalize();
  });
}

async function run() {
  for (const product of products) {
    if (product.type === 'notion') continue;
    const slug = product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const isComplex = product.type === 'bundle' || product.type === 'automation' || product.type === 'prompts';
    const targetFile = isComplex ? `${slug}.zip` : `${slug}.pdf`;
    const targetPath = path.join(outputDir, targetFile);
    
    const content = await generateFulfillmentContent(product);
    const pdfPath = await generateAdvancedPDF(product, content);
    if (isComplex) await createZipBundle(product, pdfPath);
    console.log(`Generated: ${targetFile}`);
  }
  console.log('All fulfillment assets generated.');
}
run().catch(console.error);
