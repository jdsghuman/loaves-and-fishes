import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from '../../../Title/Title';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import swal from 'sweetalert';

class AdminEditSubCategories extends Component {

    state = {
        updateSubCategory: {
            subCategoryUpdated: '',
        }
    }

    checkData = () => {
        if (Object.keys(this.state.updateSubCategory).length == 0) {
            this.props.history.push('/admin');
        }
    }

    componentDidMount() {
        this.getSubCategoryData();
        this.checkData();
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
            updateSubCategory: {
                ...result[0]
            }
        })
    }

    handleChange = event => {
        console.log("in handleChange");
        this.setState({
            updateSubCategory: {
                ...this.state.updateSubCategory,
                subCategoryUpdated: event.target.value,
            }
        });
    };


    handleClick = event => {
        console.log('in handleClick', this.state.updateSubCategory);
        this.props.dispatch({ type: "UPDATE_SUB_CATEGORY", payload: this.state.updateSubCategory });
        swal({
            title: `Updated Sub Category`,
            text: "Sub Category successfully updated",
            icon: "success",
            buttons: "Ok",
        })
        this.props.history.push('/adminManageSubCategories');
    }

    render() {
        const { classes } = this.props;
        console.log('after Click', this.state.updateSubCategory);
        return (
            <div className="div__container container__background--large">
                <Title>Edit Sub Category</Title>
                <TextField
                    label="Outlet Sub Category"
                    name="Outlet Sub Category"
                    type="text"
                    value={this.state.updateSubCategory.subCategoryUpdated}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                />
                <br />
                <Button
                    className={classNames(classes.margin, classes.cssRoot)}
                    style={btnStyle}
                    color="secondary"
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

const mapStateToProps = (reduxStore) => ({
    subCategories: reduxStore.subCategoryReducer
})

export default withStyles(styles)(connect(mapStateToProps)(AdminEditSubCategories));