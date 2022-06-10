import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// search bar start
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export default class SearchBar extends React.Component {

  constructor() {
    super();
    this.handler = this.handler.bind(this);
    this.handlerHistory = this.handlerHistory.bind(this);
  }

  handler(e){
    this.props.filterUser(e.target.value);
  }

  handlerHistory(){
    this.props.history(true);
  }

  render () {

    return (
      <Box sx={{ flexGrow: 1, marginBottom: '20px' }}>
        <AppBar position="static" color="">
            <Toolbar>
              
              <Grid container spacing={2}>
                <Grid item xs={4}>
                <img data-cy="header-logo" src={process.env.PUBLIC_URL + "/images/header-logo.png"} alt="icon" style={{marginRight: '200px'}}/>
                </Grid>
                <Grid item xs={4}>
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    data-cy="header-input-search"
                    onChange={this.handler}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    sx={{ mt: 1, mr: 1 }}
                    color="warning"
                    onClick={this.handlerHistory}
                  >
                    <HistoryIcon/>
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
// search bar end