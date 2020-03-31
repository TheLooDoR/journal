import React, {Component} from 'react'
import Modal from "react-responsive-modal";
import Number from "../UI/Number/Number";
import Radio from "../UI/Radio/Radio";
import MainButton from "../UI/MainButton/MainButton";
import {connect} from "react-redux";
import {setJournalData, updateStudentData} from "../../actions";

import './PresentModal.scss'
import isEmpty from "../../common-js/isEmpty";
import formatDate from "../../common-js/formatDate";


class PresentModal extends Component{

    constructor(props) {
        super(props)
        this.state = {
            grade: null,
            note: '',
            miss: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { student } = this.props
        if (prevProps !== this.props) {
            let presentValue = ''
            switch (true) {
                case student.present:
                    presentValue = 'is-present'
                    break
                case !student.present && student.valid_miss:
                    presentValue = 'valid-miss'
                    break
                case !student.present && !student.valid_miss:
                    presentValue = 'miss'
                    break
                default:
                    presentValue =  ''
            }
            this.setState({
                grade: student.score,
                note: student.note,
                miss: presentValue
            })
        }
    }

    gradeChangeHandler = (grade) => {
        this.setState({
            grade
        })
    }

    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler(e) {
        e.preventDefault()
        const { student, dispatch } = this.props
        let present, valid_miss
        //convert state values to DB values
        switch (this.state.miss) {
            case 'is-present':
                present = true
                valid_miss = false
                break
            case 'valid-miss':
                present = false
                valid_miss = true
                break
            case 'miss':
                present = false
                valid_miss = false
                break
            default:
                break
        }
        //update data
        const studentData = {
            user_id: student.user_id,
            subject_id: student.subject_id,
            student_id: student.student_id,
            type_id: student.type_id,
            date_id: student.date_id,
            note: this.state.note,
            score: this.state.grade,
            present,
            valid_miss
        }
        updateStudentData(studentData)
        //update redux store after post
        const journalParameters = {
            group_id: this.props.journalParameters.group.id,
            user_id: studentData.user_id,
            subject_id: studentData.subject_id,
            type_id: studentData.type_id
        }
        dispatch(setJournalData(journalParameters))
        //close modal window
        this.props.onHide(this.props.student)
        //save scrollbar position
        this.props.scrollHandler()
    }

    render() {
        const { student } = this.props
        //check if student is not null
        if (isEmpty(student)) {
            return null
        }
        return (
            <Modal onClose={this.props.onHide} open={this.props.show} modalId={'present-modal'} center={this.props.center}>
                <form className="PresentModal" onSubmit={e => this.submitHandler(e)}>
                    <div className="PresentModal__title">
                        <div className="PresentModal__date-wrap">
                            Число:
                            <span className="PresentModal__date">
                                {this.props.journalDate.map(el => {
                                    if (el.id === student.date_id) {
                                        return (` ${formatDate(el.date)}`)
                                    }
                                    return null
                                })}
                            </span>
                        </div>
                        <div className="PresentModal__student-wrap">
                            Студент:
                            <span className="PresentModal__student">
                                {this.props.journalStudents.map(el => {
                                    if (el.id === student.student_id) {
                                        return (` ${el.surname} ${el.name.substr(0, 1)}. ${el.patronymic.substr(0, 1)}.`)
                                    }
                                    return null
                                })}
                            </span>
                        </div>
                    </div>
                    <h4 className="PresentModal__grades-title">Успеваемость</h4>
                    <div className="PresentModal__grades grades">
                        <div className="grades__inputs">
                            <div className="grades__grade-wrap">
                                <p className='grades__grade-title'>Оценка</p>
                                <Number
                                    className='grades__grade-value'
                                    min={60}
                                    max={100}
                                    onChange={this.gradeChangeHandler}
                                    value={this.state.grade}
                                    disabled={this.state.miss !== 'is-present'}
                                />
                            </div>
                            <div className="grades__comment-wrap">
                                <label className='grades__comment-title' htmlFor="note">Комментарий</label>
                                <textarea
                                    className='grades__comment-value custom-textarea'
                                    name='note'
                                    rows={3}
                                    value={this.state.note}
                                    onChange={event => this.changeHandler(event)}
                                />
                            </div>
                        </div>
                        <table className="grades__marks">
                            <thead>
                                <tr>
                                    <th>Мин. балл</th>
                                    <th>Макс. балл</th>
                                    <th>ECTS</th>
                                    <th>Национальная диференциальная шкала</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>90</td>
                                    <td>100</td>
                                    <td>A</td>
                                    <td>Відмінно / Excellent</td>
                                </tr>
                                <tr>
                                    <td>82</td>
                                    <td>89</td>
                                    <td>B</td>
                                    <td rowSpan={2}>Добре / Good</td>
                                </tr>
                                <tr>
                                    <td>75</td>
                                    <td>81</td>
                                    <td>C</td>
                                </tr>
                                <tr>
                                    <td>64</td>
                                    <td>74</td>
                                    <td>D</td>
                                    <td rowSpan={2}>Задовільно / Satisfactory</td>
                                </tr>
                                <tr>
                                    <td>60</td>
                                    <td>63</td>
                                    <td>E</td>
                                </tr>
                                <tr>
                                    <td>35</td>
                                    <td>59</td>
                                    <td>FX</td>
                                    <td rowSpan={2}>Незадовільно / Fail</td>
                                </tr>
                                <tr>
                                    <td>0</td>
                                    <td>34</td>
                                    <td>F</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4 className="PresentModal__attendance-title">Посещаемость</h4>
                    <div className="PresentModal__attendance">
                        <Radio
                            value='is-present'
                            label='Присутствует'
                            checked={this.state.miss === 'is-present'}
                            onChange={e => this.changeHandler(e)}
                            name='miss'
                        />
                        <Radio
                            value='valid-miss'
                            label='Отсутствует по уважительной причине'
                            checked={this.state.miss === 'valid-miss'}
                            onChange={e => this.changeHandler(e)}
                            name='miss'
                        />
                        <Radio
                            value='miss'
                            label='Отсутствует без уважительной причины'
                            checked={this.state.miss === 'miss'}
                            onChange={e => this.changeHandler(e)}
                            name='miss'
                        />
                    </div>
                    <MainButton className='PresentModal__btn' type='submit' >Сохранить</MainButton>
                </form>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        journalStudents: state.journal.journalStudents,
        journalDate: state.journal.journalDate,
        journalParameters: state.journal.journalParameters
    }
}

export default connect(mapStateToProps)(PresentModal)