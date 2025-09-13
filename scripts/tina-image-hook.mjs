#!/usr/bin/env node

/**
 * Tina CMS Image Upload Hook
 * Automatically optimizes images when uploaded through Tina CMS
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];
const PUBLIC_DIR = 'public';
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

/**
 * Check if a file is an image
 */
function isImageFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return SUPPORTED_FORMATS.includes(ext);
}

/**
 * Optimize a single image
 */
function optimizeImage(imagePath) {
  try {
    console.log(`🖼️  Optimizing image: ${imagePath}`);
    
    // Run the existing image optimization script
    execSync('npm run optimize:images', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log(`✅ Image optimization complete`);
  } catch (error) {
    console.error(`❌ Error optimizing image: ${error.message}`);
  }
}

/**
 * Validate image file
 */
function validateImage(imagePath) {
  const stats = fs.statSync(imagePath);
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (stats.size > maxSize) {
    throw new Error(`Image file too large: ${(stats.size / 1024 / 1024).toFixed(2)}MB (max: 10MB)`);
  }
  
  if (!isImageFile(imagePath)) {
    throw new Error(`Unsupported file format: ${path.extname(imagePath)}`);
  }
  
  return true;
}

/**
 * Process uploaded image
 */
function processUploadedImage(imagePath) {
  try {
    // Validate the image
    validateImage(imagePath);
    
    // Optimize the image
    optimizeImage(imagePath);
    
    console.log(`🎉 Successfully processed: ${imagePath}`);
  } catch (error) {
    console.error(`❌ Failed to process image: ${error.message}`);
    throw error;
  }
}

// If called directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  const imagePath = process.argv[2];
  
  if (!imagePath) {
    console.error('Usage: node tina-image-hook.mjs <image-path>');
    process.exit(1);
  }
  
  processUploadedImage(imagePath);
}

export { processUploadedImage, validateImage, optimizeImage };
