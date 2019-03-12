import React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import {get} from './utils/api';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { css } from '@emotion/core';
import { RingLoader } from 'react-spinners';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
        return ['Step 1', 'Step 2', 'Step 3'];
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

    getStepContent = (stepIndex) => {
      const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
      `;

      const style = theme =>({
        root : {
          width: '100%',
          marginTop: theme.spacing.unit * 3,
          overflowX: 'auto',  
        },
        table: {
          minWidth: 700,
        },
      });

      const actions = [
        <Button label="Lukk" primary={true} onClick={this.handleClose}> close </Button>
      ];

      if (this.state.loading) {
        return ( 
        <>
        <h3>Henter data</h3>
        <RingLoader
        css={override}
        sizeUnit={"px"}
        size={50}
        color={'#123abc'}
        loading={this.state.loading}
        />
        </>
        );
      }
      switch (stepIndex) {
        case 0:
          return (
            <>
              <Typography component="h2" variant="headline" gutterBottom style={{'margin':'20px'}}>Select two genomes to intersect</Typography>
              <Select 
                name = "select genomes"
                value = {this.state.firstSelectedGene}
                onChange = {this.selectFirstGene}
                options = {this.state.genomes}
              />
              <Select 
                name = "select genomes"
                value = {this.state.secondSelectedGene}
                onChange = {this.selectSecondGene}
                options = {this.state.genomes}
              />
              <div style={{'margin': '20px'}}>
              <Button variant="outlined" color="primary" onClick={this.handleOpen}>
                More info
              </Button>
              <Dialog
                      title="Informasjon"
                      actions={actions}
                      open={this.state.open}
                      onClose={this.handleClose}
              >
                <DialogTitle id="form-dialog-title">info</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    This application blabla blablablabla blabla blablablabla blabla blablablabla
                    blabla blablablabla
                    blabla blablablabla
                  </DialogContentText>
                </DialogContent>
              </Dialog>
              </div>
            </>
          ); 
        case 1 :
          if (this.state.result) {
          return(
          <>
              <Typography component="h3" variant="headline" gutterBottom>Results from intersecting {this.state.firstSelectedGene.value.toString()} and {this.state.secondSelectedGene.value.toString()}</Typography>
              <Paper style={style.root}>
                <Table style={style.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Intersection</TableCell>
                      <TableCell align="center">Jaccard</TableCell>
                      <TableCell align="center">Number of Intersections</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">{this.state.result.intersection}</TableCell>
                      <TableCell align="center">{this.state.result.jaccard}</TableCell>
                      <TableCell align="center">{this.state.result.n_intersections}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>

            </>
            );
          }

          else{
            return(
              <>
                <Typography component="h2" variant="headline" gutterBottom>Please select two genomes</Typography>
              </>
            );
          }

        case 2:
          if (this.state.resultRandom) {
            return(
            <>
              <Typography component="h3" variant="headline" gutterBottom>Results from intersecting {this.state.firstSelectedGene.value.toString()} and {this.state.secondSelectedGene.value.toString()}</Typography>
              <Paper style={style.root}>
                <Table style={style.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Intersection</TableCell>
                      <TableCell align="center">Jaccard</TableCell>
                      <TableCell align="center">Number of Intersections</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">{this.state.resultRandom.intersection}</TableCell>
                      <TableCell align="center">{this.state.resultRandom.jaccard}</TableCell>
                      <TableCell align="center">{this.state.resultRandom.n_intersections}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
              </>
              );
            }

            else{
              return(
                <>
                  <Typography component="h2" variant="headline" gutterBottom>Please select two genomes</Typography>
                </>
              );
          }
          case 3:
          if (this.state.result && this.state.resultRandom){
            return(

              <>
              <Typography component="h3" variant="headline" gutterBottom>Comparison between regular and random</Typography>
              <Paper style={style.root}>
                <Table style={style.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Intersection Regular</TableCell>
                      <TableCell align="center">Intersection Random</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">{this.state.result.jaccard}</TableCell>
                      <TableCell align="center">{this.state.resultRandom.jaccard}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
              </>

            );
          }
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
              <div style={{'margin': '20px 30% '}}>
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
                disabled={activeStep === 3 || !(this.state.firstSelectedGene && this.state.secondSelectedGene)}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        );
    }
}
