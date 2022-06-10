import React from 'react';

import axios from 'axios';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import List from "./List";
import SearchBar from "./SearchBar";

import { Navigate } from "react-router-dom";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function attr(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default class CategoryList extends React.Component {
  
  constructor() {
    super();
    this.filterUser = this.filterUser.bind(this);
    this.klikHistory = this.klikHistory.bind(this);
  } 

  state = {
    categories: [],
    value: 0,
    filter: '',
    history: false
  }

  componentDidMount() {
    this.getCategory()    
  }

  getCategory() {
    axios.get(`https://api.abcd.com/recipe-categories`)
    .then(res => {
      const categories = res.data.data;
      // console.log('categories', categories)
      this.setState({ categories });
    })
  }
  
  filterUser(filterValue){
    console.log('filterValue', filterValue)
    this.setState({
      filter: filterValue
    });
  }
  
  klikHistory(val){
    console.log('klikHistory', val)
    this.setState({
      history: val
    });
  }

  render() {

    const {value, history} = this.state;

    console.log('state categ', this.state.categories, value, history)

    const handleChange = (event, newValue) => {
      // console.log('handlechange', event, newValue)
      this.setState({value: newValue})
    };

    if (history) {
      return <Navigate to={'/serve-history'}/>;
    }

    return (

        <div>

            <SearchBar filterUser={this.filterUser} history={this.klikHistory} />

            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label='Semua' {...attr(0)} key='0' />
                  { this.state.categories.map((data, index) => 
                    <Tab label={data.name} {...attr(index+1)} key={data.id} />
                  )}
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                  <List category={null} search={this.state.filter}/>
              </TabPanel>
              { this.state.categories.map((data, index) => 
                <TabPanel value={value} index={index+1} key={data.id}>
                  <List category={data.id} search={this.state.filter}/>
                </TabPanel>
              )}
            </Box>
            
        </div>

    )
  }
}