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
            date_updated: ''
        }
    }

    checkData = () => {
        // Redirect the user to the Admin home screen if state is null 
        if (Object.keys(this.state.editLocation).length === 0) {
            this.props.history.push('/admin');
        }
    }

    componentDidMount() {
        this.getLocationData();
        // this.checkData();
    }

    // componentWillMount() {
    //     // Redirect the user to the Admin home screen if page is refreshed 
    //     if (this.props.adminLocationReducer.length === 0) {
    //         this.props.history.push('/admin');
    //     }
    // }

    getLocationData = () => {
        // Get id of location
        let locationId = parseInt(this.props.match.params.id);
        // Filter to show selected location in fields
        const result = this.props.adminLocationReducer.filter(location => location.id === locationId);
        this.setState({
            editLocation: {
                ...result[0],
            }
        })
    }

    handleChange = event => {
        this.setState({
            editLocation: {
                ...this.state.editLocation,
                [event.target.name]: event.target.value
            }
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="div__container container__background--large">
                <Title>Edit Location: </Title>
                <BackButton click={() => this.props.history.goBack()} />
                {JSON.stringify(this.state)}
                <p>--------</p>
                {JSON.stringify(this.props.adminLocationReducer)}
                <p>-----------</p>
                {JSON.stringify(this.props.categories)}
                {/* Edit Name */}
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
                        name="status"
                        style={{ height: '40px', width: '200px' }}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'status',
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
                        rows="4"
                        InputLabelProps={{
                            style: {
                                color: '#888888',
                                fontWeight: '300',
                            }
                        }}
                    />
                </div>
                {/* Updated By */}
                <div>
                    <FormLabel style={formLabelStyle}>Updated By</FormLabel>
                    <TextField
                        id="outlined-name"
                        name="name"
                        value={this.state.editLocation.name}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        rows="4"
                        InputLabelProps={{
                            style: {
                                color: '#888888',
                                fontWeight: '300',
                            }
                        }}
                    />
                </div>
                {/* Date Updated */}
                <div>
                    <FormLabel style={formLabelStyle}>Date Updated</FormLabel>
                    <TextField
                        id="outlined-name"
                        name="name"
                        value={moment(this.state.editLocation.date_updated).format('l')}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        rows="4"
                        InputLabelProps={{
                            style: {
                                color: '#888888',
                                fontWeight: '300',
                            }
                        }}
                    />
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
    categories: store.categoryReducer
})

export default withStyles(styles)(connect(mapReduxStateToProps)(AdminEditLocation));