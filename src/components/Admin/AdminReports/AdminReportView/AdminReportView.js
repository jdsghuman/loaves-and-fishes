import React, { Component } from 'react';
import Title from '../../../Title/Title';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CSVLink } from "react-csv";
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

class AdminReportView extends Component {

    state = {
        dataToExport: []
    }

    handleReturnClick = () => {
        this.handleClear()
        this.props.history.push('/adminReportGeneration')
    }

    handleClear = () => {
        this.setState({
            dataToExport: []
        })
        console.log('in handleClear', this.state);

    }

    render() {
        const { classes } = this.props;

        let report =
            this.props.reduxStore.reportMealReducer.map((meal) => {
                this.state.dataToExport.push(meal);
                return (
                    <TableRow key={meal.id}>
                        <TableCell >{meal.category_name}</TableCell>
                        <TableCell >{meal.location_name}</TableCell>
                        <TableCell >{meal.timestamp}</TableCell>
                        <TableCell >{meal.meal_count}</TableCell>
                        <TableCell >{String(meal.farm)}</TableCell>
                        <TableCell >{String(meal.summer)}</TableCell>
                        <TableCell >{meal.gender_name || 'no gender specified'}</TableCell>
                        <TableCell >{meal.race_name || 'no race specified'}</TableCell>
                        <TableCell >{meal.age_category || 'no age specified'}</TableCell>
                    </TableRow>
                );
            })

        console.log(this.state);

        return (
            <div>
                <Title>Report</Title>
                <Button
                    className={classNames(classes.margin, classes.cssRoot)}
                    onClick={this.handleReturnClick}>Return to Reports
                </Button>
                <div>
                    <CSVLink data={this.state.dataToExport}>
                        <Button
                            className={classNames(classes.margin, classes.exportButton)}>Export
                        </Button>
                    </CSVLink>
                </div>
                <div className={classes.root}>
                    <Table style={{ marginTop: '20px', marginBottom: '50px' }}>
                        <TableHead>
                            <TableRow id="tableHead">
                                <TableCell >Outlet Category</TableCell>
                                <TableCell >Location Name</TableCell>
                                <TableCell >Date Collected</TableCell>
                                <TableCell >Total Served</TableCell>
                                <TableCell >Farm to Table</TableCell>
                                <TableCell >Summer Meal</TableCell>
                                <TableCell >Gender</TableCell>
                                <TableCell >Race</TableCell>
                                <TableCell >Age</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {report}
                        </TableBody>
                    </Table>
                </div>
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
    exportButton: {
        color: theme.palette.getContrastText('#d5d5d5'),
        backgroundColor: '#d5d5d5',
        '&:hover': {
            backgroundColor: '#767676',
        },
    }
});

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}

export default withStyles(styles)(connect(mapStateToProps)(withRouter(AdminReportView)));