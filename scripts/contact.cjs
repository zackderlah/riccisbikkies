const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const os = require("os");
const dir = path.resolve(__dirname, "..", "public", "products");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".png")).sort();
(async () => {
  const cell = 220,
    cols = 4,
    rows = Math.ceil(files.length / cols);
  const W = cols * cell,
    H = rows * cell;
  const bg = Buffer.from(
    `<svg width="${W}" height="${H}"><rect width="100%" height="100%" fill="#e3d8c9"/></svg>`,
  );
  const comps = [];
  for (let i = 0; i < files.length; i++) {
    const r = await sharp(path.join(dir, files[i]))
      .resize(cell - 12, cell - 12, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();
    comps.push({
      input: r,
      left: (i % cols) * cell + 6,
      top: ((i / cols) | 0) * cell + 6,
    });
  }
  const out = path.join(os.tmpdir(), "contact.png");
  await sharp(bg).composite(comps).png().toFile(out);
  console.log(files.join("\n"));
  console.log("SAVED", out);
})();
