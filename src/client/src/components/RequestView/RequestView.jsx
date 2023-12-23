/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';
import { ResponseView } from '../ResponseView';
import { Panel, PanelGroup } from 'react-resizable-panels';
import RequestViewTopBar from './RequestViewTopBar';
import RequestViewResizeHandle from './RequestViewResizeHandle';
import { RequestPropertiesView } from '../RequestPropertiesView';
import PropTypes from 'prop-types';
import styles from './RequestView.module.css';

// react resizable panels
//https://codesandbox.io/p/sandbox/react-resizable-panels-zf7hwd?file=%2Fsrc%2Froot.css%3A14%2C36-14%2C60

export default function RequestView({ data, documentData, onDetailView }) {
  const [requestResponseData, setRequestResponseData] = useState();
  const [requestSendInProgress, setRequestSendInProgress] = useState(false);

  const handleRequestSend = () => {
    setRequestSendInProgress(true);
    fetch(`/api/documents/${documentData.operationId}/${data.operationId}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((response) => {
        setRequestResponseData(response);
        setRequestSendInProgress(false);
      })
      .catch(() => {
        setRequestSendInProgress(false);
      });
  };

  const handleDetailDialogOpen = () => {
    if (onDetailView) onDetailView(data);
  };

  useEffect(() => {
    setRequestResponseData(null);
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.TopRow}>
        <RequestViewTopBar
          data={data}
          onRequestSend={handleRequestSend}
          onViewDetail={handleDetailDialogOpen}
        />
      </div>
      <div className={styles.BottomRow}>
        <PanelGroup autoSaveId="request-view" direction="vertical">
          <Panel
            className={styles.Panel}
            collapsible={true}
            defaultSize={20}
            order={1}
          >
            <div className={styles.PanelContent}>
              <RequestPropertiesView data={data} />
            </div>
          </Panel>
          <RequestViewResizeHandle />
          <Panel className={styles.Panel} collapsible={true} order={2}>
            <div className={styles.PanelContent}>
              {requestSendInProgress && (
                <Box sx={{ width: '100%' }}>
                  <LinearProgress />
                  <h3>Loading Request...</h3>
                </Box>
              )}
              {!requestSendInProgress && requestResponseData && (
                <ResponseView data={requestResponseData} />
              )}
              {!requestSendInProgress && !requestResponseData && (
                <div>Response</div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

RequestView.propTypes = {
  data: PropTypes.object,
  documentData: PropTypes.object,
  onDetailView: PropTypes.func,
};
