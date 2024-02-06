import React, { useEffect, useRef } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { getCSS } from '@/_metronic/assets/ts/_utils'
import clsx from 'clsx'

const TotalMeasurement: React.FC = () => {
	const intl = useIntl()
	const { mode } = useThemeMode()
	const totalChartRef = useRef<HTMLDivElement | null>(null)

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const refreshTotalChartRef = () => {
		if (!totalChartRef.current) {
			return
		}

		const height = parseInt(getCSS(totalChartRef.current, 'height'))

		const chart = new ApexCharts(
			totalChartRef.current,
			getTotalChartOptions(height, themeMode === 'dark')
		)
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [totalChartRef, themeMode, mode])

	return (
		<div className="row h-100">
			<div className="col-12">
				<div
					className={clsx('fs-2 fw-bolder', {
						'text-zeroloss-grey-900': themeMode === 'light',
						'text-zeroloss-base-white': themeMode === 'dark',
					})}>
					{intl.formatMessage({
						id: 'ZEROLOSS.DASHBOARD.BUILDING_MWA_MEASUREMENT.CONNECTION_TITLE',
					})}
				</div>
				<p
					className={clsx('fs-6', {
						'text-zeroloss-base-white': themeMode === 'dark',
						'text-zeroloss-grey-600': themeMode === 'light',
					})}>
					{intl.formatMessage({
						id: 'ZEROLOSS.DASHBOARD.BUILDING_MWA_MEASUREMENT.CONNECTION_DESCRIPTION',
					})}
				</p>
			</div>

			<div className="col-12">
				<div
					className={clsx('card border-radius-12px border-1px h-100', {
						'bg-zeroloss-base-white border-zeroloss-grey-200': themeMode === 'light',
						'bg-zeroloss-grey-true-800 border-zeroloss-base-white': themeMode === 'dark',
					})}>
					<div className="card-body px-6 h-200px">
						<p
							className={clsx('fs-3 fw-bolder my-0', {
								'text-zeroloss-grey-900': themeMode === 'light',
								'text-zeroloss-base-white': themeMode === 'dark',
							})}>
							{intl.formatMessage({
								id: 'ZEROLOSS.DASHBOARD.BUILDING_MWA_MEASUREMENT.CONNECTION_GRAPH_TITLE',
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

function getTotalChartOptions(height: number, isDark: boolean): ApexOptions {
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
			labels: {
				colors: isDark ? '#ffffff' : '#666666',
			},
		},
	}
}

export default TotalMeasurement
