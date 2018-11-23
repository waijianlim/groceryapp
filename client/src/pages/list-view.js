import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from "@material-ui/core/TablePagination";
import ProductService from '../product-service'
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

import classNames from "classnames";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";

import ButtonONLY from '../features/product-listing/buttonONLY';
import AddButton from './homepageAddIcon'
import queryString from 'query-string'

const styles = theme => ({
  root: {
    width: 'auto',
    margin: 10,
    overflowX: 'auto',
  },
  mainSearch: {
    width: 'auto',
    overflowX: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit + 10,
  },
  mainTable: {
    width: 'auto',
    marginTop: 10,
    overflowX: 'auto',
  },
  icon: {
    marginTop: theme.spacing.unit * 2 + 10,
    margin: theme.spacing.unit * 2,
  },
  paper: {
    padding: 15,
  },
  table: {
    minWidth: 700,
  },
});

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headers = [
  { id: "id", numeric: true, disablePadding: false, label: "ID" },
  { id: "name", numeric: false, disablePadding: true, label: "Product Name" },
  { id: "brand", numeric: false, disablePadding: false, label: "Brand" },
  { id: "barcode", numeric: true, disablePadding: false, label: "UPC12 Barcode" },
  { id: "currencyLabel", numeric: true, disablePadding: false, label: "Currency" },
  { id: "price", numeric: true, disablePadding: false, label: "Price" },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      order,
      orderBy
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          {headers.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
          <TableCell ><AddButton product={{}} /></TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              Nutrition
          </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

class ListView extends Component {

  state = {
    order: "asc",
    orderBy: "name",
    data: [],
    page: 0,
    selected: [],
    rowsPerPage: 20,
    loading: true,
    error: null,
    nameQ: "",
    brandQ: "",
  };

  componentDidMount() {
    const queries = queryString.parse(this.props.location.search)
    this.setState({ 
      nameQ: queries.nameQ!=null?queries.nameQ:"",
      brandQ: queries.brandQ!=null?queries.brandQ:"",
     },()=>{
      this.reloadItems();
     }
    );
  }

  searchAction = () => {
    // update url
    const {nameQ, brandQ} = this.state;
    let queries = [];
    if(nameQ != null && nameQ.length > 0) {
        queries.push("nameQ=" + nameQ);
    }
    if(brandQ != null && brandQ.length > 0) {
        queries.push("brandQ=" + brandQ);
    }
    let query = "";
    if(queries.length > 0) {
        query= "?" + queries.join("&");
    }
    this.props.history.push(this.props.location.pathname + query);
    this.reloadItems();
  }

  reloadItems = () => {
    this.setState({
      loading: true
    })
    let service = ProductService.getInstance();
    const {nameQ, brandQ} = this.state;
    service.getAllProducts({nameQ:nameQ, brandQ:brandQ}).then((data) => {
      this.setState({
        data: data,
        loading: false,
        error: null
      })
    }, (error) => {
      this.setState({
        data: [],
        loading: false,
        error: error,
      })
    })
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { data, selected, order, orderBy, rowsPerPage, page, loading, error, nameQ, brandQ } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    if (error != null) {
      return (
        <div>
          <h1> ERROR : {error.message}</h1>
          <p> {error.stack} </p>
        </div>)
    }
    return (
      <div className={classes.root}>
        <Paper className={classes.mainSearch}>
                <SearchIcon className={classes.icon} />
          <TextField
            id="standard-name"
            label="Name"
            className={classes.textField}
            value={nameQ}
            onChange={this.handleChange('nameQ')}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Brand"
            className={classes.textField}
            value={brandQ}
            onChange={this.handleChange('brandQ')}
            margin="normal"
          />
          <Button variant="contained" color="primary" className={classes.button} onClick={this.searchAction}>
            Search
      </Button>

        </Paper>
        <Paper className={classes.mainTable}>
          {loading ? (<LinearProgress />) : null}
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover key={row.id}>
                      {headers.map(each => {
                        return (
                          <TableCell key={each.id} numeric={each.numeric}>{row[each.id]}</TableCell>
                        )
                      })}
                      <TableCell><ButtonONLY product={row} reloadTable={this.reloadItems} showLoading={() => this.setState({ loading: true })} /></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && data.length < 20 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}

ListView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ListView));
