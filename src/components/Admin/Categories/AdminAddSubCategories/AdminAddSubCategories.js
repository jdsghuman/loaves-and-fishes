import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from '../../../Title/Title';
import FormLabel from '@material-ui/core/FormLabel';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

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
        const { classes } = this.props;
        return (
            <div className="div__container container__background--large">
                <Title>Add New Sub-Category</Title>
                <FormLabel style={formLabelStyle}>Sub-Category</FormLabel>
                <TextField
                    label="Outlet Sub-Category"
                    name="Outlet Sub-Category"
                    type="text"
                    value={this.state.subCategory}
                    onChange={this.handleChangeFor}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                />
                <br />
                <Button className={classNames(classes.margin, classes.cssRoot)}
                style={btnStyle} variant="contained" color="secondary" 
                onClick={this.handleClick}>Add Sub-Category</Button>
            </div>
        )
    }
}

const formLabelStyle = {
    display: 'block',
    marginBottom: '0',
    paddingBottom: '0',
    color: '#98223e'
}

const btnStyle = {
    marginTop: '10px'
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

export default withStyles(styles)(connect()(AdminAddOutletCategories));