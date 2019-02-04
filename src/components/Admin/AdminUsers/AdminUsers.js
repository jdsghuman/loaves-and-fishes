import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



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
                <TableCell>New</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Username</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.reduxStore.userListReducer.map((list) => {
                  console.log('checking ', list);
                return (
                  <TableRow key={list.id}>
                    <TableCell >{list.new}</TableCell>
                    <TableCell >{list.active}</TableCell>
                    <TableCell >{list.username}</TableCell>
                    <TableCell >{list.username}</TableCell>
                    <TableCell >{list.username}</TableCell>
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

export default connect(mapReduxStateToProps)(AdminUsers);