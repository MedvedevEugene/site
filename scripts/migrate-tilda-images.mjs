#!/usr/bin/env node
/**
 * Downloads static.tildacdn.com assets into public/images/site/
 * and rewrites source files to use local /images/site/... paths.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/images/site");
const CDN = "https://static.tildacdn.com";

const SCAN_DIRS = ["lib", "app", "prisma", "components"];
const SCAN_EXT = new Set([".ts", ".tsx", ".js"]);

const urlRegex = /https:\/\/static\.tildacdn\.com\/[A-Za-z0-9_./%-]+/g;
const cdnTemplateRegex = /\$\{CDN\}\/([A-Za-z0-9_./%-]+)/g;

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === "node_modules" || name === ".next") continue;
      walk(full, files);
    } else if (SCAN_EXT.has(path.extname(name))) {
      files.push(full);
    }
  }
  return files;
}

function toLocalPath(relativePath) {
  const safe = relativePath.replace(/\//g, "__");
  return `/images/site/${safe}`;
}

function collectUrls(content) {
  const urls = new Set();
  for (const m of content.matchAll(urlRegex)) urls.add(m[0]);
  for (const m of content.matchAll(cdnTemplateRegex)) urls.add(`${CDN}/${m[1]}`);
  return urls;
}

async function download(url, dest) {
  if (fs.existsSync(dest)) return true;
  const res = await fetch(url);
  if (!res.ok) {
    console.error("FAIL", res.status, url);
    return false;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  return true;
}

function rewriteContent(content, mapping) {
  let out = content;
  for (const [url, local] of mapping) {
    out = out.split(url).join(local);
    const rel = url.replace(`${CDN}/`, "");
    out = out.split(`\${CDN}/${rel}`).join(local);
  }
  return out;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = SCAN_DIRS.flatMap((d) => walk(path.join(ROOT, d)));
  const allUrls = new Set();
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    for (const u of collectUrls(content)) allUrls.add(u);
  }

  console.log(`Found ${allUrls.size} unique Tilda URLs`);

  const mapping = new Map();
  for (const url of [...allUrls].sort()) {
    const rel = url.replace(`${CDN}/`, "");
    const local = toLocalPath(rel);
    const dest = path.join(ROOT, "public", local);
    const ok = await download(url, dest);
    if (ok) mapping.set(url, local);
  }

  let changedFiles = 0;
  for (const file of files) {
    const before = fs.readFileSync(file, "utf8");
    const after = rewriteContent(before, mapping);
    if (after !== before) {
      fs.writeFileSync(file, after);
      changedFiles++;
      console.log("updated", path.relative(ROOT, file));
    }
  }

  // Remove CDN constants if unused
  for (const dataFile of ["lib/site-data.ts", "lib/base-course-data.ts", "lib/business-course-data.ts"]) {
    const fp = path.join(ROOT, dataFile);
    if (!fs.existsSync(fp)) continue;
    let c = fs.readFileSync(fp, "utf8");
    const cleaned = c.replace(/^const CDN = "https:\/\/static\.tildacdn\.com";\n\n/m, "");
    if (cleaned !== c) {
      fs.writeFileSync(fp, cleaned);
      console.log("removed CDN const from", dataFile);
    }
  }

  console.log(`Done. ${mapping.size} images, ${changedFiles} files updated.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
