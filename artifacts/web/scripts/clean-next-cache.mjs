import { rm } from 'node:fs/promises';

await rm(new URL('../.next', import.meta.url), {
  recursive: true,
  force: true,
});

console.log('Cleared generated Next.js development cache.');