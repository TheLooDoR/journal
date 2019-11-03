import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class Home extends Component {
    render() {
        return (
            <div>
                Home Component
                <Link className="navbar-brand" to="/testHome">Test home</Link>
            </div>
        );
    }
}