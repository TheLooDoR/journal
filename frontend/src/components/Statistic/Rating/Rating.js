import React from "react";
import './Rating.scss'
import ReactPaginate from "react-paginate";

const Rating = props => {

        return (
            <div className='rating'>
                {props.ratingCount === 0 ? <h3>Данные отсутствуют</h3> :
                    <>
                        <table className={`rating__table ${props.ratingLoading ? 'rating__table-loading' : ''}`}>
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>Студент</th>
                                <th>Средний балл</th>
                                <th>Количество пропусков</th>
                            </tr>
                            </thead>
                            <tbody>
                            { props.ratingElements.map((el, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1 + props.currentPage * props.pageSize}.</td>
                                        <td>{`${el.surname} ${el.name.substr(0, 1)}. ${el.patronymic.substr(0, 1)}.`}</td>
                                        <td>{el.score ? el.score : ''}</td>
                                        <td>{el.total_miss}</td>
                                    </tr>
                                )
                            })
                            }
                            </tbody>
                        </table>
                        { props.ratingCount < props.pageSize ? null :
                            <ReactPaginate
                                previousLabel={'Назад'}
                                nextLabel={'Вперед'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={props.ratingCount / props.pageSize}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={props.handlePageClick}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                            />
                        }
                    </>
                }
            </div>
        )
}

export default Rating