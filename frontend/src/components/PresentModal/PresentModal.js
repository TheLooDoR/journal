import React, {Component} from 'react'
import Modal from "react-responsive-modal";
import Number from "../UI/Number/Number";
import Radio from "../UI/Radio/Radio";
import MainButton from "../UI/MainButton/MainButton";

import './PresentModal.scss'

class PresentModal extends Component{

    constructor(props) {
        super(props)
        this.state = {
            grade: null
        }
    }

    gradeChangeHandler = (grade) => {
        this.setState({
            grade
        })
    }

    render() {
        return (
            <Modal onClose={this.props.onHide} open={this.props.show} modalId={'present-modal'}>
                <form className="PresentModal">
                    <div className="PresentModal__title">
                        <div className="PresentModal__date-wrap">
                            Число: <span className="PresentModal__date">01.09.2019</span>
                        </div>
                        <div className="PresentModal__student-wrap">
                            Студент: <span className="PresentModal__student">Абрамов Егор</span>
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
                                />
                            </div>
                            <div className="grades__comment-wrap">
                                <label className='grades__comment-title' htmlFor="input-comment">Комментарий</label>
                                <textarea className='grades__comment-value custom-textarea' name='input-comment' rows={3}/>
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
                            name='input-miss'
                            label='Отсутствует по уважительной причине'
                        />
                        <Radio
                            name='input-miss'
                            label='Отсутствует без уважительной причины'
                        />
                    </div>
                    <MainButton className='PresentModal__btn' type='submit'>Сохранить</MainButton>
                </form>
            </Modal>
        )
    }
}

export default PresentModal