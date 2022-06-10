import * as React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Goback from "./Goback";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { Navigate } from "react-router-dom";

export default class DetailResep extends React.Component {
  
  state = {
    counter: 0,
    errorsubmit: false,
    mulai_masak: false,
    errormsg: '',
    responseSubmit: null
  }
  
  componentDidMount() {

    // console.log('cdm props', this.props)

    const id = this.props.match.params.id
      
    axios.get(`https://api.abcd.com/recipes/`+id)
    .then(res => {
      if (res.status === 200) {
        const detail_resep = res.data.data;
        // console.log('detail_resep', detail_resep)
        this.setState({ detail_resep }); 
      }
    })
  }

  
  handleIncrement = () => {
    console.log('increment')
    this.setState(state => ({ counter: state.counter + 1 }));
  };

  handleDecrement = () => {
    console.log('decrement')
    this.setState(state => ({ counter: state.counter - 1 }));
  };

  
  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const usertoken = localStorage.getItem('usertoken');
    const config = {
        headers: { Authorization: `Bearer ${usertoken}` }
    };

    const masak = {
      nServing: data.get('nServing'),
      recipeId: this.props.match.params.id
    };

    console.log('handlesubmit', masak, config);

    axios.post(`https://api.abcd.com/serve-histories`, masak, config)
    .then(res => {
      const data = res.data;
      console.log('submit masak res', data, res)
      this.setState({ errorsubmit: false, mulai_masak: true, responseSubmit: data.data});
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

    const detail_resep = this.state.detail_resep
    const { errormsg, errorsubmit, mulai_masak, responseSubmit } = this.state
    const displayCounter = this.state.counter > 0;

    const ColorButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(orange[500]),
      backgroundColor: orange[500],
      '&:hover': {
        backgroundColor: orange[700],
      },
    }));

    // console.log('detail resep', detail_resep)

    if (mulai_masak && detail_resep && responseSubmit) {
      return <Navigate response={responseSubmit} to={'/langkah-masak/'+detail_resep.id+'/'+responseSubmit.id}/>;
    } else {
      return (
        <Grid container spacing={2}>
            <Grid item xs={2} key={0}>
            </Grid>
            <Grid item xs={6} key={1}>
              { detail_resep && 
                <div>
                  <Card>
                    <Goback/>
                    <CardMedia
                      component="img"
                      height="400"
                      image={detail_resep.image}
                      alt={detail_resep.name}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom component="div" align="left">
                        {detail_resep.name}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="good">
                        <Chip
                          avatar={
                            <svg width="30" height="30" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M43.9635 7.33337C23.7235 7.33337 7.3335 23.76 7.3335 44C7.3335 64.24 23.7235 80.6667 43.9635 80.6667C64.2402 80.6667 80.6668 64.24 80.6668 44C80.6668 23.76 64.2402 7.33337 43.9635 7.33337ZM31.1668 29.3334C34.2102 29.3334 36.6668 31.79 36.6668 34.8334C36.6668 37.8767 34.2102 40.3334 31.1668 40.3334C28.1235 40.3334 25.6668 37.8767 25.6668 34.8334C25.6668 31.79 28.1235 29.3334 31.1668 29.3334ZM61.4168 54.0834C57.9335 60.0967 51.4435 64.1667 44.0002 64.1667C36.5568 64.1667 30.0668 60.0967 26.5835 54.0834C25.8868 52.8734 26.8035 51.3334 28.1968 51.3334H59.8035C61.2335 51.3334 62.1135 52.8734 61.4168 54.0834ZM56.8335 40.3334C53.7902 40.3334 51.3335 37.8767 51.3335 34.8334C51.3335 31.79 53.7902 29.3334 56.8335 29.3334C59.8768 29.3334 62.3335 31.79 62.3335 34.8334C62.3335 37.8767 59.8768 40.3334 56.8335 40.3334Z" fill="#2BAF2B"/>
                            </svg>
                          }
                          label={detail_resep.nReactionLike}
                          variant="outlined"
                        />
                      </IconButton>
                      <IconButton aria-label="neutral">
                        <Chip
                          avatar={
                            <svg width="30" height="30" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M44.0002 7.33337C39.185 7.33337 34.417 8.28179 29.9684 10.1245C25.5198 11.9671 21.4777 14.668 18.0729 18.0728C11.1966 24.9491 7.3335 34.2754 7.3335 44C7.3335 53.7246 11.1966 63.051 18.0729 69.9273C21.4777 73.3321 25.5198 76.033 29.9684 77.8756C34.417 79.7183 39.185 80.6667 44.0002 80.6667C53.7248 80.6667 63.0511 76.8036 69.9274 69.9273C76.8037 63.051 80.6668 53.7246 80.6668 44C80.6668 39.1849 79.7184 34.4169 77.8757 29.9683C76.0331 25.5197 73.3322 21.4776 69.9274 18.0728C66.5226 14.668 62.4805 11.9671 58.0319 10.1245C53.5833 8.28179 48.8153 7.33337 44.0002 7.33337ZM25.6668 34.8334C25.6668 33.3747 26.2463 31.9757 27.2777 30.9443C28.3092 29.9128 29.7081 29.3334 31.1668 29.3334C32.6255 29.3334 34.0245 29.9128 35.0559 30.9443C36.0874 31.9757 36.6668 33.3747 36.6668 34.8334C36.6668 36.2921 36.0874 37.691 35.0559 38.7225C34.0245 39.7539 32.6255 40.3334 31.1668 40.3334C29.7081 40.3334 28.3092 39.7539 27.2777 38.7225C26.2463 37.691 25.6668 36.2921 25.6668 34.8334ZM58.6668 58.6667H29.3335V51.3334H58.6668V58.6667ZM56.8335 40.3334C55.3748 40.3334 53.9759 39.7539 52.9444 38.7225C51.913 37.691 51.3335 36.2921 51.3335 34.8334C51.3335 33.3747 51.913 31.9757 52.9444 30.9443C53.9759 29.9128 55.3748 29.3334 56.8335 29.3334C58.2922 29.3334 59.6911 29.9128 60.7226 30.9443C61.754 31.9757 62.3335 33.3747 62.3335 34.8334C62.3335 36.2921 61.754 37.691 60.7226 38.7225C59.6911 39.7539 58.2922 40.3334 56.8335 40.3334Z" fill="yellow"/>
                            </svg>
                          }
                          label={detail_resep.nReactionNeutral}
                          variant="outlined"
                        />
                      </IconButton>
                      <IconButton aria-label="bad">
                        <Chip
                          avatar={
                            <svg width="30" height="30" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M44.0002 7.33337C39.185 7.33337 34.417 8.28179 29.9684 10.1245C25.5198 11.9671 21.4777 14.668 18.0729 18.0728C11.1966 24.9491 7.3335 34.2754 7.3335 44C7.3335 53.7246 11.1966 63.051 18.0729 69.9273C21.4777 73.3321 25.5198 76.033 29.9684 77.8756C34.417 79.7183 39.185 80.6667 44.0002 80.6667C53.7248 80.6667 63.0511 76.8036 69.9274 69.9273C76.8037 63.051 80.6668 53.7246 80.6668 44C80.6668 39.1849 79.7184 34.4169 77.8758 29.9683C76.0331 25.5197 73.3322 21.4776 69.9274 18.0728C66.5226 14.668 62.4805 11.9671 58.0319 10.1245C53.5833 8.28179 48.8153 7.33337 44.0002 7.33337V7.33337ZM25.6668 34.8334C25.6668 31.9 28.2335 29.3334 31.1668 29.3334C34.1002 29.3334 36.6668 31.9 36.6668 34.8334C36.6668 37.7667 34.1002 40.3334 31.1668 40.3334C28.2335 40.3334 25.6668 37.7667 25.6668 34.8334ZM54.1568 63.1767C52.5068 60.5 48.5835 58.6667 44.0002 58.6667C39.4168 58.6667 35.4935 60.5 33.8435 63.1767L28.6368 57.97C31.9368 53.9734 37.5835 51.3334 44.0002 51.3334C50.4168 51.3334 56.0635 53.9734 59.3635 57.97L54.1568 63.1767V63.1767ZM56.8335 40.3334C53.9002 40.3334 51.3335 37.7667 51.3335 34.8334C51.3335 31.9 53.9002 29.3334 56.8335 29.3334C59.7668 29.3334 62.3335 31.9 62.3335 34.8334C62.3335 37.7667 59.7668 40.3334 56.8335 40.3334Z" fill="red"/>
                            </svg>
                          }
                          label={detail_resep.nReactionDislike}
                          variant="outlined"
                        />
                      </IconButton>
                      
                    </CardActions>
                  </Card> 

                  <Divider/>
                  
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom component="div" align="left">
                        Bahan-bahan
                      </Typography>
                      <List>
                        {
                          detail_resep?.ingredientsPerServing?.map((data, index) =>
                          <ListItem disablePadding key={index}>
                            <ListItemText primary={
                              <Typography variant="subtitle1" gutterBottom component="div" align="left">
                                <strong>{data.value + ' ' + data.unit + ' ' }</strong>
                                {data.item}
                              </Typography>
                            }/>
                          </ListItem>)
                        }
                      </List>
                    </CardContent>
                  </Card>
                </div>
              }
            </Grid>
            <Grid item xs={4} key={2}>
              <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom component="div" align="left">
                      <strong>Jumlah porsi yang dimasak</strong>
                    </Typography>
                    <ButtonGroup aria-label="small outlined button group">
                      { displayCounter && 
                        <Button onClick={this.handleDecrement}>
                          <Icon sx={{ color: orange[500] }}>remove</Icon>
                        </Button>
                      }
                      <TextField name="nServing" value={this.state.counter} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                      <Button onClick={this.handleIncrement}>
                        <Icon sx={{ color: orange[500] }}>add</Icon>
                      </Button>
                    </ButtonGroup>
                  </CardContent>
                  <CardContent> 
                  { displayCounter && 
                    <ColorButton type="submit" variant="contained">Mulai Memasak</ColorButton>
                  }
                  </CardContent>
                </Card>
                { errorsubmit && 
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Failed to submit — <strong>{errormsg}</strong>
                  </Alert>
                }
            </Box>
            </Grid>
        </Grid>
      );
    }

    
  }
}
