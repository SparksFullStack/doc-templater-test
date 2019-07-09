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
    first_name: "Charlie",
    last_name: "Sparks",
    description: "this is a test",
    phone: '(111) 111-1111'
});

try {
    doc.render();
} 
catch (err) {
    console.log('error', err);
};

var buf = doc.getZip().generate({ type: 'nodebuffer' });

fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);