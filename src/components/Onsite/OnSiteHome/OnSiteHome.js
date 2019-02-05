import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControlLabel } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import OnSiteDemo from '../OnSiteDemo/OnSiteDemo';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

class OnSiteHome extends Component {

    state = {
        value: 'no',
        selectedLocation: '',
        collectDemographics: 'yes',
        farm: false,
        summer: false
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
    };


    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_LOCATIONS' })
    }

    handleLocationChange = (event) => {
        console.log('in handleLocationChange');
        this.setState({
            ...this.state,
            selectedLocation: event.target.value
        })
    }

    handleFarmChange = () => {
        if (this.state.farm === false) {
            this.setState({
                ...this.state,
                farm: true
            })
        }
        else {
            this.setState({
                ...this.state,
                farm: false
            })
        }
    }

    handleSummerChange = () => {
        if (this.state.summer === false) {
            this.setState({
                ...this.state,
                summer: true
            })
        }
        else {
            this.setState({
                ...this.state,
                summer: false
            })
        }
    }

    render() {

        let locations =
            this.props.reduxStore.locationReducer.map(location => {
                return (
                    <MenuItem key={location.id} value={location} id={location.id}>{location.location_name}</MenuItem>
                );
            })

        console.log(this.state);


        return (
            <div>
                <FormControl >
                    <InputLabel>Location</InputLabel>
                    <Select
                        label="Select Location"
                        onChange={this.handleLocationChange}
                        value={this.state.selectedLocation}
                    >
                        {locations}
                    </Select>
                </FormControl>
                <br />
                <Checkbox
                    onChange={this.handleFarmChange}
                    value="farm"
                />
                <ListItemText style={checkboxStyle} primary="Farm to Table" />
                <br />
                <Checkbox 
                    onChange={this.handleSummerChange}
                    value="summer"
                />
                <ListItemText style={checkboxStyle} primary="Summer Meal" />
                <br />
                <FormControl>

                    <RadioGroup
                        aria-label="Collect Demographics"
                        name="Collect Demographics"
                        value={this.state.value}
                        onChange={this.handleChange}
                        style={checkboxStyle}
                    >
                        <FormLabel>Collect Demographics</FormLabel>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <br />
                <Button variant="contained">Collect Data</Button>
            </div>
        )
    }
}

const checkboxStyle = {
    display: 'inline-block',
    margin: '5px'
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(withRouter(OnSiteHome));