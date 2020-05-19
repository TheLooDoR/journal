import React from "react";
import { Doughnut } from 'react-chartjs-2';
import '../../../chart-plugins/centeredLabel'

const AttendanceDoughnut = props => {
    if (props.miss === 0 && props.present === 0) {
        return (
            <div style={{
                position: "absolute",
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 20
            }}>
                Данные отсутствуют
            </div>
        )
    }
    return (
        <Doughnut
            height={props.height}
            width={props.width}
            data={{
                labels: ['пропуски', ' присутствия'],
                datasets: [{
                    data: [props.miss, props.present],
                    backgroundColor: [
                        'transparent',
                        'rgba(255, 227, 128, .9)'
                    ]
                }]
            }}
            legend={{
                display: false
            }}
            options={{
                maintainAspectRatio: false,
                cutoutPercentage: 70,
                plugins: {
                    labels: false
                },
                elements: {
                    center: {
                        text: `${Math.round((props.present * 100) / (props.miss + props.present))}%`,
                        color: '#FDCE26',
                        maxFontSize: 45,
                        fontWeight: '900'
                    }
                }
            }}
        />
    )
}

export default AttendanceDoughnut