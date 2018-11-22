import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcoon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProductService from '../../product-service';


const styles = theme => ({
    button: {
        margin: 0,
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

    handleDelete = () => {
        this.handleClose();
        let service = ProductService.getInstance();
        service.deleteItem(this.props.product.id);
    }

    render() {
        const { classes, product } = this.props;
        return (
            <div>
                <Button component={Link} to={'/editItem/' + product.id} variant="fab" color="secondary" aria-label="Edit" className={classes.button}>
                    <EditIcoon />
                </Button>
                <Button variant="fab" aria-label="Delete" className={classes.button} onClick={this.handleClickOpen}>
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
                        <Button onClick={this.handleDelete} component={Link} to="/listview" color="primary">
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

EditDeleteButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditDeleteButton);