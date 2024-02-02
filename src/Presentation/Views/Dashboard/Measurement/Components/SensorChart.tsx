import React, { useEffect, useRef } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { getCSS } from '@/_metronic/assets/ts/_utils'

const SensorChart: React.FC = () => {
	const { mode } = useThemeMode()
	const chartRef = useRef<HTMLDivElement | null>(null)

	const refreshChartRef = () => {
		if (!chartRef.current) {
			return
		}

		const height = parseInt(getCSS(chartRef.current, 'height'))

		const chart = new ApexCharts(chartRef.current, getChartOptions(height))
		if (chart) {
			chart.render()
		}

		return chart
	}

	useEffect(() => {
		const chart = refreshChartRef()

		return () => {
			if (chart) {
				chart.destroy()
			}
		}
	}, [chartRef, mode])

	return (
		<div>
			{/* begin::Chart */}
			<div
				ref={chartRef}
				id="kt_charts_24_hours_sensor_chart"
				className="card-rounded-bottom overflow-hidden"
				style={{ height: '100px' }}></div>
			{/* end::Chart */}
		</div>
	)
}

function getChartOptions(height: number): ApexOptions {
	return {
		// subtitle: {
		// 	text: 'ยอดขายรวม',
		// 	margin: 0,
		// 	style: {
		// 		fontSize: '18px',
		// 		fontWeight: 'bold',
		// 		fontFamily: 'Noto Sans Thai, sans-serif',
		// 	},
		// },
		series: [
			{
				name: 'Offline Sensor',
				data: [30, 60, 70, 20, 90, 32, 12],
			},
		],
		chart: {
			height: height,
			width: 200,
			type: 'line',
			zoom: {
				enabled: false,
			},
			toolbar: {
				show: false,
			},
		},
		colors: ['#F79009', '#17B26A'],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
			lineCap: 'square',
		},
		grid: {
			show: false,
			row: {
				// colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
				// opacity: 0.5,
			},
		},
		legend: {
			position: 'top',
			show: false,
		},
		xaxis: {
			labels: {
				show: false,
				style: {
					fontFamily: 'Noto Sans Thai, sans-serif',
				},
			},
		},
		yaxis: {
			labels: {
				show: false,
				style: {
					fontFamily: 'Noto Sans Thai, sans-serif',
				},
			},
		},

		// tooltip: {
		// 	custom: function ({ dataPointIndex, w, seriesIndex }) {
		// 		const datas = w.globals.initialSeries
		// 		const dataColor = w.globals.colors

		// 		const extractedData = extractAreaChart(datas, dataColor, dataPointIndex, seriesIndex)

		// 		return `<div class="fw-medium">฿ ${formatNumberCommas(extractedData.value)}</div>`
		// 	},
		// },
	}
}

export default SensorChart
