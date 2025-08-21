#!/usr/bin/env node

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const LOGO_PATH = 'images/logo_profesorG.jpeg';
const OUTPUT_DIR = 'public';

// Favicon sizes to generate
const FAVICON_SIZES = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
];

// Ensure output directory exists
async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

// Generate favicon.ico
async function generateFavicoIco(logoPath, outputPath) {
  try {
    // Generate 32x32 PNG first
    const pngBuffer = await sharp(logoPath)
      .resize(32, 32, { fit: 'cover' })
      .png()
      .toBuffer();

    // For now, just copy as PNG (browsers support PNG favicons)
    await fs.writeFile(path.join(outputPath, 'favicon.ico'), pngBuffer);
    console.log('✅ Generated favicon.ico');
  } catch (error) {
    console.error('❌ Error generating favicon.ico:', error.message);
  }
}

// Generate individual favicon sizes
async function generateFavicon(logoPath, size, filename, outputPath) {
  try {
    await sharp(logoPath)
      .resize(size, size, {
        fit: 'cover',
        background: { r: 27, g: 42, b: 78, alpha: 1 }, // Primary color background
      })
      .png()
      .toFile(path.join(outputPath, filename));

    console.log(`✅ Generated ${filename} (${size}x${size})`);
  } catch (error) {
    console.error(`❌ Error generating ${filename}:`, error.message);
  }
}

// Main function
async function main() {
  console.log('🎨 Generating favicons...\n');

  try {
    // Check if logo exists
    await fs.access(LOGO_PATH);

    // Ensure output directory exists
    await ensureDir(OUTPUT_DIR);

    // Generate favicon.ico
    await generateFavicoIco(LOGO_PATH, OUTPUT_DIR);

    // Generate all favicon sizes
    for (const { size, name } of FAVICON_SIZES) {
      await generateFavicon(LOGO_PATH, size, name, OUTPUT_DIR);
    }

    console.log('\n✅ All favicons generated successfully!');
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);
    console.log('\n📋 Generated files:');
    console.log('- favicon.ico');
    FAVICON_SIZES.forEach(({ name }) => {
      console.log(`- ${name}`);
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`❌ Logo file not found: ${LOGO_PATH}`);
      console.log(
        'Please ensure the logo file exists before running this script.'
      );
    } else {
      console.error('❌ Error generating favicons:', error);
    }
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };
