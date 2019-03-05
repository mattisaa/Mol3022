import React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import {get} from './utils/api';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Select from 'react-select'

export default class Dashboard extends React.Component {

    state = {
        activeStep:0,
        genomes: [],
        firstSelectedGene: '',
        secondSelectedGene: '',
        loading: true
        
    };

    componentDidMount() {
      get('genomes').then(({data}) => {
          this.setState({loading:false});
          const genomes = data.map(genome => {
            return {label: genome, value: genome};
          });
          this.setState({genomes});
        });
    }

    handleNext = () => {
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep -1,
        }))
    }

    handleReset = () => {
        this.setState({
          activeStep: 0,
        });
      };
    
    firstSelectedGene = (firstGene) => {
      this.setState({firstSelectedGene : firstGene});
    };

    secondSelectedGene = (secondGene) => {
      this.setState({secondSelectedGene : secondGene});
    };

    getSteps = ()  => {
        return ['Step 1', 'Step 2', 'Step 3'];
    };

    getStepContent = (stepIndex) => {

      if (this.state.loading) {
        return <h3>Henter data..</h3>;
      }
      switch (stepIndex) {
        case 0:
          const { firstSelectedGene } = this.state.firstSelectedGene;
          const { secondSelectedGene }= this.state.secondSelectedGene;

          return (
            <div >
                <Select 
                  name = "select genomes"
                  value = {firstSelectedGene}
                  onChange = {this.firstSelectedGene}
                  options = {this.state.genomes}
                />
              <Select 
                name = "select genomes"
                value = {secondSelectedGene}
                onChange = {this.secondSelectedGene}
                options = {this.state.genomes}
              />

            </div>
          ); 
        case 1 :
          return(
            <h2>Result of intersecting</h2>
          );

        case 2:
          return(
            <h2>Comparisson to random intersect</h2>
          );
      }
    }

    render () {

        const { activeStep } = this.state;
        const steps = this.getSteps();
        return(
          <div>
            <AppBar className="header" color="primary" ><h3>Intersect genomes app</h3></AppBar>
            <Stepper className="stepper" activeStep={activeStep}  alternativeLabel={true} >
             {steps.map((label) => {
                return (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                );
             })}
            </Stepper>
            <div >
              <div style={{'margin': '40px 30% '}}>
                {this.getStepContent(activeStep)}
              </div>
              <Button
                disabled={activeStep === 0}
                onClick={this.handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNext}
                disabled={activeStep === 3}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        );
    }
}
