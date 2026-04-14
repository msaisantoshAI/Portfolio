const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

async function extractText(pdfPath) {
    let doc = await pdfjsLib.getDocument(pdfPath).promise;
    let text = "";
    for (let i = 1; i <= doc.numPages; i++) {
        let page = await doc.getPage(i);
        let content = await page.getTextContent();
        let strings = content.items.map(item => item.str);
        text += strings.join(" ") + "\n";
    }
    console.log(text);
}

extractText('C:/Users/santosh/Downloads/SaiSantosh Resume (2).pdf').catch(console.error);
