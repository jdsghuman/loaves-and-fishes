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
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import moment from 'moment';
import Title from '../../Title/Title';

class OnSiteHome extends Component {

    state = {
        value: 'no',
        selectedLocation: '',
        collectDemographics: 'yes',
        farm: false,
        summer: false,
        time: moment().format()
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

    handleClick = () => {
        this.props.dispatch({type: "SET_ONSITE", payload: this.state})
        if(this.state.value === 'yes'){
            this.props.history.push('/onSiteDemo')
        }else{
            this.props.history.push('/onSiteMeal')
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
                <Title>OnSite Home</Title>
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
                    color="primary"
                />
                <ListItemText style={checkboxStyle} primary="Farm to Table" />
                <br />
                <Checkbox
                    onChange={this.handleSummerChange}
                    value="summer"
                    color="primary"
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
                        <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
                    </RadioGroup>
                </FormControl>
                <br />
                <Button variant="contained" color="primary" onClick={this.handleClick}>Collect Data</Button>
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