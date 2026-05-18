// scripts/build-all.mjs
import { readdirSync, existsSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';

const BASE = process.env.SITE_BASE ?? '';   // '' for custom domain
const SKIP = new Set(['src', 'public', 'scripts', 'dist', 'node_modules', '.github', '.astro']);

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

const routes = [
  ...talks.map(t => ({ src: `/${t.name}(/.*)?`, dest: `/${t.name}/index.html` })),
  { src: '/(.*)', dest: 'https://dbodky.me/speaking', status: 301 },
];
writeFileSync('dist/vercel.json', JSON.stringify({ routes }, null, 2) + '\n');
console.log('Written dist/vercel.json');
