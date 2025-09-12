import { exec } from 'child_process';
import { promisify } from 'util';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, dirname, relative } from 'path';

const execAsync = promisify(exec);

const BREAKPOINTS = [
  { suffix: 'mobile', width: 640, quality: 80 },
  { suffix: 'tablet', width: 1024, quality: 85 },
  { suffix: 'desktop', width: 1920, quality: 90 }
];

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

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

async function optimizeImage(inputPath, outputPathBase) {
  console.log(`Optimizing ${relative(process.cwd(), inputPath)} → ${relative(process.cwd(), dirname(outputPathBase))}`);
  for (const bp of BREAKPOINTS) {
    const outputPath = `${outputPathBase}_${bp.suffix}.jpg`;
    try {
      const command = `sips -Z ${bp.width} "${inputPath}" --out "${outputPath}" --setProperty format jpeg --setProperty formatOptions ${bp.quality}`;
      await execAsync(command);
      console.log(`  ✓ ${bp.suffix} (${bp.width}px)`);
    } catch (error) {
      console.error(`  ✗ ${bp.suffix} failed:`, error.message);
    }
  }
}

async function optimizeAllImages() {
  const publicDir = 'public';
  const outputRoot = 'public/optimized';

  let count = 0;
  for await (const filePath of walk(join(publicDir, 'images'))) {
    const lower = filePath.toLowerCase();
    if (!(lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png'))) continue;
    try {
      const stats = await stat(filePath);
      if (stats.size <= 500 * 1024) continue; // Only optimize >500KB
      const rel = relative(publicDir, filePath).replace(/\.(jpg|jpeg|png)$/i, '');
      const outputBase = join(outputRoot, rel);
      await ensureDir(dirname(outputBase));
      await optimizeImage(filePath, outputBase);
      count++;
    } catch (err) {
      console.log(`Skipped: ${filePath} (${err.message})`);
    }
  }
  console.log(`\n✅ Optimization complete. Processed ${count} large images under public/images.`);
}

optimizeAllImages().catch((e) => {
  console.error('❌ Error during optimization:', e);
  process.exit(1);
});
