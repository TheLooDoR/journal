import React from 'react'
import axios from 'axios';

import './Groups.css'
import ModalWindow from "../../components/ModalWindow/ModalWindow";



class Groups extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            groups: [],
            name: '',
            showModal: false
        }
    }

    componentDidMount() {
        this.getGroups()
    }

    setShowModal() {
        this.setState({
            showModal: !this.state.showModal,
            name: ''
        })
    }

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


//------------->HANDLERS<-------------
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addHandler = (e) => {
        e.preventDefault()

        this.addGroup(this.state.name)
        this.setShowModal()
    }
    //------>HANDLERS<-------


    renderGroups() {
        return this.state.groups.map((group, index) => {
            return (
                <div className={'group'} key={ index }>
                    {group.name}
                </div>
            )
        })
    }

    renderForm() {
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
    }

    render() {
        console.log(this.state)
        return (
            <div className={'container'}>
                <div className={'group_wrap'}>
                    <button type='button' className='add-button' data-toggle='modal' data-target= '#exampleModalCenter'
                    onClick={() => this.setShowModal()}>
                        Добавить
                    </button>
                    {this.renderGroups()}
                </div>
                <ModalWindow
                    show={this.state.showModal}
                    onHide={() => this.setShowModal()}
                    onAdd={ this.addHandler }
                    heading={ 'Добавление нового вида занятий' }
                    body = { this.renderForm() }
                />
            </div>

        )
    }
}

export default Groups

// <div className='modal fade' id='exampleModalCenter' tabIndex='-1' role='dialog'
// aria-labelledby='exampleModalCenterTitle' aria-hidden='true'>
//     <div className='modal-dialog modal-dialog-centered' role='document'>
//     <div className='modal-content'>
//     <div className='modal-header'>
//     <h5 className='modal-title' id='exampleModalLongTitle'>Modal title</h5>
// <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
//     <span aria-hidden='true'>&times;</span>
// </button>
// </div>
// <div className='modal-body'>
//     ...
// </div>
// <div className='modal-footer'>
//     <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
// <button type='button' className='btn btn-primary'>Save changes</button>
// </div>
// </div>
// </div>
// </div>