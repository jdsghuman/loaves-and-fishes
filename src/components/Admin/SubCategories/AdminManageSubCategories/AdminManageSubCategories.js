import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Title from '../../../Title/Title';
import swal from "sweetalert";

class AdminManageSubCategories extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_SUB_CATEGORY' });
    }

    handleAddNewSubCategory = () => {
        this.props.history.push('/adminAddSubCategories');
    }

    editSubCategories = (id) => {
        this.props.history.push(`/adminEditSubCategories/${id}`);
    }


    removeSubCategories = (id) => {
        console.log('in remove sub-categories', id)
        // Prompt user with alert before deleting sub-category
        swal({
            title: "Are you sure?",
            text: "This will permanently delete the sub-category. Are you sure you want to delete this sub-category?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    this.props.dispatch({ type: 'DELETE_SUB_CATEGORY', payload: id });
                    swal("Deleted!", "Sub-Category has been deleted!", "success");
                }
                else {
                    swal("Deletion has been canceled")
                }
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Title>Manage Sub-Category</Title>
                <Button
                    className={classNames(classes.margin, classes.cssRoot)}
                    onClick={this.handleAddNewSubCategory}>Add New Sub-Category
        </Button>
                <div className={classes.root}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Sub Category</CustomTableCell>
                                <CustomTableCell>Edit</CustomTableCell>
                                <CustomTableCell>Delete</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.subCategories.map((subCategory) => {
                                console.log('checking ', subCategory);
                                return (
                                    <TableRow key={subCategory.id} >
                                        <TableCell >{subCategory.category_name}</TableCell>
                                        <TableCell >
                                            <Button size="small" variant="contained" color="secondary" onClick={() => this.editSubCategories(subCategory.id)}><EditIcon /></Button>
                                        </TableCell>
                                        <TableCell >
                                            <Button 
                                                className={classNames(classes.margin, classes.cssRoot)}
                                                style={btnStyle}
                                                onClick={() => this.removeSubCategories(subCategory.id)}>
                                                <DeleteIcon/>
                                                </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }
}

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
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
});

const btnStyle = {
    marginTop: '10px'
}

const mapReduxStateToProps = (reduxStore) => ({
    subCategories: reduxStore.subCategoryReducer
})

export default withStyles(styles)(connect(mapReduxStateToProps)(AdminManageSubCategories));