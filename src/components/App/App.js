import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import InfoPage from '../InfoPage/InfoPage';
import AdminHome from '../Admin/AdminHome/AdminHome';
import AdminRoute from '../AdminRoute/AdminRoute';
import AdminUsers from '../Admin/AdminUsers/AdminUsers';
import OnSiteHome from '../Onsite/OnSiteHome/OnSiteHome';
import OnSiteDemo from '../Onsite/OnSiteDemo/OnSiteDemo';
import OnSiteMeal from '../Onsite/OnSiteMeal/OnSiteMeal';
import NewUserMessage from '../NewUserMessage/NewUserMessage';
import AdminCategories from '../Admin/Categories/AdminManageOutletCategories/AdminManageOutletCategories';


import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
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
              path="/adminCategories"
              component={AdminCategories}
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
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
