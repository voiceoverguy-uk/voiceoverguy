import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = resolve(root, 'src/data/blog-posts.ts');
const exports = {};
const source = readFileSync(dataPath, 'utf8');
const code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText;
const require = id => {
  if (id === '@/lib/blogRating') {
    return { fromLegacyRating: value => value === '5' || value === '6' ? 'highest' : 'middle' };
  }
  if (id === '@/lib/slug') {
    return { getCleanSlug: value => String(value || '').toLowerCase().replace(/[^a-z0-9-]/g, '') };
  }
  throw new Error(`Unexpected import in blog data: ${id}`);
};
vm.runInNewContext(code, { exports, require }, { filename: dataPath });
const post = exports.default.find(item => item.url === 'worms-galactic-tactics-voiceover');

assert.ok(post, 'new WORMS announcement is available as a blog post');
assert.equal(exports.default.filter(item => item.url === post.url).length, 1, 'slug is unique');
assert.equal(post.video, 'UVcmBd7u6J0', 'announcement trailer is embedded');
assert.equal(post.whatVideo, '1', 'trailer uses the YouTube player');
assert.equal(post.image, 'worms-galactic-tactics.webp', 'uploaded game artwork is the primary image');
assert.equal(post.nimage1, 'worms-galactic-tactics-studio.webp', 'studio composite appears as a secondary image');
assert.equal(post.nalt1, 'Guy Harris performing in the studio alongside WORMS: Galactic Tactics game artwork.');
assert.equal(post.blogRating, 'highest', 'post is included in the public news index');
assert.ok(existsSync(resolve(root, 'public/assets/img/blog', post.image)));
assert.ok(existsSync(resolve(root, 'public/assets/img/blog', post.nimage1)));
assert.ok(readFileSync(resolve(root, 'public/sitemap.xml'), 'utf8').includes(
  'https://www.voiceoverguy.co.uk/worms-galactic-tactics-voiceover',
), 'new post is discoverable in the sitemap');

console.log('WORMS: Galactic Tactics blog post, trailer, images, news listing and sitemap checks passed.');
