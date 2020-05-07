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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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
                            <Link className="Navbar__guest-link " to="/register">  <FontAwesomeIcon className="Navbar__guest-link-icon" icon="check-square" /> 
                            <p>Зарегистрироватся</p>
                            </Link>
                        </div>
                        <div className="Navbar__link menu-item">
                            <Link className="Navbar__guest-link " to="/login"> <FontAwesomeIcon className="Navbar__guest-link-icon" icon="check-square" />
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