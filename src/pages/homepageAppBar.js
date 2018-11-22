import React from 'react';
// APP BAR
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
// import Dashboard from '@material-ui/icons/Dashboard';
import ListAlt from '@material-ui/icons/ListAlt';
import {Link} from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 23,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class MenuHandlerButton extends React.Component {
  state = {
    mobileMoreAnchorEl: null,
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit"  component={Link} to="/listview" onClick={this.handleMobileMenuClose}>
              <ListAlt />
          </IconButton>
          <p>List View</p>
        </MenuItem>
        {/* <MenuItem component={Link} to="/dashboard" onClick={this.handleMobileMenuClose}>
          <IconButton  color="inherit">
              <Dashboard />
          </IconButton>
          <p>Dashboard</p>
        </MenuItem> */}
        
      </Menu>
    );

    return (
      <div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            <IconButton color="inherit" component={Link} to="/listView">
                  <ListAlt />
              </IconButton>
              {/* <IconButton color="inherit" component={Link} to="/dashboard">
                  <Dashboard />
              </IconButton>   */}
            </div>
        {renderMobileMenu}
      </div>
    );
  }
}

const MenuHandler = withStyles(styles)(MenuHandlerButton)

function SearchAppBar(props) {
const { classes } = props;
return (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
      <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
        <Typography  className={classes.title} variant="h6" color="inherit" noWrap>
        Infinity Store
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search Products…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
          <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
          <MenuHandler classes={classes}/>
          </div>
      </Toolbar>
    </AppBar>
  </div>
);
}

SearchAppBar.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchAppBar);