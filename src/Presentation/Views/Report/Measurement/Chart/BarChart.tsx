import React, { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts'

export const BarChart = ({ data, parameters }) => {
	const chartRef = useRef(null)

	useEffect(() => {
		const series = parameters.map(param => ({
			name: param.name,
			data: data.map(item => item[`GD1_${param.id}`]),
		}))

		const options = {
			chart: {
				type: 'bar',
				height: 350,
			},
			series,
			xaxis: {
				categories: data.map(item => item.date),
			},
		}

		const chart = new ApexCharts(chartRef.current, options)
		chart.render()

		return () => chart.destroy()
	}, [data, parameters])

	return <div ref={chartRef}></div>
}
