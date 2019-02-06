import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '5px',
    marginTop: '10px',
    height: '40px',
  }
});

class RegisterPage extends Component {
  state = {
    name: '',
    email: '',
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.name && this.state.email) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          name: this.state.name,
          email: this.state.email
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h1 className="login__title">Register User</h1>
          <div>
            <TextField
              label="Name"
              className={this.props.classes.textField}
              name="name"
              value={this.state.name}
              onChange={this.handleInputChangeFor('name')}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              label="Email"
              className={this.props.classes.textField}
              name="email"
              value={this.state.email}
              onChange={this.handleInputChangeFor('email')}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              label="Username"
              className={this.props.classes.textField}
              name="username"
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              label="Password"
              className={this.props.classes.textField}
              ype="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <button
              className="register"
              type="submit"
              name="submit"
              value="Register"
            >Register</button>
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));

