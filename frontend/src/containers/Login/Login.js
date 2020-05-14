import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authentication';
import { setError } from "../../actions";
import classnames from 'classnames';
import Axios from "axios";
import { store } from 'react-notifications-component'
import '../Register/Register.scss'
import Loader from "../../components/UI/Loader/Loader";
import {Link} from "react-router-dom";
import './Login.scss'


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

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillUnmount() {
        this.props.setError({})
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

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email.toLowerCase(),
            password: this.state.password,
        }
        this.props.loginUser(user);
    }

    repeatedConfirmHandler = (e) => {
        Axios.get(`api/users/register/repeated-confirm/${this.state.email}`)
            .then(res => {
                store.addNotification({
                    title: 'Подтверждение',
                    message: res.data.msg,
                    type: "default",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true,
                        pauseOnHover: true,
                        showIcon: true
                    }
                });
            })
    }

    render() {
        const { errors } = this.state;
        const { auth } = this.props
        return(
            //  R
           <div className="form-wrapper"> 
            <h1 className="login-title">Добро пожаловать!</h1>
             {/* R */}
                <div className="form-container" >
                    <h2 className={'form-header'}>Авторизация</h2>
                    <form className={'login-form'} onSubmit={ this.handleSubmit }>
                        <div className="form-group">
                            <div className="form-label">
                                <label htmlFor="email">Почтовый адрес*</label>
                            </div>

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
                            {errors.email &&
                            (<div className="feedback">
                                {errors.email === 'Почтовый адрес не подтвержден.'
                                    ? (<p>{errors.email}<span className='feedback__confirm' onClick={this.repeatedConfirmHandler}>Повторная отправка письма</span></p>)
                                    : errors.email}
                            </div>)}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Почтовый адрес*</label>
                            <input
                                type="password"
                                placeholder="Пароль"
                                className={classnames('form-input', {
                                    'invalid': errors.password
                                })}
                                name="password"
                                onChange={ this.handleInputChange }
                                value={ this.state.password }
                            />
                            {errors.password && (<div className="feedback">{errors.password}</div>)}
                        </div>
                        <div className="form-group" style={{ alignItems: 'center' }}>
                            {auth.isLoggingIn ? <Loader/> :
                                <button type="submit" className="submit-btn">
                                    Войти
                                </button>
                            }
                        </div>
                        <div className="form-group forget-pass">
                            <Link to={'/forgot-password'}>Забыли пароль?</Link>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    setError: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, { loginUser, setError })(Login)