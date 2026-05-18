// scripts/build-all.mjs
import { readdirSync, statSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';

const BASE = process.env.SITE_BASE ?? '';   // '' for custom domain
const SKIP = new Set(['src', 'public', 'scripts', 'dist', 'node_modules', '.github', '.astro']);

console.log('Building landing page…');
execSync('astro build', { stdio: 'inherit' });

const talks = readdirSync('.', { withFileTypes: true })
  .filter(e => e.isDirectory() && !e.name.startsWith('.') && !SKIP.has(e.name))
  .filter(e => existsSync(path.join(e.name, 'slides.md')));

for (const t of talks) {
  console.log(`Building deck: ${t.name}`);
  execSync(
    `slidev build ${t.name}/slides.md --base ${BASE}/${t.name}/ --out ../dist/${t.name}`,
    { stdio: 'inherit' },
  );
}
