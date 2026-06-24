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
    const { data } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
    
    // Top-left corner (0,0)
    const r = data[0];
    const g = data[1];
    const b = data[2];
    
    console.log(`${file}: Corner RGB(${r}, ${g}, ${b})`);
  }
}

check().catch(console.error);
