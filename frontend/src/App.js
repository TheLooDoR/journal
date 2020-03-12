import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Groups from './containers/Groups/Groups'
import Subjects from './containers/Subjects/Subjects'
import SubjectTypes from './containers/SubjectTypes/SubjectTypes'

import TestHome from "./containers/TestHome/TestHome";

import './App.scss'



class App extends Component {

    render() {

        if(localStorage.jwtToken) {
            setAuthToken(localStorage.jwtToken);
            const decoded = jwt_decode(localStorage.jwtToken);
            store.dispatch(setCurrentUser(decoded));

            const currentTime = Date.now() / 1000;
            if(decoded.exp < currentTime) {
                store.dispatch(logoutUser(this.props.history));
                window.location.href = '/login'
            }
        }
        return (
            <div>
                <Navbar />
                <Route exact path="/" component={ PrivateRoute(Home) } />
                <Route exact path="/testHome" component={ PrivateRoute(TestHome, true) } />
                <Route path="/groups" component={ PrivateRoute(Groups) } />
                <Route path="/subjects" component={ PrivateRoute(Subjects) } />
                <Route path="/subject-types" component={ PrivateRoute(SubjectTypes) } />
                <div className="container">
                    <Route exact path="/register" component={ Register } />
                    <Route exact path="/login" component={ Login } />
                </div>
            </div>
        );
    }
}

export default withRouter(App);