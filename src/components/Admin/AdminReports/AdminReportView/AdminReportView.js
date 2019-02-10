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
import { CSVLink, CSVDownload } from "react-csv";


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

        let report =
            this.props.reduxStore.allMealReducer.map((meal) => {
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
                <Button variant="contained" color="primary" onClick={this.handleReturnClick}>Return to Reports</Button>
                <br />
                <CSVLink data={this.state.dataToExport}><Button variant="contained" >Export</Button></CSVLink>
                <Table style={{marginTop: '20px', marginBottom: '50px'}}>
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
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(withRouter(AdminReportView));