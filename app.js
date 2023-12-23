#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const path = require('path');
const chalk = require('chalk');
const open = require('open');

const {
  getApiDocumentsDataFromConfigFiles,
} = require('./src/server/services/file/file');
const { importDocuments } = require('./src/server/services/document/document');

const documentsRouter = require('./src/server/routers/documents-router');

const PORT = process.env.PORT || 8001;
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
  const message = `ADS - API Document Server listening on port ${PORT}`;
  const url = `http://localhost:${PORT}`;

  console.log(chalk.green(message));
  console.log('->', 'Local:', chalk.blueBright(url));
  open(url);
});
