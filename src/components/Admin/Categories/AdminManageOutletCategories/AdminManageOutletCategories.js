import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import Title from '../../../Title/Title';

class AdminManageOutletCategories extends Component {

  getCategories = () => {
    this.props.dispatch({ type: 'FETCH_CATEGORY_OUTLET' });
  }

  componentDidMount() {
    this.getCategories();
  }

  handleAddCategories = () => {
    this.props.history.push('/adminAddCategories');
  }

  removeCategories = (id) => {
    console.log('in remove categories', id)
    this.props.dispatch({ type: 'DELETE_CATEGORY_OUTLET', payload: id })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Title>Manage Outlet Categories</Title>
        <Button
          className={classNames(classes.margin, classes.cssRoot)}
          onClick={this.handleAddCategories}>Add New Category Outlet
        </Button>
        <Table >
          <TableHead>
            <TableRow>
              <CustomTableCell>Category Name</CustomTableCell>
              <CustomTableCell>Sub-Category</CustomTableCell>
              <CustomTableCell>Notes</CustomTableCell>
              <CustomTableCell>Delete</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.reduxStore.categoryReducer.map((category) => {
              console.log('checking ', category);
              return (
                <TableRow key={category.id} >
                  <TableCell >{category.category_name}</TableCell>
                  <TableCell >{category.sub_category}</TableCell>
                  <TableCell >{category.notes}</TableCell>
                  <TableCell ><Button size="small" variant="contained" color="secondary" onClick={() => this.removeCategories(category.id)}><DeleteIcon /></Button></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssRoot: {
    color: theme.palette.getContrastText('#98223e'),
    backgroundColor: '#98223e',
    '&:hover': {
      backgroundColor: '#6a172b',
    },
  },
});

const mapReduxStateToProps = (reduxStore) => ({
  reduxStore
})

export default withStyles(styles)(connect(mapReduxStateToProps)(AdminManageOutletCategories));