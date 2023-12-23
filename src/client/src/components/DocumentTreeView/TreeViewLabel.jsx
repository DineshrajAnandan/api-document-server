import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export const TreeViewLabel = ({ LabelIcon, labelText, LabelInfo }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 0.5,
        pr: 0,
      }}
    >
      {LabelIcon && <Box component={LabelIcon} color="inherit" />}
      <Typography
        variant="body2"
        sx={{
          fontWeight: 'inherit',
          flexGrow: 1,
          ml: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {labelText}
      </Typography>
      {LabelInfo && (
        <Box component={LabelInfo} color="inherit" sx={{ ml: 1 }} />
      )}
    </Box>
  );
};

TreeViewLabel.propTypes = {
  LabelIcon: PropTypes.node,
  labelText: PropTypes.string,
  LabelInfo: PropTypes.node,
};
