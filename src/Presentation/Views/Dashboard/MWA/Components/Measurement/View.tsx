import React from 'react'
import NumberBox from '@/Presentation/Components/NumberBox/View'
import Chart from 'react-apexcharts'
import clsx from 'clsx'

import useViewModel from './ViewModel'

const Measurement: React.FC = () => {
	const { data, intl, themeMode } = useViewModel()

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
						<Chart
							type="donut"
							width={'100%'}
							height="160px"
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
									offsetX: 40,
								},
								plotOptions: {
									pie: {
										customScale: 0.8,
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
									offsetX: -30,
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
			<div className="col-12 col-lg-6 col-xxl-3">
				<NumberBox
					id="mwa-exceeds"
					title="ค่าเกินมาตรฐาน"
					value={data?.totalDanger ?? 0}
					type="danger"
					height={200}
				/>
			</div>
			<div className="col-12 col-lg-6 col-xxl-3">
				<NumberBox
					id="mwa-inappropriate"
					title="ค่าใกล้เกินมาตรฐาน"
					value={data?.totalWarning ?? 0}
					type="warning"
					height={200}
				/>
			</div>
			<div className="col-12 col-lg-6 col-xxl-3">
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

export default Measurement
