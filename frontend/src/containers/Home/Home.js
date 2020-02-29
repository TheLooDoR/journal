import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './Home.scss'

export default class Home extends Component {
    render() {
        return (
            <div className='Home'>
                Home Component
                <Link className="navbar-brand" to="/testHome">Test home</Link>
            </div>
        );
    }
}