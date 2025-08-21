#!/usr/bin/env node

import sharp from 'sharp';
import { glob } from 'glob';
import { promises as fs } from 'fs';
import path from 'path';

const INPUT_DIR = 'images';
const OUTPUT_DIR = 'public/images';

// Ensure output directory exists
async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

// Optimize single image
async function optimizeImage(inputPath, outputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const baseName = path.basename(inputPath, ext);
  const outputDir = path.dirname(outputPath);

  await ensureDir(outputDir);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(
      `Processing: ${inputPath} (${metadata.width}x${metadata.height})`
    );

    // Generate WebP version
    await image
      .webp({ quality: 85, effort: 6 })
      .toFile(path.join(outputDir, `${baseName}.webp`));

    // Generate optimized JPEG/PNG fallback
    if (ext === '.jpg' || ext === '.jpeg') {
      await image
        .jpeg({ quality: 85, progressive: true })
        .toFile(path.join(outputDir, `${baseName}.jpg`));
    } else if (ext === '.png') {
      await image
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(path.join(outputDir, `${baseName}.png`));
    }

    // Generate responsive sizes for hero images
    if (baseName.includes('hero') || baseName.includes('cover')) {
      const sizes = [
        { width: 400, suffix: '-sm' },
        { width: 800, suffix: '-md' },
        { width: 1200, suffix: '-lg' },
        { width: 1600, suffix: '-xl' },
      ];

      for (const size of sizes) {
        if (metadata.width > size.width) {
          // WebP responsive
          await image
            .resize(size.width, null, { withoutEnlargement: true })
            .webp({ quality: 85, effort: 6 })
            .toFile(path.join(outputDir, `${baseName}${size.suffix}.webp`));

          // JPEG responsive
          await image
            .resize(size.width, null, { withoutEnlargement: true })
            .jpeg({ quality: 85, progressive: true })
            .toFile(path.join(outputDir, `${baseName}${size.suffix}.jpg`));
        }
      }
    }

    console.log(`✅ Optimized: ${baseName}`);
  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message);
  }
}

// Main function
async function main() {
  console.log('🖼️  Starting image optimization...\n');

  try {
    // Find all images
    const imageFiles = await glob(`${INPUT_DIR}/**/*.{jpg,jpeg,png,webp}`, {
      ignore: ['**/node_modules/**', '**/dist/**'],
    });

    if (imageFiles.length === 0) {
      console.log('No images found to optimize.');
      return;
    }

    console.log(`Found ${imageFiles.length} images to optimize:\n`);

    // Process each image
    for (const inputPath of imageFiles) {
      const relativePath = path.relative(INPUT_DIR, inputPath);
      const outputPath = path.join(OUTPUT_DIR, relativePath);

      await optimizeImage(inputPath, outputPath);
    }

    console.log('\n✅ Image optimization completed!');
    console.log(`\n📊 Summary:`);
    console.log(`- Processed: ${imageFiles.length} images`);
    console.log(`- Output directory: ${OUTPUT_DIR}`);
    console.log(`- Formats generated: WebP + original format`);
    console.log(`- Responsive sizes: Generated for hero images`);
  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { optimizeImage, main };
