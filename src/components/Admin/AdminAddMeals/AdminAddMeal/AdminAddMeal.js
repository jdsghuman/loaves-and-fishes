import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AdminAddMeal extends Component {

    state = {
        count: 0,
        categorizebyage: false,
        selectedGender: null,
        selectedRace: null,
        selectedAge: null,
        location: '',
        farm: false,
        summer: false,
        time: moment().format(),
        genericAdult: 0,
        genericChild: 0,
        selectedAgeAdult: '',
        selectedAgeChild: ''
    };

    handleLocationChange = (event) => {
        console.log(event.target.value)
        console.log('in handleLocationChange');
        this.setState({
            ...this.state,
            location: event.target.value
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

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_LOCATIONS' })
    }

    handleChange = name => event => {
        this.setState({
            count: event.target.value,
        });
    };

    handleChangeDate = propertyName => event => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value
        });
    };

    handleSubmit = () => {
            this.props.dispatch({ type: "ADD_MEAL_COUNT", payload: this.state })
            this.setState({
                ...this.state,
                count: 0,
                farm: false,
                summer: false,
                time: '',
                location: ''
            })
            this.props.history.push('/admin');
    }
    render() {
        let locations =
        this.props.reduxStore.locationReducer.map(location => {
            return (
                <MenuItem key={location.id} value={location.id} id={location.id}>{location.location_name}</MenuItem>
            );
        })

    console.log(this.state);

        return (
            <div className="div__container container__background">
            <h1>Add Meal </h1> 
            <FormControl >
                    <InputLabel>Location</InputLabel>
                    <Select
                        onChange={this.handleLocationChange}
                        value={this.state.location}
                        style={{ height: '40px', width: '150px' }}
                    >
                        {locations}
                    </Select>
                </FormControl> 
                <br/>
                <TextField
                    name="Time"
                    type="date"
                    value={this.state.time}
                    onChange={this.handleChangeDate('time')}
                    margin="normal"
                    variant="outlined"
                />
                <br />
                <TextField
                            value={this.state.count}
                            type="number"
                            margin="normal"
                            variant="outlined"
                            label="count"
                            onChange={this.handleChange()}
                />
                <br/>
                <Checkbox
                    onChange={this.handleFarmChange}
                    value={this.state.farm}
                    color="primary"
                />
                <ListItemText style={checkboxStyle} primary="Farm to Table" />
                <br />
                <Checkbox
                    onChange={this.handleSummerChange}
                    value={this.state.summer}
                    color="primary"
                />
                <ListItemText style={checkboxStyle} primary="Summer Meal" />
                <br/> 
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
                
            </div>
        )
    }
}
const checkboxStyle = {
    display: 'inline-block',
    margin: '5px'
}

const mapReduxStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStateToProps)(AdminAddMeal);