#!/usr/bin/env node
import { mkdir, rename, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';

const moves = [
  // Menu food carousel (also referenced by hero)
  ['public/6.jpg', 'public/images/food/food-carousel-01.jpg'],
  ['public/7.jpg', 'public/images/food/food-carousel-02.jpg'],
  ['public/8.jpg', 'public/images/food/food-carousel-03.jpg'],
  ['public/9.jpg', 'public/images/food/food-carousel-04.jpg'],
  ['public/10.jpg', 'public/images/food/food-carousel-05.jpg'],
  ['public/11.jpg', 'public/images/food/food-carousel-06.jpg'],
  ['public/12.jpg', 'public/images/food/food-carousel-07.jpg'],
  ['public/13.jpg', 'public/images/food/food-carousel-08.jpg'],
  // Aircraft
  ['public/Plane_1.png', 'public/images/aircraft/aircraft-jet-exterior-01.png'],
  ['public/Plane_2.png', 'public/images/aircraft/aircraft-jet-exterior-02.png'],
  ['public/Plane_3.png', 'public/images/aircraft/aircraft-jet-exterior-03.png'],
  ['public/Plane_4.png', 'public/images/aircraft/aircraft-jet-interior-01.png'],
  ['public/Plane_5.png', 'public/images/aircraft/aircraft-jet-interior-02.png'],
  // Logos
  ['public/AtkinsCatering_Logo_V4.png', 'public/images/hero/logos/atikis-logo-primary.png'],
  ['public/AtkinsCatering_Logo_V3.png', 'public/images/hero/logos/atikis-logo-alt.png'],
  // Backgrounds
  ['public/Untitled design (10).png', 'public/images/backgrounds/bg-wheels-up-01.png'],
  ['public/Untitled design (11).png', 'public/images/backgrounds/bg-wheels-up-02.png'],
  ['public/Untitled design (12).png', 'public/images/backgrounds/bg-wheels-up-03.png'],
  ['public/Untitled design (9).png', 'public/images/backgrounds/bg-wheels-up-04.png'],
  // Seasonal
  ['public/Fall.png', 'public/images/seasonal/seasonal-fall.png'],
  ['public/Winter.png', 'public/images/seasonal/seasonal-winter.png'],
  ['public/Spring.png', 'public/images/seasonal/seasonal-spring.png'],
  ['public/Summer.png', 'public/images/seasonal/seasonal-summer.png'],
  // Duplicate to remove (handled separately)
];

async function ensureDir(path) {
  if (!existsSync(path)) {
    await mkdir(path, { recursive: true });
  }
}

async function moveFile(from, to) {
  const toDir = dirname(to);
  await ensureDir(toDir);
  try {
    await rename(from, to);
    console.log(`Moved: ${from} -> ${to}`);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.warn(`Skip (missing): ${from}`);
    } else {
      console.error(`Error moving ${from} -> ${to}:`, e.message);
    }
  }
}

async function main() {
  // Create base folders
  await ensureDir('public/images/hero/logos');
  await ensureDir('public/images/food');
  await ensureDir('public/images/aircraft');
  await ensureDir('public/images/backgrounds');
  await ensureDir('public/images/seasonal');

  for (const [from, to] of moves) {
    await moveFile(from, to);
  }

  // Delete duplicate logo if exists
  try {
    const dup = 'public/AtkinsCatering_Logo_V3 (1).png';
    await stat(dup);
    console.log('Duplicate detected, please remove manually:', dup);
  } catch {}

  console.log('Migration script completed. Update your code imports to new /images/... paths.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

