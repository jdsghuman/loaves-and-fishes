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

class OnSiteHome extends Component {

    state = {
        value: 'yes',
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
    };


    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_LOCATIONS' })
    }

    render() {

        let locations =
            this.props.reduxStore.locationReducer.map(location => {
                return (
                    <MenuItem id={location.id}>{location.location_name}</MenuItem>
                );
            })

        return (
            <div>
                <Select>
                    {locations}
                </Select>
                <br />
                <Checkbox />
                <ListItemText style={checkboxStyle} primary="Farm to Table" />
                <br />
                <Checkbox />
                <ListItemText style={checkboxStyle} primary="Summer Meal" />
                <br/>
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

export default connect(mapStateToProps)(OnSiteHome);