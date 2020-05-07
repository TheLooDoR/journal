import React, { Component } from "react";
import { connect } from 'react-redux'
import usersLogo from '../../assets/admin/users.png'
import groupsLogo from '../../assets/admin/groups.png'
import subjectsLogo from '../../assets/admin/subjects.png'
import corpsLogo from '../../assets/admin/corps.png'
import departmentLogo from '../../assets/admin/department.png'
import { NavLink } from "react-router-dom";

import './LeftMenu.scss'

class LeftMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            adminLinks: [
                {to: '/users', logo: usersLogo, exact: false},
                {to: '/admin-groups', logo: groupsLogo, exact: false},
                {to: '/admin-subjects', logo: subjectsLogo, exact: false},
                {to: '/admin-corps', logo: corpsLogo, exact: false},
                {to: 'admin-departments', logo: departmentLogo, exact: false}
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