import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

class OnSiteDemo extends Component {

    state = {
        selectedGender: '',
        selectedRace: '',
        selectedAge: '',
        value: 1
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_GENDER' })
        this.props.dispatch({ type: 'FETCH_RACE' })
        this.props.dispatch({ type: 'FETCH_AGE' })
    }

    handleGenderChange = (event) => {
        console.log('in handleGenderChange');
        this.setState({
            ...this.state,
            selectedGender: event.target.value
        })
    }

    handleRaceChange = (event) => {
        console.log('in handleGenderChange');
        this.setState({
            ...this.state,
            selectedRace: event.target.value
        })
    }

    handleAgeChange = (event) => {
        console.log('in handleAgeChange');
        this.setState({
            ...this.state,
            selectedAge: event.target.value
        })
    }

    handleSubmit = () => {
        console.log('in handleSubmit');
        // axios post this.props.dispatch({ type: "SET_AGE", payload: this.state })
    }

    render() {
        let locationName = this.props.reduxStore.onSiteReducer.selectedLocation.location_name
        return (
            <div>
                <p>Onsite Demo</p>
                <p>{locationName}</p>
                <FormControl>
                    <InputLabel shrink htmlFor="select-multiple-native">
                        Gender
          </InputLabel>
                    <Select>
                        Gender
                    </Select>
                </FormControl>
                <br />

                <FormControl>
                    <InputLabel shrink htmlFor="select-multiple-native">
                        Race
          </InputLabel>
                    <Select>
                        Race
                    </Select>
                </FormControl>
                <br />
                <FormControl>
                    <InputLabel shrink htmlFor="select-multiple-native">
                        Age
          </InputLabel>
                    <Select>
                        Age
                    </Select>
                </FormControl>
                <br />
                <Button>Submit</Button>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(OnSiteDemo);