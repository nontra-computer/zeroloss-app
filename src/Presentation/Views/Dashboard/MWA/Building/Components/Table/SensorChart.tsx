import React from 'react'
import Chart from 'react-apexcharts'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'

const SensorChart: React.FC = () => {
	const { is4K, is8K } = useResolutionDetection()

	return (
		<div>
			{/* begin::Chart */}
			<Chart
				type="line"
				width={is4K || is8K ? '45%' : '70%'}
				height={100}
				options={{
					chart: {
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
				}}
				series={[{ name: 'Offline Sensor', data: [30, 60, 70, 20, 90, 32, 12] }]}
			/>
			{/* end::Chart */}
		</div>
	)
}

export default SensorChart
