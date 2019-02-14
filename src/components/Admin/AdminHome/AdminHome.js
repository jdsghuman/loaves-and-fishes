import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Title from '../../Title/Title';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Dashboard from '../Dashboard/Dashboard';


class AdminHome extends Component {

    
    handleSubmitUsers = () => {
        this.props.history.push('/adminUser');
    }
    handleSubmitCategories = () => {
        this.props.history.push('/adminManageOutletCategories');
    }
    handleClickManageOutletLocations = () => {
        this.props.history.push('/adminManageOutletLocations');
    }
    handleSubmitAdminAddMeals = () => {
        this.props.history.push('/adminAddMeal');
    }
    handleClickReportGeneration = () => {
        this.props.history.push('/adminReportGeneration');
    }
    handleClickManageSubCategories = () => {
        this.props.history.push('/adminManageSubCategories');
    }
    componentDidMount () {
        this.props.dispatch({ type: 'FETCH_DASHBOARD_COUNT_DAILY' });
        this.props.dispatch({ type: 'FETCH_DASHBOARD_COUNT_MONTHLY' });
        this.dailyInterval = setInterval(()=>{this.props.dispatch({ type: 'FETCH_DASHBOARD_COUNT_DAILY'})}, 1000);
        this.monthInterval = setInterval(() => { this.props.dispatch({ type: 'FETCH_DASHBOARD_COUNT_MONTHLY' }) }, 1000);
    }
    

    componentWillUnmount() {
        clearInterval(this.dailyInterval);
        clearInterval(this.monthInterval);
    }
   

    render() {
        const { classes } = this.props;
        return (
            <>
            <div style={{textAlign: 'center', margin: '5px', marginTop: '20px', marginBottom: '20px'}}>
             <Dashboard 
                count={this.props.reduxStore.dashboardDaily}>
                Meals Today
                </Dashboard>
                <Dashboard
                count={this.props.reduxStore.dashboardMonthly}>
                Last 30 Days
                </Dashboard>
            </div>
            <div className="div__container container__background--large">
                <Title>Admin</Title>
               
                <br/>
                <div style={divStyle}>
                    <Button
                        className={classNames(classes.margin, classes.cssRoot)}
                        style={btnStyle} onClick={this.handleSubmitUsers}>Users
                    </Button>
                </div>
                <div style={divStyle}>
                    <Button
                        className={classNames(classes.margin, classes.cssRoot)}
                        style={btnStyle} onClick={this.handleSubmitAdminAddMeals}>Add Meal
                    </Button>
                </div>
                <div style={divStyle}>
                    <Button
                        className={classNames(classes.margin, classes.cssRoot)}
                        style={btnStyle} onClick={this.handleClickManageOutletLocations}>Manage Outlet Locations
                    </Button>
                </div>
                <div style={divStyle}>
                    <Button
                        className={classNames(classes.margin, classes.cssRoot)}
                        style={btnStyle} onClick={this.handleClickReportGeneration}>Report Generation
                    </Button>
                </div>
                <div style={divStyle}>
                    <Button
                        className={classNames(classes.margin, classes.cssRoot)}
                        style={btnStyle} onClick={this.handleSubmitCategories}>Manage Outlet Categories
                    </Button>
                </div>
                <div style={divStyle}>
                    <Button
                        className={classNames(classes.margin, classes.cssRoot)}
                        style={btnStyle} onClick={this.handleClickManageSubCategories}>Manage Sub Categories
                    </Button>
                </div>
            </div>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxStore) => ({
    reduxStore
})


const divStyle = {
    display: 'inline-block',
    marginBottom: '20px'
}

const btnStyle = {
    height: '75px',
    width: '250px',
    margin: '10px'
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
});

export default withStyles(styles)(connect(mapReduxStateToProps)(AdminHome));

