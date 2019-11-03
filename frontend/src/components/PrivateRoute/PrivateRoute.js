import React from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom'

export default function (ComposedComponent) {
    class PrivateRoute extends React.Component{
        render() {
            return (
                this.props.auth.isAuthenticated ?
                <ComposedComponent  {...this.props}/>
                : <Redirect to={'/login'} />
            )
        }
    }

    PrivateRoute.propTypes = {
        auth: PropTypes.object.isRequired
    }
    
    function mapStateToProps(state) {
        return {
            auth: state.auth
        }
    }

    return connect(mapStateToProps)(PrivateRoute)
}
