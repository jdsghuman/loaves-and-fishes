import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';




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
            <div>
                
                 <Button variant="contained" color="primary" onClick={this.handleSubmitUsers}>Users </Button>
                <Button variant="contained" color="primary" onClick={this.handleSubmitCategories}>Manage Outlet Categories </Button>
                <Button variant="contained" color="secondary" onClick={this.handleClickManageOutletLocations}>Manage Outlet Locations </Button>

            </div>
        )
    }
}

const mapReduxStateToProps = (reduxStore) => ({
    reduxStore
})

export default withStyles()(connect(mapReduxStateToProps)(AdminHome));