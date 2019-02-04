import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminHome extends Component {

    render() {
        return (
            <div>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStateToProps)(AdminHome);