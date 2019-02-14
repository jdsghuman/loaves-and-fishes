import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import swal from "sweetalert";
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Title from '../../../Title/Title';
import BackButton from '../../../BackButton/BackButton';

class AdminAddMeal extends Component {

    state = {
        count: '',
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

    clearState = () => {
        this.setState({
            ...this.state,
            count: 0,
            farm: false,
            summer: false,
            time: '',
            location: ''
        });
    }

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
        
        swal({
            title: "Add Meal Count",
            text: "Are you sure you want to submit this meal count?",
            icon: "info",
            buttons: ['No', 'Yes'],
        })
            .then(willSubmit => {
                if (willSubmit) {
                    this.props.dispatch({ type: "ADD_MEAL_COUNT", payload: this.state })
                    this.clearState();
                    this.props.history.push('/admin');
                }
                else {
                    swal("Meal count not entered.")
                }
            });

    }
    render() {
        const { classes } = this.props;

        let locations =
            this.props.reduxStore.locationReducer.map(location => {
                return (
                    <MenuItem key={location.id} value={location.id} id={location.id}>{location.location_name}</MenuItem>
                );
            })

        console.log(this.state);

        return (
            <div className="div__container container__background--large">
            <BackButton click={() => this.props.history.goBack()} />
                <Title>Add Meal</Title>
                <div style={divStyle}>
                    <FormControl >
                        <FormLabel style={formLabelStyle}>Location</FormLabel>
                        <Select
                            onChange={this.handleLocationChange}
                            value={this.state.location}
                            style={{ height: '40px', width: '150px' }}
                        >
                            {locations}
                        </Select>
                    </FormControl>
                </div>
                <div style={divStyle}>
                    <FormControl>
                        <FormLabel style={formLabelStyle}>Date</FormLabel>
                        <TextField
                            name="Time"
                            type="date"
                            value={this.state.time}
                            onChange={this.handleChangeDate('time')}
                            margin="normal"
                            variant="outlined"
                            className={classes.textField}
                        />
                    </FormControl>
                </div>
                <div style={divStyle}>
                    <FormLabel style={formLabelStyle}>Meal Count</FormLabel>
                    <TextField
                        value={this.state.count}
                        type="number"
                        margin="normal"
                        variant="outlined"
                        label="count"
                        className={classes.textField}
                        onChange={this.handleChange()}
                    />
                </div>
                <div style={{ marginBottom: '0' }}>
                    <div>
                        <FormLabel style={formLabelStyle}>Meal Details</FormLabel>
                        <Checkbox
                            onChange={this.handleFarmChange}
                            value={this.state.farm}
                            color="primary"
                        />
                        <ListItemText style={checkboxStyle} primary="Farm to Table" />
                    </div>
                    <div style={{ transform: 'translateY(-40%)' }}>
                        <Checkbox
                            onChange={this.handleSummerChange}
                            value={this.state.summer}
                            color="primary"
                        />
                        <ListItemText style={checkboxStyle} primary="Summer Meal" />
                    </div>
                </div>
                <div>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
                </div>
            </div>
        )
    }
}

const checkboxStyle = {
    display: 'inline-block',
    margin: '5px',
    marginLeft: '0',
    paddingLeft: '0'
}

const divStyle = {
    marginBottom: '30px'
}

const formLabelStyle = {
    display: 'block',
    marginBottom: '0',
    paddingBottom: '0',
    color: '#98223e'
}

const styles = theme => ({
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
        textField: {
            backgroundColor: '#ffffff',
            margin: '5px'
        },
});


const mapReduxStateToProps = (reduxStore) => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStateToProps)(AdminAddMeal));