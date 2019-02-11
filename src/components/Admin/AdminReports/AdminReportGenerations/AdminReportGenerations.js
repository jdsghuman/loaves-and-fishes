import React, { Component } from 'react';
import Title from '../../../Title/Title';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class AdminReportGenerations extends Component {

    state = {
        reportType: 1,
        startDate: '',
        endDate: '',
        selectedLocation: '',
        selectedCategory: '',
        selectedGender: '',
        selectedRace: '',
        selectedAge: '',
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_LOCATIONS' })
        this.props.dispatch({ type: 'FETCH_CATEGORY_OUTLET' })
        this.props.dispatch({ type: 'FETCH_GENDER' })
        this.props.dispatch({ type: 'FETCH_RACE' })
        this.props.dispatch({ type: 'FETCH_AGE' })
    }

    handleReportChange = (event) => {
        this.setState({
            ...this.state,
            reportType: event.target.value
        })
    }

    handleInputChangeFor = propertyName => event => {
        console.log("in handleInputChangeFor");
        this.setState({
            ...this.state,
            [propertyName]: event.target.value
        });
    };

    handleClick = () => {
        if (this.state.startDate === '' || this.state.endDate === '') {
            alert('Please specify a start and end date to search')
        } else {
            //Total Meals
            this.props.dispatch({ type: 'FETCH_TOTAL', payload: this.state })
            if (this.state.reportType === 1) {
                if (this.state.reportType !== '' && this.state.selectedLocation === '' && this.state.selectedCategory === '') {
                    this.props.dispatch({ type: 'FETCH_ALL_MEALS', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation !== '' && this.state.selectedCategory === '') {
                    this.props.dispatch({ type: 'FETCH_LOCATION_MEALS', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation === '' && this.state.selectedCategory !== '') {
                    this.props.dispatch({ type: 'FETCH_CATEGORY_MEALS', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation !== '' && this.state.selectedCategory !== '') {
                    this.props.dispatch({ type: 'FETCH_LOCATION_CATEGORY_MEALS', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
            }
            //Total Farm Meals
            else if (this.state.reportType === 2) {
                if (this.state.reportType !== '' && this.state.selectedLocation === '' && this.state.selectedCategory === '') {
                    this.props.dispatch({ type: 'FETCH_ALL_FARM_MEALS', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation !== '' && this.state.selectedCategory === '') {
                    this.props.dispatch({ type: 'FETCH_LOCATION_FARM_MEALS', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation === '' && this.state.selectedCategory !== '') {
                    this.props.dispatch({ type: 'FETCH_CATEGORY_FARM_MEALS', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation !== '' && this.state.selectedCategory !== '') {
                    this.props.dispatch({ type: 'FETCH_LOCATION_CATEGORY_FARM_MEALS', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
            }
            //Total Summer Meals
            else if (this.state.reportType === 3) {
                if (this.state.reportType !== '' && this.state.selectedLocation === '' && this.state.selectedCategory === '') {
                    this.props.dispatch({ type: 'FETCH_ALL_SUMMER_MEALS', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation !== '' && this.state.selectedCategory === '') {
                    this.props.dispatch({ type: 'FETCH_LOCATION_SUMMER_MEALS', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation === '' && this.state.selectedCategory !== '') {
                    this.props.dispatch({ type: 'FETCH_CATEGORY_SUMMER_MEALS', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation !== '' && this.state.selectedCategory !== '') {
                    this.props.dispatch({ type: 'FETCH_LOCATION_CATEGORY_SUMMER_MEALS', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
            }
            //Demographic Reports
            else if(this.state.reportType === 4){
                if (this.state.reportType !== '' && this.state.selectedLocation === '' &&
                this.state.selectedGender !== '' && this.state.selectedRace === '' &&
                this.state.selectedAge === ''){
                    this.props.dispatch({ type: 'FETCH_DEMO_GENDER', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation === '' &&
                    this.state.selectedGender === '' && this.state.selectedRace !== '' &&
                    this.state.selectedAge === '') {
                    this.props.dispatch({ type: 'FETCH_DEMO_RACE', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation === '' &&
                    this.state.selectedGender === '' && this.state.selectedRace === '' &&
                    this.state.selectedAge !== '') {
                    this.props.dispatch({ type: 'FETCH_DEMO_AGE', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation === '' &&
                    this.state.selectedGender !== '' && this.state.selectedRace !== '' &&
                    this.state.selectedAge === '') {
                    this.props.dispatch({ type: 'FETCH_DEMO_GENDER_RACE', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation === '' &&
                    this.state.selectedGender !== '' && this.state.selectedRace === '' &&
                    this.state.selectedAge !== '') {
                    this.props.dispatch({ type: 'FETCH_DEMO_GENDER_AGE', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation === '' &&
                    this.state.selectedGender !== '' && this.state.selectedRace !== '' &&
                    this.state.selectedAge !== '') {
                    this.props.dispatch({ type: 'FETCH_DEMO_GENDER_RACE_AGE', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                //Demographic Location
                else if (this.state.reportType !== '' && this.state.selectedLocation !== '' &&
                    this.state.selectedGender !== '' && this.state.selectedRace === '' &&
                    this.state.selectedAge === '') {
                    this.props.dispatch({ type: 'FETCH_DEMO_LOCATION_GENDER', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation !== '' &&
                    this.state.selectedGender === '' && this.state.selectedRace !== '' &&
                    this.state.selectedAge === '') {
                    this.props.dispatch({ type: 'FETCH_DEMO_LOCATION_RACE', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation !== '' &&
                    this.state.selectedGender === '' && this.state.selectedRace === '' &&
                    this.state.selectedAge !== '') {
                    this.props.dispatch({ type: 'FETCH_DEMO_LOCATION_AGE', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation !== '' &&
                    this.state.selectedGender !== '' && this.state.selectedRace !== '' &&
                    this.state.selectedAge === '') {
                    this.props.dispatch({ type: 'FETCH_DEMO_LOCATION_GENDER_RACE', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation !== '' &&
                    this.state.selectedGender !== '' && this.state.selectedRace === '' &&
                    this.state.selectedAge !== '') {
                    this.props.dispatch({ type: 'FETCH_DEMO_LOCATION_GENDER_AGE', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
                else if (this.state.reportType !== '' && this.state.selectedLocation !== '' &&
                    this.state.selectedGender !== '' && this.state.selectedRace !== '' &&
                    this.state.selectedAge !== '') {
                    this.props.dispatch({ type: 'FETCH_DEMO_LOCATION_GENDER_RACE_AGE', payload: this.state })
                    this.props.history.push('/AdminReportView');
                }
            }
        }
    }

    render() {

        let optionDisplay;

        let locations =
            this.props.reduxStore.locationReducer.map(location => {
                return (
                    <MenuItem key={location.id} value={location.id} id={location.id}>{location.location_name}</MenuItem>
                );
            })

        let categories =
            this.props.reduxStore.categoryReducer.map(category => {
                return (
                    <MenuItem key={category.id} value={category.id} id={category.id}>{category.category_name}</MenuItem>
                );
            })

        let genders =
            this.props.reduxStore.genderReducer.map(gender => {
                return (
                    <MenuItem key={gender.id} value={gender.id}>{gender.gender_name}</MenuItem>
                );
            })

        let races =
            this.props.reduxStore.raceReducer.map(race => {
                return (
                    <MenuItem key={race.id} value={race.id}>{race.race_name}</MenuItem>
                );
            })

        let ages =
            this.props.reduxStore.ageReducer.map(age => {
                if (age.age_category !== 'Generic Adult' && age.age_category !== 'Generic Child') {
                    return (
                        <MenuItem key={age.id} value={age.id}>{age.age_category}</MenuItem>
                    );
                }
            })

        console.log(this.state);

        if (this.state.reportType === 1 || this.state.reportType === 2 || this.state.reportType === 3) {
            optionDisplay =
                <FormControl >
                    <InputLabel>Outlet Category</InputLabel>
                    <Select
                        onChange={this.handleInputChangeFor('selectedCategory')}
                        value={this.state.selectedCategory}
                        style={{ height: '40px', width: '150px' }}
                    >
                        {categories}
                    </Select>
                </FormControl>
        } else if (this.state.reportType === 4) {
            optionDisplay =
                <div>
                    <FormControl >
                        <InputLabel>Gender</InputLabel>
                        <Select
                            onChange={this.handleInputChangeFor('selectedGender')}
                            value={this.state.selectedGender}
                            style={{ height: '40px', width: '150px' }}
                        >
                            {genders}
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl >
                        <InputLabel>Race</InputLabel>
                        <Select
                            onChange={this.handleInputChangeFor('selectedRace')}
                            value={this.state.selectedRace}
                            style={{ height: '40px', width: '150px' }}
                        >
                            {races}
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl >
                        <InputLabel>Age</InputLabel>
                        <Select
                            onChange={this.handleInputChangeFor('selectedAge')}
                            value={this.state.selectedAge}
                            style={{ height: '40px', width: '150px' }}
                        >
                            {ages}
                        </Select>
                    </FormControl>
                </div>
        }

        return (
            <div className="div__container container__background">
                <Title>Reports</Title>
                <FormControl >
                    <InputLabel>Report Type</InputLabel>
                    <Select
                        onChange={this.handleInputChangeFor('reportType')}
                        value={this.state.reportType}
                        style={{ height: '40px', width: '200px' }}
                    >
                        <MenuItem value={1}>All Meals</MenuItem>
                        <MenuItem value={2}>Farm to Table</MenuItem>
                        <MenuItem value={3}>Summer</MenuItem>
                        <MenuItem value={4}>Demographics</MenuItem>
                        <MenuItem value={5}>Comparison of Years</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <FormControl >
                    <InputLabel>Location</InputLabel>
                    <Select
                        onChange={this.handleInputChangeFor('selectedLocation')}
                        value={this.state.selectedLocation}
                        style={{ height: '40px', width: '150px' }}
                    >
                        {locations}
                    </Select>
                </FormControl>
                <br />
                {optionDisplay}
                {/* <FormControl >
                    <InputLabel>Outlet Category</InputLabel>
                    <Select
                        // label="Select Location"
                        onChange={this.handleInputChangeFor('selectedCategory')}
                        value={this.state.selectedCategory}
                        style={{ height: '40px', width: '150px' }}
                    >
                        {categories}
                    </Select>
                </FormControl> */}
                <p>From</p>
                <TextField
                    name="Start Date"
                    type="date"
                    value={this.state.startDate}
                    onChange={this.handleInputChangeFor('startDate')}
                    margin="normal"
                    variant="outlined"
                />
                <p>To</p>
                <TextField
                    name="End Date"
                    type="date"
                    value={this.state.endDate}
                    onChange={this.handleInputChangeFor('endDate')}
                    margin="normal"
                    variant="outlined"
                />
                <br />
                <Button onClick={this.handleClick} variant="contained" color="primary">Generate Report</Button>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(withRouter(AdminReportGenerations));