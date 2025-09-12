const fs = require('fs');
const path = require('path');

function deleteMapFiles(dir) {
  try {
    if (!fs.existsSync(dir)) {
      console.log(`Directory ${dir} does not exist`);
      return;
    }

    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursively search subdirectories
        deleteMapFiles(fullPath);
      } else if (stat.isFile() && item.endsWith('.map')) {
        // Delete .map files
        fs.unlinkSync(fullPath);
        console.log(`Deleted: ${fullPath}`);
      }
    }
  } catch (error) {
    console.error(`Error processing ${dir}:`, error.message);
  }
}

// Delete .map files in .next directory
deleteMapFiles('.next');
console.log('Cleanup complete');