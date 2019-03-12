import React from 'react';
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



export default class StepContent extends React.Component {

    
    
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
        
        
        if (this.props.loading) {
            return ( 
                <>
      <h3>Henter data</h3>
      <RingLoader
      css={override}
      sizeUnit={"px"}
      size={50}
      color={'#123abc'}
      loading={this.props.loading}
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
              value = {this.props.firstSelectedGene}
              onChange = {this.props.selectFirstGene}
              options = {this.props.genomes}
              />
            <Select 
              name = "select genomes"
              value = {this.props.secondSelectedGene}
              onChange = {this.props.selectSecondGene}
              options = {this.props.genomes}
              />
            <div style={{'margin': '20px'}}>
            <Button variant="outlined" color="primary" onClick={this.props.handleOpen}>
              More info
            </Button>
            <Dialog
                    title="Informasjon"
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    >
              <DialogTitle id="form-dialog-title">info</DialogTitle>
              <DialogContent>
                <DialogContentText>
                The directory contains 6 BED files. Those starting with “f” for “fetal tissue” reflect Dnase I hypersensitivity sites measured in different fetal tissue
                samples from the kidney, lung, skin, and stomach.

                In addition: cpg.bed represents CpG islands in the human genome; 
                exons.bed represents RefSeq exons from human genes
                </DialogContentText>
              </DialogContent>
            </Dialog>
            </div>
          </>
        ); 
        case 1 :
        if (this.props.result) {
            return(
                <>
            <Typography component="h3" variant="headline" gutterBottom>Results from intersecting <span style={{'font-style':'italic'}}>{this.props.firstSelectedGene.value}</span> and <span style={{'font-style':'italic'}}>{this.props.secondSelectedGene.value}</span></Typography>
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
                    <TableCell align="center">{this.props.result.intersection}</TableCell>
                    <TableCell align="center">{this.props.result.jaccard}</TableCell>
                    <TableCell align="center">{this.props.result.n_intersections}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
            <div style={{'margin': '20px'}}>
            <Button variant="outlined" color="primary" onClick={this.props.handleOpen}>
              info about results
            </Button>
            <Dialog
                    title="Informasjon"
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    >
              <DialogTitle id="form-dialog-title">Info about results</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  We have used pybedtools function "Jaccard" to compare the genomes. Specifically, it measures the ratio of the number of
                  intersecting base pairs between two sets to the number of base pairs in the union of the two sets. 
                  The bedtools jaccard tool implements this statistic, yet modifies the statistic such that the length of 
                  the intersection is subtracted from the length of the union. As a result, the final statistic ranges from 0.0 to 1.0, 
                  where 0.0 represents no overlap and 1.0 represent complete overlap.
                </DialogContentText>
              </DialogContent>
            </Dialog>
            </div>

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
        if (this.props.resultRandom) {
            return(
                <>
            <Typography component="h3" variant="headline" gutterBottom>Results from comparing <span style={{'font-style':'italic'}}>{this.props.firstSelectedGene.value}</span> with shuffled <span style={{'font-style':'italic'}}>{this.props.secondSelectedGene.value}</span></Typography>
            <Paper style={style.root}>
              <Table style={style.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Length of basepair intersection</TableCell>
                    <TableCell align="center">Jaccard</TableCell>
                    <TableCell align="center">Number of Intersections</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{this.props.resultRandom.intersection}</TableCell>
                    <TableCell align="center">{this.props.resultRandom.jaccard}</TableCell>
                    <TableCell align="center">{this.props.resultRandom.n_intersections}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
            <div style={{'margin': '20px'}}>
            <Button variant="outlined" color="primary" onClick={this.props.handleOpen}>
              info about randomized results
            </Button>
            <Dialog
                    title="Informasjon"
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    >
              <DialogTitle id="form-dialog-title">Info about randomized results</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  We have used pybedtools function "shuffle" to randomly compare two genomes.
                  The shuffle method will randomly permute the genomic locations of a feature file 
                  among a genome defined in a genome file.
                </DialogContentText>
              </DialogContent>
            </Dialog>
            </div>
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
        if (this.props.result && this.props.resultRandom){
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
                    <TableCell align="center">{this.props.result.jaccard}</TableCell>
                    <TableCell align="center">{this.props.resultRandom.jaccard}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
            </>

            );
            }
        }
    }

    render() {
        return(
            <div style={{'margin': '20px 30% '}}>
                {this.getStepContent(this.props.activeStep)}
            </div>

        );
    };
};
