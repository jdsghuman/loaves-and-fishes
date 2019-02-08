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
        reportType: '',
        startDate: '',
        endDate: '',
        selectedLocation: '',
        selectedCategory: ''
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_LOCATIONS' })
        this.props.dispatch({ type: 'FETCH_CATEGORY_OUTLET' })
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
        if (this.state.reportType !== '' && this.state.selectedLocation === '' && this.state.selectedCategory === '') {
            this.props.dispatch({ type: 'FETCH_ALL_MEALS', payload: this.state })
        }
    }

    render() {

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

        console.log(this.state);

       


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
                        <MenuItem value={1}>Total Meals</MenuItem>
                        <MenuItem value={2}>Total Farm to Table</MenuItem>
                        <MenuItem value={3}>Total Summer</MenuItem>
                        <MenuItem value={4}>Demographic Totals</MenuItem>
                        <MenuItem value={5}>Comparison of Years</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <FormControl >
                    <InputLabel>Location</InputLabel>
                    <Select
                        // label="Select Location"
                        onChange={this.handleInputChangeFor('selectedLocation')}
                        value={this.state.selectedLocation}
                        style={{ height: '40px', width: '150px' }}
                    >
                        {locations}
                    </Select>
                </FormControl>
                <br />
                <FormControl >
                    <InputLabel>Outlet Category</InputLabel>
                    <Select
                        // label="Select Location"
                        onChange={this.handleInputChangeFor('selectedCategory')}
                        value={this.state.selectedCategory}
                        style={{ height: '40px', width: '150px' }}
                    >
                        {categories}
                    </Select>
                </FormControl>
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