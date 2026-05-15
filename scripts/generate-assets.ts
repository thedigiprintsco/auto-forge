import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const productsPath = '/home/team/shared/initial-products.json';
const outputDir = '/home/team/shared/etherforge/public/downloads';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

async function generatePDF(product: any) {
  const fileName = `${product.title.toLowerCase().replace(/ /g, '-')}.pdf`;
  const filePath = path.join(outputDir, fileName);
  const doc = new PDFDocument({ margin: 50 });

  doc.pipe(fs.createWriteStream(filePath));

  // Header
  doc.fontSize(25).text('EtherForge', { align: 'center' });
  doc.moveDown();
  doc.fontSize(10).text('Building the Infrastructure of Digital Wealth', { align: 'center', oblique: true });
  doc.moveDown(2);

  // Title
  doc.fontSize(20).text(product.title, { underline: true });
  doc.moveDown();

  // Value Prop
  doc.fontSize(14).fillColor('gray').text(product.value_prop);
  doc.moveDown();

  // Description
  doc.fillColor('black').fontSize(12).text(product.description);
  doc.moveDown();

  // Features
  doc.fontSize(14).text('What\'s Included:', { underline: true });
  doc.moveDown(0.5);
  product.features.forEach((feature: string) => {
    doc.fontSize(12).text(`• ${feature}`);
  });
  doc.moveDown();

  // Specific content based on type
  if (product.type === 'notion') {
    doc.fontSize(14).text('Getting Started with Your Notion Template:', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text('1. Click the link below to open the template in Notion.');
    doc.text('2. Click "Duplicate" in the top right corner to add it to your workspace.');
    doc.text('3. Customize the views and properties to match your workflow.');
    doc.moveDown();
    doc.fillColor('blue').text('Access Your Template Here: https://notion.so/etherforge/placeholder-link', {
      link: 'https://notion.so/etherforge/placeholder-link',
      underline: true
    });
  } else if (product.type === 'prompts') {
    doc.fontSize(14).text('How to Use These Prompts:', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text('• Copy the prompts directly into your AI tool (GPT-4, Claude, Midjourney).');
    doc.text('• Replace [PLACEHOLDER] text with your specific business details.');
    doc.text('• Experiment with "Personas" to get varied outputs.');
    doc.moveDown();
    doc.text('Your prompt library is being prepared. Check your email for the full access link.');
  } else if (product.type === 'bundle') {
    doc.fontSize(14).text('Your Bundle Inventory:', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text('This bundle contains multiple assets. You can download each one from your EtherForge dashboard or use the master link below.');
    doc.moveDown();
    doc.fillColor('blue').text('Master Download Link: https://etherforge.ai/downloads/placeholder-bundle', {
      link: 'https://etherforge.ai/downloads/placeholder-bundle',
      underline: true
    });
  } else {
    doc.fontSize(14).text('Next Steps:', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text('Read through this guide to understand the core principles.');
    doc.text('Implement one strategy per week to avoid overwhelm.');
    doc.text('Join the EtherForge community for updates and support.');
  }

  doc.moveDown(3);
  doc.fillColor('gray').fontSize(10).text('© 2024 EtherForge. All rights reserved.', { align: 'center' });
  doc.text('Questions? Contact us at support@etherforge.ai', { align: 'center' });

  doc.end();
  console.log(`Generated: ${fileName}`);
}

async function run() {
  for (const product of products) {
    await generatePDF(product);
  }
  console.log('All fulfillment assets generated.');
}

run();
