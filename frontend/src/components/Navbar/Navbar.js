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
import {DropdownButton} from "react-bootstrap";
import {Dropdown} from "react-bootstrap";
import './Navbar.scss'

const authLinks = [
    {to: '/journals-by-group', label: 'По группам', logo: groupLogo, exact: false},
    {to: '/journals-by-subject', label: 'По дисциплинам', logo: disciplineLogo, exact: false},
    {to: '/journals-by-type', label: 'По видам занятий', logo: typeLogo, exact: false}
]

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    renderAuthLinks() {
        return authLinks.map((link, index) => {
            return (
                <div className={`Navbar__link ${this.props.auth.user.role === 'admin' ? 'Navbar__admin-link' : ''}`} key={index}>
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
                    { this.renderAuthLinks() }
                    <DropdownButton
                        id='user-dropdown-btn'
                        className='Navbar__dropdown'
                        title={
                            <div className={'Navbar__link'}>
                                <img src={userLogo} alt=""/>
                                <div className="Navbar__logout-btn">
                                    {user.name}
                                </div>
                            </div>
                        }
                    >
                        <Dropdown.Item as={Link} to='/me'>Личный кабинет</Dropdown.Item>
                        <Dropdown.Item onClick={this.onLogout.bind(this)}>Выйти</Dropdown.Item>
                    </DropdownButton>
                </>
            )
        }

        const guestLinks = (
            <>
                <div className="Navbar__link">
                    <Link className="Navbar__guest-link" to="/register">Зарегистрироваться</Link>
                </div>
                <div className="Navbar__link">
                    <Link className="Navbar__guest-link" to="/login">Войти</Link>
                </div>
            </>
        )
        return (
            <header>
                <section className={'header'} >
                    { (!this.props.isDesktop && isAuthenticated)  &&
                        <Menu right>
                            { this.renderAuthLinks() }
                            <DropdownButton
                                id='user-dropdown-btn-mobile'
                                className='Navbar__dropdown'
                                title={
                                    <div className={'Navbar__link'} style={{ flexDirection: 'row'}}>
                                        <img src={userLogo} alt=""/>
                                        <div className="Navbar__burger-logout-btn">
                                            {user.name}
                                        </div>
                                    </div>
                                }
                            >
                                <Dropdown.Item as={Link} to='/me'>Личный кабинет</Dropdown.Item>
                                <Dropdown.Item onClick={this.onLogout.bind(this)}>Выйти</Dropdown.Item>
                            </DropdownButton>
                        </Menu>
                    }
                    <nav className={'Navbar'}>
                        <div className={'Navbar__logo'}>
                            {user.role === 'admin' ? <div className="Navbar__square"/> : null}
                            <NavLink to={'/'} exact>
                                <img src={logo} alt=""/>
                            </NavLink>
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