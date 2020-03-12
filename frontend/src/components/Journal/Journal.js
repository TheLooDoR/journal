import React, {Component} from 'react'
import Modal from 'react-responsive-modal';
import Table from 'react-bootstrap/Table'
import './Journal.scss'
import Loader from "../UI/Loader/Loader";
import PresentModal from "../PresentModal/PresentModal";

class Journal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        }
    }

    hideHandler = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    renderTableHead() {
        return (
            <thead>
                <tr className='journal-content__title'>
                    <th rowSpan={2} style={{fontSize: '24px'}}>№</th>
                    <th rowSpan={2} style={{fontSize: '24px'}}>ФИО</th>
                    <th colSpan={this.props.journalDate.length}>Дата</th>
                    <th rowSpan={2}>Всего пропусков</th>
                    <th rowSpan={2}>Пропусков по ув.причине</th>
                    <th rowSpan={2} style={{fontSize: '24px'}}>Итоговые оценки</th>
                </tr>
                <tr className='journal-content__title'>
                    {
                        this.props.journalDate.map(el => {
                            return (
                                <th id={`date ${el.id}`} key={el.id}>{el.date}</th>
                            )
                        })
                    }
                    {/*<th>01.09</th>*/}
                    {/*<th>01.09</th>*/}
                    {/*<th>01.09</th>*/}
                </tr>
            </thead>
        )
    }

    renderTableBody () {
        let missAmount = 0
        let validMissAmount = 0
        return (
            <tbody>
            {
                this.props.journalStudents.sort((a, b) => a.number_list - b.number_list).map(student => {
                    missAmount = 0
                    validMissAmount = 0
                    return (
                        <tr key={student.id}>
                            <td>{student.number_list}</td>
                            <td>{`${student.surname} ${student.name.substr(0, 1)}. ${student.patronymic.substr(0, 1)}.`}</td>
                            {this.props.journalData.map((el, index) => {
                                if (el.student_id === student.id) {
                                    //Counting miss amount
                                    if (!el.present) {
                                        missAmount++
                                        if (el.valid_miss) {
                                            validMissAmount++
                                        }
                                    }
                                    //return if students is missing
                                    return (
                                        <td
                                            id={`date-${el.date_id}-student-${el.student_id}`}
                                            key={index}
                                            onDoubleClick={this.hideHandler}
                                            className='journal-content__presents'
                                        >
                                            {el.present ? el.score ? el.score : '' : 'н'}
                                        </td>
                                    )
                                }
                                return null
                            })}
                            {/*miss amount*/}
                            <td id={`amount-${student.id}`}>{missAmount}</td>
                            {/*valid miss amount*/}
                            <td id={`valid-miss-amount${student.id}`}>{validMissAmount}</td>
                            {/*total grades*/}
                            <td> </td>
                        </tr>
                    )
                })
            }
            </tbody>
        )
    }

    render() {
        const {group, subjectType, subject, errors, journalData} = this.props
        if (!group || !subjectType || !subject) {
            return null
        }
        if (this.props.isLoading) {
            return (
                <Loader/>
            )
        }
        return (
            <Modal onClose={this.props.onHide} open={this.props.show} modalId='journal-modal'>
                {Object.keys(journalData).length === 0 && journalData.constructor === Object ?
                    <h2>{errors.search}</h2>
                    :
                    <div className="Journal">
                        <div className="Journal__title">
                            {group.name}/{subjectType.name}/{subject.name}
                        </div>
                        <div className="Journal__content journal-content">
                            <Table bordered className='journal-content__table'>
                                {this.renderTableHead()}
                                {this.renderTableBody()}
                            </Table>
                        </div>
                        <button onClick={this.hideHandler}>Open second modal</button>
                        <PresentModal
                            show={this.state.showModal}
                            onHide={this.hideHandler}
                        />
                    </div>
                }
            </Modal>
        )
    }
}

export default Journal