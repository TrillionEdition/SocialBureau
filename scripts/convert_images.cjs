const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = path.join(__dirname, '../public/assets/TreasureHunt');

// Check if sharp is installed, if not, install it
try {
  require.resolve('sharp');
} catch (e) {
  console.log('sharp not found. Installing sharp...');
  execSync('npm install sharp --no-save', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
}

const sharp = require('sharp');

async function run() {
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.png'));
  if (files.length === 0) {
    console.log('No PNG files found to convert.');
    return;
  }

  console.log(`Found ${files.length} PNG frames.`);

  // Natural sort by numeric value in the filename
  files.sort((a, b) => {
    const matchA = a.match(/\d+/);
    const matchB = b.match(/\d+/);
    const numA = matchA ? parseInt(matchA[0], 10) : 0;
    const numB = matchB ? parseInt(matchB[0], 10) : 0;
    return numA - numB;
  });

  // Sampling strategy: keep every 2nd frame (yielding 120 frames out of 240)
  const sampledFiles = [];
  const step = 2;
  for (let i = 0; i < files.length; i += step) {
    sampledFiles.push(files[i]);
  }

  console.log(`Sampling: keeping every ${step}nd frame. Total target frames: ${sampledFiles.length}`);

  // Convert to WebP
  for (let i = 0; i < sampledFiles.length; i++) {
    const file = sampledFiles[i];
    const srcPath = path.join(dir, file);
    
    // Format index as 3 digits, e.g., 001, 002
    const outputIndex = String(i + 1).padStart(3, '0');
    const destName = `frame-${outputIndex}.webp`;
    const destPath = path.join(dir, destName);

    console.log(`[${i + 1}/${sampledFiles.length}] Converting ${file} -> ${destName}`);
    
    await sharp(srcPath)
      .webp({ quality: 82 })
      .toFile(destPath);
  }

  console.log('Conversion to WebP completed.');

  // Delete original PNGs
  console.log('Cleaning up original PNG files...');
  let deletedCount = 0;
  for (const file of files) {
    const srcPath = path.join(dir, file);
    if (fs.existsSync(srcPath)) {
      fs.unlinkSync(srcPath);
      deletedCount++;
    }
  }
  console.log(`Cleanup completed: deleted ${deletedCount} PNG files.`);
}

run().catch(err => {
  console.error('Error during conversion:', err);
  process.exit(1);
});
