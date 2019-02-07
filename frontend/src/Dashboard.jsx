import React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import {get} from './utils/api';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { StepConnector } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


class ActiveStepContent extends React.Component {
    render() {
      return (
        <StepContent {...this.props}>
          <Typography>This is active step content.</Typography>
        </StepContent>
      );
    }
  }

export default class Dashboard extends React.Component {

    state = {
        activeStep:0,
    };

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
    
    getSteps = ()  => {
        return ['Step 1', 'Step 2', 'Step 3'];
    };

    componentDidMount() {
        get().then(e => console.log(e));
    }

    render () {

        const activeStep = this.state;
        const steps = this.getSteps();
        console.log(steps);
        console.log(activeStep);
        return(
        <>
            <AppBar className="header" color="primary" >hei</AppBar>
            <Stepper className="stepper" activeStep={activeStep} orientation="horizontal" alternativeLabel={true} >
             {steps.map((label) => {
                return (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <ActiveStepContent />
                    </Step>
                );
             })}   
            </Stepper>
            <div>
            <div>
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
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
        </div>
        </>
        );
    }
}
