import { exec } from 'child_process';
import { promisify } from 'util';
import { readdir } from 'fs/promises';
import { join } from 'path';

const execAsync = promisify(exec);

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(p);
    } else {
      yield p;
    }
  }
}

async function createWebPVersions() {
  const optimizedDir = 'public/optimized';

  let count = 0;
  for await (const filePath of walk(optimizedDir)) {
    if (!filePath.toLowerCase().endsWith('.jpg')) continue;
    const outputPath = filePath.replace(/\.jpg$/i, '.webp');
    try {
      const command = `sips -s format webp "${filePath}" --out "${outputPath}"`;
      await execAsync(command);
      console.log(`  ✓ ${filePath} → ${outputPath}`);
      count++;
    } catch (error) {
      console.log(`  ⚠ Failed to convert ${filePath}: ${error.message}`);
    }
  }
  console.log(`✅ WebP conversion completed (${count} files).`);
}

createWebPVersions();
