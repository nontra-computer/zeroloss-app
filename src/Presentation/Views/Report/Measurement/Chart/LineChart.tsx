import React from 'react'
import ReactApexChart from 'react-apexcharts'
import data from '../data.json'
import moment from 'moment-timezone'

const LineChart = () => {
	const renderCharts = () => {
		return data.parameters.map(parameter => {
			const parameterId = parameter.id
			const parameterName = parameter.name
			const parameterValues = data.data.map(item => item[`p${parameterId}`])

			const seriesData = [
				{
					name: parameterName,
					data: parameterValues,
				},
			]

			const formattedDates = data.data.map(item =>
				moment(item.date_time).format('DD/MM/YYYY HH:mm')
			)

			const options = {
				chart: {
					type: 'line', // Change chart type to 'line'
					height: 400,
				},
				stroke: {
					show: true,
					width: 2,
					curve: 'smooth', // Add this line for smooth curves
					colors: ['#008FFB'], // Customize line color if needed
				},
				dataLabels: {
					enabled: false,
				},
				xaxis: {
					categories: formattedDates,
				},
				yaxis: {
					title: {
						text: 'Value',
					},
				},
				tooltip: {
					y: {
						formatter: function (value) {
							return value
						},
					},
				},
			}

			return (
				<div key={parameterId}>
					<h2>{parameterName}</h2>
					<ReactApexChart options={options} series={seriesData} type="line" height={400} />
				</div>
			)
		})
	}

	return <div>{renderCharts()}</div>
}

export default LineChart
