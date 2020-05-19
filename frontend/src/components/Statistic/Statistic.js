import React, { Component } from "react";
import AttendanceDoughnut from "./AttendanceDoughnut/AttendanceDoughnut";
import ScoreDoughnut from "./ScoreDoughnut/ScoreDoughnut";
import './Statistic.scss'
import Loader from "../UI/Loader/Loader";
import Rating from "./Rating/Rating";

class Statistic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentItem: 'statistic'
        }
    }

    onStatisticTypeClick(type) {
        this.setState({
            currentItem: type
        })
    }

    renderStatistic() {
        const { currentItem } = this.state
        const { statistic, statisticLoading } = this.props
        if (currentItem === 'statistic') {
            if (statisticLoading) {
                return (<Loader/>)
            }
            return (
                <div className="statistics">
                    <div className="statistics__diagram-wrap">
                        <h3 className="statistics__title">Статистика посещаемости</h3>
                        <div className='statistics__diagram'>
                            <AttendanceDoughnut
                                height={350}
                                width={300}
                                present={statistic.present}
                                miss={statistic.miss}
                            />
                        </div>
                    </div>
                    <div className="statistics__diagram-wrap">
                        <h3 className="statistics__title">Статистика успеваемости</h3>
                        <div className='statistics__diagram'>
                            <ScoreDoughnut
                                height={350}
                                marksAmount={[statistic.unsatisfactory, statistic.satisfactory, statistic.good, statistic.excellent]}
                                legend={{ display: false }}
                            />
                        </div>
                        { statistic.unsatisfactory === 0 && statistic.satisfactory === 0 && statistic.good === 0 && statistic.excellent === 0 ? null :
                            <ul className='statistics__legend'>
                                <li className='statistics__legend-item'><div style={{background: 'linear-gradient(180deg, #4EFEAA 0%, #C9FFE5 100%)'}}/>отлично</li>
                                <li className='statistics__legend-item'><div style={{background: 'linear-gradient(180deg, #64B7FF 0%, #D2EAFF 100%)'}}/>хорошо</li>
                                <li className='statistics__legend-item'><div style={{background: 'linear-gradient(180deg, #FFE382 0%, #FFEEB2 100%)'}}/>удовлетворительно</li>
                                <li className='statistics__legend-item'><div style={{background: 'linear-gradient(180deg, #FF8080 0%, #FDD1D1 100%)'}}/>не удовлетворительно</li>
                            </ul>
                        }

                    </div>
                </div>
            )
        }
    }

    renderRating() {
        const { currentItem } = this.state
        if (currentItem === 'rating') {
            return (
                <Rating
                    ratingElements={this.props.ratingElements}
                    ratingCount={this.props.ratingCount}
                    handlePageClick={this.props.handlePageClick}
                    currentPage={this.props.currentPage}
                    ratingLoading={this.props.ratingLoading}
                    pageSize={this.props.pageSize}
                />
            )
        }
    }

    render() {
        const { currentItem } = this.state
        return (
            <div className='Statistic'>
                <div className="Statistic__navbar">
                    <div
                        className={`Statistic__navbar-item ${currentItem === 'statistic' ? 'Statistic__navbar-item--active' : ''}`}
                        onClick={ () => this.onStatisticTypeClick('statistic') }
                    >
                        Статистика
                    </div>
                    <div
                        className={`Statistic__navbar-item ${currentItem === 'rating' ? 'Statistic__navbar-item--active' : ''}`}
                        onClick={ () => this.onStatisticTypeClick('rating') }
                    >
                        Рейтинг
                    </div>
                </div>
                {this.renderStatistic()}
                {this.renderRating()}
            </div>
        )
    }
}

export default Statistic