import React, {Component} from 'react'
import Axios from "axios";
import { store } from 'react-notifications-component'
import Loader from "../UI/Loader/Loader";
import { Redirect } from 'react-router-dom'

export default class Confirm extends Component {


    state = {
        confirming: true,
        notificationMessage: ''
    }


    componentDidMount = () => {
        const { id } = this.props.match.params
        Axios.get(`/api/users/register/confirm/${id}`)
            .then(res => {
                this.setState({
                    confirming: false,
                    notificationMessage: res.data.msg
                })
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
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className='confirm'>
                { this.state.confirming ? <Loader/> : <Redirect to='/'/> }
            </div>
        )
    }

}