import { useEffect, useState } from 'react';
import styles from './App.module.css';
import DocumentTreeView from './components/DocumentTreeView/DocumentTreeView';
import RequestView from './components/RequestView/RequestView';
import { Dialog } from './components/Dialog';
// import ConsoleView from './components/ConsoleView/ConsoleView';

function App() {
  const [selectedRequest, setSelectedRequest] = useState();
  const [selectedRequestDocument, setSelectedRequestDocument] = useState();
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [detailDialogData, setDetailDialogData] = useState(false);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch('/api/documents')
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRequestSelect = (requestItem, apiDocumentOperationId) => {
    setSelectedRequest(requestItem);
    setSelectedRequestDocument(
      documents.find((d) => d.operationId == apiDocumentOperationId)
    );
  };

  const handleDetailDialogOpen = (data) => {
    setDetailDialogData(data);
    setIsDetailDialogOpen(true);
  };

  return (
    <div className={styles.container}>
      <DocumentTreeView
        apiDocuments={documents}
        onRequestSelect={handleRequestSelect}
        onDetailView={handleDetailDialogOpen}
      />
      {selectedRequest && (
        <RequestView
          data={selectedRequest}
          documentData={selectedRequestDocument}
          onDetailView={handleDetailDialogOpen}
        />
      )}
      {/* <ConsoleView /> */}
      <Dialog
        data={detailDialogData}
        open={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
      />
    </div>
  );
}

export default App;
