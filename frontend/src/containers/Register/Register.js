import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authentication';
import Select from "../../components/UI/Select/Select";
import {getPositionsData, getDepartmentsData, setError} from "../../actions";
import InputMask from 'react-input-mask';
import './Register.scss'
import Loader from "../../components/UI/Loader/Loader";

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
            phone_number: '',
            department: {},
            position: {},
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getPositionsData()
        this.props.getDepartmentsData()
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
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

    componentWillUnmount() {
        this.props.setError({})
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
            email: this.state.email.toLowerCase(),
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            department_id: this.state.department.id,
            position_id: this.state.position.id,
            role_id: 3,
            phone_number: this.state.phone_number,
            admin: false
        }
        this.props.registerUser(user, this.props.history);
    }

    changeHandler (e) {
        if (e.target.value !== '') {
            if (e.target.name === 'phone_number') {
                console.log('number')
            }
            this.setState({
                [e.target.name]: JSON.parse(e.target.value)
            })
        }
    }

    selectDepartmentOptions(entity) {
        return entity.map((el) => {
            return (
                <option key={el.id} value={JSON.stringify(el)}>{el.full_name}</option>
            )
        })
    }

    selectPositionOptions(entity) {
        return entity.map((el) => {
            return (
                <option key={el.id} value={JSON.stringify(el)}>{el.name}</option>
            )
        })
    }

    render() {
        const { departments, positions, auth } = this.props
        const { errors } = this.state;
        return(
            <div className="form-container" >
                <h2 className={'form-header'}>Регистрация</h2>
                <form className={'register-form'} onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <label htmlFor="Email">Почтовый адрес*</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className={`form-input ${errors.email ? 'invalid' : null}`}
                            name="email"
                            onChange={ this.handleInputChange }
                            value={ this.state.email }
                        />
                        {errors.email && (<div className="feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Имя*</label>
                        <input
                            type="text"
                            placeholder="Имя"
                            className={`form-input ${errors.name ? 'invalid' : null}`}
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
                            className={`form-input ${errors.surname ? 'invalid' : null}`}
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
                            className={`form-input ${errors.patronymic ? 'invalid' : null}`}
                            name="patronymic"
                            onChange={ this.handleInputChange }
                            value={ this.state.patronymic }
                        />
                        {errors.patronymic && (<div className="feedback">{errors.patronymic}</div>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Position">Должность*</label>
                        <Select
                            className='register-select'
                            name='position'
                            defaultValue='Выберите должность'
                            options={this.selectPositionOptions(positions)}
                            changeHandler={(e) => this.changeHandler(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Position">Кафедра*</label>
                        <Select
                            className='register-select'
                            name='department'
                            defaultValue='Выберите кафедру'
                            options={this.selectDepartmentOptions(departments)}
                            changeHandler={(e) => this.changeHandler(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Мобильный телефон*</label>
                        <InputMask
                            type="tel"
                            placeholder="Мобильный телефон"
                            className={`form-input ${errors.phone_number ? 'invalid' : null}`}
                            name="phone_number"
                            onChange={ this.handleInputChange }
                            value={ this.state.phone_number }
                            mask='+3\8 (999) 99 99 999'
                        />
                        {errors.phone_number && (<div className="feedback">{errors.name}</div>)}
                    </div>
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
                            placeholder="Подтвердить пароль"
                            className={`form-input ${errors.password_confirm ? 'invalid' : null}`}
                            name="password_confirm"
                            onChange={ this.handleInputChange }
                            value={ this.state.password_confirm }
                        />
                        {errors.password_confirm && (<div className="feedback">{errors.password_confirm}</div>)}
                    </div>
                    <div className="form-group" style={{ alignItems: 'center' }}>
                        {auth.isSigningUp ? <Loader/> :
                            <button type="submit" className="submit-btn">
                                Зарегестрироваться
                            </button>
                        }
                    </div>
                </form>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    getPositionsData: PropTypes.func.isRequired,
    getDepartmentsData: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    departments: state.entities.departments,
    positions: state.entities.positions,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser, getPositionsData, getDepartmentsData, setError})(withRouter(Register))