import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';

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


    render() {
        return (
            <div>
            <p>Admin user view</p>
            <Table >
            <TableHead>
              <TableRow>
                <CustomTableCell>New</CustomTableCell>
                <CustomTableCell>Name</CustomTableCell>
                <CustomTableCell>Email</CustomTableCell>
                <CustomTableCell>Status</CustomTableCell>
                <CustomTableCell>Role</CustomTableCell>
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
                    <TableCell >{list.status}</TableCell>
                    <TableCell >{list.admin ? 'Admin' : 'SC'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxStore) => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStateToProps)(AdminUsers));