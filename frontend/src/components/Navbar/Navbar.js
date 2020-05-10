import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import logo from '../../assets/navbar/logo.png'
import groupLogo from '../../assets/navbar/group.png'
import disciplineLogo from '../../assets/navbar/discipline.png'
import typeLogo from '../../assets/navbar/type.png'
import newTask from '../../assets/navbar/paper.png'
import rating from '../../assets/navbar/rating.png'
import userLogo  from '../../assets/navbar/user.png'
import withSizes from 'react-sizes'
import { slide as Menu } from 'react-burger-menu'

import './Navbar.scss'



const authLinks = [
    {to: '/groups', label: 'Группы', logo: groupLogo, exact: false},
    {to: '/subjects', label: 'Дисциплины', logo: disciplineLogo, exact: false},
    {to: '/subject-types', label: 'Вид занятия', logo: typeLogo, exact: false},
    {to: '#', label: 'Новое занятие', logo: newTask, exact: false},
    {to: '#', label: 'Рейтинг', logo: rating, exact: false}
]

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    renderAuthLinks() {
        return authLinks.map((link, index) => {
            return (
                <div className={'Navbar__link'} key={index}>
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

    render() {
        const {isAuthenticated, user} = this.props.auth;
        let authLinks = null
        if (this.props.isDesktop) {
            authLinks = (
                <>
                    {this.renderAuthLinks()}
                    <div className={'Navbar__link'}>
                        <img src={userLogo} alt=""/>
                        <button className="Navbar__logout-btn" onClick={this.onLogout.bind(this)}>
                            {user.name}
                        </button>
                    </div>
                </>
            )
        }

        const guestLinks = (
            <>
            
        <input type="checkbox" href="#" className="menu-open" name="menu-open" id="menu-open"/>
        <label className="menu-open-button" for="menu-open">
            <span className="hamburger hamburger-1"></span>
            <span className="hamburger hamburger-2"></span>
            <span className="hamburger hamburger-3"></span>
        </label>
                         <div className="Navbar__link menu-item">
                            <Link className="Navbar__guest-link " to="/register"> 
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-out-alt" class="svg-inline--fa fa-sign-out-alt fa-w-16 Navbar__guest-link-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path></svg>
                            <p>Зарегистрироватся</p>
                            </Link>
                            

                        </div>
                        <div className="Navbar__link menu-item">
                            <Link className="Navbar__guest-link " to="/login"> 
                            <svg   aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14 Navbar__guest-link-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                            <p>Войти</p>
                            </Link>
                            
                        </div>


            </>
        )
        return (
            <header>
                <section className={'header'} >
                    {this.props.isDesktop || !isAuthenticated || user.role === 'admin' ?  null :
                        <Menu right>
                            {this.renderAuthLinks()}
                            <div className={'Navbar__link'}>
                                <img src={userLogo} alt=""/>
                                <button className="Navbar__logout-btn" onClick={this.onLogout.bind(this)}>
                                    {user.name}
                                </button>
                            </div>
                        </Menu>
                    }
                    <nav className={'Navbar'}>
                        <div className={'Navbar__logo'}>
                            {user.role === 'admin' ? <div className="Navbar__square"/> : null}
                            <Link to={'/'}>
                                <img src={logo} alt=""/>
                            </Link>
                        </div>
                        <div className={'Navbar__links'}>
                            {isAuthenticated
                                ? authLinks
                                : guestLinks}
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

const mapSizesToProps = ({ width }) => ({
    isDesktop: width >= 1024
})

export default withSizes(mapSizesToProps)(connect(mapStateToProps, { logoutUser })(withRouter(Navbar)))