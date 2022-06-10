import * as React from 'react';
import axios from 'axios';
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

    const id = this.props.match.params.idserve
      
    this.setState({ id }); 
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.state.id
    const usertoken = localStorage.getItem('usertoken');
    const config = {
        headers: { Authorization: `Bearer ${usertoken}` }
    };

    const reaction = {
      reaction: this.state.reaction,
    };

    console.log('handlesubmit', reaction, config);

    axios.post(`https://api.abcd.com/serve-histories/`+id+`/reaction`, reaction, config)
    .then(res => {
      const data = res.data;
      console.log('submit reaction res', data, res)
      this.setState({ errorsubmit: false, submitOk: true});
      if (res.status === 200) {
        this.setState({ errormsg: '' });
      }
    }).catch(error=>{
      if (error.response) {
        console.log('error res', error.response)
        if (error.response.status === 401) {
          this.setState({ errormsg: 'Unauthorized' });
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      this.setState({ errorsubmit: true });
    });

  };

  render() {

    const { errormsg, errorsubmit, reaction, submitOk } = this.state

    console.log('reaction', reaction, errormsg, errorsubmit)

    const ColorButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(orange[500]),
      backgroundColor: orange[500],
      '&:hover': {
        backgroundColor: orange[700],
      },
    }));

    // console.log('detail resep', detail_resep)

    if (submitOk) {
      return <Navigate to={'/thanks'}/>;
    } else {
      return (
        <Grid container spacing={2}>
            <Grid item xs={3} key={0}>
            </Grid>
            <Grid item xs={6} key={1}>
              
              <Card sx={{marginTop: '100px'}}>
                <Typography variant="h5" gutterBottom component="div" sx={{marginTop: '50px'}}>
                  Yaay! Masakanmu sudah siap disajikan
                </Typography>
                <CardMedia sx={{marginTop: '50px', marginBottom: '50px'}}
                  component="img"
                  width='100px'
                  image={process.env.PUBLIC_URL + "/images/reactionimg.png"}
                  alt="reaction"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom component="div">
                    Suka dengan resep dari CodeFood? Bagaimana rasanya?
                  </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{marginBottom: '100px'}}>
                  <Grid item xs={3}>
                  </Grid>
                  <Grid item xs={6}>
                    
                    <Button aria-label="like" onClick={() => {this.setState({reaction: 'like'})}}>
                      <svg width="100" height="100" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M43.9635 7.33337C23.7235 7.33337 7.3335 23.76 7.3335 44C7.3335 64.24 23.7235 80.6667 43.9635 80.6667C64.2402 80.6667 80.6668 64.24 80.6668 44C80.6668 23.76 64.2402 7.33337 43.9635 7.33337ZM31.1668 29.3334C34.2102 29.3334 36.6668 31.79 36.6668 34.8334C36.6668 37.8767 34.2102 40.3334 31.1668 40.3334C28.1235 40.3334 25.6668 37.8767 25.6668 34.8334C25.6668 31.79 28.1235 29.3334 31.1668 29.3334ZM61.4168 54.0834C57.9335 60.0967 51.4435 64.1667 44.0002 64.1667C36.5568 64.1667 30.0668 60.0967 26.5835 54.0834C25.8868 52.8734 26.8035 51.3334 28.1968 51.3334H59.8035C61.2335 51.3334 62.1135 52.8734 61.4168 54.0834ZM56.8335 40.3334C53.7902 40.3334 51.3335 37.8767 51.3335 34.8334C51.3335 31.79 53.7902 29.3334 56.8335 29.3334C59.8768 29.3334 62.3335 31.79 62.3335 34.8334C62.3335 37.8767 59.8768 40.3334 56.8335 40.3334Z" fill="#2BAF2B"/>
                      </svg>
                    </Button>
                    <Button aria-label="neutral" onClick={() => {this.setState({reaction: 'neutral'})}}>
                      <svg width="100" height="100" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44.0002 7.33337C39.185 7.33337 34.417 8.28179 29.9684 10.1245C25.5198 11.9671 21.4777 14.668 18.0729 18.0728C11.1966 24.9491 7.3335 34.2754 7.3335 44C7.3335 53.7246 11.1966 63.051 18.0729 69.9273C21.4777 73.3321 25.5198 76.033 29.9684 77.8756C34.417 79.7183 39.185 80.6667 44.0002 80.6667C53.7248 80.6667 63.0511 76.8036 69.9274 69.9273C76.8037 63.051 80.6668 53.7246 80.6668 44C80.6668 39.1849 79.7184 34.4169 77.8757 29.9683C76.0331 25.5197 73.3322 21.4776 69.9274 18.0728C66.5226 14.668 62.4805 11.9671 58.0319 10.1245C53.5833 8.28179 48.8153 7.33337 44.0002 7.33337ZM25.6668 34.8334C25.6668 33.3747 26.2463 31.9757 27.2777 30.9443C28.3092 29.9128 29.7081 29.3334 31.1668 29.3334C32.6255 29.3334 34.0245 29.9128 35.0559 30.9443C36.0874 31.9757 36.6668 33.3747 36.6668 34.8334C36.6668 36.2921 36.0874 37.691 35.0559 38.7225C34.0245 39.7539 32.6255 40.3334 31.1668 40.3334C29.7081 40.3334 28.3092 39.7539 27.2777 38.7225C26.2463 37.691 25.6668 36.2921 25.6668 34.8334ZM58.6668 58.6667H29.3335V51.3334H58.6668V58.6667ZM56.8335 40.3334C55.3748 40.3334 53.9759 39.7539 52.9444 38.7225C51.913 37.691 51.3335 36.2921 51.3335 34.8334C51.3335 33.3747 51.913 31.9757 52.9444 30.9443C53.9759 29.9128 55.3748 29.3334 56.8335 29.3334C58.2922 29.3334 59.6911 29.9128 60.7226 30.9443C61.754 31.9757 62.3335 33.3747 62.3335 34.8334C62.3335 36.2921 61.754 37.691 60.7226 38.7225C59.6911 39.7539 58.2922 40.3334 56.8335 40.3334Z" fill="yellow"/>
                      </svg>
                    </Button>
                    <Button aria-label="dislike" onClick={() => {this.setState({reaction: 'dislike'})}}>
                      <svg width="100" height="100" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44.0002 7.33337C39.185 7.33337 34.417 8.28179 29.9684 10.1245C25.5198 11.9671 21.4777 14.668 18.0729 18.0728C11.1966 24.9491 7.3335 34.2754 7.3335 44C7.3335 53.7246 11.1966 63.051 18.0729 69.9273C21.4777 73.3321 25.5198 76.033 29.9684 77.8756C34.417 79.7183 39.185 80.6667 44.0002 80.6667C53.7248 80.6667 63.0511 76.8036 69.9274 69.9273C76.8037 63.051 80.6668 53.7246 80.6668 44C80.6668 39.1849 79.7184 34.4169 77.8758 29.9683C76.0331 25.5197 73.3322 21.4776 69.9274 18.0728C66.5226 14.668 62.4805 11.9671 58.0319 10.1245C53.5833 8.28179 48.8153 7.33337 44.0002 7.33337V7.33337ZM25.6668 34.8334C25.6668 31.9 28.2335 29.3334 31.1668 29.3334C34.1002 29.3334 36.6668 31.9 36.6668 34.8334C36.6668 37.7667 34.1002 40.3334 31.1668 40.3334C28.2335 40.3334 25.6668 37.7667 25.6668 34.8334ZM54.1568 63.1767C52.5068 60.5 48.5835 58.6667 44.0002 58.6667C39.4168 58.6667 35.4935 60.5 33.8435 63.1767L28.6368 57.97C31.9368 53.9734 37.5835 51.3334 44.0002 51.3334C50.4168 51.3334 56.0635 53.9734 59.3635 57.97L54.1568 63.1767V63.1767ZM56.8335 40.3334C53.9002 40.3334 51.3335 37.7667 51.3335 34.8334C51.3335 31.9 53.9002 29.3334 56.8335 29.3334C59.7668 29.3334 62.3335 31.9 62.3335 34.8334C62.3335 37.7667 59.7668 40.3334 56.8335 40.3334Z" fill="red"/>
                      </svg>
                    </Button>

                    <ColorButton disabled={reaction==='' ? true : false} onClick={this.handleSubmit} type="submit" variant="contained" sx={{margin: '30px'}}>Berikan Penilaian</ColorButton>
                    
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
