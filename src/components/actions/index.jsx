import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import CustomDialog from '../custom-dialog';
import SaveProfile from '../save-profile';

export default function Actions() {
  const [saveProfileOpen, setSaveProfileOpen] = useState(false);
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => {
            setSaveProfileOpen(true);
          }}>
          Edit Profile
        </Button>
      </Grid>
      <CustomDialog title="Edit Profile" dialogState={[saveProfileOpen, setSaveProfileOpen]}>
        <SaveProfile setOpen={setSaveProfileOpen} />
      </CustomDialog>
    </Grid>
  );
}
