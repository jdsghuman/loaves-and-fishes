import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Title from '../../Title/Title';
import MyLocation from '../../MyLocation/MyLocation';
import './OnSiteDemo.css';

class OnSiteDemo extends Component {

    state = {
        selectedGender: null,
        selectedRace: null,
        selectedAge: null,
        value: 1,
        location: this.props.onSite.selectedLocation.id,
        farm: '',
        summer: '',
        time: '',
        count: 0
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            farm: this.props.onSite.farm,
            summer: this.props.onSite.summer,
            time: this.props.onSite.time
        })
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
        this.props.dispatch({ type: "ADD_DEMO", payload: this.state })
        this.setState({
            ...this.state,
            count: this.state.count +1,
            selectedGender: null,
            selectedRace: null,
            selectedAge: null
        })
    }

    render() {
        let genderList =
            this.props.demo.map(gender => {
                return (
                    // fix value it's working but not correct way of doing it!!
                    <option key={gender.id} value={gender.id}>{gender.gender_name}</option>
                );
            })

        let raceList =
            this.props.demo.map(race => {
                return (
                    // fix value it's working but not correct way of doing it!!
                    <option key={race.id} value={race.id}>{race.race_name}</option>
                );
            })

        let ageList =
            this.props.demo.map(age => {
                if( age.age_category !== 'Generic Adult' && age.age_category !== 'Generic Child'){
                return (
                    // fix value it's working but not correct way of doing it!!
                    // also GENERIC CHILD displays
                    <option key={age.id} value={age.id}>{age.age_category}</option>
                );
                }
            })

        console.log('handleAgeChange AFTER click', this.state);
        return (
            <div className="div__container container__background">
                <Title>OnSite Demographics</Title>
                <div className="count__container">
                    <h3 className="count__total-display">Total: <span style={{ fontWeight: '700', color: '#98223e' }}>{this.state.count}</span></h3>
                </div>
                {/* <MyLocation location={this.props.onSite.selectedLocation || 'Location unavailable'} /> */}
                <br />
                <FormControl>
                    <InputLabel shrink htmlFor="select-multiple-native">
                        Select Gender
                    </InputLabel>
                    <Select
                        multiple
                        native
                        value={this.state.selectedGender}
                        onChange={this.handleGenderChange}
                        inputProps={{
                            id: 'select-multiple-native',
                        }}
                    >
                        {genderList} 
                        ))}
                    </Select>
                </FormControl>
                <br/>
                <br/>
                <br/>
                <FormControl>
                    <InputLabel shrink htmlFor="select-multiple-native">
                        Select Race
                    </InputLabel>
                    <Select
                        multiple
                        native
                        value={this.state.selectedRace}
                        onChange={this.handleRaceChange}
                        inputProps={{
                            id: 'select-multiple-native',
                        }}
                    >
                        {raceList}
                        ))}
                    </Select>
                </FormControl>
                <br />
                <br/>
                <br/>
                <FormControl>
                    <InputLabel shrink htmlFor="select-multiple-native">
                        Select Age
                    </InputLabel>
                    <Select
                        multiple
                        native
                        value={this.state.selectedAge}
                        onChange={this.handleAgeChange}
                        inputProps={{
                            id: 'select-multiple-native',
                        }}
                    >
                        {ageList}
                        ))}
                    </Select>
                </FormControl>
                <br />
                <br/>
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    onSite: reduxStore.onSiteReducer,
    demo: reduxStore.demoReducer,
    // onSiteReducer: reduxStore.onSiteReducer
});

export default connect(mapStateToProps)(OnSiteDemo);