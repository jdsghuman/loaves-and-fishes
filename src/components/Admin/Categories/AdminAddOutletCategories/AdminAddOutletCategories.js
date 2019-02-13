import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from '../../../Title/Title';
import moment from 'moment';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import BackButton from '../../../BackButton/BackButton';

class AdminAddOutletCategories extends Component {

    state = {
        categoryName: '',
        selectedSubCategory: '',
        notes: '',
        time: moment().format(),
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_SUB_CATEGORY' })
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
        this.props.dispatch({ type: "ADD_NEW_CATEGORY", payload: this.state});
        this.setState({
            ...this.state,
            categoryName: '',
            selectedSubCategory: '',
            notes: '',
            time: moment().format()
        })
        this.props.history.push('/adminManageOutletCategories');
    }

    render() {
        const { classes } = this.props;
        let subCategoryList =
            this.props.subCategory.map(subCategories => {
                return (
                    <MenuItem key={subCategories.id} value={subCategories.id} id={subCategories.id}>{subCategories.category_name}</MenuItem>
                );
            })
            console.log('after Click', this.state);
            
        return (
            <div className="div__container container__background--large">
            <BackButton click={() => this.props.history.goBack()} />
                <Title>Add New Category</Title>
                <FormLabel style={formLabelStyle}>Outlet Category</FormLabel>
                <TextField
                    name="Outlet Category"
                    type="text"
                    value={this.state.categoryName}
                    onChange={this.handleInputChangeFor('categoryName')}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                    color="secondary"
                />
                <br/>
                <br/>
                <FormControl >
                    <FormLabel style={formLabelStyle}>Sub-Category</FormLabel>
                    <Select
                        onChange={this.handleInputChangeFor('selectedSubCategory')}
                        value={this.state.selectedSubCategory}
                        className={classNames(classes.textField, classes.dropDown)}

                    >
                    {subCategoryList}
                    </Select>
                </FormControl>
                <br/>
                <br/>
                <FormLabel style={formLabelStyle}>Notes</FormLabel>
                <TextField
                    name="Notes"
                    type="text"
                    value={this.state.notes}
                    onChange={this.handleInputChangeFor('notes')}
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows="4"
                    className={classes.textField}
                />
                <br/>
                <Button 
                    className={classNames(classes.margin, classes.cssRoot)}
                    style={btnStyle} 
                    onClick={this.handleClick}>
                    Add Category
                    </Button>

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
    },
    dropDown: {
        height: '55px',
        width: '198px',
        margin: '5px',
        backgroundColor: '#ffffff',
        color: '#cccccc'
    }
});

const mapStateToProps = (reduxStore) => {
    return {
        subCategory: reduxStore.subCategoryReducer
    }
}


export default withStyles(styles)(connect(mapStateToProps)(AdminAddOutletCategories));
