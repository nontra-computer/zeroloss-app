import React from 'react'
import Chart from 'react-apexcharts'
import clsx from 'clsx'

import useViewModel from './ViewModel'

const TotalMeasurement: React.FC = () => {
	const {
		chartOffsetX,
		isMobile,
		isLargeMobile,
		isTablet,
		isLaptop,
		isFullHD,
		is4K,
		is8K,
		intl,
		themeMode,
		data,
	} = useViewModel()

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
					<div className="card-body px-6 h-300px h-lg-350px h-xxl-200px">
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
						<Chart
							type="donut"
							width={210}
							height={isLaptop || isFullHD || is4K || is8K ? 150 : undefined}
							series={[data?.totalOnline ?? 0, data?.totalOffline ?? 0]}
							options={{
								labels: ['เชื่อมโยงได้', 'เชื่อมโยงไม่ได้'],
								chart: {
									redrawOnParentResize: true,
									redrawOnWindowResize: true,
									offsetX: chartOffsetX,
								},
								plotOptions: {
									pie: {
										customScale: 0.8,
										offsetX: isLargeMobile || isLaptop || is4K || is8K ? 60 : 0,
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
								colors: ['#17B26A', '#475467'],
								grid: {
									padding: {
										bottom: isMobile || isLargeMobile || isTablet ? 10 : 0,
									},
								},
								dataLabels: {
									enabled: false,
								},
								responsive: [
									{
										breakpoint: 1195,
										options: {
											chart: {
												// width: 250,
												// height: 250,
											},
											legend: {
												position: 'bottom',
											},
										},
									},
								],
								legend: {
									fontFamily: 'Noto Sans Thai, sans-serif',
									show: true,
									position: 'left',
									horizontalAlign: 'center',
									// offsetY: 20,
									offsetX: !isMobile && !isLargeMobile ? -20 : 0,
									floating: true,
									labels: {
										colors: themeMode === 'dark' ? '#ffffff' : '#666666',
									},
								},
							}}
						/>
						{/* <div
							ref={totalChartRef}
							id="kt_charts_total_measurement_chart"
							className="card-rounded-bottom"
							style={{ height: '150px' }}></div> */}
						{/* end::Chart */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default TotalMeasurement
