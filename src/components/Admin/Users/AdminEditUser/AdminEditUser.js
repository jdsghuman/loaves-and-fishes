import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from '../../../Title/Title';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import swal from "sweetalert";

class AdminEditUser extends Component {
  state = {
    editUser: {
      name: '',
      username: '',
      email: '',
      status: '',
      new: '',
      admin: ''
    }
  }

  checkData = () => {
    if(Object.keys(this.state.editUser).length == 0) {
      this.props.history.push('/admin');
    }
  }

  componentDidMount() {
    this.getUserData();
    this.checkData();
  }

  componentWillMount() {
    // Redirect the user to the Admin home screen if page is refreshed 
    if (this.props.users.length === 0) {
        this.props.history.push('/admin');
    }
}

  getUserData = () => {
    // Get id of user
    let userId = parseInt(this.props.match.params.id);
    // Filter to show selected User
    const result = this.props.users.filter(user => user.id === userId);
    this.setState({
      editUser: {
        ...result[0]
      }
    })
  }

  handleChange = event => {
    this.setState({
      editUser: {
        ...this.state.editUser,
        [event.target.name]: event.target.value
      }
    })
  }

  handleUpdateUserClick = () => {
    this.props.dispatch({ type: 'EDIT_USER', payload: this.state.editUser });
    swal({
      title: `Updated user ${this.state.editUser.name}`,
      text: "User successfully updated",
      icon: "success",
      buttons: "Ok",
      // dangerMode: true,
    })
      // .then(willDelete => {
      //   if (willDelete) {
      //     this.props.dispatch({ type: 'DELETE_USERS', payload: id });
      //     swal("Deleted!", "User has been deleted!", "success");
      //   }
      //   else {
      //     swal("Deletion has been canceled")
      //   }
      // });    
    this.props.history.push('/admin');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="div__container container__background--large">
        <Title>Edit User: <span style={{ color: '#98223e' }}>{this.state.editUser.name}</span></Title>
        {/* Edit Name */}
        <div>
          <FormLabel style={formLabelStyle}>Name</FormLabel>
          <TextField
            id="outlined-name"
            label="Name"
            name="name"
            value={this.state.editUser.name}
            onChange={this.handleChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              style: {
                color: '#888888',
                fontWeight: '300',
              }
            }}
          />
        </div>
        {/* Edit Username */}
        <div>
          <FormLabel style={formLabelStyle}>Username</FormLabel>
          <TextField
            id="outlined-name"
            label="Username"
            name="username"
            value={this.state.editUser.username}
            onChange={this.handleChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              style: {
                color: '#888888',
                fontWeight: '300',
              }
            }}
          />
        </div>
        {/* Edit Email */}
        <div>
          <FormLabel style={formLabelStyle}>Email</FormLabel>
          <TextField
            id="outlined-name"
            label="Email"
            name="email"
            value={this.state.editUser.email}
            onChange={this.handleChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              style: {
                color: '#888888',
                fontWeight: '300',
              }
            }}
          />
        </div>
        {/* Status */}
        <FormLabel style={formLabelStyle}>Status</FormLabel>
        <FormControl className={this.props.classes.formControl}>
          <Select
            value={this.state.editUser.status}
            name="status"
            style={{ height: '40px', width: '200px' }}
            onChange={this.handleChange}
            inputProps={{
              name: 'status',
            }}
          >
            <MenuItem value="true">
              <em>Active</em>
            </MenuItem>
            <MenuItem value="false">
              <em>Inactive</em>
            </MenuItem>

          </Select>
        </FormControl>
        {/* Role */}
        <FormLabel style={formLabelStyle}>Role</FormLabel>
        <FormControl className={this.props.classes.formControl}>
          <Select
            value={this.state.editUser.admin}
            name="admin"
            style={{ height: '40px', width: '200px' }}
            onChange={this.handleChange}
            inputProps={{
              name: 'admin',
            }}
          >
            <MenuItem value="true">
              <em>Admin</em>
            </MenuItem>
            <MenuItem value="false">
              <em>SC</em>
            </MenuItem>
          </Select>
        </FormControl>
        <div>
        </div>
        <div style={divStyle}>
          <Button
            className={classNames(classes.margin, classes.cssRoot)}
            onClick={this.handleUpdateUserClick}>Update User</Button>
        </div>
      </div>
    )
  }
}

const divStyle = {
  display: 'inline-block',
  margin: '20px'
}


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
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
  textField: {
    backgroundColor: '#ffffff',
    margin: '5px'
  }
});

const formLabelStyle = {
  display: 'block',
  marginTop: '15px',
  paddingBottom: '0',
  color: '#98223e'
}

const mapStateToProps = store => ({
  users: store.userListReducer
})

export default withStyles(styles)(connect(mapStateToProps)(AdminEditUser));