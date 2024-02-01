import React, { useEffect, useRef } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useIntl } from 'react-intl'
import { getCSS } from '@/_metronic/assets/ts/_utils'

const DataConnection: React.FC = () => {
	const intl = useIntl()
	const sensorChartRef = useRef<HTMLDivElement | null>(null)
	const connectionChartRef = useRef<HTMLDivElement | null>(null)
	const { mode } = useThemeMode()

	const refreshSensorChart = () => {
		if (!sensorChartRef.current) {
			return
		}

		const height = parseInt(getCSS(sensorChartRef.current, 'height'))

		const chart = new ApexCharts(sensorChartRef.current, getSensorChartOptions(height))
		if (chart) {
			chart.render()
		}

		return chart
	}

	const refreshConnectionChart = () => {
		if (!connectionChartRef.current) {
			return
		}

		const height = parseInt(getCSS(connectionChartRef.current, 'height'))

		const chart = new ApexCharts(connectionChartRef.current, getSensorChartOptions(height))
		if (chart) {
			chart.render()
		}

		return chart
	}

	useEffect(() => {
		const chart = refreshSensorChart()

		return () => {
			if (chart) {
				chart.destroy()
			}
		}
	}, [sensorChartRef, mode])

	useEffect(() => {
		const chart = refreshConnectionChart()

		return () => {
			if (chart) {
				chart.destroy()
			}
		}
	}, [connectionChartRef, mode])

	return (
		<React.Fragment>
			<div className="row g-5">
				{/* start:: Sensor Chart */}
				<div className="col-12">
					<div className="card border-12px h-100 border border-zeroloss-grey-200">
						<div className="card-body px-6">
							<div className="d-flex flex-column justify-content-between px-0 h-100">
								<div className="row">
									{/* start:: Header */}
									<div className="col-12">
										<p className="fs-2 fw-bolder my-0" style={{ color: '#373634' }}>
											{intl.formatMessage({
												id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.CHLORINE_SENSOR',
											})}
										</p>
									</div>
									{/* end:: Header */}

									{/* start:: Content */}
									<div className="col-12 col-lg-6" style={{ height: '150px', overflow: 'hidden' }}>
										{/* begin::Chart */}
										<div
											ref={sensorChartRef}
											id="kt_charts_sensor_chart"
											className="card-rounded-bottom"
											style={{ height: '250px' }}></div>
										{/* end::Chart */}
									</div>
									<div className="col-12 col-lg-6">
										<div className="d-flex flex-column align-items-end justify-content-end h-100">
											<div className="fs-5 mb-3 w-100">
												<div className="row">
													<div className="col-8 text-end text-zeroloss-grey-600">
														{intl.formatMessage({
															id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.CHLORINE_SENSOR_AVAILABLE',
														})}
													</div>
													<div className="col-4">
														<span className="text-zeroloss-success-700">115</span>
													</div>
												</div>
											</div>
											<div className="fs-5 w-100">
												<div className="row">
													<div className="col-8 text-end text-zeroloss-grey-600">
														{intl.formatMessage({
															id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.CHLORINE_SENSOR_UNAVAILABLE',
														})}
													</div>
													<div className="col-4">
														<span className="text-zeroloss-error-700">5</span>
													</div>
												</div>
											</div>
										</div>
									</div>
									{/* end:: Content */}
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* end:: Sensor Chart */}

				<div className="col-12">
					<div className="card border-12px h-100 border border-zeroloss-grey-200">
						<div className="card-body px-6">
							<div className="d-flex flex-column justify-content-between px-0 h-100">
								<div className="row">
									{/* start:: Header */}
									<div className="col-12">
										<p className="fs-2 fw-bolder my-0" style={{ color: '#373634' }}>
											{intl.formatMessage({
												id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.CONNECTION',
											})}
										</p>
									</div>
									{/* end:: Header */}

									{/* start:: Content */}
                                    <div className="col-12"></div>
                                    <div className="col-12"></div>
									{/* end:: Content */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

function getSensorChartOptions(height: number): ApexOptions {
	return {
		// subtitle: {
		// 	text: 'ยอดสมัครสมาชิก',
		// 	margin: 0,
		// 	style: {
		// 		fontSize: '18px',
		// 		fontWeight: 'bold',
		// 		fontFamily: 'Noto Sans Thai, sans-serif',
		// 	},
		// },
		series: [80, 20],
		labels: ['Sensors', 'No Sensors'],
		chart: {
			type: 'donut',
			height: height,
			width: '100%',
		},
		plotOptions: {
			pie: {
				startAngle: -90,
				endAngle: 90,
				offsetY: 30,
				donut: {
					labels: {
						show: true,
						name: {
							show: true,
							offsetY: -30,
							// @ts-ignore
							formatter: function (val: any) {
								return val
							},
						},
						value: {
							show: true,
							offsetY: -20,
							// @ts-ignore
							formatter: function (val: any) {
								return val + ' %'
							},
						},
					},
				},
			},
		},
		colors: ['#F79009', '#667085'],
		grid: {
			padding: {
				bottom: -100,
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
						position: 'bottom',
					},
				},
			},
			{
				breakpoint: 481,
				options: {
					chart: {
						width: 350,
						height: 250,
					},
					legend: {
						position: 'bottom',
					},
				},
			},
		],
		legend: {
			show: false,
			position: 'bottom',
			floating: true,
		},
	}
}

export default DataConnection
