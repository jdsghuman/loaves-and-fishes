import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

class AdminHome extends Component {

    handleSubmit = () => {
        this.props.history.push('/adminUser');
    }
    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>Users </Button>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStateToProps)(AdminHome);