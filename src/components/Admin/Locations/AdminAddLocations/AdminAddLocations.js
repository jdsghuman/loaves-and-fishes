import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const style = {
    width: '50em',
    marginTop: '7em'
}

const spacing = {
    margin: '0.8em',
    backgroundColor: '#ffffff',
    width: '15em'
}

class AdminAddLocations extends Component {

    state = {
        locationName: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        county: '',
        notes: ''
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
        this.props.dispatch({ type: "ADD_LOCATION", payload: this.state});
        this.setState({
            ...this.state,
            locationName: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            county: '',
            notes: ''
        })
    }

    render() {
        return (
            <div className="div__container container__background" style={style}>
                <p>Add Location</p>
                <TextField
                    label="Location Name"
                    name="Location Name"
                    type="text"
                    value={this.state.locationName}
                    onChange={this.handleInputChangeFor('locationName')}
                    margin="normal"
                    variant="outlined"
                    color="secondary"
                    style={spacing}
                />
                <TextField
                    label="Street"
                    name="Street"
                    type="text"
                    value={this.state.street}
                    onChange={this.handleInputChangeFor('street')}
                    margin="normal"
                    variant="outlined"
                    style={spacing}
                />
                <TextField
                    label="City"
                    name="City"
                    type="text"
                    value={this.state.city}
                    onChange={this.handleInputChangeFor('city')}
                    margin="normal"
                    variant="outlined" 
                    style={spacing}

                />
                <TextField
                    label="State"
                    name="State"
                    type="text"
                    value={this.state.state}
                    onChange={this.handleInputChangeFor('state')}
                    margin="normal"
                    variant="outlined"
                    style={spacing}
                />
                    <TextField
                        label="Zip"
                        name="Zip"
                        type="number"
                        value={this.state.zip}
                        onChange={this.handleInputChangeFor('zip')}
                        margin="normal"
                        variant="outlined"
                        style={spacing}
                    /> 
                    <TextField
                        label="County"
                        name="County"
                        type="text"
                        value={this.state.county}
                        onChange={this.handleInputChangeFor('county')}
                        margin="normal"
                        variant="outlined"
                        style={spacing}
                    />
                    <TextField
                        label="Notes"
                        name="Notes"
                        type="text"
                        value={this.state.notes}
                        onChange={this.handleInputChangeFor('notes')}
                        margin="normal"
                        variant="outlined"
                        style={spacing}
                        multiline
                        rows="4"
                    />
                    <br/>
                    <Button variant="contained" color="secondary" onClick={this.handleClick}>Add Location</Button>
            </div>
        )
    }
}


export default connect()(AdminAddLocations);