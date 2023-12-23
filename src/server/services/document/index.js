const document = require('./document');
const request = require('./request');

module.exports = { ...document, ...request };
