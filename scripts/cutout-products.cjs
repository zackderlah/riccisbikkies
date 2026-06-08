/*
 * One-off image processor: downloads each product image, detects whether it sits
 * on a near-uniform light/studio background, and if so flood-fills that background
 * to transparent, writing a PNG to public/products/<id>.png.
 *
 * Lifestyle photos (brick wall, kitchen scene, etc.) have non-uniform borders and
 * are left untouched (kept as remote Wix URLs).
 *
 * Run: node scripts/cutout-products.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const PRODUCTS_TS = path.join(ROOT, "src", "data", "products.ts");
const OUT_DIR = path.join(ROOT, "public", "products");

// Explicit map of products with light/studio backgrounds to their original Wix
// source files. We fetch with `fit` (not `fill`) so the FULL composition is kept
// (no cropping of edge products) before removing the background.
const CUTOUT_SOURCES = {
  "crispy-chilli-candied-garlic-3-pack":
    "11d54a_1ab5a30cee8b44809892abc4f4cb1b10~mv2.jpg",
  "sauces-wasabi-trio": "11d54a_ee076de2b6b74a098ebbd673698aa7b4~mv2.png",
  "pita-bits-chilli-cheese": "11d54a_3e222ebfe44e4b51adb8d53d1f25a6cb~mv2.png",
  "pita-bits-mediterranean": "11d54a_c39c5cb9bb45436e9bcc8fedaf90eb1d~mv2.png",
  "pita-bits-chipotle-cheese": "11d54a_19018e6421634a5e8c6fc846d15004a1~mv2.jpg",
  "baker-ricci-cinnamon-croissant-bites":
    "11d54a_c8f4c4a4fabe44ebac36d628ffb4d6c8~mv2.jpg",
  "palmiettes-espresso": "11d54a_a57815214c38405285966e6f8ff6bc61~mv2.jpg",
  "four-pillars-gin-cracker": "11d54a_15b181d0e0194f8eb10b4c452cab9f0a~mv2.jpg",
  "palmiettes-french-onion-tarragon":
    "11d54a_a6f9438f06aa4e3789b44bb9a20713be~mv2.jpg",
  "palmiettes-aged-parmesan": "11d54a_edfd84a1cce94f68ab80ffddd1f3ec3b~mv2.jpg",
  "palmiettes-cinnamon": "11d54a_01e87540f7c84c3ca59e8ad991e173ce~mv2.jpg",
};

function parseProducts() {
  // `fit` preserves the whole image (letterboxed) instead of cropping to the box.
  const wixFit = (file) =>
    `https://static.wixstatic.com/media/${file}/v1/fit/w_1400,h_1400,al_c,q_90,enc_auto/${file}`;
  return Object.entries(CUTOUT_SOURCES).map(([id, file]) => ({
    id,
    url: wixFit(file),
  }));
}

async function fetchBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${url}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

function colorDist(r1, g1, b1, r2, g2, b2) {
  const dr = r1 - r2,
    dg = g1 - g2,
    db = b1 - b2;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

// Analyse the border to estimate the background color and how uniform/light it is.
function analyseBorder(data, w, h, ch) {
  const samples = [];
  const step = 1;
  for (let x = 0; x < w; x += step) {
    samples.push((0 * w + x) * ch);
    samples.push(((h - 1) * w + x) * ch);
  }
  for (let y = 0; y < h; y += step) {
    samples.push((y * w + 0) * ch);
    samples.push((y * w + (w - 1)) * ch);
  }
  let sr = 0,
    sg = 0,
    sb = 0,
    n = samples.length;
  for (const i of samples) {
    sr += data[i];
    sg += data[i + 1];
    sb += data[i + 2];
  }
  const mr = sr / n,
    mg = sg / n,
    mb = sb / n;
  // fraction of border pixels close to the mean (uniformity) and light+neutral,
  // and the average color of just the light/neutral pixels (the true bg color)
  let close = 0,
    lightNeutral = 0,
    lr = 0,
    lg = 0,
    lb = 0;
  for (const i of samples) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2];
    if (colorDist(r, g, b, mr, mg, mb) < 40) close++;
    const mx = Math.max(r, g, b),
      mn = Math.min(r, g, b);
    if (mn > 200 && mx - mn < 28) {
      lightNeutral++;
      lr += r;
      lg += g;
      lb += b;
    }
  }
  const lightMean =
    lightNeutral > 0
      ? [lr / lightNeutral, lg / lightNeutral, lb / lightNeutral]
      : [mr, mg, mb];
  return {
    mean: [mr, mg, mb],
    lightMean,
    uniformFrac: close / n,
    lightNeutralFrac: lightNeutral / n,
  };
}

// Flood fill from border seeds, turning background-colored pixels transparent.
// Soft edge: full transparent under `inner`, feathered up to `outer`.
function cutout(data, w, h, ch, bg, inner, outer) {
  const N = w * h;
  const alpha = new Uint8Array(N).fill(255);
  const visited = new Uint8Array(N);
  const stack = [];
  const match = (idx) => {
    const p = idx * ch;
    return colorDist(data[p], data[p + 1], data[p + 2], bg[0], bg[1], bg[2]) < outer;
  };
  // seed all border pixels that match
  for (let x = 0; x < w; x++) {
    const top = x,
      bot = (h - 1) * w + x;
    if (match(top)) stack.push(top);
    if (match(bot)) stack.push(bot);
  }
  for (let y = 0; y < h; y++) {
    const left = y * w,
      right = y * w + (w - 1);
    if (match(left)) stack.push(left);
    if (match(right)) stack.push(right);
  }
  while (stack.length) {
    const idx = stack.pop();
    if (visited[idx]) continue;
    visited[idx] = 1;
    const p = idx * ch;
    const d = colorDist(data[p], data[p + 1], data[p + 2], bg[0], bg[1], bg[2]);
    if (d >= outer) continue;
    // feathered alpha
    if (d <= inner) alpha[idx] = 0;
    else alpha[idx] = Math.round((255 * (d - inner)) / (outer - inner));
    const x = idx % w,
      y = (idx / w) | 0;
    if (x > 0) stack.push(idx - 1);
    if (x < w - 1) stack.push(idx + 1);
    if (y > 0) stack.push(idx - w);
    if (y < h - 1) stack.push(idx + w);
  }
  return alpha;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const products = parseProducts();
  const processed = [];
  for (const { id, url } of products) {
    try {
      const buf = await fetchBuffer(url);
      const img = sharp(buf).ensureAlpha();
      const { data, info } = await img
        .raw()
        .toBuffer({ resolveWithObject: true });
      const { width: w, height: h, channels: ch } = info;
      const b = analyseBorder(data, w, h, ch);
      const isStudio = b.lightNeutralFrac > 0.6;
      const decision = isStudio ? "CUTOUT" : "keep";
      console.log(
        `${id.padEnd(42)} uniform=${b.uniformFrac.toFixed(2)} light=${b.lightNeutralFrac.toFixed(2)} bg=${b.lightMean.map((v) => Math.round(v)).join(",")} -> ${decision}`,
      );
      if (!isStudio) continue;
      const alpha = cutout(data, w, h, ch, b.lightMean, 36, 96);
      // write alpha back
      for (let i = 0; i < w * h; i++) data[i * ch + 3] = alpha[i];
      const outPath = path.join(OUT_DIR, `${id}.png`);
      await sharp(data, { raw: { width: w, height: h, channels: ch } })
        .png({ compressionLevel: 9 })
        .toFile(outPath);
      processed.push(id);
    } catch (e) {
      console.log(`${id}: ERROR ${e.message}`);
    }
  }
  console.log("\nCUTOUT IDS:", JSON.stringify(processed));
}

main();
