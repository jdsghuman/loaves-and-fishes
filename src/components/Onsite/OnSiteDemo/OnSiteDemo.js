import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import Title from '../../Title/Title';
import MyLocation from '../../MyLocation/MyLocation';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import './OnSiteDemo.css';
import BackButton from '../../BackButton/BackButton';

class OnSiteDemo extends Component {
    state = {
        selectedGender: '',
        selectedRace: '',
        selectedAge: '',
        value: 1,
        location: this.props.onSite.selectedLocation,
        farm: '',
        summer: '',
        time: '',
        count: 0
    }

    componentWillMount() {
        if (this.props.onSite.selectedLocation.location_name === '') {
            this.props.history.push('/home');
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            farm: this.props.onSite.farm,
            summer: this.props.onSite.summer,
            time: this.props.onSite.time,
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
            count: this.state.count + 1,
            selectedGender: '',
            selectedRace: '',
            selectedAge: ''
        })
    }

    render() {
        const { classes } = this.props;

        let genderList =
            this.props.gender.map(gender => {
                return (
                    <option key={gender.id} value={gender.id}>{gender.gender_name}</option>
                );
            })

        let raceList =
            this.props.race.map(race => {
                return (
                    <option key={race.id} value={race.id}>{race.race_name}</option>
                );
            })

        let ageList =
            this.props.age.map(age => {
                if (age.age_category !== 'Generic Adult' && age.age_category !== 'Generic Child') {
                    return (
                        <option key={age.id} value={age.id}>{age.age_category}</option>
                    );
                }
            })
        console.log('handleChange AFTER click', this.state);
        return (
            <div className="div__container container__background">
                <Title>OnSite Demographics</Title>
                <div className="count__container">
                    <h3 className="count__total-display">Total: <span style={{ fontWeight: '700', color: '#98223e' }}>{this.state.count}</span></h3>
                </div>
                <MyLocation />
                <BackButton click={() => this.props.history.goBack()} />
                <br />
                <div style={divStyle}>
                    <FormControl>
                        {/* <InputLabel style={selectLabelStyle} htmlFor="select-multiple-native">
                            Select Gender
                    </InputLabel> */}
                        <FormLabel style={formLabelStyle}>Select Gender</FormLabel>

                        <Select
                            multiple
                            native
                            value={this.state.selectedGender}
                            onChange={this.handleGenderChange}
                            underlinestyle={{ 'border-color': 'red !important' }}
                            inputProps={{
                                id: 'select-multiple-native',
                            }}
                        >
                            {genderList}
                            ))}
                    </Select>
                    </FormControl>
                </div>

                <div style={divStyle}>
                    <FormControl>
                        {/* <InputLabel shrink htmlFor="select-multiple-native">
                            Select Race
                    </InputLabel> */}
                        <FormLabel style={formLabelStyle}>Select Race</FormLabel>
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
                </div>

                <div style={divStyle}>
                    <FormControl>
                        {/* <InputLabel shrink htmlFor="select-multiple-native">
                            Select Age
                    </InputLabel> */}
                        <FormLabel style={formLabelStyle}>Select Age</FormLabel>
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
                </div>
                <Button disabled={(this.state.selectedAge === '' && this.state.selectedGender === '' && this.state.selectedRace === '' ? true : false) || (this.state.selectedAge.length === 0 && this.state.selectedGender.length === 0 && this.state.selectedRace.length === 0 ? true : false)}
                    className={classNames(classes.margin, classes.cssRoot)}
                    onClick={this.handleSubmit}>Submit
                </Button>
            </div>
        )
    }
}

const divStyle = {
    marginBottom: '40px'
}

const formLabelStyle = {
    display: 'block',
    marginBottom: '-5px',
    paddingBottom: '0',
    color: '#98223e'
}

const styles = theme => ({
    resize: {
        fontSize: '1.5rem'
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    cssRoot: {
        color: theme.palette.getContrastText('#98223e'),
        backgroundColor: '#98223e',
        '&:hover': {
            backgroundColor: '#6a172b',
        },
    },
});

const mapStateToProps = (reduxStore) => ({
    onSite: reduxStore.onSiteReducer,
    age: reduxStore.ageReducer,
    gender: reduxStore.genderReducer,
    race: reduxStore.raceReducer,
});

export default withStyles(styles)(connect(mapStateToProps)(OnSiteDemo));