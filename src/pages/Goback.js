import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';

export default function Goback() {
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item xs={1}>
        <Button onClick={() => navigate(-1)} align="left">
          <ArrowBackIcon/>
        </Button>
      </Grid>
    </Grid>
  );
}