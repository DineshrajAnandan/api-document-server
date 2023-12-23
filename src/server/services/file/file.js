const fs = require('fs');
const path = require('path');

function getApiDocumentsDataFromConfigFiles() {
  const jsonsInDir = fs.readdirSync(process.cwd()).filter((file) => {
    return file.endsWith('.doc.json');
  });

  return jsonsInDir.map((file) => {
    const fileData = fs.readFileSync(path.join(process.cwd(), file));
    return JSON.parse(fileData.toString());
  });
}

function getMarkdownAsText(file) {
  const fileData = fs.readFileSync(path.join(process.cwd(), file));
  return fileData.toString();
}

module.exports = { getApiDocumentsDataFromConfigFiles, getMarkdownAsText };
