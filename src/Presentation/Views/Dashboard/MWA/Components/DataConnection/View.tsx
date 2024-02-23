import React, { useEffect, useRef } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import { getCSS } from '@/_metronic/assets/ts/_utils'
import clsx from 'clsx'

import useViewModel from './ViewModel'

interface Props {}

const DataConnection: React.FC<Props> = () => {
	const sensorChartRef = useRef<HTMLDivElement | null>(null)
	const connectionChartRef = useRef<HTMLDivElement | null>(null)
	const { intl, themeMode, mode, isLoading, data } = useViewModel()

	const refreshSensorChart = () => {
		if (!sensorChartRef.current) {
			return
		}

		const height = parseInt(getCSS(sensorChartRef.current, 'height'))

		const chart = new ApexCharts(
			sensorChartRef.current,
			getSensorChartOptions(height, themeMode === 'dark', data)
		)
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

		const chart = new ApexCharts(
			connectionChartRef.current,
			getConnectionChartOptions(height, themeMode === 'dark')
		)
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sensorChartRef, mode, themeMode, data])

	useEffect(() => {
		const chart = refreshConnectionChart()

		return () => {
			if (chart) {
				chart.destroy()
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [connectionChartRef, mode, themeMode])

	return (
		<React.Fragment>
			<div className="d-flex flex-row justify-content-between align-items-center">
				<div>
					<div
						className={clsx('fs-2 fw-bolder', {
							'text-zeroloss-base-white': themeMode === 'dark',
							'text-zeroloss-grey-900': themeMode === 'light',
						})}>
						{intl.formatMessage({
							id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.SENSOR_TITLE',
						})}
					</div>
					<p
						className={clsx('fs-6', {
							'text-zeroloss-base-white': themeMode === 'dark',
							'text-zeroloss-grey-600': themeMode === 'light',
						})}>
						{intl.formatMessage({
							id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.SENSOR_DESCRIPTION',
						})}
					</p>
				</div>
			</div>

			<div className="row gy-5" id="mwa-data-connection-container">
				{/* start:: Sensor Chart */}
				<div className="col-12">
					<div
						className={clsx('card border-1px', {
							'bg-zeroloss-base-white border-zeroloss-grey-true-200': themeMode === 'light',
							'bg-zeroloss-grey-true-800 border-zeroloss-base-white': themeMode === 'dark',
						})}>
						<div className="card-body px-6">
							<div className="d-flex flex-column justify-content-between px-0">
								<div className="row">
									{/* start:: Header */}
									<div className="col-12">
										<p
											className={clsx('fs-3 fw-bolder my-0', {
												'text-zeroloss-grey-900': themeMode === 'light',
												'text-zeroloss-base-white': themeMode === 'dark',
											})}>
											{intl.formatMessage({
												id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.CHLORINE_SENSOR',
											})}
										</p>
									</div>
									{/* end:: Header */}

									{/* start:: Content */}
									<div className="col-12 col-lg-7">
										{/* begin::Chart */}
										<div
											ref={sensorChartRef}
											id="kt_charts_sensor_chart"
											className="card-rounded-bottom"
											style={{ height: '180px' }}></div>
										{/* end::Chart */}
									</div>
									<div className="col-12 col-lg-5">
										<div className="d-flex flex-column align-items-end justify-content-center h-100">
											<div className="fs-5 mb-3 w-100">
												<div className="row">
													<div
														className={clsx('col-8 text-end text-zeroloss-warning fw-bold', {
															// 'text-zeroloss-warning': themeMode === 'dark',
															// 'text-zeroloss-warning': themeMode === 'light',
														})}>
														{intl.formatMessage({
															id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.CHLORINE_SENSOR_LABEL',
														})}
													</div>
													<div className="col-4">
														<span
															className={clsx({
																'text-zeroloss-base-white': themeMode === 'dark',
																'text-zeroloss-success-700': themeMode === 'light',
															})}>
															{data?.onlinePercentage}%
														</span>
													</div>
												</div>
											</div>
											<div className="fs-5 mb-3 w-100">
												<div className="row">
													<div
														className={clsx('col-8 text-end text-zeroloss-error fw-bold', {
															// 'text-zeroloss-warning': themeMode === 'dark',
															// 'text-zeroloss-warning': themeMode === 'light',
														})}>
														{intl.formatMessage({
															id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.CHLORINE_OFFLINE_SENSOR_LABEL',
														})}
													</div>
													<div className="col-4">
														<span
															className={clsx({
																'text-zeroloss-base-white': themeMode === 'dark',
																'text-zeroloss-error-700': themeMode === 'light',
															})}>
															{data?.offlinePercentage}%
														</span>
													</div>
												</div>
											</div>
											<div className="fs-5 mb-3 w-100">
												<div className="row">
													<div
														className={clsx('col-8 text-end', {
															'text-zeroloss-base-white': themeMode === 'dark',
															'text-zeroloss-grey-600': themeMode === 'light',
														})}>
														{intl.formatMessage({
															id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.CHLORINE_SENSOR_AVAILABLE',
														})}
													</div>
													<div className="col-4">
														<span
															className={clsx({
																'text-zeroloss-base-white': themeMode === 'dark',
																'text-zeroloss-success-700': themeMode === 'light',
															})}>
															{data?.totalOnline}
														</span>
													</div>
												</div>
											</div>
											<div className="fs-5 w-100">
												<div className="row">
													<div
														className={clsx('col-8 text-end', {
															'text-zeroloss-base-white': themeMode === 'dark',
															'text-zeroloss-grey-600': themeMode === 'light',
														})}>
														{intl.formatMessage({
															id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.CHLORINE_SENSOR_UNAVAILABLE',
														})}
													</div>
													<div className="col-4">
														<span
															className={clsx({
																'text-zeroloss-base-white': themeMode === 'dark',
																'text-zeroloss-error-700': themeMode === 'light',
															})}>
															{data?.totalOffline}
														</span>
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
					<div
						className={clsx('card border-1px', {
							'bg-zeroloss-base-white border-zeroloss-grey-true-200': themeMode === 'light',
							'bg-zeroloss-grey-true-800 border-zeroloss-base-white': themeMode === 'dark',
						})}>
						<div className="card-body px-6">
							<div className="d-flex flex-column justify-content-between px-0">
								<div className="row">
									{/* start:: Header */}
									<div className="col-12">
										<p
											className={clsx('fs-2 fw-bolder my-0', {
												'text-zeroloss-base-white': themeMode === 'dark',
												'text-zeroloss-grey-900': themeMode === 'light',
											})}>
											{intl.formatMessage({
												id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.CONNECTION',
											})}
										</p>
									</div>
									{/* end:: Header */}

									{/* start:: Content */}
									<div className="col-12">
										{/* begin::Chart */}
										<div
											ref={connectionChartRef}
											id="kt_charts_connection_chart"
											className="card-rounded-bottom mt-5"
											style={{ height: '120px' }}></div>
										{/* end::Chart */}
									</div>
									<div className="col-12">
										<div className="row fs-5 gy-5 text-start">
											{/* Available */}
											<div
												className={clsx('col-5 col-lg-4', {
													'text-zeroloss-base-white': themeMode === 'dark',
													'text-zeroloss-grey-600': themeMode === 'light',
												})}>
												{intl.formatMessage({
													id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.CONNECTION_AVAILABLE',
												})}
											</div>
											<div
												className={clsx('col-7 col-lg-2', {
													'text-zeroloss-success-700': themeMode === 'light',
													'text-zeroloss-success-400': themeMode === 'dark',
												})}>
												55.7%
											</div>
											<div
												className={clsx('col-6 col-lg-2', {
													'text-zeroloss-grey-600': themeMode === 'light',
													'text-zeroloss-base-white': themeMode === 'dark',
												})}>
												{intl.formatMessage({
													id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.CONNECTION_AVAILABLE_QUANTITY',
												})}
											</div>
											<div
												className={clsx('col-2 col-lg-2', {
													'text-zeroloss-success-700': themeMode === 'light',
													'text-zeroloss-success-400': themeMode === 'dark',
												})}>
												93
											</div>
											<div
												className={clsx('col-4 col-lg-2', {
													'text-zeroloss-base-white': themeMode === 'dark',
													'text-zeroloss-grey-600': themeMode === 'light',
												})}>
												{intl.formatMessage({
													id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.CONNECTION_AVAILABLE_UNIT',
												})}
											</div>

											{/* Unavailable */}
											<div
												className={clsx('col-5 col-lg-4', {
													'text-zeroloss-base-white': themeMode === 'dark',
													'text-zeroloss-grey-600': themeMode === 'light',
												})}>
												{intl.formatMessage({
													id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.CONNECTION_UNAVAILABLE',
												})}
											</div>
											<div
												className={clsx('col-7 col-lg-2', {
													'text-zeroloss-error-500': themeMode === 'dark',
													'text-zeroloss-error-700': themeMode === 'light',
												})}>
												55.7%
											</div>
											<div
												className={clsx('col-6 col-lg-2', {
													'text-zeroloss-grey-600': themeMode === 'light',
													'text-zeroloss-base-white': themeMode === 'dark',
												})}>
												{intl.formatMessage({
													id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.CONNECTION_UNAVAILABLE_QUANTITY',
												})}
											</div>
											<div
												className={clsx('col-2 col-lg-2', {
													'text-zeroloss-error-500': themeMode === 'dark',
													'text-zeroloss-error-700': themeMode === 'light',
												})}>
												93
											</div>
											<div
												className={clsx('col-4 col-lg-2', {
													'text-zeroloss-base-white': themeMode === 'dark',
													'text-zeroloss-grey-600': themeMode === 'light',
												})}>
												{intl.formatMessage({
													id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.CONNECTION_UNAVAILABLE_UNIT',
												})}
											</div>
										</div>
									</div>
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

function getSensorChartOptions(height: number, isDark: boolean, data: any): ApexOptions {
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
		series: Object.keys(data).length > 0 ? [data?.onlinePercentage, data?.offlinePercentage] : [],
		labels: ['Sensors', 'Offline Sensors'],
		chart: {
			type: 'donut',
			height: height,
			width: '100%',
			offsetY: 60,
		},
		plotOptions: {
			pie: {
				startAngle: -90,
				endAngle: 90,
				donut: {
					labels: {
						show: true,
						name: {
							show: true,
							offsetY: -30,
							fontFamily: 'Noto Sans Thai, sans-serif',
							fontWeight: 'bolder',
							fontSize: '14px',
							formatter: function (val: any) {
								return val
							},
						},
						value: {
							show: true,
							offsetY: -20,
							fontFamily: 'Noto Sans Thai, sans-serif',
							fontWeight: 'bolder',
							fontSize: '14px',
							color: isDark ? '#ffffff' : '#666666',
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
			labels: {
				colors: isDark ? '#ffffff' : '#666666',
			},
		},
	}
}

function getConnectionChartOptions(height: number, isDark: boolean): ApexOptions {
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
			{
				name: 'Online Sensor',
				data: [10, 41, 35, 51, 49, 62, 69],
			},
		],
		chart: {
			height: height,
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
			show: true,
			row: {
				// colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
				// opacity: 0.5,
			},
		},
		legend: {
			position: 'top',
			labels: {
				colors: isDark ? '#ffffff' : '#666666',
			},
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

export default DataConnection
