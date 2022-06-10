import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import { Navigate } from "react-router-dom";

export default class DetailResep extends React.Component {
  
  state = {
    id: 0,
    reaction: '',
    submitOk: false,
    errorsubmit: false,
    errormsg: '',
  }
  
  componentDidMount() {

    console.log('cdm props', this.props)
  }

  render() {

    const { errormsg, errorsubmit, submitOk } = this.state

    console.log('errormsg', errormsg, errorsubmit)

    const ColorButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(orange[500]),
      backgroundColor: orange[500],
      '&:hover': {
        backgroundColor: orange[700],
      },
    }));

    // console.log('detail resep', detail_resep)

    if (submitOk) {
      return <Navigate to={'/home'}/>;
    } else {
      return (
        <Grid container spacing={2}>
            <Grid item xs={3} key={0}>
            </Grid>
            <Grid item xs={6} key={1}>

              <Card sx={{marginTop: '100px'}}>      
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}>
                        <CardMedia sx={{marginTop: '50px', marginBottom: '50px'}}
                            component="img"
                            width='100px'
                            image={process.env.PUBLIC_URL + "/images/image-thanks.png"}
                            alt="reaction"
                        />
                    </Grid>
                    <Grid item xs={3} key={2}>
                    </Grid>
                </Grid>
                <CardContent>
                  <Typography variant="h5" gutterBottom component="div">
                    Terima kasih telah memberikan penilaianmu
                  </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{marginBottom: '100px'}}>
                  <Grid item xs={3}>
                  </Grid>
                  <Grid item xs={6}>

                    <ColorButton onClick={() => {this.setState({submitOk: true})}} type="submit" variant="contained" sx={{margin: '30px'}}>
                        Kembali ke beranda
                    </ColorButton>

                  </Grid>
                  <Grid item xs={3} key={2}>
                  </Grid>
                </CardActions>
              </Card> 

            </Grid>
            <Grid item xs={3} key={2}>
            </Grid>
        </Grid>
      );
    }

    
  }
}
