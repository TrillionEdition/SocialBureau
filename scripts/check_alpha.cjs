const sharp = require('sharp');
const path = require('path');

const dir = path.join(__dirname, '../public/assets/chocochi_Spinner');
const files = ['cafeLatte.webp', 'chocopayasam.webp'];

async function check() {
  for (const file of files) {
    const filePath = path.join(dir, file);
    const metadata = await sharp(filePath).metadata();
    console.log(`File: ${file}`);
    console.log(`- Format: ${metadata.format}`);
    console.log(`- Width: ${metadata.width}, Height: ${metadata.height}`);
    console.log(`- Channels: ${metadata.channels}`);
    console.log(`- Has alpha (transparency) channel: ${metadata.hasAlpha}`);
  }
}

check().catch(console.error);
