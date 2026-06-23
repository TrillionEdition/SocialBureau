const sharp = require('sharp');
const path = require('path');

const dir = path.join(__dirname, '../public/assets/chocochi_Spinner');
const files = ['cafeLatte.webp', 'chocopayasam.webp'];

async function check() {
  for (const file of files) {
    const filePath = path.join(dir, file);
    const { data } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
    
    // Top-left pixel (0, 0)
    const r = data[0];
    const g = data[1];
    const b = data[2];
    
    console.log(`File: ${file}`);
    console.log(`- Top-left pixel color: RGB(${r}, ${g}, ${b})`);
  }
}

check().catch(console.error);
