import sharp from "sharp";
import fs from "fs";
import path from "path";

const publicDir = "./public";

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      results.push(filePath);
    }
  });

  return results;
}

const files = walk(publicDir);

for (const file of files) {
  if (!file.match(/\.(png|jpg|jpeg)$/i)) continue;

  const outputFile = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");

  if (fs.existsSync(outputFile)) continue;

  await sharp(file)
    .webp({
      quality: 92,
      effort: 6,
      alphaQuality: 100,
      smartSubsample: true
    })
    .toFile(outputFile);

  console.log(`✔ Created ${outputFile}`);
}
