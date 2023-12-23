#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const path = require('path');
const {
  getApiDocumentsDataFromConfigFiles,
} = require('./src/server/services/file/file');
const { importDocuments } = require('./src/server/services/document/document');

const documentsRouter = require('./src/server/routers/documents-router');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

// load api documents
const apiDocumentsConfigData = getApiDocumentsDataFromConfigFiles();
importDocuments(apiDocumentsConfigData);

app.use(express.static(path.join(__dirname, './src/client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/documents', documentsRouter);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
