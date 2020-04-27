import React, { Component } from "react";
import '../Register/Register.scss'
import classnames from "classnames";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import {sendResetPasswordMail, setError} from "../../actions";

class ForgotPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            errors: {}
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.errors !== this.props.errors) {
            this.setState({
                errors: this.props.errors
            })
        }
    }

    componentWillUnmount() {
        this.props.dispatch(setError({}))
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sendEmail = e => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(sendResetPasswordMail(this.props.history, this.state.email.toLowerCase()))
    }

    render() {
        const { errors } = this.state;
        return (
            <div className='form-container'>
                <h2 className="form-header">Востановление пароля</h2>
                <form className={'login-form'} onSubmit={ this.sendEmail }>
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
                        {errors.email && (<div className="feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit-btn">
                            Отправить
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth
})

export default connect(mapStateToProps)(withRouter(ForgotPassword))