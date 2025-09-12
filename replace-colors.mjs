import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function* walk(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const path = join(dir, file.name);
    if (file.isDirectory()) {
      yield* walk(path);
    } else {
      yield path;
    }
  }
}

async function replaceColors() {
  try {
    for await (const filePath of walk('.')) {
      if (filePath.endsWith('.tsx')) {
        const content = await readFile(filePath, 'utf8');
        const updatedContent = content
          .replace(/#2563EB/g, '#D4AF37')
          .replace(/#1E40AF/g, '#B69121');
        await writeFile(filePath, updatedContent);
      }
    }
    console.log('Color replacement completed successfully');
  } catch (error) {
    console.error('Error replacing colors:', error);
  }
}

replaceColors();