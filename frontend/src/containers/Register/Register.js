import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authentication';
import classnames from 'classnames';

import './Register.css'

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            surname: '',
            patronymic: '',
            email: '',
            password: '',
            password_confirm: '',
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
            name: this.state.name,
            surname: this.state.surname,
            patronymic: this.state.patronymic,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            admin: false
        }
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state;
        return(
            <div className="form-container" >
                <h2 className={'form-header'}>Регистрация</h2>
                <form className={'register-form'} onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <label htmlFor="name">Имя*</label>
                        <input
                            type="text"
                            placeholder="Имя"
                            className={classnames('form-input ', {
                                'invalid': errors.email
                            })}
                            name="name"
                            onChange={ this.handleInputChange }
                            value={ this.state.name }
                        />
                        {errors.name && (<div className="feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Фамилия*</label>
                        <input
                            type="text"
                            placeholder="Фамилия"
                            className={classnames('form-input ', {
                                'invalid': errors.email
                            })}
                            name="surname"
                            onChange={ this.handleInputChange }
                            value={ this.state.surname }
                        />
                        {errors.surname && (<div className="feedback">{errors.surname}</div>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="patronomyc">Отчество*</label>
                        <input
                            type="text"
                            placeholder="Отчество"
                            className={classnames('form-input ', {
                                'invalid': errors.email
                            })}
                            name="patronymic"
                            onChange={ this.handleInputChange }
                            value={ this.state.patronymic }
                        />
                        {errors.patronymic && (<div className="feedback">{errors.patronymic}</div>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Email">Почтовый адрес*</label>
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
                        <label htmlFor="Пароль">Пароль*</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className={classnames('form-input ', {
                                'invalid': errors.email
                            })}
                            name="password"
                            onChange={ this.handleInputChange }
                            value={ this.state.password }
                        />
                        {errors.password && (<div className="feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Подтвердить пароль">Подтвердить пароль*</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={classnames('form-input ', {
                                'invalid': errors.email
                            })}
                            name="password_confirm"
                            onChange={ this.handleInputChange }
                            value={ this.state.password_confirm }
                        />
                        {errors.password_confirm && (<div className="feedback">{errors.password_confirm}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit-btn">
                            Зарегестрироваться
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))