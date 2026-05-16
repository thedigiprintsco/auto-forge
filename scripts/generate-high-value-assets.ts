import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const contentPath = 'scripts/deep-content.json';
const outputDir = '/home/team/shared/etherforge/public/downloads';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generatePDF(product: any) {
  const fileName = `${product.title.toLowerCase().replace(/ /g, '-').replace(/[’'’]/g, '')}.pdf`;
  const filePath = path.join(outputDir, fileName);
  const doc = new PDFDocument({ 
    margin: 50,
    size: 'A4',
    info: {
      Title: product.title,
      Author: 'EtherForge',
    }
  });

  doc.pipe(fs.createWriteStream(filePath));

  // Helper for footer
  const addFooter = () => {
    const bottom = doc.page.height - 50;
    doc.fontSize(10).fillColor('gray').text('© 2024 EtherForge | Building the Infrastructure of Digital Wealth', 50, bottom, { align: 'center' });
  };

  // Cover Page
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0a0a0a');
  doc.fillColor('white').fontSize(40).text('ETHERFORGE', 50, 200, { align: 'center', characterSpacing: 5 });
  doc.moveDown();
  doc.fontSize(20).text('SYSTEMS FOR AUTONOMY', { align: 'center', characterSpacing: 2 });
  doc.moveDown(4);
  doc.fontSize(30).fillColor('#3b82f6').text(product.title, { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).fillColor('white').text('Professional Digital Asset & Implementation Guide', { align: 'center' });
  
  doc.addPage();
  addFooter();

  // Content
  let y = 50;
  product.sections.forEach((section: any, index: number) => {
    // Check if we need a new page for the heading
    if (doc.y > doc.page.height - 150) {
      doc.addPage();
      addFooter();
    }

    doc.fillColor('#3b82f6').fontSize(18).text(section.heading, { underline: true });
    doc.moveDown();
    doc.fillColor('black').fontSize(12).text(section.content, {
      align: 'justify',
      lineGap: 5
    });
    doc.moveDown(2);
  });

  doc.end();
  console.log(`Generated High-Value PDF: ${fileName}`);
}

async function run() {
  if (!fs.existsSync(contentPath)) {
    console.error('Deep content file not found. Run generate-product-content.ts first.');
    return;
  }

  const products = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
  for (const product of products) {
    await generatePDF(product);
  }
  console.log('All high-value fulfillment assets generated.');
}

run();
