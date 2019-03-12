import React from 'react';
import {get} from './utils/api';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import DenseAppBar from './Appbar';
import StepContent from './StepContent';

export default class Dashboard extends React.Component {

    state = {
        activeStep:0,
        genomes: [],
        firstSelectedGene: '',
        secondSelectedGene: '',
        loading: true,
        open: false
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

        if(this.state.activeStep === 0 ) {
          this.calculateIntersect();
        };

        if(this.state.activeStep === 1 ) {
          this.calculateJaccardRandom();
        };
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep -1,
        }))
    };

    handleReset = () => {
        this.setState({
          activeStep: 0,
        });
    };

    handleClose = () => {
      this.setState({
        open: false,
      });
    };

    handleOpen = () => {
      this.setState({
        open: true,
      });
    };
    
    selectFirstGene = (firstGene) => {
      this.setState({firstSelectedGene : firstGene});

    };

    selectSecondGene = (secondGene) => {
      this.setState({secondSelectedGene : secondGene});
    };

    getSteps = ()  => {
        return ['Select genomes', 'Compare genomes', 'Compare with shuffled genome'];
    };
    
    calculateIntersect = () => {
        this.setState({ loading: true });
        

        fetch(`http://localhost:5000/api/calculate`, {
          method: "POST",
          body: JSON.stringify({
          firstGene : this.state.firstSelectedGene.value,
          secondGene: this.state.secondSelectedGene.value
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(results => results.json())
        .then(data => {
          this.setState({loading:false});
          this.setState({result : data});
        });
    };

    calculateJaccardRandom = () => {
      this.setState({ loading: true });

      fetch(`http://localhost:5000/api/calculateRandom`, {
        method: "POST",
        body: JSON.stringify({
        firstGene : this.state.firstSelectedGene.value,
        secondGene: this.state.secondSelectedGene.value
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(results => results.json())
      .then(data => {
        this.setState({loading:false});
        this.setState({resultRandom : data});
      });
    }

    render () {

        const { activeStep } = this.state;
        const steps = this.getSteps();
        return(
          <div>
            <DenseAppBar></DenseAppBar>
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
              <StepContent 
                result={this.state.result}
                resultRandom={this.state.resultRandom}
                firstSelectedGene={this.state.firstSelectedGene}
                secondSelectedGene={this.state.secondSelectedGene}
                selectFirstGene={this.selectFirstGene}
                selectSecondGene={this.selectSecondGene}
                handleOpen={this.handleOpen}
                handleClose={this.handleClose}
                open={this.state.open}
                loading={this.state.loading}
                activeStep={this.state.activeStep}
                genomes={this.state.genomes}

              />
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
                disabled={activeStep === 3 || !(this.state.firstSelectedGene && this.state.secondSelectedGene)}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        );
    }
}
