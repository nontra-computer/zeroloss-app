import React from 'react'
import NumberBox from '@/Presentation/Components/NumberBox/View'
import clsx from 'clsx'

import useViewModel from './ViewModel'

const Stat: React.FC = () => {
	const { intl, themeMode, data } = useViewModel()

	return (
		<div className="row h-100 justify-content-start">
			<div className="col-12" style={{ height: 'fit-content' }}>
				<div
					className={clsx('fs-2 fw-bolder', {
						'text-zeroloss-grey-900': themeMode === 'light',
						'text-zeroloss-base-white': themeMode === 'dark',
					})}>
					{intl.formatMessage({
						id: 'ZEROLOSS.DASHBOARD.BUILDING_MWA_MEASUREMENT.RESULT_TITLE',
					})}
				</div>
				<p
					className={clsx('fs-6', {
						'text-zeroloss-base-white': themeMode === 'dark',
						'text-zeroloss-grey-600': themeMode === 'light',
					})}>
					{intl.formatMessage({
						id: 'ZEROLOSS.DASHBOARD.BUILDING_MWA_MEASUREMENT.RESULT_DESCRIPTION',
					})}
				</p>
			</div>
			<div className="col-12 col-lg-4">
				<NumberBox
					id="measurement-exceeds"
					title="ค่าเกินมาตรฐาน"
					type="danger"
					value={data?.totalDanger ?? 0}
					height={200}
					infos={[
						{
							label: 'แจ้งเหตุ',
							value: 50,
						},
						{
							label: 'แจ้งเหตุ',
							value: 50,
						},
						{
							label: 'แจ้งเหตุ',
							value: 50,
						},
					]}
				/>
			</div>
			<div className="col-12 col-lg-4">
				<NumberBox
					id="measurement-close-to-exceeds"
					title="ค่าใกล้เกินมาตรฐาน"
					type="warning"
					value={data?.totalWarning ?? 0}
					height={200}
					infos={[
						{
							label: 'แจ้งเหตุ',
							value: 50,
						},
						{
							label: 'แจ้งเหตุ',
							value: 50,
						},
						{
							label: 'แจ้งเหตุ',
							value: 50,
						},
					]}
				/>
			</div>
			<div className="col-12 col-lg-4">
				<NumberBox
					id="measurement-normal"
					title="ค่าอยู่ในเกณฑ์ปกติ"
					type="success"
					value={data?.totalNormal ?? 0}
					height={200}
					infos={[
						{
							label: 'แจ้งเหตุ',
							value: 50,
						},
						{
							label: 'แจ้งเหตุ',
							value: 50,
						},
						{
							label: 'แจ้งเหตุ',
							value: 50,
						},
					]}
				/>
			</div>
		</div>
	)
}

export default Stat
