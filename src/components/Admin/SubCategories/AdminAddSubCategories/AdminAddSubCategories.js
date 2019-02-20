import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from '../../../Title/Title';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import BackButton from '../../../BackButton/BackButton';
import swal from "sweetalert";

class AdminAddSubCategories extends Component {

    state = {
        subCategory: '',
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            subCategory: event.target.value,
        });
    };

    handleClick = event => {
        // Check if input is not empty 
        if(this.state.subCategory !== '') {
            event.preventDefault();
        this.props.dispatch({ type: "ADD_SUB_CATEGORY", payload: this.state });
        this.setState({
            ...this.state,
            subCategory: ''
        })
        this.props.history.push('/adminManageSubCategories');
        } else {
            // If input field is empty
            swal({
                title: "Sub Category",
                text: "Please enter a valid Sub Category name",
                button: "Ok",
            })
        }
        
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="div__container container__background--large">
            <BackButton click={() => this.props.history.goBack()} />
                <Title>Add New Sub Category</Title>
                <TextField
                    label="Outlet Sub Category"
                    name="Outlet Sub Category"
                    type="text"
                    value={this.state.subCategory}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                />
                <br />
                <Button 
                className={classNames(classes.margin, classes.cssRoot)}
                style={btnStyle} 
                onClick={this.handleClick}>
                Add Sub Category
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

const btnStyle = {
    marginTop: '10px'
}

export default withStyles(styles)(connect()(AdminAddSubCategories));