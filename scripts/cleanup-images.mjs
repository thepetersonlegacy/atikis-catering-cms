import { readdir, unlink, stat } from 'fs/promises';
import { join } from 'path';

async function cleanupImages() {
  try {
    const publicDir = 'public';
    const files = await readdir(publicDir);
    
    for (const file of files) {
      const filePath = join(publicDir, file);
      
      try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
          // Check if file is an image with "copy" or "Copy" in the name
          if ((file.endsWith('.jpg') || file.endsWith('.png')) && 
              (file.includes('copy') || file.includes('Copy'))) {
            await unlink(filePath);
            console.log(`Removed: ${filePath}`);
          }
        }
      } catch (err) {
        // File might not exist or be accessible, skip it
        console.log(`Skipped: ${filePath} (${err.message})`);
      }
    }
    
    console.log('Cleanup completed successfully');
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}

cleanupImages();