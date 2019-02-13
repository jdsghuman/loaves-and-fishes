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

class AdminEditOutletCategories extends Component {

    state = {
        editCategories: {
            categoryName: '',
            selectedSubCategory: '',
            notes: '',
            status: '',
            time: moment().format(),
        }
    }

    checkData = () => {
        if (Object.keys(this.state.editCategories).length == 0) {
            this.props.history.push('/admin');
        }
    }

    componentDidMount() {
        this.getCategoryData();
        this.checkData();
        this.props.dispatch({ type: 'FETCH_SUB_CATEGORY' })
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
            editCategories: {
                ...result[0]
            }
        })
    }

    handleChange = propertyName => event => {
        console.log('in handleChange');
        
        this.setState({
            editCategories: {
                ...this.state.editCategories,
                [propertyName]: event.target.value
            }
        })
    }

    handleInputChange = propertyName => event => {
        console.log('in handleInputChange', this.state, 'why');
        this.setState({
            [propertyName]: event.target.value
        })
        console.log(this.state);
    }

    handleClick = () => {
        this.props.dispatch({ type: 'EDIT_CATEGORY', payload: this.state.editCategories });
        swal({
            title: `Updated Category`,
            text: "Category successfully updated",
            icon: "success",
            buttons: "Ok",
        })   
        this.props.history.push('/adminManageOutletCategories');
    }

    render() {
        const { classes } = this.props;

        let subCategoryList =
            this.props.subCategories.map(subcategory => {
                return (
                    <MenuItem key={subcategory.id} value={subcategory.id}>{subcategory.category_name}</MenuItem>
                );
            })
            console.log('afterClick', this.state.editCategories);
        return (
            <div className="div__container container__background--large">
                <Title>Edit Outlet Category</Title>
                {/* Edit Category */}
                <div>
                    <FormLabel style={formLabelStyle}>Category</FormLabel>
                    <TextField
                        id="outlined-name"
                        label="Category"
                        name="category"
                        value={this.state.editCategories.categoryName}
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
                        value={this.state.editCategories.selectedSubCategory}
                        name="sub category"
                        style={{ height: '40px', width: '200px' }}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'sub category',
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
                        value={this.state.editCategories.notes}
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
                        value={this.state.editCategories.status}
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
                </FormControl>
                <div>
                </div>
                <div style={divStyle}>
                    <Button
                        className={classNames(classes.margin, classes.cssRoot)}
                        onClick={this.handleUpdateUserClick}>Update Outlet Category</Button>
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
    subCategories: store.subCategoryReducer
})

export default withStyles(styles)(connect(mapStateToProps)(AdminEditOutletCategories));