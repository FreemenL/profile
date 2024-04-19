import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { Button, Divider } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import CustomChip from '../../../components/chip';
import { getProfileDetail } from '../../../libs/api';
import { copyToClipboard } from '../../../libs/utils';
import Avatar from '../../../components/avatar';

function UserInfo() {
  const id = '637edcf17c264b35b5817781b2b3f24d';
  const [user, setUser] = useState();
  const { runAsync } = useRequest(() => getProfileDetail(id), { manual: true });

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await runAsync();
      setUser(data || null);
      localStorage.setItem('userData', JSON.stringify(data));
    };
    loadProfile();
  }, [runAsync]);

  const renderDetail = (title, value, canCopy) => (
    <Box
      sx={{
        height: '20px',
        lineHeight: '20px',
        display: 'flex',
        marginBottom: '10px',
        alignItems: canCopy ? 'center' : 'inherit',
      }}>
      <Typography
        sx={{
          lineHeight: '20px',
          marginRight: 2,
          fontWeight: 500,
          fontSize: '0.875rem',
        }}>
        {title}:
      </Typography>
      <Typography variant="body2" sx={{ lineHeight: '20px' }}>
        {value}
      </Typography>
      {canCopy && (
        <Button
          onClick={() => {
            copyToClipboard(value);
          }}>
          Copy
        </Button>
      )}
    </Box>
  );

  const renderUserAvatar = () => {
    return (
      <Avatar
        alt=""
        src={`${user?.userImg}`}
        variant="rounded"
        sx={{ width: 150, height: 150, marginBottom: 4 }}
        color="success"
      />
    );
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ paddingTop: 15, display: 'flex', gap: 4, justifyContent: 'center', flexDirection: 'row' }}>
            {renderUserAvatar()}
            <Box display="flex" gap={2} flexDirection="column" justifyContent="center" alignItems="center">
              <Typography variant="h6" sx={{ marginBottom: '2px' }}>
                {user?.nickName || user?.username}
              </Typography>
              <CustomChip
                skin="light"
                size="small"
                label="developer"
                color="primary"
                sx={{
                  height: 20,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  borderRadius: '5px',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 },
                }}
              />
            </Box>
          </CardContent>
          <CardContent>
            <Typography variant="h6" textAlign="center">
              Details
            </Typography>
            <Divider />
            <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
              {user?.username && renderDetail('UserName', user?.username)}
              {user?.email && renderDetail('Email', user?.email, true)}
              {user?.nickName && renderDetail('NickName', user?.nickName)}
              {user?.address?.state && renderDetail('State', user?.address?.state)}
              {user?.address?.city && renderDetail('City', user?.address?.city)}
              {user?.personal?.phone && renderDetail('Phone', user?.personal?.phone, true)}
              {user?.personal?.fax && renderDetail('Fax', user?.personal?.fax)}
              {user?.website && renderDetail('Website', user?.website)}
              {user?.bio && renderDetail('Bio', user?.bio)}
              {user?.createdAt && renderDetail('createdAt', user?.createdAt)}
            </Box>
          </CardContent>
          <Toaster position="top-center" />
        </Card>
      </Grid>
    </Grid>
  );
}

export default UserInfo;
