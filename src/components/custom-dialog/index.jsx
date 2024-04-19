import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { CloseCircleOutline } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import { DialogTitleStyled, ModalSubTitleStyled, ModalTitleStyled } from './style';

function CustomDialog(props) {
  const {
    DialogCustomContent,
    DialogCustomActions,
    DialogCustomActionSx,
    title,
    titleSx,
    subTitle,
    hiddenCloseButton,
    dialogState,
    width,
    height,
    hiddenTitleDivider,
    children,
    closeHandle,
    sx,
  } = props;
  const [open, setOpen] = dialogState;
  const handleClose = () => {
    setOpen(false);
    if (closeHandle) {
      closeHandle();
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '16px',
          maxWidth: width || 600,
          minHeight: height || 500,
        },
        ...sx,
      }}
      fullWidth
      aria-labelledby="customized-dialog-title"
      open={open}>
      {title && (
        <DialogTitleStyled>
          <ModalTitleStyled variant="h6" sx={{ ...titleSx }}>
            {title}
          </ModalTitleStyled>
          {subTitle ? <ModalSubTitleStyled variant="h6">{subTitle}</ModalSubTitleStyled> : null}
          {!hiddenCloseButton && (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                top: 10,
                right: 15,
                position: 'absolute',
                color: (theme) => theme.palette.grey[500],
              }}>
              <CloseCircleOutline />
            </IconButton>
          )}
        </DialogTitleStyled>
      )}
      <DialogContent dividers={!hiddenTitleDivider} sx={{ padding: 4, '&': { borderBottom: 0 } }}>
        {DialogCustomContent && <DialogCustomContent dialogState={dialogState} />}
        {children && children}
      </DialogContent>
      {DialogCustomActions && (
        <DialogActions
          sx={{
            p: '0 50px 50px 50px',
            gap: '20px',
            display: 'flex',
            width: '100%',
            ...DialogCustomActionSx,
          }}>
          {DialogCustomActions}
        </DialogActions>
      )}
    </Dialog>
  );
}

CustomDialog.defaultProps = {
  children: null,
  DialogCustomContent: null,
  DialogCustomActions: null,
  DialogCustomActionSx: null,
  titleSx: null,
  subTitle: null,
  hiddenCloseButton: false,
  dialogState: [],
  width: 600,
  height: 500,
  hiddenTitleDivider: false,
  closeHandle: null,
  sx: null,
};
CustomDialog.propTypes = {
  DialogCustomContent: PropTypes.element,
  DialogCustomActions: PropTypes.object,
  DialogCustomActionSx: PropTypes.object,
  title: PropTypes.string.isRequired,
  titleSx: PropTypes.object,
  subTitle: PropTypes.string,
  hiddenCloseButton: PropTypes.bool,
  dialogState: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  hiddenTitleDivider: PropTypes.bool,
  children: PropTypes.element,
  closeHandle: PropTypes.func,
  sx: PropTypes.object,
};

export default CustomDialog;
