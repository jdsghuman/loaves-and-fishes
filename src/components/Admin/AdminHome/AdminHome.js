import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Title from '../../Title/Title';

class AdminHome extends Component {

    handleSubmitUsers = () => {
        this.props.history.push('/adminUser');
    }
    handleSubmitCategories = () => {
        this.props.history.push('/adminCategories');
    }
    handleClickManageOutletLocations = () => {
        this.props.history.push('/adminManageOutletLocations');
    }

    render() {
        return (
            <div className="div__container container__background--large">
                <Title>Admin</Title>
                <div style={divStyle}>
                    <Button style={btnStyle} variant="contained" color="primary" onClick={this.handleSubmitUsers}>Users </Button>
                </div>
                <div style={divStyle}>
                    <Button style={btnStyle} variant="contained" color="primary" onClick={this.handleSubmitCategories}>Manage Outlet Categories </Button>
                </div>
                <div style={divStyle}>
                    <Button style={btnStyle} variant="contained" color="secondary" onClick={this.handleClickManageOutletLocations}>Manage Outlet Locations </Button>
                </div>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxStore) => ({
    reduxStore
})

const divStyle = {
    display: 'inline-block',
    marginBottom: '20px'
}

const btnStyle = {
    height: '75px',
    width: '250px',
    margin: '10px'
}

export default connect(mapReduxStateToProps)(AdminHome);