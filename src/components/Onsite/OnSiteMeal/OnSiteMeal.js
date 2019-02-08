import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OnSiteMeal.css';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircleOutline';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import Title from '../../Title/Title';
import MyLocation from '../../MyLocation/MyLocation';

class OnSiteMeal extends Component {

    state = {
        count: 0,
        categorizebyage: false,
        selectedGender: null,
        selectedRace: null,
        selectedAge: null,
        location: this.props.onSite.selectedLocation,
        farm: '',
        summer: '',
        time: '',
        genericAdult: 0,
        genericChild: 0,
        selectedAgeAdult: '',
        selectedAgeChild: ''
    }

    clearState = () => {
        this.setState({
            ...this.state,
            count: 0,
            categorizebyage: false,
            genericAdult: 0,
            genericChild: 0,
        })
    }

    componentWillMount() {
        if (this.props.onSite.selectedLocation.location_name === '') {
            this.props.history.push('/home');
        }
    }

    componentDidMount() {
        // This sets the IDs of generic child/adult 
        this.setGenericAgeId();
    }

    // Counter Logic 
    changeCount = (change, genericAge) => {
        // Add to Total count
        if (change === 'add') {
            this.setState(prevState => {
                return { count: prevState.count + 1 }
            })
            // Add to Adult count
            if (genericAge === 'adult') {
                this.setState(prevState => {
                    return { genericAdult: prevState.genericAdult + 1 }
                })
            }
            // Add to Child count
            if (genericAge === 'child') {
                this.setState(prevState => {
                    return { genericChild: prevState.genericChild + 1 }
                })
            }
            // Subtract from Total count
        } else if (change === 'subtract' && this.state.count > 0) {
            if (change === 'subtract' && this.state.count > 0 && genericAge === undefined) {
                this.setState(prevState => {
                    return { count: prevState.count - 1 }
                })
            }
            // Subtract from Adult count
            if (genericAge === 'adult' && this.state.genericAdult > 0) {
                this.setState(prevState => {
                    return {
                        count: prevState.count - 1,
                        genericAdult: prevState.genericAdult - 1
                    }
                })
            }
            // Subtract from Child count
            if (genericAge === 'child' && this.state.genericChild > 0) {
                this.setState(prevState => {
                    return {
                        count: prevState.count - 1,
                        genericChild: prevState.genericChild - 1
                    }
                })
            }
        }



    }

    handleChange = name => event => {
        this.setState({
            count: event.target.value,
        });
    };

    // Toggle state if Categorize Age checkbox is checked
    handleGenericAgeChange = () => {
        const confirmed = window.confirm('This will reset the Total Meal Count. Are you sure you want to reset the Total Meal Count?');
        if (confirmed) {
            this.setState(prevState => ({
                categorizebyage: !prevState.categorizebyage,
                count: 0,
                selectedGender: null,
                selectedRace: null,
                selectedAge: null,
            }))
        }
    }

    handleSubmit = () => {
        const confirmed = window.confirm('Are you sure you want to submit a meal count?');
        if (confirmed) {
            // If adults and/or child counts exist
            if (this.state.genericAdult > 0 || this.state.genericChild > 0) {
                // Check if generic_adult count exists
                if (this.state.genericAdult > 0) {
                    // Send adult count and Total count
                    this.props.dispatch({ type: 'ADD_MEAL_COUNT_ADULT', payload: this.state });
                }
                // Check if generic_child count exists
                if (this.state.genericChild > 0) {
                    // Send child count and Total count
                    this.props.dispatch({ type: 'ADD_MEAL_COUNT_CHILD', payload: this.state });
                }
                // No generic Adult/Child value
            } else {
                // Send Total count
                this.props.dispatch({ type: "ADD_MEAL_COUNT", payload: this.state })
            }

            this.clearState();
        }

    }

    // Set the Generic Age ID for child/adult
    setGenericAgeId = () => {
        let ageChild;
        let ageAdult;
        this.props.age.map(age => {
            if (age.age_category === 'Generic Adult') {
                ageAdult = age.id;
            }
            if (age.age_category === 'Generic Child') {
                ageChild = age.id;
            }

            this.setState({
                ...this.state,
                selectedAgeAdult: ageAdult,
                selectedAgeChild: ageChild,
                farm: this.props.onSite.farm,
                summer: this.props.onSite.summer,
                time: this.props.onSite.time
            })
        })
    }

    render() {
        return (
            <div className="div__container container__background">
                <Title>OnSite Meal</Title>
                {/* Location display */}
                <MyLocation />
                {/* Categorize by age */}
                <div style={{ textAlign: 'center' }}>
                    <ListItemText style={checkboxStyle} primary="Categorize by age" />
                    <Checkbox
                        checked={this.state.categorizebyage}
                        onChange={this.handleGenericAgeChange}
                        value="categorize"
                        color="primary"
                    />
                </div>
                {/* Total Count Display */}
                <div className="count__container">
                    <h3 className="count__total-display">Total: <span style={{ fontWeight: '700', color: '#98223e' }}>{this.state.count}</span></h3>
                </div>

                {this.state.categorizebyage === false &&
                    <div className="count__container">
                        <RemoveCircle onClick={() => this.changeCount('subtract')} style={{ cursor: 'pointer', fontSize: '4rem', marginRight: '15px', marginTop: '8px' }} />
                        <TextField
                            value={this.state.count}
                            onChange={this.handleChange()}
                            type="number"
                            className={this.props.classes.textField}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                classes: {
                                    input: this.props.classes.resize,
                                }
                            }}
                        />
                        <AddCircle onClick={() => this.changeCount('add')} style={{ cursor: 'pointer', fontSize: '4rem', marginLeft: '15px', marginTop: '8px' }} />
                    </div>
                }
                {/* Categorize by Age count */}
                {this.state.categorizebyage === true &&
                    <div className="count__container">

                        {/* Adult count */}
                        <p style={{ marginBottom: '0', fontWeight: '600' }}>Adult</p>
                        <RemoveCircle onClick={() => this.changeCount('subtract', 'adult')} style={{ cursor: 'pointer', fontSize: '4rem', marginRight: '15px', marginTop: '8px' }} />
                        <TextField
                            value={this.state.genericAdult}
                            onChange={this.handleChange()}
                            type="number"
                            className={this.props.classes.textField}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                classes: {
                                    input: this.props.classes.resize,
                                }
                            }}
                        />
                        <AddCircle onClick={() => this.changeCount('add', 'adult')} style={{ cursor: 'pointer', fontSize: '4rem', marginLeft: '15px', marginTop: '8px' }} />

                        {/* Child count */}
                        <p style={{ marginBottom: '0', fontWeight: '600' }}>Child</p>
                        <RemoveCircle onClick={() => this.changeCount('subtract', 'child')} style={{ cursor: 'pointer', fontSize: '4rem', marginRight: '15px', marginTop: '8px' }} />
                        <TextField
                            value={this.state.genericChild}
                            onChange={this.handleChange()}
                            type="number"
                            className={this.props.classes.textField}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                classes: {
                                    input: this.props.classes.resize,
                                }
                            }}
                        />
                        <AddCircle onClick={() => this.changeCount('add', 'child')} style={{ cursor: 'pointer', fontSize: '4rem', marginLeft: '15px', marginTop: '8px' }} />
                    </div>
                }
                <Button disabled={this.state.count === 0 ? true : false} variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
            </div>
        )
    }
}

const styles = theme => ({
    textField: {
        width: '100px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
        marginTop: '10px',
        height: '50px',
        fontSize: '2rem',
        borderWidth: '20px'
    },

    resize: {
        fontSize: '1.5rem'
    },
});

const checkboxStyle = {
    display: 'inline-block',
}

const mapStateToProps = store => ({
    onSite: store.onSiteReducer,
    age: store.ageReducer
})

export default withStyles(styles)(connect(mapStateToProps)(OnSiteMeal));