import { DialogTitle, Typography, styled } from '@mui/material';

export const ModalTitleBase = styled(Typography)(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  textTransform: 'capitalize',
}));

export const ModalTitleStyled = styled(ModalTitleBase)`
  font-weight: 700;
  font-size: 28px;
  line-height: 32px;
  color: #555555;
`;

export const ModalSubTitleStyled = styled(ModalTitleBase)`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #828282;
  padding-top: 8px;
  padding-left: 2px;
`;

export const DialogTitleStyled = styled(DialogTitle)`
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 50px;
`;
