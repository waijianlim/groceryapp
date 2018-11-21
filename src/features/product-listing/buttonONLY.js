import React from 'react'
import ProductListItem from './product-list-item'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';


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

  function FloatingActionButtons(props) {
    const { classes } = props;
    return (
      <div>
        <Button href={'/editItem/'+ props.product.id} variant="fab" color="secondary" aria-label="Edit" className={classes.button}>
          <Icon>edit_icon</Icon>
        </Button>
        <Button variant="fab" disabled aria-label="Delete" className={classes.button}>
          <DeleteIcon />
        </Button>
      </div>
    );
  }

  FloatingActionButtons.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(FloatingActionButtons);