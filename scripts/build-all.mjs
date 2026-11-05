// scripts/build-all.mjs
import {
  readdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
  rmSync,
  cpSync,
} from "node:fs";
import { execSync } from "node:child_process";
import { createHash } from "node:crypto";
import path from "node:path";

const BASE = process.env.SITE_BASE ?? ""; // '' for custom domain
const SKIP = new Set([
  "src",
  "public",
  "scripts",
  "dist",
  "node_modules",
  ".github",
  ".astro",
]);

// Vercel persists .vercel/cache between builds, so built decks are kept there
// and only rebuilt when their fingerprint changes.
const CACHE_DIR = path.join(".vercel", "cache", "slides");
const FINGERPRINT_FILE = ".fingerprint";
const NO_CACHE = process.env.SLIDES_NO_CACHE === "1";

// Files that don't affect the build output (mostly generated or OS junk).
const HASH_IGNORE = new Set([
  "node_modules",
  "dist",
  ".DS_Store",
  "components.d.ts",
  ".remote-assets",
  ".vite-inspect",
]);

// Inputs shared by every deck: changing any of these rebuilds all decks.
const GLOBAL_INPUTS = [
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "scripts/build-all.mjs",
];

const listFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true })
    .filter((e) => !HASH_IGNORE.has(e.name) && !e.name.endsWith(".local"))
    .flatMap((e) => {
      const p = path.join(dir, e.name);
      return e.isDirectory() ? listFiles(p) : [p];
    });

const globalHash = createHash("sha256");
globalHash.update(`node:${process.version}\0base:${BASE}\0`);
for (const f of GLOBAL_INPUTS.filter((f) => existsSync(f))) {
  globalHash.update(`${f}\0`).update(readFileSync(f)).update("\0");
}
const globalFingerprint = globalHash.digest("hex");

const fingerprint = (deck) => {
  const hash = createHash("sha256").update(globalFingerprint);
  for (const f of listFiles(deck).sort()) {
    hash.update(`${f.split(path.sep).join("/")}\0`).update(readFileSync(f));
    hash.update("\0");
  }
  return hash.digest("hex");
};

const talks = readdirSync(".", { withFileTypes: true })
  .filter(
    (e) => e.isDirectory() && !e.name.startsWith(".") && !SKIP.has(e.name),
  )
  .filter((e) => existsSync(path.join(e.name, "slides.md")));

let restored = 0;
for (const t of talks) {
  const out = path.join("dist", t.name);
  const cached = path.join(CACHE_DIR, t.name);
  const cachedFingerprintFile = path.join(cached, FINGERPRINT_FILE);
  const current = fingerprint(t.name);

  rmSync(out, { recursive: true, force: true });

  if (
    !NO_CACHE &&
    existsSync(cachedFingerprintFile) &&
    readFileSync(cachedFingerprintFile, "utf8") === current
  ) {
    console.log(`Restoring deck from cache: ${t.name}`);
    cpSync(cached, out, {
      recursive: true,
      filter: (src) => path.basename(src) !== FINGERPRINT_FILE,
    });
    restored++;
    continue;
  }

  console.log(`Building deck: ${t.name}`);
  execSync(
    `slidev build ${t.name}/slides.md --base ${BASE}/${t.name}/ --out ../dist/${t.name}`,
    { stdio: "inherit" },
  );

  rmSync(cached, { recursive: true, force: true });
  cpSync(out, cached, { recursive: true });
  writeFileSync(cachedFingerprintFile, current);
}

// Drop cache entries for decks that no longer exist.
if (existsSync(CACHE_DIR)) {
  const names = new Set(talks.map((t) => t.name));
  for (const e of readdirSync(CACHE_DIR)) {
    if (!names.has(e)) rmSync(path.join(CACHE_DIR, e), { recursive: true });
  }
}

console.log(
  `Done: ${talks.length - restored} built, ${restored} restored from cache.`,
);
