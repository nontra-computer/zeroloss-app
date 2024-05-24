import React from 'react'
import ReactApexChart from 'react-apexcharts'
import data from '../data.json'
import moment from 'moment-timezone'

const BarChart = () => {
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
					type: 'bar',
					height: 400,
				},
				plotOptions: {
					bar: {
						horizontal: false,
						columnWidth: '55%',
						endingShape: 'rounded',
					},
				},
				dataLabels: {
					enabled: false,
				},
				stroke: {
					show: true,
					width: 2,
					colors: ['transparent'],
				},
				xaxis: {
					categories: formattedDates,
				},
				yaxis: {
					title: {
						text: 'Value',
					},
				},
				fill: {
					opacity: 1,
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
					<ReactApexChart options={options} series={seriesData} type="bar" height={400} />
				</div>
			)
		})
	}

	return <div>{renderCharts()}</div>
}

export default BarChart
