import Grid from '@mui/material/Grid';
import UserInfo from './components/user-info';
import Actions from '../../components/actions';

function Profile() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <UserInfo />
      </Grid>
      <Grid item xs={12} md={4}>
        <Actions />
      </Grid>
    </Grid>
  );
}

export default Profile;
