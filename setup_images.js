const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'Sequence');
const destDir = path.join(__dirname, 'public', 'sequence');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Clear destination directory just in case
fs.readdirSync(destDir).forEach(f => fs.unlinkSync(path.join(destDir, f)));

try {
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.png')).sort();
  
  files.forEach((file, ind) => {
    // The user wants: frame_00_delay-0.067s.webp
    // padStart 2 so it is 00, 01 ... 99, 100, 101
    const padded = ind.toString().padStart(2, '0');
    const newName = `frame_${padded}_delay-0.067s.webp`;
    
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, newName));
  });
  console.log(`Copied and renamed ${files.length} frames to match prompt format.`);
} catch (e) {
  console.error("Error copying files:", e.message);
}
