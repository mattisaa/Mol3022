import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  root: {
    flexGrow: 1,
  },
  infoButton: {
    marginLeft: -18,
    marginRight: 10,
  },
};

export default class DenseAppBar extends React.Component {

    state = {
        infoOpen: false,
    };

    handleClose = () => {
        this.setState({
          infoOpen: false,
        });
    };
  
      handleOpen = () => {
        this.setState({
          infoOpen: true,
        });
    };

    render(){
        return (
            <div style={styles.root}>
            <AppBar position="static">
                <Toolbar variant="dense">
                <IconButton onClick={this.handleOpen} style={styles.infoButton} color="inherit" aria-label="Info">
                <InfoIcon/>
                </IconButton>
                <Dialog
                      title="Informasjon"
                      open={this.state.infoOpen}
                      onClose={this.handleClose}
              >
                <DialogTitle id="form-dialog-title">Info about application</DialogTitle>
                <DialogContent>
                  <DialogContentText>

                    In this app you will be able to intersect different genomes from a predetermined selection. The goal is to test if the overlap between two genomic tracks is greater than what would be expected by random chance.
                    
                    <List>
                        <ListItem>
                            <ListItemText primary= "• First you will choose two genomes to intersect."/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary= "• Then you will get your first set of results, which will include three parameters:"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary= "• Intersection: This tells you the length of the intersection – the sum of all the overlapping base pairs."/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary= "• Jaccard: This number represents the similarity of the two genomes on a scale from 0 to 1."/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary= "• Number of intersections: This number tells you how many coherent base pairs intersect over the two genomes."/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary= "• In the third step the second gene is completely shuffled before the app once more calculates the jaccard between the original first genome, and a random second genome."/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary= "• The last page shows you the two jaccard values side by side. We encourage you to try different combinations – maybe you will even see a pattern."/>
                        </ListItem>
                    </List>
                    
                  </DialogContentText>
                </DialogContent>
              </Dialog>
                <Typography variant="h6" color="inherit">
                    MOL 3022 Project
                </Typography>
                </Toolbar>
            </AppBar>
            </div>
        );
    }
}