import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';

export function InfoButton({ onDetailView }) {
  const handleViewDetail = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (onDetailView) onDetailView();
  };
  return (
    <IconButton
      color="primary"
      sx={{ p: '10px' }}
      aria-label="directions"
      onClick={handleViewDetail}
    >
      <InfoOutlinedIcon />
    </IconButton>
  );
}
InfoButton.propTypes = {
  onDetailView: PropTypes.func,
};
