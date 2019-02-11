import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from '../../../Title/Title';
import moment from 'moment';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import AdminAddSubCategories from '../AdminAddSubCategories/AdminAddSubCategories';

const style = {
    width: '70%',
    marginTop: '7em'
}

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
        categoryName: '',
        selectSubCategory: '',
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
            selectSubCategory: '',
            notes: '',
            time: moment().format(),

        })
    }

    render() {
        let subCategoryList =
            this.props.subCategory.map(subCategories => {
                return (
                    <MenuItem key={subCategories.id} value={subCategories.id} id={subCategories.id}>{subCategories.category_name}</MenuItem>
                );
            })
        return (
            <div className="div__container container__background" style={style}>
                <Title>Add New Category</Title>
                <TextField
                    label="Outlet Category"
                    name="Outlet Category"
                    type="text"
                    value={this.state.categoryName}
                    onChange={this.handleInputChangeFor('categoryName')}
                    margin="normal"
                    variant="outlined"
                    color="secondary"
                    style={spacing}
                />
                <FormControl >
                    <InputLabel>Sub-Category</InputLabel>
                    <Select
                        onChange={this.handleInputChangeFor('selectedCategory')}
                        value={this.state.selectSubCategory}
                        style={{ height: '47px', width: '250px' }}
                    >
                    {subCategoryList}
                    </Select>
                </FormControl>
                <br/>
                <TextField
                    label="Notes"
                    name="Notes"
                    type="text"
                    value={this.state.notes}
                    onChange={this.handleInputChangeFor('notes')}
                    margin="normal"
                    variant="outlined"
                    style={spacing}
                    multiline
                    rows="4"
                />
                <br/>
                <Button style={btnStyle} variant="contained" color="secondary" onClick={this.handleClick}>Add Category</Button>
                <AdminAddSubCategories/>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        subCategory: reduxStore.subCategoryReducer
    }
}

export default connect(mapStateToProps)(AdminAddOutletCategories);
