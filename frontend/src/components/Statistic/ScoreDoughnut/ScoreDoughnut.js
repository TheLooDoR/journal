import React from "react";
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import withSizes from 'react-sizes'

const ScoreDoughnut = props => {

    function resizeHandler (chart) {
        if (props.isTablet) {
            chart.legend.options.position = 'bottom'
        } else {
            chart.legend.options.position = 'right'
        }
    }

    return (
        <Doughnut
            data={{
                labels: ['не удовлетворительно', 'удовлетворительно', 'хорошо', 'отлично'],
                datasets: [{
                    data: props.marksAmmount,
                    backgroundColor: [
                        'rgba(255, 135, 135, .9)',
                        'rgba(255, 227, 128, .9)',
                        'rgba(112, 189, 255, .9)',
                        'rgba(93, 254, 177, .9)'
                    ]
                }]
            }}
            legend={{
                position: 'right',
                labels: {
                    fontColor: '#1D3B55',
                    boxWidth: 20,
                    fontSize: 18
                }
            }}
            options={{
                onResize: (chart) => resizeHandler(chart),
                maintainAspectRatio: false,
                cutoutPercentage: 70,
                plugins: {
                    labels: {
                        render: 'percentage',
                        fontColor: '#fff',
                        fontSize: 20,
                        arc: true
                    }
                }
            }}
        />
    )
}



const mapSizesToProps = ({ width }) => ({
    isTablet: width < 768,
})

export default withSizes(mapSizesToProps)(ScoreDoughnut)