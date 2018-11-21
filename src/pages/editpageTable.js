import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import data from '../data/products.json'

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },
    dense: {
        marginTop: 19
    },
    menu: {
        width: 200
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

const currencies = [
    {
        value: "USD",
        label: "$"
    },
    {
        value: "MYR",
        label: "RM"
    }
];

// SAVE DIALOG
class SaveDialog extends React.Component {

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
                {/* SAVE BUTTON */}
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClickOpen}>
                    <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                    Save
          </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="save-dialog-title"
                    aria-describedby="save-dialog-description"
                >
                    <DialogTitle id="save-dialog-title">{"Confirm save"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="save-dialog-description">
                            Saving these changes will overwrite previous changes.
              </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Save
              </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Cancel
              </Button>
                    </DialogActions>
                </Dialog>

            {/* CANCEL BUTTON */}
          <Button href="/store" variant="contained" color="default" className={classes.button}>
                    CANCEL
                </Button>
            </div>
        );
    }
}



class TextFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getProductById(this.props.id);
    }

    getProductById = function (id) {
        return data.products.filter(e => e.id === parseInt(id))[0];
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <form
                size="px"
                className={classes.container}
                noValidate
                autoComplete="off"
            >
                <TextField
                    required
                    id="standard-name"
                    label="Name"
                    error={this.state.name.length<=0}
                    placeholder="Placeholder"
                    value={this.state.name}
                    onChange={this.handleChange("name")}
                    InputLabelProps={{
                        shrink: true
                    }}
                    className={classes.textField}
                    helperText={this.state.name.length<=0?"This field is required.":""}
                    margin="normal"
                />
                <TextField
                    required
                    id="standard-brand"
                    label="Brand"
                    value={this.state.brand}
                    onChange={this.handleChange("brand")}
                    InputLabelProps={{
                        shrink: true
                    }}
                    className={classes.textField}
                    helperText="This field is required."
                    margin="normal"
                />
                <TextField
                    id="standard-select-currency"
                    select
                    label="Currency"
                    className={classes.textField}
                    value={this.state.currency}
                    onChange={this.handleChange("currency")}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu
                        }
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    helperText="Please select your currency"
                    margin="normal"
                >
                    {currencies.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="standard-number"
                    label="Price"
                    value={this.state.price}
                    onChange={this.handleChange("price")}
                    type="number"
                    defaultValue={123456231}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true
                    }}
                    margin="normal"
                />
                <TextField
                    id="standard-number"
                    label="UPC12 Barcode"
                    value={this.state.barcode}
                    onChange={this.handleChange("barcode")}
                    defaultValue="123456231"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true
                    }}
                    margin="normal"
                />
                <SaveDialog classes={classes}/>

            </form>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired
};

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

export default withStyles(styles)(TextFields);
