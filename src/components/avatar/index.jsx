// ** React Imports
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
// ** MUI Imports
import MuiAvatar from '@mui/material/Avatar';

const Avatar = forwardRef((props, ref) => {
  return <MuiAvatar ref={ref} {...props} />;
});

Avatar.defaultProps = {
  skin: 'filled',
  color: 'primary',
};

Avatar.propTypes = {
  sx: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
  skin: PropTypes.string,
  color: PropTypes.string,
};

export default Avatar;
