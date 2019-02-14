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
import EditIcon from '@material-ui/icons/Edit';
import Title from '../../../Title/Title';
import moment from 'moment';
import swal from "sweetalert";
import AddIcon from '@material-ui/icons/Add';
import BackButton from '../../../BackButton/BackButton';

class AdminManageOutletCategories extends Component {

  getCategories = () => {
    this.props.dispatch({ type: 'FETCH_CATEGORY_OUTLET' });
  }

  componentDidMount() {
    this.getCategories();
  }

  handleAddCategories = () => {
    this.props.history.push('/adminAddOutletCategories');
  }

  editCategories = (id) => {
    this.props.history.push(`adminEditOutletCategories/${id}`);
  }

  removeCategories = (id) => {
    console.log('in remove categories', id)
    swal({
      title: "Are you sure?",
      text: "This will permanently delete the outlet category. Are you sure you want to delete this category?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          this.props.dispatch({ type: 'DELETE_CATEGORY_OUTLET', payload: id });
          swal("Deleted!", "Outlet category has been deleted!", "success");
        }
        else {
          swal("Deletion has been canceled")
        }
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Title>Manage Outlet Categories</Title>
        <BackButton click={() => this.props.history.goBack()} />
        <div className="div__container-table">
          <div className={classes.root}>
            <Button
              className={classNames(classes.margin, classes.cssRoot)}
              onClick={this.handleAddCategories}>
              <AddIcon />Add New Category Outlet
        </Button>
            <div className={classes.root}>
              <Table>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Category Name</CustomTableCell>
                    <CustomTableCell>Sub Category</CustomTableCell>
                    <CustomTableCell>Notes</CustomTableCell>
                    <CustomTableCell>Status</CustomTableCell>
                    <CustomTableCell>Updated By</CustomTableCell>
                    <CustomTableCell>Date Updated</CustomTableCell>
                    <CustomTableCell>Edit</CustomTableCell>
                    <CustomTableCell>Delete</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.reduxStore.categoryReducer.map((category) => {
                    // console.log('checking ', category);
                    return (
                      <TableRow key={category.id} >
                        <TableCell >{category.category_name}</TableCell>
                        <TableCell >{category.sub_category_name}</TableCell>
                        <TableCell >{category.notes}</TableCell>
                        <TableCell >{category.active ? 'Active' : 'Inactive'}</TableCell>
                        <TableCell >{category.name}</TableCell>
                        <TableCell >{moment(category.date_updated).format('l')}</TableCell>
                        <TableCell ><Button className={classes.editButton} onClick={() => this.editCategories(category.id)}><EditIcon /></Button></TableCell>
                        <TableCell ><Button className={classes.deleteButton} onClick={() => this.removeCategories(category.id)}><DeleteIcon /></Button></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
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
  editButton: {
    background: '#b3b428',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#939324',
    },
  },
  deleteButton: {
    background: '#98223e',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#6a172b',
    },
  }
});

const mapReduxStateToProps = (reduxStore) => ({
  reduxStore
})

export default withStyles(styles)(connect(mapReduxStateToProps)(AdminManageOutletCategories));