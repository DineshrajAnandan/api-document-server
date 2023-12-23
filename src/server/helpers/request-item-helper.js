const { MESSAGES } = require('../constants/messages');
const { applyExpressionToObject } = require('../utils/expression');
const _ = require('lodash');

const checkOperationIds = (documents) => {
  const documentOpIdsMap = {};

  for (const documentItem of documents) {
    const sanitizedDocumentOperationId = documentItem.operationId?.trim();
    if (!sanitizedDocumentOperationId)
      throw new Error(
        'Operation id is expected for all documents and requests'
      );
    if (documentOpIdsMap[sanitizedDocumentOperationId])
      throw new Error(
        'duplicate operation ids are not allowed for different documents'
      );
    documentOpIdsMap[sanitizedDocumentOperationId] = true;

    const requestOpIdsMap = {};
    for (const requestItem of documentItem.requests) {
      const sanitizedRequestOperationId = requestItem.operationId?.trim();
      if (!sanitizedRequestOperationId)
        throw new Error(
          'Operation id is expected for all documents and requests'
        );
      if (requestOpIdsMap[sanitizedRequestOperationId])
        throw new Error(
          'duplicate operation ids are not allowed for different requests in documents'
        );
      requestOpIdsMap[sanitizedRequestOperationId] = true;
    }
  }
};

const checkPreRequisiteChaining = (documents) => {
  for (const documentItem of documents) {
    for (const requestItem of documentItem.requests) {
      if (requestItem.preRequisite) {
        if (!requestItem.preRequisite.operationId)
          throw new Error(MESSAGES.error.preRequisiteOperationIdNotGiven);
        if (requestItem.preRequisite.operationId == requestItem.operationId)
          throw new Error(MESSAGES.error.preRequisiteCircularChaining);
        const preRequisiteItem = documentItem.requests.find(
          (req) => req.operationId == requestItem.preRequisite?.operationId
        );
        if (!preRequisiteItem)
          throw new Error(MESSAGES.error.preRequisiteOperationIdNotFound);
        if (preRequisiteItem.preRequisite)
          throw new Error(MESSAGES.error.preRequisiteOverLevel);
      }
    }
  }
};

const getRequestItems = (
  apiDocuments,
  documentOperationId,
  requestOperaionId
) => {
  const apiDocument = apiDocuments.find(
    (d) => d.operationId == documentOperationId
  );
  const requestItem = apiDocument.requests.find(
    (r) => r.operationId == requestOperaionId
  );
  const preRequisiteRequestItem = requestItem.data.preRequisite
    ? apiDocument.requests.find(
        (r) => r.operationId == requestItem.data.preRequisite.operationId
      )
    : undefined;
  return { requestItem, preRequisiteRequestItem };
};

const getModifiedHeaders = (requestObject, preRequisiteResponseData) => {
  let modifiedHeaders = _.cloneDeep(requestObject.data.headers);
  let preRequisite = requestObject.data.preRequisite;
  let preRequisiteValue = preRequisite.valueExpression
    ? applyExpressionToObject(
        preRequisiteResponseData,
        preRequisite.valueExpression
      )
    : preRequisiteResponseData;
  for (const key in modifiedHeaders) {
    if (
      Object.hasOwnProperty.call(modifiedHeaders, key) &&
      modifiedHeaders[key].includes(`{{${preRequisite.placeholder}}}`)
    ) {
      modifiedHeaders[key] = modifiedHeaders[key].replace(
        `{{${preRequisite.placeholder}}}`,
        preRequisiteValue
      );
    }
  }
  return modifiedHeaders;
};

module.exports = {
  checkPreRequisiteChaining,
  checkOperationIds,
  getRequestItems,
  getModifiedHeaders,
};
