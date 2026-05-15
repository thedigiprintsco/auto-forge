const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const outputDir = '/home/team/shared/etherforge/public/downloads';
const pdfPath = path.join(outputDir, 'ai-agency-starter-kit.pdf');
const zipPath = path.join(outputDir, 'ai-agency-starter-kit.zip');

if (!fs.existsSync(pdfPath)) {
    console.error('PDF not found:', pdfPath);
    process.exit(1);
}

const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', {
    zlib: { level: 9 }
});

output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err) {
    throw err;
});

archive.pipe(output);

archive.file(pdfPath, { name: 'WELCOME_GUIDE.pdf' });
archive.append('Use these templates to scale your operations.', { name: 'INSTRUCTIONS.txt' });
archive.append('Placeholder content for outreach template', { name: 'templates/outreach_v1.txt' });

archive.finalize();
