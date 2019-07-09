module.exports = (req) => {
    var JSZip = require('jszip');
    var Docxtemplater = require('docxtemplater');

    var fs = require('fs');
    var path = require('path');

    // loading the docx file as a binary
    var content = fs
        .readFileSync(path.resolve(__dirname, 'fines-first-offense-letter.docx'));

    var zip = new JSZip(content);
    var doc = new Docxtemplater();
    doc.loadZip(zip);

    // defining the template variables
    if (req) {
        const {
            first_name,
            last_name,
            description,
            phone
        } = req;

        doc.setData({
            first_name,
            last_name,
            description,
            phone
        });
    } else {
        doc.setData({
            first_name: "Charlie",
            last_name: "Sparks",
            description: "this is a test",
            phone: '(111) 111-1111'
        });
    }

    try {
        doc.render();
    } 
    catch (err) {
        console.log('error', err);
    };

    var buf = doc.getZip().generate({ type: 'nodebuffer' });

    fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
}