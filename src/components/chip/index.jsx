import PropTypes from 'prop-types';
import MuiChip from '@mui/material/Chip';
import useBgColor from '../../hooks/use-bg-color';

function CustomChip(props) {
  // ** Props
  const { sx, skin, color } = props;

  // ** Hook
  const bgColors = useBgColor();

  const colors = {
    primary: { ...bgColors.primaryLight },
    secondary: { ...bgColors.secondaryLight },
    success: { ...bgColors.successLight },
    error: { ...bgColors.errorLight },
    warning: { ...bgColors.warningLight },
    info: { ...bgColors.infoLight },
  };

  return (
    <MuiChip
      {...props}
      variant="filled"
      {...(skin === 'light' && { className: 'MuiChip-light' })}
      sx={skin === 'light' && color ? Object.assign(colors[color], sx) : sx}
    />
  );
}

CustomChip.propTypes = {
  sx: PropTypes.object.isRequired,
  skin: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default CustomChip;
