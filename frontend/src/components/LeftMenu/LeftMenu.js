import React, { Component } from "react";
import { connect } from 'react-redux'
import usersLogo from '../../assets/admin/users.png'
import groupsLogo from '../../assets/admin/groups.png'
import { NavLink } from "react-router-dom";

import './LeftMenu.scss'

class LeftMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            adminLinks: [
                {to: '/users', logo: usersLogo, exact: false},
                {to: '/admin-groups', logo: groupsLogo, exact: false}
            ]
        }
    }

    renderAdminLinks() {
        return this.state.adminLinks.map((el, index) => {
            return (
                <div className='LeftMenu__link' key={index}>
                    <NavLink to={el.to} exact={el.exact}><img src={el.logo} alt=""/></NavLink>
                </div>
            )
        })
    }

    render() {
        return (
            <div className='LeftMenu'>
                {this.renderAdminLinks()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}



export default connect(mapStateToProps)(LeftMenu)