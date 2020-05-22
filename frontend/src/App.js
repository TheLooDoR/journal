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
import './App.scss'
import Navbar from './components/Navbar/Navbar';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import EmailConfirm from "./components/EmailConfirm/EmailConfirm";
import ForgotPassword from "./containers/ForgetPassword/ForgotPassword";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import LeftMenu from "./components/LeftMenu/LeftMenu";
import NotFound from "./containers/NotFound/NotFound";
import Users from "./containers/Admin/Users/Users";
import AdminGroups from "./containers/Admin/AdminGroups/AdminGroups";
import AdminSubjects from "./containers/Admin/AdminSubjects/AdminSubjects";
import AdminCorps from "./containers/Admin/AdminCorps/AdminCorps";
import AdminDepartments from "./containers/Admin/AdminDepartments/AdminDepartments";
import AdminSchedule from "./containers/Admin/AdminSchedule/AdminSchedule";
import PersonalPage from "./containers/PersonalPage/PersonalPage";
import GroupStatistics from "./containers/Statistics/GroupStatistics/GroupStatistics";
import UserStatistics from "./containers/Statistics/UserStatistics/UserStatistics";
import DepartmentStatistic from "./containers/Statistics/DepartmentStatistics/DepartmentStatistics";
import FacultyStatistics from "./containers/Statistics/FacultyStatistics/FacultyStatistics";
import JournalsByType from "./containers/UserJournals/JournalsByType/JournalsByType";
import JournalsBySubject from "./containers/UserJournals/JournalsBySubject/JournalsBySubject";
import JournalsByGroup from "./containers/UserJournals/JournalsByGroup/JournalsByGroup";

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
                                <Route path='/users' component={ PrivateRoute(Users, true) }/>
                                <Route path='/admin-groups' component={ PrivateRoute(AdminGroups, true) }/>
                                <Route path='/admin-schedule' component={ PrivateRoute(AdminSchedule, true) }/>
                                <Route path='/admin-subjects' component={ PrivateRoute(AdminSubjects, true) }/>
                                <Route path='/admin-corps' component={ PrivateRoute(AdminCorps, true) }/>
                                <Route path='/admin-departments' component={ PrivateRoute(AdminDepartments, true) }/>
                                <Route exact path='/me' component={ PrivateRoute(PersonalPage) } />
                                <Route path='/group-statistics' component={ PrivateRoute(GroupStatistics) } />
                                <Route path='/department-statistics' component={ PrivateRoute(DepartmentStatistic)}/>
                                <Route path='/user-statistics' component={PrivateRoute(UserStatistics)} />
                                <Route path='/faculty-statistics' component={PrivateRoute(FacultyStatistics)} />
                                <Route path='/journals-by-type' component={PrivateRoute(JournalsByType)}/>
                                <Route path='/journals-by-subject' component={PrivateRoute(JournalsBySubject)}/>
                                <Route path='/journals-by-group' component={PrivateRoute(JournalsByGroup)}/>
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