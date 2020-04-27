import React, { Component } from "react";
import Axios from "axios";
import { withRouter } from 'react-router-dom';
import { store } from "react-notifications-component";
import { connect } from 'react-redux'
import '../Register/Register.scss'
import { resetPasswordViaEmail, setError } from "../../actions";

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            password_confirm: '',
            email: null,
            errors: {}
        }
    }

    componentDidMount() {
        Axios.get('/api/users/reset', {params: { resetPasswordToken: this.props.match.params.token }})
            .then(res => {
                this.setState({email: res.data.email})
            })
            .catch((err) => {
                store.addNotification({
                    title: 'Востановление пароля',
                    message: err.response.data.msg,
                    type: "danger",
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
                this.props.history.push('/')
            })
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

    updatePassword = e => {
        e.preventDefault()
        const { dispatch, history } = this.props
        const { email, password, password_confirm } = this.state
        dispatch(resetPasswordViaEmail(history, { email, password, password_confirm }))
    }

    render() {
        const { errors } = this.state;
        console.log(this.state)
        return (
            <div className='form-container'>
                <h2 className="form-header">Востановление пароля</h2>
                <form className={'login-form'} onSubmit={ this.updatePassword }>
                    <div className="form-group">
                        <label htmlFor="Пароль">Пароль*</label>
                        <input
                            type="password"
                            placeholder="Пароль"
                            className={`form-input ${errors.password ? 'invalid' : null}`}
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
                            placeholder="Подтверждение пароля"
                            className={`form-input ${errors.password_confirm ? 'invalid' : null}`}
                            name="password_confirm"
                            onChange={ this.handleInputChange }
                            value={ this.state.password_confirm }
                        />
                        {errors.password_confirm && (<div className="feedback">{errors.password_confirm}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit-btn">
                            Востановить
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default  connect(mapStateToProps)(withRouter(ResetPassword))