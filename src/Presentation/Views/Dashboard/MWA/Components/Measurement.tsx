import React, { useEffect, useRef } from 'react'
import NumberBox from '@/Presentation/Components/NumberBox/View'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useIntl } from 'react-intl'
import { getCSS } from '@/_metronic/assets/ts/_utils'
import clsx from 'clsx'

const Measurement: React.FC = () => {
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
	}, [totalChartRef, mode, themeMode])

	return (
		<div className="row">
			<div className="col-12">
				<div
					className={clsx('fs-2 fw-bolder', {
						'text-zeroloss-grey-900': themeMode === 'light',
						'text-zeroloss-base-white': themeMode === 'dark',
					})}>
					{intl.formatMessage({
						id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.MEASUREMENT_TITLE',
					})}
				</div>
				<p
					className={clsx('fs-6', {
						'text-zeroloss-base-white': themeMode === 'dark',
						'text-zeroloss-grey-600': themeMode === 'light',
					})}>
					{intl.formatMessage({
						id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.MEASUREMENT_DESCRIPTION',
					})}
				</p>
			</div>

			<div className="col-12 col-lg-3">
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
								id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.TOTAL_MEASUREMENT_TITLE',
							})}
						</p>

						{/* begin::Chart */}

						<div
							ref={totalChartRef}
							id="kt_charts_total_measurement_chart"
							className="card-rounded-bottom"
							style={{ height: '180px' }}></div>

						{/* end::Chart */}
					</div>
				</div>
			</div>
			<div className="col-12 col-lg-3">
				<NumberBox
					id="mwa-exceeds"
					title="ค่าเกินมาตรฐาน"
					value={52000}
					type="danger"
					height={200}
				/>
			</div>
			<div className="col-12 col-lg-3">
				<NumberBox
					id="mwa-inappropriate"
					title="เหตุการณ์ผิดปกติ"
					value={900}
					type="warning"
					height={200}
				/>
			</div>
			<div className="col-12 col-lg-3">
				<NumberBox id="mwa-normal" title="เหตุร้องเรียน" value={888} type="success" height={200} />
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
		series: [12, 28, 40, 20],
		labels: ['ค่าเกินมาตรฐาน', 'ค่าใกล้เกินมาตรฐาน', 'ค่าอยู่ในเกณฑ์ปกติ', 'เชื่อมโยงไม่ได้'],
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
		colors: ['#DE5348', '#F79009', '#17B26A', '#667085'],
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
			offsetY: 5,
			floating: true,
			labels: {
				colors: isDark ? '#ffffff' : '#666666',
			},
		},
	}
}

export default Measurement
