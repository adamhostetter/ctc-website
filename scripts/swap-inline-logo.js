// One-shot: re-inline the current shared/img/logos/starnes-hero-white.svg
// into each service page's header + footer, replacing whatever <svg id="Layer_1" ...>
// block is currently there.

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const logo = fs.readFileSync(
  path.join(root, "shared/img/logos/starnes-hero-white.svg"),
  "utf8"
);

// Strip XML declaration the same way build-branches.js does.
const inlineSvg = logo.replace(/^<\?xml[^>]*\?>\s*/, "").trim();

const targets = [
  "services/residential-hvac.html",
  "services/commercial-hvac.html",
  "services/planned-maintenance.html",
  "services/project-support.html",
  "services/emergency.html",
];

// Match a full <svg id="Layer_1" ...>...</svg> block (non-greedy).
const svgBlock = /<svg id="Layer_1"[\s\S]*?<\/svg>/g;

for (const rel of targets) {
  const file = path.join(root, rel);
  const html = fs.readFileSync(file, "utf8");
  const matches = html.match(svgBlock) || [];
  const updated = html.replace(svgBlock, inlineSvg);
  fs.writeFileSync(file, updated);
  console.log(`✓ ${rel} — replaced ${matches.length} inline SVG block(s)`);
}
