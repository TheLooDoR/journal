import React from 'react'
import axios from 'axios';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

import './Groups.css'
import ModalWindow from "../../components/ModalWindow/ModalWindow";


const ADD_ACTION = 'ADD'
const UPDATE_ACTION = 'UPDATE'
const DELETE_ACTION = 'DELETE'

class Groups extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            groups: [],
            name: '',
            itemId: '',
            currentModal: '',
            showModal: false
        }
    }

    componentDidMount() {
        this.getGroups()
    }
    //------------->State change<-------------

    setCurrentModal(value) {
        this.setState({
            currentModal: value
        })
        this.setShowModal()
    }

    setShowModal() {
        this.setState({
            showModal: !this.state.showModal,
            name: ''
        })
    }

    setStateId = (e, data, target) => {
        this.setState({
            itemId: data.target.childNodes[0].innerText
        })
        if (data.action === UPDATE_ACTION) {
            this.setCurrentModal(UPDATE_ACTION)
            this.setState({
                name: this.state.groups.find(element => element.id === +data.target.childNodes[0].innerText).name
            })
        } else if (data.action === DELETE_ACTION) {
            this.setCurrentModal(DELETE_ACTION)
        }
    }

    //------------->State change<-------------

    //------------->BackEnd queries<-------------
    getGroups() {
        axios.get('api/groups/')
            .then(res => {
                this.setState({
                    groups: res.data.groups
                })
            })
    }

    addGroup(name) {
        axios.post('api/groups', {name})
            .then(res => {
                let groups = [...this.state.groups]
                groups.push(res.data)
                this.setState({
                    groups: groups,
                    name: ''
                })
            })
    }

    updateGroup(id, name) {
        axios.patch(`api/groups/${id}`, {name})
            .then(res => {
                this.getGroups()
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    deleteGroup(id) {
        axios.delete(`api/groups/${id}`)
            .then(res => {
                this.getGroups()
            })
            .catch(err => {
                console.log(err.message)
            })
    }


    //------------->HANDLERS<-------------
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        switch (this.state.currentModal) {
            case ADD_ACTION:
                this.addGroup(this.state.name)
                this.setShowModal()
                break
            case UPDATE_ACTION:
                this.updateGroup(this.state.itemId, this.state.name)
                this.setShowModal()
                break
            case DELETE_ACTION:
                this.deleteGroup(this.state.itemId)
                this.setShowModal()
                break
            default:
                break
        }
    }

    //------>RENDERS<-------

    renderGroups() {
        return this.state.groups.map((group, index) => {
            return (
                    <ContextMenuTrigger
                        id='contextmenu-id'
                        name={group.name}
                        holdToDisplay={0}
                        key={ group.id }
                    >
                        <div className={'group'} >
                            <p id={'element-id'} style={{display: 'none'}}>{group.id}</p>
                            {group.name}
                        </div>
                    </ContextMenuTrigger>
            )
        })
    }

    renderModalHeading() {
        switch (this.state.currentModal) {
            case ADD_ACTION:
                return 'Добавить объект'
            case UPDATE_ACTION:
                return 'Изменить объект'
            case DELETE_ACTION:
                return 'Удалить объект'
            default:
                return 'Заголовок'
        }
    }

    renderForm() {
        switch (this.state.currentModal) {
            case ADD_ACTION:
                return (
                    <form>
                        <input
                            className={'add-input'}
                            placeholder={'Название'}
                            type="text"
                            name={'name'}
                            onChange={ this.handleInputChange }
                            value={this.state.name}
                        />
                    </form>
                )
            case UPDATE_ACTION:
                return (
                    <form>
                        <input
                            className={'add-input'}
                            placeholder={'Название'}
                            type="text"
                            name={'name'}
                            onChange={ this.handleInputChange }
                            value={this.state.name}
                        />
                    </form>
                )
            case DELETE_ACTION:
                return (
                    <form>
                        <div>
                            <h4>Вы уверенны что хотите удалить выбранный объект?</h4>
                        </div>
                    </form>
                )
            default:
                return (
                    <div>ERROR</div>
                )
        }
    }

    renderModal() {
        return (
            <ModalWindow
                show={this.state.showModal}
                onHide={() => this.setShowModal()}
                onSubmit={ this.submitHandler }
                heading={ this.renderModalHeading() }
                body = { this.renderForm() }
                     />
        )
    }


    render() {
        return (
            <div className={'container'}>
                <div className={'group_wrap'}>
                    <button type='button' className='add-button' data-toggle='modal' data-target= '#exampleModalCenter'
                    onClick={() => this.setCurrentModal('ADD')}>
                        Добавить
                    </button>
                    {this.renderGroups()}

                    <ContextMenu id='contextmenu-id'>
                        <MenuItem data={{action: UPDATE_ACTION}} onClick={ this.setStateId }>
                            Изменить
                        </MenuItem>
                        <MenuItem data={{action: DELETE_ACTION}} onClick={ this.setStateId }>
                            Удалить
                        </MenuItem>
                    </ContextMenu>
                </div>
                {this.renderModal()}
            </div>
        )
    }
}

export default Groups
