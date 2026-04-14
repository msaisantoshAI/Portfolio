const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk(srcDir).filter(f => f.endsWith('.tsx') && !f.includes('AnimatedQuote.tsx') && !f.includes('layout.tsx'));

files.forEach(file => {
   let content = fs.readFileSync(file, 'utf8');
   
   // Normalize headers to Sans-Serif and remove italic
   let newContent = content
      .replace(/font-serif/g, 'font-sans font-medium')
      .replace(/ italic /g, ' ')
      .replace(/italic /g, '')
      .replace(/ tracking-tighter/g, ' tracking-tight')
      .replace(/ tracking-widest/g, ' tracking-wide')
      .replace(/ leading-none/g, ' leading-tight');
      
   if(content !== newContent) {
       fs.writeFileSync(file, newContent, 'utf8');
       console.log('Updated: ', file);
   }
});
