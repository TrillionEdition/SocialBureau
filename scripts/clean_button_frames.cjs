const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Disable sharp cache just in case
sharp.cache(false);

const dir = path.join(__dirname, '../public/assets/StartHuntButtonFrames');

async function cleanFrames() {
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.webp') && !f.includes('-test') && !f.includes('.tmp'));
  
  // Sort files numerically to keep order
  files.sort((a, b) => {
    const matchA = a.match(/\d+/);
    const matchB = b.match(/\d+/);
    const numA = matchA ? parseInt(matchA[0], 10) : 0;
    const numB = matchB ? parseInt(matchB[0], 10) : 0;
    return numA - numB;
  });

  console.log(`Found ${files.length} WebP frames to process.`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(dir, file);
    
    // Read file into memory buffer first to avoid file locking on Windows
    const fileBuffer = fs.readFileSync(filePath);
    const image = sharp(fileBuffer);
    const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    
    const width = info.width;
    const height = info.height;
    const outBuffer = Buffer.alloc(data.length);
    
    for (let j = 0; j < data.length; j += 4) {
      const r = data[j];
      const g = data[j+1];
      const b = data[j+2];
      const a = data[j+3];
      
      const isGrayscale = Math.abs(r - g) < 15 && Math.abs(g - b) < 15;
      const isBackground = r >= 135;
      
      outBuffer[j] = r;
      outBuffer[j+1] = g;
      outBuffer[j+2] = b;
      
      if (isGrayscale && isBackground) {
        outBuffer[j+3] = 0; // Make transparent
      } else {
        outBuffer[j+3] = a; // Keep original alpha
      }
    }
    
    // Save back to the same WebP file (overwrite is now safe since file is not locked)
    await sharp(outBuffer, { raw: { width, height, channels: 4 } })
      .webp({ quality: 82 })
      .toFile(filePath);
      
    if ((i + 1) % 10 === 0 || i === files.length - 1) {
      console.log(`Processed ${i + 1}/${files.length} frames.`);
    }
  }
  
  // Cleanup test files if any
  const testFile = path.join(dir, 'btn-frame-120-test.webp');
  if (fs.existsSync(testFile)) {
    fs.unlinkSync(testFile);
    console.log("Cleaned up test file.");
  }
  
  console.log("All frames processed successfully!");
}

cleanFrames().catch(console.error);
