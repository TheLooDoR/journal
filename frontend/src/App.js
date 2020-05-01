import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import { withRouter } from 'react-router-dom';
import ReactNotification from 'react-notifications-component'
import { connect } from 'react-redux'
import { store as Notification } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './commonStyles/admin-table.scss'
import './commonStyles/admin-crud-modal.scss'
import Navbar from './components/Navbar/Navbar';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Groups from './containers/Groups/Groups'
import Subjects from './containers/Subjects/Subjects'
import SubjectTypes from './containers/SubjectTypes/SubjectTypes'
import EmailConfirm from "./components/EmailConfirm/EmailConfirm";
import ForgotPassword from "./containers/ForgetPassword/ForgotPassword";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import LeftMenu from "./components/LeftMenu/LeftMenu";
import NotFound from "./containers/NotFound/NotFound";
import Users from "./containers/Users/Users";
import AdminGroups from "./containers/AdminGroups/AdminGroups";
import './App.scss'

if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login'
    }
}


class App extends Component {

    constructor(props) {
        super(props);
        this.props.history.listen((location, action) => {
            if(localStorage.jwtToken) {
                setAuthToken(localStorage.jwtToken);
                const decoded = jwt_decode(localStorage.jwtToken);
                store.dispatch(setCurrentUser(decoded));

                const currentTime = Date.now() / 1000;
                if(decoded.exp < currentTime) {
                    store.dispatch(logoutUser(this.props.history));
                    Notification.addNotification({
                        title: 'Авторизация',
                        message: 'Время вашей сессии истекло. Пожалуйста, пройдите авторизацию повторно.',
                        type: "default",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true,
                            pauseOnHover: true,
                            showIcon: true
                        }
                    });
                    // window.location.href = '/login'
                }
            }
        })
    }

    render() {
        const { role } = this.props.auth.user
        let adaptiveMargin = role === 'admin' ? 75 : 0
        return (
            <div>
                <ReactNotification />
                <Navbar />
                <div className="App__content-wrap">
                    {role === 'admin' ? <LeftMenu /> : null}
                    <div style={{width: '100%', marginLeft: adaptiveMargin}}>
                        <div className="App__content">
                            <Switch>
                                <Route exact path='/email-confirm/:id' component={EmailConfirm}/>
                                <Route exact path='/reset/:token' component={ResetPassword}/>
                                <Route exact path='/forgot-password' component={ForgotPassword}/>
                                <Route path="/groups" component={ PrivateRoute(Groups) } />
                                <Route path="/subjects" component={ PrivateRoute(Subjects) } />
                                <Route path="/subject-types" component={ PrivateRoute(SubjectTypes) } />
                                <Route path='/users' component={ PrivateRoute(Users, true) }/>
                                <Route path='/admin-groups' component={ PrivateRoute(AdminGroups, true) }/>
                                <Route exact path="/register" component={ Register } />
                                <Route exact path="/login" component={ Login } />
                                <Route exact path="/" component={ PrivateRoute(Home) } />
                                <Route path='*'component={ NotFound } />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(withRouter(App))