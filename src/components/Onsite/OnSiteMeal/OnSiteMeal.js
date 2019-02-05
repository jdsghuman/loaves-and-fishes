import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OnSiteMeal.css';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircleOutline';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

import Title from '../../Title/Title';
import MyLocation from '../../MyLocation/MyLocation';

class OnSiteMeal extends Component {
    state = {
        count: 0,
        categorizebyage: false
    }

    changeCount = (change) => {
        console.log('add')
        if(change === 'add') {
            this.setState(prevState => {
                return {count: prevState.count + 1}
            })
        } else if(change === 'subtract' && this.state.count > 0) {
            this.setState(prevState => {
                return {count: prevState.count - 1}
            })
        }
        
    }

    handleChange = name => event => {
        this.setState({
            count: event.target.value,
        });
    };

    handleGenericAgeChange = () => {
        this.setState(prevState => ({
            categorizebyage: !prevState.categorizebyage
        }))
    }

    render() {
        return (
            <div className="div__container container__background">
                <Title>OnSite Meal</Title>
                {/* Location display */}
                <MyLocation location={this.props.onSiteReducer.selectedLocation || 'Location unavailable'} />
                {/* Categorize by age */}
                <div style={{textAlign: 'center'}}>
                    <ListItemText style={checkboxStyle} primary="Categorize by age" />
                    <Checkbox
                        onChange={this.handleGenericAgeChange}
                        value="categorize"
                        color="primary"
                    />
                </div>
                {/* Total Count Display */}
                <div className="count__container">
                    <h3 className="count__total-display">Total: <span style={{ fontWeight: '700', color: '#98223e' }}>{this.state.count}</span></h3>
                </div>
                <div className="count__container">
                    <RemoveCircle onClick={() => this.changeCount('subtract')} style={{ cursor: 'pointer', fontSize: '4rem', marginRight: '15px', marginTop: '8px' }} />
                    <TextField
                        id="outlined-number"
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
    onSiteReducer: store.onSiteReducer
})

export default withStyles(styles)(connect(mapStateToProps)(OnSiteMeal));