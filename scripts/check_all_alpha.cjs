const sharp = require('sharp');
const path = require('path');

const dir = path.join(__dirname, '../public/assets/chocochi_Spinner');
const files = [
  'DubaiKunafaCube.webp',
  'cafeLatte.webp',
  'cappuccino.webp',
  'chocolateLollipop.webp',
  'chocopayasam.webp',
  'hotChocolate.webp'
];

async function check() {
  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      const metadata = await sharp(filePath).metadata();
      console.log(`${file}: HasAlpha=${metadata.hasAlpha}, Channels=${metadata.channels}`);
    } catch (e) {
      console.error(`Error reading ${file}:`, e.message);
    }
  }
}

check().catch(console.error);
