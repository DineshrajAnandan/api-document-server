const express = require('express');
const { getApiDocuments, executeRequestItem } = require('../services/document');
const { getRequestItems } = require('../helpers/request-item-helper');

const documentsRouter = express.Router();

/**
 * api/documents
 */
documentsRouter.route('/').get((req, res) => {
  const apiDocuments = getApiDocuments();
  res.json(apiDocuments.map((apiDocument) => apiDocument.data));
});

/**
 * api/documents/:documentOperationId/:requestOperaionId
 */
documentsRouter
  .route('/:documentOperationId/:requestOperaionId')
  .post((req, res) => {
    const documentOperationId = req.params.documentOperationId;
    const requestOperaionId = req.params.requestOperaionId;
    const apiDocuments = getApiDocuments();
    const { requestItem, preRequisiteRequestItem } = getRequestItems(
      apiDocuments,
      documentOperationId,
      requestOperaionId
    );

    executeRequestItem(requestItem, preRequisiteRequestItem).then((result) => {
      res.json(result);
    });
  });

module.exports = documentsRouter;
