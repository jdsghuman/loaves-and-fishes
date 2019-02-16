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
import moment from 'moment';
import Title from '../../../Title/Title';
import swal from "sweetalert";
import EditIcon from '@material-ui/icons/Edit';
import BackButton from '../../../BackButton/BackButton';
import AddIcon from '@material-ui/icons/Add';

class AdminManageOutletLocations extends Component {

  getAdminLocations = () => {
    this.props.dispatch({ type: 'FETCH_ADMIN_LOCATION' });
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CATEGORY_OUTLET' })
    this.props.dispatch({ type: 'FETCH_LOCATION_OUTLET' })
    this.getAdminLocations();
  }

  handleAddNewLocation = () => {
    this.props.history.push('/adminAddLocations');
  }

  editLocation = (id) => {
    this.props.dispatch({ type: 'SET_EDIT_LOCATION', payload: id })
    this.props.history.push(`/location/${id}`);
  }

  removeAdminLocations = (id) => {
    console.log('in remove categories', id)
    // Prompt user with alert before deleting location
    swal({
      title: "Are you sure?",
      text: "This will permanently delete the location. Are you sure you want to delete this location?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          this.props.dispatch({ type: 'DELETE_ADMIN_LOCATION', payload: id });
          swal("Deleted!", "Location has been deleted!", "success");
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
        <Title>Manage Outlet Locations</Title>
        <BackButton click={() => this.props.history.goBack()} />
        <Button
          className={classNames(classes.margin, classes.cssRoot)}
          onClick={this.handleAddNewLocation}><AddIcon/> Add New Location
        </Button>
        <div className="div__container-table">
          <div className={classes.root}>
            <Table >
              <TableHead>
                <TableRow>
                  <CustomTableCell>Meal Location</CustomTableCell>
                  <CustomTableCell>Street</CustomTableCell>
                  <CustomTableCell>City</CustomTableCell>
                  <CustomTableCell>State</CustomTableCell>
                  <CustomTableCell>Zip</CustomTableCell>
                  <CustomTableCell>County</CustomTableCell>
                  <CustomTableCell>Status</CustomTableCell>
                  <CustomTableCell>Notes</CustomTableCell>
                  <CustomTableCell>Updated By</CustomTableCell>
                  <CustomTableCell>Date Updated</CustomTableCell>
                  <CustomTableCell>Edit</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.reduxStore.adminLocationReducer.map((location) => {
                  console.log('checking ', location);
                  return (
                    <TableRow key={location.id} >
                      <TableCell >{location.location_name}</TableCell>
                      <TableCell >{location.street_address}</TableCell>
                      <TableCell >{location.city}</TableCell>
                      <TableCell >{location.state}</TableCell>
                      <TableCell >{location.zip}</TableCell>
                      <TableCell >{location.county}</TableCell>
                      <TableCell >{location.active ? 'Active' : 'Inactive'}</TableCell>
                      <TableCell >{location.notes}</TableCell>
                      <TableCell >{location.name}</TableCell>
                      <TableCell >{moment(location.date_updated).format('l')}</TableCell>
                      <TableCell >
                        <Button className={classes.editButton} onClick={() => this.editLocation(location.id)}><EditIcon /></Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
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

export default withStyles(styles)(connect(mapReduxStateToProps)(AdminManageOutletLocations));