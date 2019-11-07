import React from 'react'
import {Modal} from 'react-bootstrap'

import './ModalWindow.css'

function ModalWindow(props) {
    return (
        <Modal
            /*{...props}*/
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.heading}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.body}
            </Modal.Body>
            <Modal.Footer >
                <div className="btn-wrap">
                    <button className='btn modal-btn' onClick={props.onHide}>Закрыть</button>
                </div>
                <div className="btn-wrap">
                    <button className='btn modal-btn' onClick={props.onAdd}>OK</button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalWindow