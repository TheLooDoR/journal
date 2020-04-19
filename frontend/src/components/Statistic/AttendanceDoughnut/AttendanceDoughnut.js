import React from "react";
import { Doughnut } from 'react-chartjs-2';
import '../../../chart-plugins/centeredLabel'

const AttendanceDoughnut = props => {
    return (
        <Doughnut
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