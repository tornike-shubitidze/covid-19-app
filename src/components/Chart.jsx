import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Chart({ countryData: { confirmed, recovered, deaths, date } }) {
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `${new Date(date).toDateString()} Statistics`,
            },
        },
    };

    const data = {
        labels: [''],
        datasets: [
            {
                label: 'infected',
                data: [confirmed],
                backgroundColor: 'rgba(254,193,7, 0.5)',
            },
            {
                label: 'Recovered',
                data: [recovered],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Deaths',
                data: [deaths],
                backgroundColor: 'rgba(220,53,70, 0.5)',
            },
        ],
    };

    return (
        <div className='container' >
            <Bar data={data} options={options} />
        </div>
    )
}

export default Chart