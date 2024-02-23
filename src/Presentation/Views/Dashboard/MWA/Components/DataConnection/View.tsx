import React from 'react'
import Chart from 'react-apexcharts'
import clsx from 'clsx'

import useViewModel from './ViewModel'
import { formatNumberCommas } from '@/Utils/formatNumberCommas'

interface Props {}

const DataConnection: React.FC<Props> = () => {
	const { intl, themeMode, data } = useViewModel()

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
										<Chart
											type="donut"
											width={'300px'}
											height={200}
											series={[data?.onlinePercentage ?? 0, data?.offlinePercentage ?? 0]}
											options={{
												labels: ['Sensors', 'Offline Sensors'],
												chart: {
													offsetY: 30,
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
																	offsetY: -20,
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
																	color: themeMode === 'dark' ? '#ffffff' : '#666666',
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
														top: 0,
														bottom: -50,
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
														colors: themeMode === 'dark' ? '#ffffff' : '#666666',
													},
												},
											}}
										/>
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
															{formatNumberCommas(data?.onlinePercentage ?? 0)}%
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
															{formatNumberCommas(data?.offlinePercentage ?? 0)}%
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
										<Chart
											type="line"
											width={'100%'}
											height={150}
											series={[
												{
													name: 'Offline Sensor',
													data: [30, 60, 70, 20, 90, 32, 12],
												},
												{
													name: 'Online Sensor',
													data: [10, 41, 35, 51, 49, 62, 69],
												},
											]}
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
													show: true,
													row: {
														// colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
														// opacity: 0.5,
													},
												},
												legend: {
													position: 'top',
													labels: {
														colors: themeMode === 'dark' ? '#ffffff' : '#666666',
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
											}}
										/>
										{/* <div
											ref={connectionChartRef}
											id="kt_charts_connection_chart"
											className="card-rounded-bottom mt-5"
											style={{ height: '120px' }}></div> */}
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

export default DataConnection
