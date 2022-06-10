import * as React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import Button from '@mui/material/Button';
import Goback from "./Goback";
import Box from '@mui/material/Box';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Chip from '@mui/material/Chip';
import { Navigate } from "react-router-dom";


export default class LangkahResep extends React.Component {
  
  state = {
    langkah_resep: null,
    errorsubmit: false,
    errormsg: '',
    nStepDone: 0,
    total_step: 0,
    isDone: false
  }
  
  componentDidMount() {

    console.log('cdm props', this.props)

    const idresep = this.props.match.params.idresep
    const idserve = this.props.match.params.idserve
    
    const usertoken = localStorage.getItem('usertoken');
    const config = {
        headers: { Authorization: `Bearer ${usertoken}` }
    };
      
    axios.get(`https://api.abcd.com/recipes/`+idresep+`/steps`)
    .then(res => {
      if (res.status === 200) {
        const langkah_resep = res.data.data;
        console.log('langkah_resep', langkah_resep)
        this.setState({ langkah_resep }); 
      }
    })

    axios.get(`https://api.abcd.com/serve-histories/`+idserve, config)
    .then(res => {
      if (res.status === 200) {
        const nStepDone = res.data.data.nStepDone - 1;
        const total_step = res.data.data.nStep;
        console.log('nStepDone', nStepDone)
        this.setState({ nStepDone, total_step }); 
      }
    })
  }

  
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
      this.setState({ errorsubmit: false, mulai_masak: true });
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

  handleNext = () => {
    
    const nStepDone = this.state.nStepDone
    const nextStep = nStepDone + 1;
    this.setState({nStepDone: nextStep})
    
    const idserve = this.props.match.params.idserve
    const usertoken = localStorage.getItem('usertoken');
    const config = {
      headers: { Authorization: `Bearer ${usertoken}` }
    };

    const masak = {
      stepOrder: nextStep,
    };

    axios.put(`https://api.abcd.com/serve-histories/`+idserve+`/done-step`, masak, config)
    .then(res => {
      if (res.status === 200) {
        const {nStepDone, nStep} = res.data.data;
        console.log('response put', nStepDone, nStep)
        if (nStep === nStepDone) {
          this.setState({isDone: true})
        }
      }
    })

  };

  render() {

    const { errormsg, errorsubmit, langkah_resep, nStepDone, isDone } = this.state

    console.log('error?', errormsg, errorsubmit)

    if (isDone) {
      return <Navigate to={'/reaction/'+this.props.match.params.idresep+'/'+this.props.match.params.idserve}/>;
    }

    return (
      <Grid container spacing={2}>
          <Grid item xs={3} key={0}>
          </Grid>
          <Grid item xs={6} key={1}>
            <Goback/>
            { langkah_resep && 
              <div>
                <Card>
                  <CardContent>
                    <Divider/>
                    <Typography variant="h6" gutterBottom component="div" align="left">
                      Langkah Memasak
                    </Typography>
                    <Stepper activeStep={nStepDone} orientation="vertical">
                      {langkah_resep.map((step, index) => (
                        <Step key={step.stepOrder}>
                          <StepLabel>
                            Step {step.stepOrder}
                          </StepLabel>
                          <StepContent TransitionProps={{in: true}}>
                            <Typography align="left">
                              {step.description}
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                              <Grid item xs={2} key={1}>
                              <div>
                                {
                                  nStepDone && index < nStepDone ?   
                                    <Chip
                                      avatar={
                                        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M1 6L5.5 10.5L13 1.5" stroke="#2BAF2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                      }
                                      label='Selesai'
                                      variant="outlined"
                                    />
                                    :
                                    index === nStepDone ? 
                                    <Button
                                      variant="contained"
                                      onClick={this.handleNext}
                                      sx={{ mt: 1, mr: 1 }}
                                      color={index === langkah_resep.length - 1 ? "warning" : "success"}
                                    >
                                      {index === langkah_resep.length - 1 ? 'Sajikan Makanan' : 'Selesai'}
                                    </Button>
                                    :
                                    ''
                                }
                              </div>
                              </Grid>
                            </Box>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                  </CardContent>
                </Card>
              </div>
            }
          </Grid>
      </Grid>
    );

    
  }
}
