const sharp = require('sharp');
const fs = require('fs');
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

async function removeBackground(file) {
  const filePath = path.join(dir, file);
  const tempPath = path.join(dir, `temp_${file}`);

  console.log(`Processing: ${file}`);

  // Read file into buffer to prevent EBUSY lock issues
  const fileBuffer = fs.readFileSync(filePath);

  // Load raw pixels with an alpha channel
  const { data, info } = await sharp(fileBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Corner pixel color to key out (top-left)
  const bgR = data[0];
  const bgG = data[1];
  const bgB = data[2];

  console.log(`- Detected background key: RGB(${bgR}, ${bgG}, ${bgB})`);

  // Helper to check if pixel color is close to background key
  // We use Euclidean distance threshold (adjusted per image for best results)
  let thresholdSq = 35 * 35; // default threshold (35)
  
  // Custom thresholds for tricky images
  if (file === 'cafeLatte.webp') {
    thresholdSq = 45 * 45; // slightly higher tolerance for latte shadows
  } else if (file === 'chocopayasam.webp') {
    thresholdSq = 40 * 40;
  } else if (file === 'hotChocolate.webp') {
    thresholdSq = 45 * 45;
  }

  const isBgColor = (x, y) => {
    const idx = (y * width + x) * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    const distSq = (r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2;
    return distSq <= thresholdSq;
  };

  const pushPixel = (x, y) => {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const idx = y * width + x;
      if (!visited[idx] && isBgColor(x, y)) {
        visited[idx] = 1;
        queue.push((y << 16) | x);
        
        // Make this pixel transparent
        const dataIdx = idx * 4;
        data[dataIdx + 3] = 0;
      }
    }
  };

  // Initialize queue with all border pixels
  for (let x = 0; x < width; x++) {
    pushPixel(x, 0);
    pushPixel(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    pushPixel(0, y);
    pushPixel(width - 1, y);
  }

  // Flood fill BFS
  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr & 0xffff;
    const cy = curr >> 16;

    pushPixel(cx - 1, cy);
    pushPixel(cx + 1, cy);
    pushPixel(cx, cy - 1);
    pushPixel(cx, cy + 1);
  }

  // Save the modified transparent image
  await sharp(data, { raw: { width, height, channels: 4 } })
    .webp({ quality: 90 })
    .toFile(tempPath);

  // Replace original file with the transparent WebP
  fs.unlinkSync(filePath);
  fs.renameSync(tempPath, filePath);
  console.log(`- Successfully removed background for ${file}`);
}

async function run() {
  for (const file of files) {
    try {
      await removeBackground(file);
    } catch (e) {
      console.error(`Failed to process ${file}:`, e);
    }
  }
  console.log('All backgrounds processed successfully!');
}

run().catch(console.error);
