import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

class AdminManageOutletLocations extends Component {

    handleAddNewLocation = () => {
        this.props.history.push('/adminAddLocations');
    }

    render() {
        return (
            <div>
                <p>admin manage outlet locations</p>
                <Button variant="contained" color="primary" onClick={this.handleAddNewLocation}>Add New Location</Button>
            </div>
        )
    }
}

export default connect()(AdminManageOutletLocations);