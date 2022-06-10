import * as React from 'react';

import axios from 'axios';

import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Goback from "./Goback";

export default class List extends React.Component {

  componentDidMount() {
    this.getServeHistory()
  }
  
  getServeHistory() {
    const usertoken = localStorage.getItem('usertoken');
    const config = {
        headers: { Authorization: `Bearer ${usertoken}` }
    };
    axios.get(`https://api.abcd.com/serve-histories`, config)
    .then(res => {
      console.log('getServeHistory', res)
      const history = res.data.data.history;
      const total = res.data.data.total;
      this.setState({ history, total });
    })
  }
  
  state = {
    history: [],
    total: 0
  }

  render() {

    const { history, } = this.state
    
    // console.log('list resep', list_resep)
    // console.log('list resep props', this.props)

    return (
      <Grid container spacing={2} sx={{marginTop: '20px'}}>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={1}>
          <Goback/>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" color="text.primary" align='left'>Riwayat</Typography>
        </Grid>
        { history.length > 0 && history.map((data, index) => 
          
          <Grid container spacing={2}>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardHeader
                  subheader={data.createdAt}
                />
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Link to={`/langkah-masak/${data.recipeId}/${data.id}`} style={{ textDecoration: 'none' }}>
                      <CardMedia
                        component="img"
                        height="194"
                        image={data.recipeImage}
                        alt={data.recipeName}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6}>
                    <CardContent>
                      <Typography variant="h6" color="text.primary" align='left'>
                        {data.recipeName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align='left'>
                        {data.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align='left'>
                        {data.recipeCategoryName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align='left'>
                        Porsi: {data.nServing}
                      </Typography>
                    </CardContent>
                  </Grid>
                  <Grid item xs={3}>
                  </Grid>
                </Grid>
              </Card>
              <Divider/>
              <Card sx={{marginBottom: '10px'}}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    {data.reaction}
                  </Grid>
                  <Grid item xs={6}>
                  </Grid>
                  <Grid item xs={3}>
                    {data.status} {(data.nStepDone/data.nStep*100)+'%'}
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={3}>
            </Grid>
          </Grid>
        )}
      </Grid>
    );
    
  }
}
