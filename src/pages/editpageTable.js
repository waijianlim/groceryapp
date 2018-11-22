import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import {Link} from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProductService from '../product-service';

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    form:{
        margin: 20
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
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSaveClose = () => {
        let service = ProductService.getInstance();
        service.updateItem(this.props.product);
    }
      
    callBackendAPI = async () => {
      const response = await fetch('/item/:id');
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };

   
    render() {
        const { classes } = this.props;
        const isEnabled = this.props.product.name.length > 0 && this.props.product.brand.length > 0;
        return (
            <div className={classes.root}>
                {/* SAVE BUTTON */}
                <Button disabled={!isEnabled} variant="contained" color="primary" className={classes.button} onClick={this.handleClickOpen}>
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
                        <Button onClick={this.handleSaveClose} component={Link} to='/listview' color="primary">
                            Save
              </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Cancel
              </Button>
                    </DialogActions>
                </Dialog>

            {/* CANCEL BUTTON */}
          <Button component={Link} to="/listview" variant="contained" color="default" className={classes.button}>
                    CANCEL
                </Button>
            </div>
        );
    }
}



class TextFields extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.id != null && this.props.id.length) {
            this.state = this.getProductById(this.props.id)
         }
         else {
            this.state = { 
            barcode: "",
            brand: "",
            currency: "",
            name: "",
            price: "",
              }
         }
    }

    getProductById = function (id) {
        let service = ProductService.getInstance();
        return service.getProductById(id);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleNumberChange = name => event =>{
        const re = /^[0-9\b]+$/;

        if (event.target.value === '' || re.test(event.target.value)) {
           this.setState({
                [name]: event.target.value
            })
        }
    }

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
                    label="Product Name"
                    error={this.state.name.length<=0}
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
                    error={this.state.brand.length<=0}
                    value={this.state.brand}
                    onChange={this.handleChange("brand")}
                    InputLabelProps={{
                        shrink: true
                    }}
                    className={classes.textField}
                    helperText={this.state.brand.length<=0?"This field is required.":""}
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
                    onChange={this.handleNumberChange("barcode")}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true
                    }}
                    margin="normal"
                />
                <SaveDialog classes={classes} product={this.state}/>

            </form>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired
};

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

export default withStyles(styles)(TextFields);
