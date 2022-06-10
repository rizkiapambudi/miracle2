import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import { Navigate } from "react-router-dom";
import axios from 'axios';

const theme = createTheme();

class Login extends React.Component {  

  constructor(props) {
    super(props);
    this.state = {
      login_state: 0,
      errors: {},
    }
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user = {
      username: data.get('email'),
      password: data.get('password'),
    };

    // console.log('user', user);

    axios.post(`https://api.abcd.com/auth/login`, user)
    .then(res => {
      const data = res.data;
      // console.log('data', data, res)
      // this.setState({ categories });
      if (res.status === 200) {
        localStorage.setItem("usertoken", data.data.token);
        this.setState({ login_state: true });
      }
    })

  };

  
  componentDidMount(){
    console.log('this.props', this.props)
  }

  render() {

    const ColorButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(orange[500]),
      backgroundColor: orange[500],
      '&:hover': {
        backgroundColor: orange[700],
      },
    }));

    const login_state = this.state.login_state
    // console.log('login_state', login_state)

    if (login_state) {
      return <Navigate to='/home'/>;
    }

    return (
      <ThemeProvider theme={theme}>
        
        <AppBar position="static" color="">
            <Toolbar>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                <img data-cy="header-logo" src={process.env.PUBLIC_URL + "/images/header-logo.png"} alt="icon" style={{marginRight: '200px'}}/>
                </Grid>
              </Grid>
            </Toolbar>
        </AppBar>
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img src={process.env.PUBLIC_URL + "/images/codefood.png"} alt="icon" style={{marginTop: '220px'}}/>
            <p>
              Built with Material UI v5, React v17, Axios, React-router v6. <br/>Visit https://github.com/rizkiapambudi/react-gh-2 for source code
            </p>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <ColorButton sx={{ mt: 3, mb: 2 }} type="submit" fullWidth variant="contained">Login</ColorButton>
                <Grid container>
                  <Grid item xs>
                    <Link href={process.env.PUBLIC_URL+"/home"} variant="body2">
                      Lewati login
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}


export default (Login);