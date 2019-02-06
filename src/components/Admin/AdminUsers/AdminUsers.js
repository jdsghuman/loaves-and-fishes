import React, { Component } from 'react';
import { connect } from 'react-redux';


<<<<<<< HEAD
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
  const inputs = {
    admin: '',
    status: ''
}

class AdminUsers extends Component {

  state = inputs;

    getListofUsers = () => {
        this.props.dispatch({ type: 'FETCH_USER_LIST' });
    }
=======


 

class AdminUsers extends Component {

>>>>>>> master


     

    editUsers = (personId) => {
      const data = {
          ...this.state,
          id: personId
      }
      console.log('in edit users')
      this.props.dispatch({ type: 'EDIT_USERS', payload: data })
      this.setState({
          inputs
      })   
  }

    render() {
        return (
            <div>
<<<<<<< HEAD
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
                    <TableCell >{list.status ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell >{list.admin ? 'Admin' : 'SC'}</TableCell>
                    <TableCell><Button size="small" variant="contained" color="secondary" onClick={() => this.removeUsers(list.id)}>Delete</Button></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {/* <Button size="small" variant="contained" color="primary" onClick={() => this.editUsers(list.id)}>Update</Button> */}
=======
            <p>Admin user view</p>
           
         
              
        
>>>>>>> master
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStateToProps)(AdminUsers);