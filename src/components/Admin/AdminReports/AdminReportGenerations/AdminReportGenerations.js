import React, { Component } from 'react';
import Title from '../../../Title/Title';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import swal from "sweetalert";
import BackButton from '../../../BackButton/BackButton';
import FormLabel from '@material-ui/core/FormLabel';


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
            // alert('Please specify a start and end date to search')
            swal("Please specify a start and end date to search");
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
                if (this.state.reportType !== '' &&
                    this.state.selectedGender === '' && this.state.selectedRace === '' &&
                    this.state.selectedAge === ''){
                    swal("Please specify a demographic to search", "(gender, race, or age)");
                    }
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
                //Fix me
                else if (this.state.reportType !== '' && this.state.selectedLocation === '' &&
                    this.state.selectedGender === '' && this.state.selectedRace !== '' &&
                    this.state.selectedAge !== '') {
                    this.props.dispatch({ type: 'FETCH_DEMO_RACE_AGE', payload: this.state })
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
                //Fix me
                else if (this.state.reportType !== '' && this.state.selectedLocation !== '' &&
                    this.state.selectedGender === '' && this.state.selectedRace !== '' &&
                    this.state.selectedAge !== '') {
                    this.props.dispatch({ type: 'FETCH_DEMO_LOCATION_RACE_AGE', payload: this.state })
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

    handleClear=()=>{
        this.setState({
                reportType: 1,
                startDate: '',
                endDate: '',
                selectedLocation: '',
                selectedCategory: '',
                selectedGender: '',
                selectedRace: '',
                selectedAge: '',
        })
    }

    render() {
        const { classes } = this.props;

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
                    <br/>
                <FormLabel style={formLabelStyle}>Outlet Category</FormLabel>
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
                        <br/>
                    <FormLabel style={formLabelStyle}>Gender</FormLabel>
                        <Select
                            onChange={this.handleInputChangeFor('selectedGender')}
                            value={this.state.selectedGender}
                            style={{ height: '40px', width: '175px', margin: 10}}
                        >
                            {genders}
                        </Select>
                    </FormControl>
                    <FormControl >
                        <br/>
                    <FormLabel style={formLabelStyle}>Race</FormLabel>
                        <Select
                            onChange={this.handleInputChangeFor('selectedRace')}
                            value={this.state.selectedRace}
                            style={{ height: '40px', width: '175px', margin: 10 }}
                        >
                            {races}
                        </Select>
                    </FormControl>
                    <FormControl >
                        <br/>
                    <FormLabel style={formLabelStyle}>Age</FormLabel>
                        <Select
                            onChange={this.handleInputChangeFor('selectedAge')}
                            value={this.state.selectedAge}
                            style={{ height: '40px', width: '175px', margin: 10 }}
                        >
                            {ages}
                        </Select>
                    </FormControl>
                </div>
        }

        return (
            <div className="div__container container__background--large">
            <BackButton click={() => this.props.history.goBack()} />
                <Title>Reports</Title>
                <FormControl >
                    <FormLabel style={formLabelStyle}>Report Type</FormLabel>
                    <Select
                        onChange={this.handleInputChangeFor('reportType')}
                        value={this.state.reportType}
                        style={{ height: '40px', width: '200px' }}
                    >
                        <MenuItem value={1}>All Meals</MenuItem>
                        <MenuItem value={2}>Farm to Table</MenuItem>
                        <MenuItem value={3}>Summer</MenuItem>
                        <MenuItem value={4}>Demographics</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <br/>
                <FormControl >
                    <FormLabel style={formLabelStyle}>Location</FormLabel>
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
                <br/>
                <TextField
                    label="Start Date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name="Start Date"
                    type="date"
                    value={this.state.startDate}
                    onChange={this.handleInputChangeFor('startDate')}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                    style={{ width: '175px', margin: 20 }}
                    display="inlineBlock"
                />
                <TextField
                    label="End Date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name="End Date"
                    type="date"
                    value={this.state.endDate}
                    onChange={this.handleInputChangeFor('endDate')}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                    style={{ width: '175px', margin: 20 }}
                />
                <br />
                <Button className={classNames(classes.margin, classes.cssRoot)} onClick={this.handleClick} variant="contained" color="primary">Generate Report</Button>
                <br/>
                <Button className={classNames(classes.margin, classes.cssRoot)} onClick={this.handleClear}>Clear Search Fields</Button>
            </div>
        )
    }
}

const styles = theme => ({
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
        textField: {
            backgroundColor: '#ffffff',
            margin: '5px'
        },
});

const formLabelStyle = {
    display: 'block',
    marginBottom: '0',
    paddingBottom: '0',
    color: '#98223e'
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}

export default withStyles(styles)(connect(mapStateToProps)(withRouter(AdminReportGenerations)));