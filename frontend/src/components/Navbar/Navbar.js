import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom'

import './Navbar.css'
import logo from './assets/logo.png'
import groupLogo from './assets/group.png'
import disciplineLogo from './assets/discipline.png'
import typeLogo from './assets/type.png'
import newTask from './assets/paper.png'
import rating from './assets/rating.png'
import menu from './assets/menu.png'

const authLinks = [
    {to: '/groups', label: 'Группы', logo: groupLogo, exact: false},
    {to: '/subjects', label: 'Дисциплины', logo: disciplineLogo, exact: false},
    {to: '/subject-types', label: 'Вид занятия', logo: typeLogo, exact: false},
    {to: '#', label: 'Новое занятие', logo: newTask, exact: false},
    {to: '#', label: 'Рейтинг', logo: rating, exact: false},
    {to: '#', label: '', logo: menu, exact: false}
]

class Navbar extends Component {

    renderAuthLinks() {
        return authLinks.map((link, index) => {
            return (
                <div className={'Link'} key={index}>
                    <NavLink
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
                    <button className="logout-btn" onClick={this.onLogout.bind(this)}>
                        Выйти
                    </button>
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
        return (
            <header>
                <section className={'header'} >
                    <nav className={'Navbar'}>
                        <div className={'Logo'}>
                            <Link to={'/'}>
                                <img src={logo} alt=""/>
                            </Link>

                        </div>
                        <div className={'Links'}>
                            {isAuthenticated ? authLinks: guestLinks}
                        </div>


                    </nav>
                </section>
            </header>
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