import React, { useEffect, useRef } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { getCSS } from '@/_metronic/assets/ts/_utils'

const TotalMeasurement: React.FC = () => {
	const intl = useIntl()
	const { mode } = useThemeMode()
	const totalChartRef = useRef<HTMLDivElement | null>(null)

	const refreshTotalChartRef = () => {
		if (!totalChartRef.current) {
			return
		}

		const height = parseInt(getCSS(totalChartRef.current, 'height'))

		const chart = new ApexCharts(totalChartRef.current, getTotalChartOptions(height))
		if (chart) {
			chart.render()
		}

		return chart
	}

	useEffect(() => {
		const chart = refreshTotalChartRef()

		return () => {
			if (chart) {
				chart.destroy()
			}
		}
	}, [totalChartRef, mode])

	return (
		<div className="row h-100">
			<div className="col-12">
				<div className="fs-2 fw-bolder text-zeroloss-grey-900">
					{intl.formatMessage({
						id: 'ZEROLOSS.DASHBOARD.MEASUREMENT.CONNECTION_TITLE',
					})}
				</div>
				<p className="fs-6 text-zeroloss-grey-600">
					{intl.formatMessage({
						id: 'ZEROLOSS.DASHBOARD.MEASUREMENT.CONNECTION_DESCRIPTION',
					})}
				</p>
			</div>

			<div className="col-12">
				<div className="card border-radius-12px h-100 border border-zeroloss-grey-200">
					<div className="card-body px-6 h-200px">
						<p className="fs-3 fw-bolder my-0 text-zeroloss-grey-900">
							{intl.formatMessage({
								id: 'ZEROLOSS.DASHBOARD.MEASUREMENT.CONNECTION_GRAPH_TITLE',
							})}
						</p>

						{/* begin::Chart */}

						<div
							ref={totalChartRef}
							id="kt_charts_total_measurement_chart"
							className="card-rounded-bottom"
							style={{ height: '150px' }}></div>

						{/* end::Chart */}
					</div>
				</div>
			</div>
		</div>
	)
}

function getTotalChartOptions(height: number): ApexOptions {
	return {
		// subtitle: {
		// 	text: 'จำนวนตรวจวัดทั้งหมด',
		// 	margin: 0,
		// 	style: {
		// 		fontSize: '18px',
		// 		fontWeight: 'bold',
		// 		fontFamily: 'Noto Sans Thai, sans-serif',
		// 	},
		// },
		series: [10, 5],
		labels: ['เชื่อมโยงได้', 'เชื่อมโยงไม่ได้'],
		chart: {
			type: 'donut',
			height: height,
			redrawOnWindowResize: true,
		},
		plotOptions: {
			pie: {
				customScale: 0.8,
				offsetX: 60,
				donut: {
					labels: {
						show: false,
						name: {
							show: true,
							fontFamily: 'Noto Sans Thai, sans-serif',
							// @ts-ignore
							formatter: function (val: any) {
								return val
							},
						},
						value: {
							show: true,
							fontFamily: 'Noto Sans Thai, sans-serif',
							// @ts-ignore
							formatter: function (val: any) {
								return val
							},
						},
					},
				},
			},
		},
		colors: ['#17B26A', '#475467'],
		grid: {
			padding: {
				// bottom: -100,
			},
		},
		dataLabels: {
			enabled: false,
		},
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 250,
						height: 250,
					},
					legend: {
						position: 'left',
					},
				},
			},
			{
				breakpoint: 481,
				options: {
					chart: {
						width: 250,
						height: 250,
					},
					legend: {
						position: 'left',
					},
				},
			},
		],
		legend: {
			fontFamily: 'Noto Sans Thai, sans-serif',
			show: true,
			position: 'left',
			offsetY: 20,
			floating: true,
		},
	}
}

export default TotalMeasurement
