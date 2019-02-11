import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from '../../../Title/Title';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import './AdminAddLocations.css';

const btnStyle = {
    marginTop: '10px'
}

class AdminAddLocations extends Component {

    state = {
        locationName: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        county: '',
        notes: '',
        time: moment().format(),
    }

    handleInputChangeFor = propertyName => event => {
        console.log("in handleInputChangeFor");
        this.setState({
            ...this.state,
            [propertyName]: event.target.value
        });
    };

    handleClick = event => {
        event.preventDefault();
        console.log('in handleClick', this.state);
        this.props.dispatch({ type: "ADD_LOCATION", payload: this.state });
        this.setState({
            ...this.state,
            locationName: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            county: '',
            notes: '',
            time: moment().format(),
        })
        this.props.history.push('/adminManageOutletLocations')
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="div__container container__background--large">
                <Title>Add Location</Title>
                <TextField
                    label="Location Name"
                    name="Location Name"
                    type="text"
                    value={this.state.locationName}
                    onChange={this.handleInputChangeFor('locationName')}
                    margin="normal"
                    variant="outlined"
                    color="secondary"
                    className={classes.textField}
                />
                <TextField
                    label="Street"
                    name="Street"
                    type="text"
                    value={this.state.street}
                    onChange={this.handleInputChangeFor('street')}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                />
                <TextField
                    label="City"
                    name="City"
                    type="text"
                    value={this.state.city}
                    onChange={this.handleInputChangeFor('city')}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                />
                <TextField
                    label="State"
                    name="State"
                    type="text"
                    value={this.state.state}
                    onChange={this.handleInputChangeFor('state')}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                />
                <TextField
                    label="Zip"
                    name="Zip"
                    type="number"
                    value={this.state.zip}
                    onChange={this.handleInputChangeFor('zip')}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                />
                <TextField
                    label="County"
                    name="County"
                    type="text"
                    value={this.state.county}
                    onChange={this.handleInputChangeFor('county')}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                />
                <TextField
                    label="Notes"
                    name="Notes"
                    type="text"
                    value={this.state.notes}
                    onChange={this.handleInputChangeFor('notes')}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                    multiline
                    rows="4"
                />
                <br />
                <Button
                    className={classNames(classes.margin, classes.cssRoot)}
                    style={btnStyle}
                    onClick={this.handleClick}>Add Location
                </Button>
            </div>
        )
    }
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
    }
});

export default withStyles(styles)(connect()(AdminAddLocations));