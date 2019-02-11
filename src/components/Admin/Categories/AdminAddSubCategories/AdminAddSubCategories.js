import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from '../../../Title/Title';

const spacing = {
    margin: '0.5em',
    backgroundColor: '#ffffff',
    width: '30%'
}

const btnStyle = {
    marginTop: '10px'
}

class AdminAddOutletCategories extends Component {

    state = {
        subCategory: '',
    }

    handleChangeFor = (event) => {
        console.log("in handleChangeFor");
        this.setState({
            ...this.state,
            subCategory: event.target.value,
        });
    };

    handleClick = event => {
        event.preventDefault();
        console.log('in handleClick');
        this.props.dispatch({ type: "ADD_SUB_CATEGORY", payload: this.state });
        this.setState({
            ...this.state,
            subCategory: '',
        })
    }

    render() {
        return (
            <div>
                <Title>Add New Sub-Category</Title>
                <TextField
                    label="Outlet Sub-Category"
                    name="Outlet Sub-Category"
                    type="text"
                    value={this.state.subCategory}
                    onChange={this.handleChangeFor}
                    margin="normal"
                    variant="outlined"
                    style={spacing}
                />
                <br />
                <Button style={btnStyle} variant="contained" color="secondary" onClick={this.handleClick}>Add Sub-Category</Button>
            </div>
        )
    }
}

export default connect()(AdminAddOutletCategories);