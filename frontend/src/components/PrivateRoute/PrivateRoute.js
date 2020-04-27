import React from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom'

export default function (ComposedComponent, adminOnly=false) {
    class PrivateRoute extends React.Component{

        returnAllowedComponent() {
            if (this.props.auth.isAuthenticated) {
                if (adminOnly) {
                    if (this.props.auth.user.role === 'admin') {
                        return (<ComposedComponent  {...this.props}/>)
                    } else {
                        return (<Redirect to={'/'} />)
                    }
                } else {
                    return (<ComposedComponent  {...this.props}/>)
                }
            } else {
                return (<Redirect to={'/login'} />)
            }
        }
        render() {
            return (
                // this.props.auth.isAuthenticated ?
                // <ComposedComponent  {...this.props}/>
                // : <Redirect to={'/login'} />
                this.returnAllowedComponent()
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
