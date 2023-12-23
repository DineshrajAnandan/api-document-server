import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import { default as MuiDialog } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Dialog(props) {
  const { onClose, open, data } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <MuiDialog
      onClose={handleClose}
      open={open}
      fullWidth={true}
      maxWidth={'md'}
      scroll={'paper'}
    >
      <DialogTitle>{data.title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Markdown remarkPlugins={[remarkGfm]}>{data.description}</Markdown>
        </DialogContentText>
      </DialogContent>
    </MuiDialog>
  );
}

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object,
};
