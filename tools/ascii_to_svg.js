#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath || !outputPath) {
  console.error("Usage: node tools/ascii_to_svg.js tools/whm_ascii.txt public/brand/sigils/whm-sigil.svg");
  process.exit(1);
}

const lines = fs.readFileSync(inputPath, "utf8")
  .replace(/\r/g, "")
  .split("\n");

const rows = lines.length;
const cols = Math.max(...lines.map(l => l.length));

const cell = 24;
const pad = 24;
const stroke = 6;

const segs = [];

for (let r = 0; r < rows; r++) {
  const line = lines[r].padEnd(cols, " ");
  for (let c = 0; c < cols; c++) {
    const ch = line[c];
    const x = pad + c * cell;
    const y = pad + r * cell;

    const xL = x;
    const xM = x + cell / 2;
    const xR = x + cell;
    const yT = y;
    const yM = y + cell / 2;
    const yB = y + cell;

    if (ch === "\\") segs.push([xR, yT, xL, yB]);
    if (ch === "/")  segs.push([xL, yT, xR, yB]);
    if (ch === "|")  segs.push([xM, yT, xM, yB]);
    if (ch === "-" || ch === "–") segs.push([xL, yM, xR, yM]);
  }
}

const width = pad * 2 + cols * cell;
const height = pad * 2 + rows * cell;

let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
<style>
.s {
  stroke: #8b5cf6;
  stroke-width: ${stroke};
  fill: none;
  stroke-linecap: square;
}
</style>
`;

for (const [x1,y1,x2,y2] of segs) {
  svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="s"/>\n`;
}

svg += `</svg>\n`;

fs.writeFileSync(outputPath, svg, "utf8");
console.log("Wrote SVG:", outputPath);
