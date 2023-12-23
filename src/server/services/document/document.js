const { Request, Document } = require('../../models');
const {
  checkPreRequisiteChaining,
  checkOperationIds,
} = require('../../helpers/request-item-helper');
const { getMarkdownAsText } = require('../file/file');

let apiDocuments = [];

/**
 * buildRequestItemObject
 * @param {*} requestItem
 * @returns {Request}
 */
const buildRequestItemObject = (requestItem) => {
  const requestObject = new Request(requestItem.url);
  requestObject.withOperationId(requestItem.operationId);
  if (requestItem.descriptionMd)
    requestObject.withDescription(getMarkdownAsText(requestItem.descriptionMd));
  else if (requestItem.description)
    requestObject.withDescription(requestItem.description);
  requestItem.title && requestObject.withTitle(requestItem.title);
  requestItem.headers && requestObject.withHeaders(requestItem.headers);
  requestItem.data && requestObject.withBody(requestItem.data);
  requestItem.method && requestObject.withMethod(requestItem.method);
  requestItem.preRequisite &&
    requestObject.withPreRequisite(
      requestItem.preRequisite.placeholder,
      requestItem.preRequisite.operationId,
      requestItem.preRequisite.valueExpression
    );
  return requestObject;
};

/**
 * buildDocumentsObject
 * @param {*} documents
 * @returns {Document[]}
 */
function buildDocumentsObject(documents) {
  checkOperationIds(documents);
  checkPreRequisiteChaining(documents);
  const apiDocuments = [];
  for (const documentItem of documents) {
    const documentObject = new Document(documentItem.title);
    documentItem.description &&
      documentObject.withDescription(documentItem.description);
    documentObject.withOperationId(documentItem.operationId);
    const requestItemObjects = documentItem.requests.map((requestItem) =>
      buildRequestItemObject(requestItem)
    );
    documentObject.withRequests(requestItemObjects);
    apiDocuments.push(documentObject);
  }
  return apiDocuments;
}

/**
 * importDocuments
 * @param {*} documents
 */
function importDocuments(documents) {
  apiDocuments = buildDocumentsObject(documents);
}

/**
 * getApiDocuments
 * @returns {Document[]}
 */
function getApiDocuments() {
  return apiDocuments;
}

module.exports = {
  importDocuments,
  getApiDocuments,
};
