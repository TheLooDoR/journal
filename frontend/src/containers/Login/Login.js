import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authentication';
import classnames from 'classnames';

import './Login.css'

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(user);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const { errors } = this.state;
        return(
            <div className="container form-container" style={{ marginTop: '150px', width: '600px'}}>
                <h2 className={'form-header'}>Авторизация</h2>
                <form className={'login-form'} onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <label htmlFor="email">Почтовый адрес*</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className={classnames('form-input ', {
                                'invalid': errors.email
                            })}
                            name="email"
                            onChange={ this.handleInputChange }
                            value={ this.state.email }
                        />
                        {errors.email && (<div className="feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Почтовый адрес*</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className={classnames('form-input', {
                                'invalid': errors.password
                            })}
                            name="password"
                            onChange={ this.handleInputChange }
                            value={ this.state.password }
                        />
                        {errors.password && (<div className="feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit-btn">
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, { loginUser })(Login)