import React, { Component } from 'react';
import Title from '../../../Title/Title';
import { connect } from 'react-redux';

class AdminEditLocation extends Component {
    state = {
        editLocation: {
            location_name: '',
            category_name: '',
            street_address: '',
            city: '',
            state: '',
            zip: '',
            county: '',
            active: '',
            notes: '',
            name: '',
            date_updated: ''
        }
    }

    componentDidMount() {
        this.getLocationData();
    }

    getLocationData = () => {
        // Get id of location
        let locationId = parseInt(this.props.match.params.id);
        // Filter to show selected location in fields
        const result = this.props.adminLocationReducer.filter(location => location.id === locationId);
        this.setState({
            editLocation: {
                ...result[0],
            }
        })
    }
    render() {
        return (
            <div className="div__container container__background--large">
                <Title>Edit Location: </Title>
                {JSON.stringify(this.state)}
                <p>--------</p>
                {JSON.stringify(this.props.adminLocationReducer)}
            </div>
        )
    }
}

const mapReduxStateToProps = store => ({
    adminLocationReducer: store.adminLocationReducer
})

export default connect(mapReduxStateToProps)(AdminEditLocation);