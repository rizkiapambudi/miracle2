import * as React from 'react';

import axios from 'axios';

import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";

import Resep from "./Resep";

export default class List extends React.Component {

  componentDidMount() {
    console.log('cdm props', this.props)
    this.setState({ q: this.props.search });
    this.getRecipeList(this.props.category)
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('cwr', nextProps.search)
    this.setState({ q: this.props.search });
    this.getRecipeList(this.props.category)
  }

  getRecipeList(categ) {
    const { q } = this.state
    console.log('q', q)
    axios.get(`https://api.abcd.com/recipes?q=`+q+`&categoryId=`+categ)
    .then(res => {
      const list_resep = res.data.data.recipes;
      const count_resep = res.data.data.recipes;
      console.log('list_resep', list_resep)
      this.setState({ list_resep, count_resep });
    })
  }
  
  state = {
    list_resep: null,
    count_resep: 0,
    q:'',
  }

  render() {

    const list_resep = this.state.list_resep
    
    // console.log('list resep', list_resep)
    // console.log('list resep props', this.props)

    return (
      <Grid container spacing={2}>
        { list_resep && list_resep.map((data, index) => 
          <Grid item xs={3} key={index}>
            <Link to={`/detailresep/${data.id}`} style={{ textDecoration: 'none' }}>
              <Resep key={index} dataresep={data} />
            </Link>
          </Grid>
        )}
      </Grid>
    );
    
  }
}
