module.exports = (req, res) => {
    var JSZip = require('jszip');
    var Docxtemplater = require('docxtemplater');

    var fs = require('fs');
    var path = require('path');

    // loading the docx file as a binary
    var content = fs
        .readFileSync(path.resolve(__dirname, 'input.docx'));

    var zip = new JSZip(content);
    var doc = new Docxtemplater();
    doc.loadZip(zip);

    // defining the template variables
    doc.setData({
        "user": [
            "Charlie",
            "Sparks",
        ]
    });

    try {
        doc.render();
    } 
    catch (err) {
        console.log('error', err);
    };

    var buf = doc.getZip();
   

    fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
    res.json({ letter: fs.readFileSync(path.resolve(__dirname, 'output.docx'))});
}