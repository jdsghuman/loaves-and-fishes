import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
  });

class AdminUsers extends Component {

    getListofUsers = () => {
        this.props.dispatch({ type: 'FETCH_USER_LIST' });
    }

    componentDidMount () {
        this.getListofUsers();
    }

    removeUsers = (id) => {
        console.log('in remove users', id)
        this.props.dispatch({ type: 'DELETE_USERS', payload: id})
    }

    handleChange = () => {
        
    }

    render() {
        return (
            <div>
            <p className="adminUserHeader">Admin user view</p>
            <Table >
            <TableHead>
              <TableRow>
                <CustomTableCell>New</CustomTableCell>
                <CustomTableCell>Name</CustomTableCell>
                <CustomTableCell>Email</CustomTableCell>
                <CustomTableCell>Status</CustomTableCell>
                <CustomTableCell>Role</CustomTableCell>
                <CustomTableCell>Delete</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.reduxStore.userListReducer.map((list) => {
                  console.log('checking ', list);
                return (
                  <TableRow key={list.id}>
                    <TableCell >{list.new ? <StarIcon color="secondary" /> : null}</TableCell>
                    <TableCell >{list.name}</TableCell>
                    <TableCell >{list.email}</TableCell>
                    <TableCell >
                    <Select> 
                        <MenuItem>{list.status ? 'Active' : 'Inactive'}</MenuItem>
                        <MenuItem>{list.status ? 'Inactive' : 'Active'}</MenuItem>
                    </Select>
                    </TableCell>
                    <TableCell >{list.admin ? 'Admin' : 'SC'}</TableCell>
                    <TableCell><Button size="small" variant="contained" color="secondary" onClick={() => this.removeUsers(list.id)}>Delete</Button></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Button size="Large" variant="contained" color="Secondary" >Update</Button>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxStore) => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStateToProps)(AdminUsers));