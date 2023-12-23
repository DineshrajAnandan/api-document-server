import PropTypes from 'prop-types';
import { verbUtils } from '../../utils';

export const RequestVerbBadge = ({ data }) => {
  const color = verbUtils.getVerbColor(data.method);
  return (
    <span style={{ color, fontSize: '10px', fontWeight: '800' }}>
      {data.method.toUpperCase()}
    </span>
  );
};
RequestVerbBadge.propTypes = {
  data: PropTypes.any,
};
