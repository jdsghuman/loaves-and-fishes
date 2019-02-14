import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from '../../../Title/Title';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import FormLabel from '@material-ui/core/FormLabel';

class AdminEditSubCategories extends Component {

    state = {
        editSubCategory: {
            category_name: ''
        }
    }

    checkData = () => {
        if (Object.keys(this.state.editSubCategory).length == 0) {
            this.props.history.push('/admin');
        }
    }

    componentDidMount() {
        this.getSubCategoryData();
        // this.checkData();
    }

    componentWillMount() {
        // Redirect the user to the Admin home screen if page is refreshed 
        if (this.props.subCategories.length === 0) {
            this.props.history.push('/admin');
        }
    }

    getSubCategoryData = () => {
        // Get id of sub Category
        let subCategoryId = parseInt(this.props.match.params.id);
        // Filter to show selected subCategory
        const result = this.props.subCategories.filter(subCategory => subCategory.id === subCategoryId);
        this.setState({
            editSubCategory: {
                ...result[0]
            }
        })
    }

    handleChange = event => {
        this.setState({
            editSubCategory: {
                ...this.state.editSubCategory,
                [event.target.name]: event.target.value,
            }
        });
    };


    handleClick = event => {
        this.props.dispatch({ type: "UPDATE_SUB_CATEGORY", payload: this.state.editSubCategory });
        
        this.props.history.push('/adminManageSubCategories');
    }

    render() {
        const { classes } = this.props;
        console.log('after Click', this.state.updateSubCategory);
        return (
            <div className="div__container container__background--large">
                <Title>Edit Sub Category: <span style={{ color: '#98223e' }}>{this.state.editSubCategory.category_name}</span></Title>
                <FormLabel style={formLabelStyle}>Sub Category</FormLabel>
                <br/>
                <TextField
                    label="Outlet Sub Category"
                    name="category_name"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    value={this.state.editSubCategory.category_name}
                    onChange={this.handleChange}
                    className={classes.textField}
                />
                <br />
                <Button
                    className={classNames(classes.margin, classes.cssRoot)}
                    style={btnStyle}
                    onClick={this.handleClick}>
                    Update Sub Category
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

const formLabelStyle = {
    display: 'block',
    marginBottom: '0',
    paddingBottom: '0',
    color: '#98223e'
}

const mapStateToProps = (reduxStore) => ({
    subCategories: reduxStore.subCategoryReducer
})

export default withStyles(styles)(connect(mapStateToProps)(AdminEditSubCategories));