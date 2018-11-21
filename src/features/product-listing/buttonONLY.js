import React from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = theme => ({
    button: {
      margin: 0 ,
      marginLeft: 0,
      marginRight: 10,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
  });

// DELETE DIALOG
class EditDeleteButton extends React.Component {
    
        state = {
            open: false,
        };
    
        handleClickOpen = () => {
            this.setState({ open: true });
        };
    
        handleClose = () => {
            this.setState({ open: false });
        };
    
        render() {
            const { classes } = this.props;
            return (
                <div>
                    <Button href={'/editItem/'+ classes.product.id} variant="fab" color="secondary" aria-label="Edit" className={classes.classes.button}>
          <Icon>edit_icon</Icon>
        </Button>
                    <Button variant="fab" aria-label="Delete" className={classes.classes.button} onClick={this.handleClickOpen}>
                        <DeleteIcon />
                    </Button>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="delete-dialog-title"
                        aria-describedby="delete-dialog-description"
                    >
                        <DialogTitle id="delete-dialog-title">{"Delete Item"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="delete-dialog-description">
                                This action will delete the selected item. Are you sure?
                  </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Delete
                  </Button>
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                Cancel
                  </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }
    }

  function FloatingActionButtons(props) {
    const { classes } = props;
    return (
      <div>
        
          <EditDeleteButton classes={props}/>
        
        
      </div>
    );
  }

  FloatingActionButtons.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(FloatingActionButtons);