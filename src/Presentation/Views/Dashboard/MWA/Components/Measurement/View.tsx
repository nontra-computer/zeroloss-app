import React, { useEffect, useRef } from 'react'
import NumberBox from '@/Presentation/Components/NumberBox/View'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { getCSS } from '@/_metronic/assets/ts/_utils'
import clsx from 'clsx'

import useViewModel from './ViewModel'

const Measurement: React.FC = () => {
	const totalChartRef = useRef<HTMLDivElement | null>(null)

	const { data, intl, mode, themeMode } = useViewModel()

	const refreshTotalChartRef = () => {
		if (!totalChartRef.current) {
			return
		}

		const height = parseInt(getCSS(totalChartRef.current, 'height'))

		const chart = new ApexCharts(
			totalChartRef.current,
			getTotalChartOptions(height, themeMode === 'dark', data)
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
	}, [totalChartRef, mode, themeMode, data])

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
					value={data?.totalDanger ?? 0}
					type="danger"
					height={200}
				/>
			</div>
			<div className="col-12 col-lg-3">
				<NumberBox
					id="mwa-inappropriate"
					title="ค่าใกล้เกินมาตรฐาน"
					value={data?.totalWarning ?? 0}
					type="warning"
					height={200}
				/>
			</div>
			<div className="col-12 col-lg-3">
				<NumberBox
					id="mwa-normal"
					title="ค่าอยู่ในเกณฑ์ปกติ"
					value={data?.totalNormal ?? 0}
					type="success"
					height={200}
				/>
			</div>
		</div>
	)
}

function getTotalChartOptions(height: number, isDark: boolean, data: any): ApexOptions {
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
		series:
			Object.keys(data).length > 0
				? [data?.totalDanger, data?.totalWarning, data?.totalNormal, data?.total]
				: [],
		labels: ['ค่าเกินมาตรฐาน', 'ค่าใกล้เกินมาตรฐาน', 'ค่าอยู่ในเกณฑ์ปกติ', 'ไม่ทำงาน'],
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
							formatter: function (val: any) {
								return val
							},
						},
						value: {
							show: true,
							fontFamily: 'Noto Sans Thai, sans-serif',
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
