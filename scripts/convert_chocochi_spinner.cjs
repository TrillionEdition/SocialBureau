const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '../public/assets/chocochi_Spinner');

const filesMap = {
  'DubaiKunafaCube.png': 'DubaiKunafaCube.webp',
  'cafeLatte.png': 'cafeLatte.webp',
  'cappuccino.png': 'cappuccino.webp',
  'chocolate Lolipop.png': 'chocolateLollipop.webp',
  'chocopayasam.png': 'chocopayasam.webp',
  'hotChocolate.png': 'hotChocolate.webp'
};

async function run() {
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    process.exit(1);
  }

  console.log(`Starting image conversion in: ${dir}`);

  for (const [pngName, webpName] of Object.entries(filesMap)) {
    const pngPath = path.join(dir, pngName);
    const webpPath = path.join(dir, webpName);

    if (fs.existsSync(pngPath)) {
      console.log(`Converting: ${pngName} -> ${webpName}...`);
      await sharp(pngPath)
        .webp({ quality: 85 })
        .toFile(webpPath);
      console.log(`Saved: ${webpName}`);
      
      // Delete original PNG file
      fs.unlinkSync(pngPath);
      console.log(`Deleted: ${pngName}`);
    } else {
      console.warn(`File not found, skipping: ${pngName}`);
    }
  }

  // Also clean up any other leftover PNG or existing files if needed.
  // The user specifically requested to remove the PNG images after creating the WebP.
  console.log('Conversion and cleanup completed successfully.');
}

run().catch(err => {
  console.error('Error during conversion:', err);
  process.exit(1);
});
