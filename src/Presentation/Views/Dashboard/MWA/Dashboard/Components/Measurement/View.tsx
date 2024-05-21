import React from 'react'
import NumberBox from '@/Presentation/Components/NumberBox/View'
import Chart from 'react-apexcharts'
import clsx from 'clsx'

import useViewModel from './ViewModel'

const Measurement: React.FC = () => {
	const { isMobile, isLargeMobile, data, intl, themeMode } = useViewModel()

	console.log('isLargeMobile', isLargeMobile)

	return (
		<div className="row gy-5">
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

			<div className="col-12 col-lg-6 col-xxl-3">
				<div
					className={clsx('card border-radius-12px border-1px h-100', {
						'bg-zeroloss-base-white border-zeroloss-grey-200': themeMode === 'light',
						'bg-zeroloss-grey-true-800 border-zeroloss-base-white': themeMode === 'dark',
					})}>
					<div className="card-body min-h-200px px-0">
						<p
							className={clsx('fs-3 fw-bolder my-0 px-6', {
								'text-zeroloss-grey-900': themeMode === 'light',
								'text-zeroloss-base-white': themeMode === 'dark',
							})}>
							{intl.formatMessage({
								id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.TOTAL_MEASUREMENT_TITLE',
							})}
						</p>

						{/* begin::Chart */}
						<Chart
							type="donut"
							width={isLargeMobile ? '50%' : '100%'}
							height={isMobile || isLargeMobile ? 'undefined' : '160px'}
							series={[
								data?.totalDanger ?? 0,
								data?.totalWarning ?? 0,
								data?.totalNormal ?? 0,
								data?.total ?? 0,
							]}
							options={{
								labels: ['ค่าเกินมาตรฐาน', 'ค่าใกล้เกินมาตรฐาน', 'ค่าอยู่ในเกณฑ์ปกติ', 'ไม่ทำงาน'],
								chart: {
									redrawOnWindowResize: true,
									redrawOnParentResize: true,
									offsetY: -10,
									offsetX: isMobile ? 10 : isLargeMobile ? 180 : 30,
								},
								plotOptions: {
									pie: {
										offsetX: 40,
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
										bottom: isMobile || isLargeMobile ? 50 : 0,
									},
								},
								dataLabels: {
									enabled: false,
								},
								responsive: [
									{
										breakpoint: 835,
										options: {
											chart: {
												// width: '100%',
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
									// offsetY: isMobile || isLargeMobile ? 70 : 5,
									offsetX: !isMobile && !isLargeMobile ? -35 : 0,
									floating: true,
									labels: {
										colors: themeMode === 'dark' ? '#ffffff' : '#666666',
									},
								},
							}}
						/>
						{/* end::Chart */}
					</div>
				</div>
			</div>
			<div className="col-12 col-xxl-3">
				<NumberBox
					id="mwa-exceeds"
					title="ค่าเกินมาตรฐาน"
					value={data?.totalDanger ?? 0}
					type="danger"
					height={isMobile || isLargeMobile ? 140 : 200}
				/>
			</div>
			<div className="col-12 col-xxl-3">
				<NumberBox
					id="mwa-inappropriate"
					title="ค่าใกล้เกินมาตรฐาน"
					value={data?.totalWarning ?? 0}
					type="warning"
					height={isMobile || isLargeMobile ? 140 : 200}
				/>
			</div>
			<div className="col-12 col-xxl-3">
				<NumberBox
					id="mwa-normal"
					title="ค่าอยู่ในเกณฑ์ปกติ"
					value={data?.totalNormal ?? 0}
					type="success"
					height={isMobile || isLargeMobile ? 140 : 200}
				/>
			</div>
		</div>
	)
}

export default Measurement
