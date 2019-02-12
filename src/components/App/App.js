import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import InfoPage from '../InfoPage/InfoPage';
import AdminHome from '../Admin/AdminHome/AdminHome';
import AdminRoute from '../AdminRoute/AdminRoute';
import AdminUsers from '../Admin/Users/AdminUsers/AdminUsers';
import OnSiteHome from '../OnSite/OnSiteHome/OnSiteHome';
import OnSiteDemo from '../OnSite/OnSiteDemo/OnSiteDemo';
import OnSiteMeal from '../OnSite/OnSiteMeal/OnSiteMeal';
import NewUserMessage from '../NewUserMessage/NewUserMessage';
import AdminManageOutletCategories from '../Admin/Categories/AdminManageOutletCategories/AdminManageOutletCategories';
import AdminAddOutletCategories from '../Admin/Categories/AdminAddOutletCategories/AdminAddOutletCategories';
import AdminAddLocations from '../Admin/Locations/AdminAddLocations/AdminAddLocations';
import AdminManageOutletLocations from '../Admin/Locations/AdminManageOutletLocations/AdminManageOutletLocations';
import AdminReportGenerations from '../Admin/AdminReports/AdminReportGenerations/AdminReportGenerations';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";
import AdminReportView from '../Admin/AdminReports/AdminReportView/AdminReportView';
import AdminEditUser from '../Admin/Users/AdminEditUser/AdminEditUser';

import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#98223e" },
    secondary: { main: "#98223e" }
  },
});

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />
              {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
              <Route
                exact
                path="/about"
                component={AboutPage}
              />
              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute
                exact
                path="/home"
                component={OnSiteHome}
              />
              {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
              <ProtectedRoute
                exact
                path="/info"
                component={InfoPage}
              />
              <AdminRoute
                exact
                path="/admin"
                component={AdminHome}
              />
              <AdminRoute
                exact
                path="/adminUser"
                component={AdminUsers}
              />
              <AdminRoute
                exact
                path="/admin/user/:id"
                component={AdminEditUser}
              />
              <AdminRoute
                exact
                path="/adminManageOutletCategories"
                component={AdminManageOutletCategories}
              />
              <AdminRoute
                exact
                path="/adminAddOutletCategories"
                component={AdminAddOutletCategories}
              />
              <ProtectedRoute
                exact
                path="/onSiteDemo"
                component={OnSiteDemo}
              />
              <ProtectedRoute
                exact
                path="/OnSiteMeal"
                component={OnSiteMeal}
              />
              <ProtectedRoute
                exact
                path="/NewUser"
                component={NewUserMessage}
              />
              <AdminRoute
                exact
                path="/adminAddLocations"
                component={AdminAddLocations}
              />
              <AdminRoute
                exact
                path="/adminManageOutletLocations"
                component={AdminManageOutletLocations}
              />
              <AdminRoute
                exact
                path="/adminReportGeneration"
                component={AdminReportGenerations}
              />
              <AdminRoute
                exact
                path="/adminReportView"
                component={AdminReportView}
              />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default connect()(App);
