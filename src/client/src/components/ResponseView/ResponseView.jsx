import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import styles from './ResponseView.module.css';
import { CustomTabs } from '../CustomTabs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

export default function ResponseView({ data }) {
  const [showCopySuccessSnackbar, setShowCopySuccessSnackbar] = useState(false);
  const StatusView = () => {
    return (
      <Box sx={{ position: 'absolute', right: '1em', top: '1em' }}>
        status:{' '}
        <span style={{ color: 'green', fontWeight: 'bold' }}>
          {data.status} {data.statusText}
        </span>
      </Box>
    );
  };

  // eslint-disable-next-line react/prop-types
  const CopyData = ({ className }) => {
    return (
      <CopyToClipboard
        text={JSON.stringify(data.data, null, 2)}
        onCopy={() => setShowCopySuccessSnackbar(true)}
        className={className}
      >
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <ContentCopyIcon />
        </IconButton>
      </CopyToClipboard>
    );
  };

  const tabsConfig = [
    {
      label: 'data',
      element: (
        <div className={styles.responseBody}>
          <CopyData className={styles.copyData} />
          <pre className={styles.pre}>{JSON.stringify(data.data, null, 2)}</pre>
        </div>
      ),
    },
    {
      label: 'headers',
      element: (
        <pre className={styles.pre}>
          {JSON.stringify(data.headers, null, 2)}
        </pre>
      ),
    },
    {
      label: 'cookies',
      element: (
        <pre className={styles.pre}>
          {data.cookies && JSON.stringify(data.cookies, null, 2)}
        </pre>
      ),
    },
  ];

  return (
    <>
      <CustomTabs data={tabsConfig} cornerElement={<StatusView />}></CustomTabs>
      <Snackbar
        open={showCopySuccessSnackbar}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setShowCopySuccessSnackbar(false)}
      >
        <Alert
          onClose={() => setShowCopySuccessSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Copied to clipboard
        </Alert>
      </Snackbar>
    </>
  );
}

// export default function ResponseView({ data }) {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%', position: 'relative' }}>
//       <Box sx={{ position: 'absolute', right: '1em', top: '1em' }}>
//         status:{' '}
//         <span style={{ color: 'green', fontWeight: 'bold' }}>
//           {data.status} {data.statusText}
//         </span>
//       </Box>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           aria-label="basic tabs example"
//         >
//           <Tab label="data" {...a11yProps(0)} />
//           <Tab label="headers" {...a11yProps(1)} />
//           <Tab label="cookies" {...a11yProps(2)} />
//         </Tabs>
//       </Box>
//       <CustomTabPanel value={value} index={0}>
//         <pre className={styles.pre}>{JSON.stringify(data.data, null, 2)}</pre>
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={1}>
//         <pre className={styles.pre}>
//           {JSON.stringify(data.headers, null, 2)}
//         </pre>
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={2}>
//         <pre className={styles.pre}>
//           {data.cookies && JSON.stringify(data.cookies, null, 2)}
//         </pre>
//       </CustomTabPanel>
//     </Box>
//   );
// }

ResponseView.propTypes = {
  data: PropTypes.object,
};
