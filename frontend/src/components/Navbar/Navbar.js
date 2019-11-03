import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom'

import classes from './Navbar.css'
import logo from './assets/logo.png'
import groupLogo from './assets/group.png'
import disciplineLogo from './assets/discipline.png'
import typeLogo from './assets/type.png'
import newTask from './assets/paper.png'
import rating from './assets/rating.png'
import menu from './assets/menu.png'

const authLinks = [
    {to: '#', label: 'Группа', logo: groupLogo, exact: false},
    {to: '#', label: 'Дисциплина', logo: disciplineLogo, exact: false},
    {to: '#', label: 'Вид занятия', logo: typeLogo, exact: false},
    {to: '#', label: 'Новое занятие', logo: newTask, exact: false},
    {to: '#', label: 'Рейтинг', logo: rating, exact: false},
    {to: '#', label: '', logo: menu, exact: false}
]

class Navbar extends Component {

    renderAuthLinks() {
        return authLinks.map((link, index) => {
            return (
                <div className={'Link'}>
                    <NavLink
                        key={index}
                        to={link.to}
                        exact={link.exact}
                    >
                        <img src={link.logo} alt=""/>
                        {link.label}
                    </NavLink>
                </div>

            )
        })
    }

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <>
                {this.renderAuthLinks()}
                <div className={'Link'}>
                    <p>{ user.email }</p>
                    <a href="#" className="" onClick={this.onLogout.bind(this)}>
                        Выйти
                    </a>
                </div>
            </>
        )
        const guestLinks = (
            <>
                <div className="Link">
                    <Link className="nav-link" to="/register">Зарегестрироваться</Link>
                </div>
                <div className="Link">
                    <Link className="nav-link" to="/login">Войти</Link>
                </div>
            </>
        )
        return(

            <React.Fragment >
                <nav className={'Navbar'}>
                    <div className={'Logo'}>
                        <img src={logo} alt=""/>
                    </div>
                    <div className={'Links'}>
                        {isAuthenticated ? authLinks: guestLinks}
                    </div>


                </nav>
            </React.Fragment>
            //<nav className="navbar navbar-expand-lg navbar-light bg-light">
               // <Link className="navbar-brand" to="/">Redux Node Auth</Link>
                //<Link className="navbar-brand" to="/testHome">Test home</Link>
                //<div className="collapse navbar-collapse" id="navbarSupportedContent">
                  //  {isAuthenticated ? authLinks : guestLinks}
                //</div>
            //</nav>
        )
    }
}



Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));