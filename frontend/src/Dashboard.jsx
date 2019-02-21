import React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import {get} from './utils/api';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";


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
        hello: ''
    };

    componentDidMount() {
      get('bedtools').then((res) => console.log(res));
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

    getSteps = ()  => {
        return ['Step 1', 'Step 2', 'Step 3'];
    };

    render () {

        const { activeStep, hello } = this.state;
        const steps = this.getSteps();
        return(
          <div>
            <AppBar className="header" color="primary" >{hello}</AppBar>
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
