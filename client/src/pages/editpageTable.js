import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

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
    form: {
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
    title: {
        padding: 15,
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

    state = {
        loading: true,
        error: null,
        data: {},
    }
    componentDidMount() {

        if (this.props.id != null && this.props.id.length) {
            let service = ProductService.getInstance();
            service.getProductById(this.props.id).then((data) => {
                if (data.length <= 0) {
                    this.setState({
                        data: {},
                        loading: false,
                        error: {
                            "message": "Error",
                            "stack": "Item for id ("  + this.props.id + ") not found!",
                        }
                    })
                } else {
                    this.setState({
                        data: data[0],
                        loading: false,
                        error: null,
                    })
                }
            }, (error) => {
                console.log("Error!: ", error);
                this.setState({
                    data: {},
                    loading: false,
                    error: error,
                })
            })
        }
        else {
            this.setState({
                data: {
                    barcode: "",
                    brand: "",
                    currency: "",
                    name: "",
                    price: ""
                },
                loading: false,
            });
        }

    }

    handleChange = name => event => {
        let newData = this.state.data;
        newData[name] = event.target.value;
        this.setState({
            data: newData
        });
    };

    handleNumberChange = name => event => {
        const re = /^[0-9\b]+$/;
        const val = event.target.value;
        // guard conditions
        if (val !== '' && !re.test(val)) {
            return;
        }
        if(val !== '' && val.length > 12) {
            event.target.value = val.substring(0,12);
        }
        this.handleChange(name)(event);
    }

    render() {
        const { classes } = this.props;
        const { loading, data, error } = this.state;

        if (loading) {
            return (<LinearProgress />)
        }
        else if (error != null) {
            return (
                <div>
                    <h1> ERROR : {error.message}</h1>
                    <p> {error.stack} </p>
                </div>)
        }
        return (
            <div>
                <h2 className={classes.title}>Product</h2>
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
                        error={data.name.length <= 0}
                        value={data.name}
                        onChange={this.handleChange("name")}
                        InputLabelProps={{
                            shrink: true
                        }}
                        className={classes.textField}
                        helperText={data.name.length <= 0 ? "This field is required." : ""}
                        margin="normal"
                    />
                    <TextField
                        required
                        id="standard-brand"
                        label="Brand"
                        error={data.brand.length <= 0}
                        value={data.brand}
                        onChange={this.handleChange("brand")}
                        InputLabelProps={{
                            shrink: true
                        }}
                        className={classes.textField}
                        helperText={data.brand.length <= 0 ? "This field is required." : ""}
                        margin="normal"
                    />
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Currency"
                        className={classes.textField}
                        value={data.currency}
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
                        value={data.price}
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
                        value={data.barcode}
                        onChange={this.handleNumberChange("barcode")}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true
                        }}
                        margin="normal"
                    />
                    <SaveDialog classes={classes} product={data} />

                </form></div>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired
};

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

export default withStyles(styles)(TextFields);
