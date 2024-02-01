import React, { useEffect, useRef } from 'react'
import NumberBox from './NumberBox'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useIntl } from 'react-intl'
import { getCSS } from '@/_metronic/assets/ts/_utils'

const Measurement: React.FC = () => {
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
		<div className="row">
			<div className="col-12">
				<div className="fs-2 fw-bolder text-zeroloss-grey-900">
					{intl.formatMessage({
						id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.MEASUREMENT_TITLE',
					})}
				</div>
				<p className="fs-6 text-zeroloss-grey-600">
					{intl.formatMessage({
						id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.MEASUREMENT_DESCRIPTION',
					})}
				</p>
			</div>

			<div className="col-12 col-lg-3">
				<div className="card border-12px h-100 border border-zeroloss-grey-200">
					<div className="card-body px-6">
						<p className="fs-3 fw-bolder my-0 text-zeroloss-grey-900">
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
				<NumberBox id="mwa-exceeds" title="ค่าเกินมาตรฐาน" value={52000} type="danger" />
			</div>
			<div className="col-12 col-lg-3">
				<NumberBox id="mwa-inappropriate" title="เหตุการณ์ผิดปกติ" value={900} type="warning" />
			</div>
			<div className="col-12 col-lg-3">
				<NumberBox id="mwa-normal" title="เหตุร้องเรียน" value={888} type="success" />
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
						show: true,
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
			offsetY: 20,
			floating: true,
		},
	}
}

export default Measurement
