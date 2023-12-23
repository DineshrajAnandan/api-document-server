import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import { verbUtils } from '../../utils';
import InfoIcon from '@mui/icons-material/Info';

export default function RequestViewTopBar({
  data,
  onRequestSend,
  onViewDetail,
}) {
  const handleRequestSend = () => {
    if (onRequestSend) onRequestSend();
  };

  const handleViewDetail = () => {
    if (onViewDetail) onViewDetail();
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <h4
        style={{
          color: verbUtils.getVerbColor(data.method),
          minWidth: '80px',
          paddingLeft: '1em',
        }}
      >
        {data.method}
      </h4>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder=""
        label="url"
        value={data.url}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: '10px' }}
        aria-label="directions"
        onClick={handleRequestSend}
      >
        <SendIcon />
      </IconButton>
      <IconButton
        color="primary"
        sx={{ p: '10px' }}
        aria-label="directions"
        onClick={handleViewDetail}
      >
        <InfoIcon />
      </IconButton>
    </Paper>
  );
}

RequestViewTopBar.propTypes = {
  data: PropTypes.object,
  onRequestSend: PropTypes.func,
  onViewDetail: PropTypes.func,
};
