import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import { Button, FormControl, FormHelperText, Grid, styled, TextField } from '@mui/material';
import { useRequest } from 'ahooks';
import PropTypes from 'prop-types';

import { editProfile } from '../../libs/api';
import { error, success } from '../../libs/utils';

const phoneRegExp = /^1[3-9]\d{9}$/;

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Please enter a valid mobile number.')
    .required('The mobile number is a required field.'),
});

const FormControlStyled = styled(FormControl)(() => ({
  marginBottom: 20,
}));

export default function EditProfile({ setOpen }) {
  const { loading: profileLoading, runAsync: runProfileAsync } = useRequest(editProfile, { manual: true });
  const userData = JSON.parse(localStorage.getItem('userData'));

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userData) {
      setValue('email', userData?.email);
      setValue('username', userData?.username);
      setValue('nickName', userData?.nickName);
      setValue('address.state', userData?.address?.state);
      setValue('address.city', userData?.address?.city);
      setValue('personal.phone', userData?.personal?.phone);
      setValue('personal.fax', userData?.personal?.fax);
    }
  }, [userData, setValue]);

  const onSubmit = async (submitData) => {
    try {
      submitData.userImg = 'https://avatars.githubusercontent.com/u/23741346?v=4';
      submitData.personal.phone = submitData.phoneNumber;
      submitData.personal.fax = submitData.fax;
      await runProfileAsync(userData?._id, submitData);
      setOpen(false);
      success('Edit profile successful!');
    } catch (onSubmitErr) {
      error('Edit profile error!');
      setOpen(false);
    }
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControlStyled fullWidth>
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                disabled
                autoFocus
                label="Email"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                error={Boolean(errors.email)}
              />
            )}
          />
          {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
        </FormControlStyled>
      </Grid>
      <Grid item xs={12}>
        <FormControlStyled fullWidth>
          <Controller
            name="username"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                disabled
                autoFocus
                label="UserName"
                value={value}
                defaultValue={userData?.username}
                onBlur={onBlur}
                onChange={onChange}
                error={Boolean(errors.username)}
              />
            )}
          />
        </FormControlStyled>
      </Grid>
      <Grid item xs={12}>
        <FormControlStyled fullWidth>
          <Controller
            name="nickName"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                autoFocus
                label="NickName"
                value={value}
                defaultValue={userData?.nickName}
                onBlur={onBlur}
                onChange={onChange}
                error={Boolean(errors.nickName)}
              />
            )}
          />
        </FormControlStyled>
      </Grid>
      <Grid item xs={12}>
        <FormControlStyled fullWidth>
          <Controller
            name="address.state"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                autoFocus
                label="State"
                value={value}
                defaultValue={userData?.address?.state}
                onBlur={onBlur}
                onChange={onChange}
                error={Boolean(errors.address?.state)}
              />
            )}
          />
        </FormControlStyled>
      </Grid>
      <Grid item xs={12}>
        <FormControlStyled fullWidth>
          <Controller
            name="address.city"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                autoFocus
                label="City"
                value={value}
                defaultValue={userData?.address?.city}
                onBlur={onBlur}
                onChange={onChange}
                error={Boolean(errors.address?.city)}
              />
            )}
          />
        </FormControlStyled>
      </Grid>
      <Grid item xs={12}>
        <FormControlStyled fullWidth>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                label="PhoneNumber"
                value={value}
                onBlur={onBlur}
                defaultValue={userData?.personal?.phone}
                onChange={onChange}
                error={Boolean(errors.phoneNumber)}
              />
            )}
          />
          {errors.phoneNumber && (
            <FormHelperText sx={{ color: 'error.main' }}>{errors.phoneNumber.message}</FormHelperText>
          )}
        </FormControlStyled>
      </Grid>
      <Grid item xs={12}>
        <FormControlStyled fullWidth>
          <Controller
            name="fax"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                autoFocus
                label="Fax"
                value={value}
                defaultValue={userData?.personal?.fax}
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
          />
        </FormControlStyled>
      </Grid>
      <Grid item xs={12} display="flex" gap="2rem">
        <Button
          variant="outlined"
          sx={{ width: '50%' }}
          onClick={() => {
            setOpen(false);
          }}>
          Cancel
        </Button>
        <LoadingButton
          loading={profileLoading}
          variant="contained"
          sx={{ width: '50%' }}
          onClick={handleSubmit(onSubmit)}>
          OK
        </LoadingButton>
      </Grid>
      {/* <CustomDialog title="Crop Image" width={600} dialogState={[cropOpen, setCropOpen]}>
        <Crop file={file} onUploadHandle={onUploadHandle} progressNumber={progressNumber} loading={uploadLoading} />
      </CustomDialog> */}
    </Grid>
  );
}

EditProfile.propTypes = {
  setOpen: PropTypes.func.isRequired,
};
