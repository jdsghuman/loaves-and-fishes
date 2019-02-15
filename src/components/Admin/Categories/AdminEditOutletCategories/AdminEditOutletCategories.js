import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from '../../../Title/Title';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import swal from "sweetalert";
import moment from 'moment';
import BackButton from '../../../BackButton/BackButton';

class AdminEditOutletCategories extends Component {

    state = {
        editCategory: {
            category_name: '',
            sub_category: '',
            notes: '',
            active: '',
            name: '',
            date_updated: '',
        }
    }

    // checkData = () => {
    //     if (Object.keys(this.state.editCategory).length == 0) {
    //         this.props.history.push('/admin');
    //     }
    // }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_SUB_CATEGORY' })
        this.props.dispatch({ type: 'FETCH_CATEGORY_OUTLET' })
        this.getCategoryData();
    }

    componentWillMount() {
        // Redirect the user to the Admin home screen if page is refreshed 
        if (this.props.categories.length === 0) {
            this.props.history.push('/admin');
        }
    }

    getCategoryData = () => {
        // Get id of category
        let categoryId = parseInt(this.props.match.params.id);
        // Filter to show selected category
        const result = this.props.categories.filter(category => category.id === categoryId);
        this.setState({
            editCategory: {
                ...result[0]
            }
        })
    }

    handleChange = event => {
        console.log('in handleChange');
        this.setState({
            editCategory: {
                ...this.state.editCategory,
                [event.target.name]: event.target.value,
            }
        })
    }

    handleClick = () => {
        this.props.dispatch({ type: 'EDIT_CATEGORY', payload: this.state.editCategory });
        // swal({
        //     title: `Updated Category`,
        //     text: "Category successfully updated",
        //     icon: "success",
        //     buttons: "Ok",
        // })   
        this.props.history.push('/adminManageOutletCategories');
    }

    render() {
        const { classes } = this.props;

        let subCategoryList =
            this.props.subCategoryReducer.map(subcategory => {
                return (
                    <MenuItem key={subcategory.id} value={subcategory.id}>{subcategory.category_name}</MenuItem>
                );
            })
            console.log('afterClick', this.state);
        return (
            <div className="div__container container__background--large">
                <Title>Edit Outlet Category</Title>
                <BackButton click={() => this.props.history.goBack()} />
                {/* Edit Category */}
                <div>
                    <FormLabel style={formLabelStyle}>Category</FormLabel>
                    <TextField
                        id="outlined-name"
                        label="Category"
                        name="category_name"
                        value={this.state.editCategory.category_name}
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
                {/* Edit Sub Category */}
                <FormLabel style={formLabelStyle}>Sub Category</FormLabel>
                <FormControl className={this.props.classes.formControl}>
                    <Select
                        value={this.state.editCategory.sub_category}
                        name="sub_category"
                        style={{ height: '40px', width: '200px' }}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'sub_category',
                        }}
                    >
                        {subCategoryList}
                        </Select>
                        </FormControl>
                {/* Edit Email */}
                <div>
                    <FormLabel style={formLabelStyle}>Notes</FormLabel>
                    <TextField
                        id="outlined-name"
                        label="Notes"
                        name="notes"
                        value={this.state.editCategory.notes}
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
                <FormLabel style={formLabelStyle}>Status</FormLabel>
                <FormControl className={this.props.classes.formControl}>
                    <Select
                        value={this.state.editCategory.active}
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
                </FormControl>
                <div>
                </div>
                <div style={divStyle}>
                    <Button
                        className={classNames(classes.margin, classes.cssRoot)}
                        onClick={this.handleClick}>Update Outlet Category</Button>
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

const mapStateToProps = store => ({
    categories: store.categoryReducer,
    subCategoryReducer: store.subCategoryReducer
})

export default withStyles(styles)(connect(mapStateToProps)(AdminEditOutletCategories));