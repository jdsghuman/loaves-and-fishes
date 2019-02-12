import React, { Component } from 'react';
import Title from '../../Title/Title';
import { connect } from 'react-redux';

class AdminEditLocation extends Component {
    render() {
        return (
            <div>
                <Title>Edit Location</Title>
                <p>{this.props.reduxStore.editLocationReducer}</p>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStateToProps)(AdminEditLocation);