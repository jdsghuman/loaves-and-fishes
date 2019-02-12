import React, { Component } from 'react';
import Title from '../../../Title/Title';
import { connect } from 'react-redux';

class AdminEditLocation extends Component {
    state = {
        editLocation: {
            
        }
    }
    render() {
        return (
            <div className="div__container container__background--large">
                <Title>Edit Location: </Title>
                <p>{this.props.reduxStore.editLocationReducer}</p>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStateToProps)(AdminEditLocation);