import React, { Component } from 'react';
import Title from '../../../Title/Title';
import { connect } from 'react-redux';
import BackButton from '../../../BackButton/BackButton';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

class AdminEditLocation extends Component {
    state = {
        editLocation: {
            location_name: '',
            category_name: '',
            street_address: '',
            city: '',
            state: '',
            zip: '',
            county: '',
            active: '',
            notes: '',
            name: '',
            date_updated: '',
            categories: []
        }
    }

    checkData = () => {
        // Redirect the user to the Admin home screen if state is null 
        if (Object.keys(this.state.editLocation).length === 0) {
            this.props.history.push('/adminManageOutletLocations');
        }
    }

    componentDidMount() {
        this.getLocationData();
        this.checkData();
    }

    componentWillMount() {
        // Redirect the user to the Admin home screen if page is refreshed 
        if (this.props.adminLocationReducer.length === 0) {
            this.props.history.push('/adminManageOutletLocations');
        }
    }

    getLocationData = () => {
        // Get id of location
        let locationId = parseInt(this.props.match.params.id);
        // Filter to show selected location in fields
        const resultLocation = this.props.adminLocationReducer.filter(location => location.id === locationId);

        // Filter location_outlet for the selected Location that appears in state
        const resultCategory = this.props.locationOutletReducer.filter(cat => cat.location_id === locationId);
        // Loop through the location_outlet object and get the outlet_id
        let categoryInLocation = resultCategory.map(resCat => resCat.outlet_id);
        this.setState({
            editLocation: {
                ...resultLocation[0],
                categories: categoryInLocation
            }
        });
    }

    handleChange = event => {
        this.setState({
            editLocation: {
                ...this.state.editLocation,
                [event.target.name]: event.target.value
            }
        })
    }

    handleClick = () => {
        this.props.dispatch({ type: 'UPDATE_LOCATION', payload: this.state.editLocation });
        this.props.dispatch({ type: 'UPDATE_OUTLET_LOCATION', payload: this.state.editLocation });
        this.props.history.push('/adminManageOutletLocations')
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="div__container container__background--large">
                <Title>Edit Location: <span style={{color: '#98223e'}}>{this.state.editLocation.location_name}</span></Title>
                <BackButton click={() => this.props.history.goBack()} />
                <div>
                    <FormLabel style={formLabelStyle}>Location Name</FormLabel>
                    <TextField
                        id="outlined-name"
                        name="location_name"
                        value={this.state.editLocation.location_name}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            style: {
                                color: '#888888',
                                fontWeight: '300',
                            }
                        }}
                    />
                </div>
                {/* Street Address */}
                <div>
                    <FormLabel style={formLabelStyle}>Street Address</FormLabel>
                    <TextField
                        id="outlined-name"
                        name="street_address"
                        value={this.state.editLocation.street_address}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            style: {
                                color: '#888888',
                                fontWeight: '300',
                            }
                        }}
                    />
                </div>
                {/* City */}
                <div>
                    <FormLabel style={formLabelStyle}>City</FormLabel>
                    <TextField
                        id="outlined-name"
                        name="city"
                        value={this.state.editLocation.city}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            style: {
                                color: '#888888',
                                fontWeight: '300',
                            }
                        }}
                    />
                </div>
                {/* State */}
                <div>
                    <FormLabel style={formLabelStyle}>State</FormLabel>
                    <TextField
                        id="outlined-name"
                        name="state"
                        value={this.state.editLocation.state}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            style: {
                                color: '#888888',
                                fontWeight: '300',
                            }
                        }}
                    />
                </div>
                {/* Zip */}
                <div>
                    <FormLabel style={formLabelStyle}>Zip</FormLabel>
                    <TextField
                        id="outlined-name"
                        name="zip"
                        value={this.state.editLocation.zip}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            style: {
                                color: '#888888',
                                fontWeight: '300',
                            }
                        }}
                    />
                </div>
                {/* County */}
                <div>
                    <FormLabel style={formLabelStyle}>County</FormLabel>
                    <TextField
                        id="outlined-name"
                        name="county"
                        value={this.state.editLocation.county}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            style: {
                                color: '#888888',
                                fontWeight: '300',
                            }
                        }}
                    />
                </div>
                {/* Status */}
                <div>
                    <FormLabel style={formLabelStyle}>Status</FormLabel>
                    <Select
                        value={this.state.editLocation.active}
                        name="active"
                        style={{ height: '40px', width: '200px' }}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'active',
                        }}
                    >
                        <MenuItem value="true">
                            <em>Active</em>
                        </MenuItem>
                        <MenuItem value="false">
                            <em>Inactive</em>
                        </MenuItem>
                    </Select>
                </div>
                {/* Outlet Categories */}
                <div>
                    <FormLabel style={formLabelStyle}>Location Outlet Category</FormLabel>
                    <Select
                        multiple
                        value={this.state.editLocation.categories}
                        name="categories"
                        style={{ height: '40px', width: '200px' }}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(', ')}
                        MenuProps={this.props.MenuProps}
                    >
                        {this.props.categories.map(cat => (
                            <MenuItem key={cat.id} value={cat.id} name={cat.category_name}>
                                <Checkbox checked={this.state.editLocation.categories.indexOf(cat.id) > -1} />
                                <ListItemText primary={cat.category_name} />
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                {/* Notes */}
                <div>
                    <FormLabel style={formLabelStyle}>Notes</FormLabel>
                    <TextField
                        id="outlined-name"
                        name="notes"
                        value={this.state.editLocation.notes}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows="4"
                        InputLabelProps={{
                            style: {
                                color: '#888888',
                                fontWeight: '300',
                            }
                        }}
                    />
                </div>
                {/* Get Categories */}
                <div style={divStyle}>
                    <Button
                        className={classNames(classes.margin, classes.cssRoot)}
                        onClick={this.handleClick}>Update Location</Button>
                </div>
            </div>
        )
    }
}

const divStyle = {
    display: 'inline-block',
    margin: '20px'
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

const formLabelStyle = {
    display: 'block',
    marginTop: '15px',
    paddingBottom: '0',
    color: '#98223e'
}

const mapReduxStateToProps = store => ({
    adminLocationReducer: store.adminLocationReducer,
    categories: store.categoryReducer,
    locationOutletReducer: store.locationOutletReducer
})

export default withStyles(styles)(connect(mapReduxStateToProps)(AdminEditLocation));