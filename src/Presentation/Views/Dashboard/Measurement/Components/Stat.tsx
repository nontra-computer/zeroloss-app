import React from 'react'
import { useIntl } from 'react-intl'
import NumberBox from '@/Presentation/Components/NumberBox/View'

const Stat: React.FC = () => {
	const intl = useIntl()

	return (
		<div className="row h-100 justify-content-start">
			<div className="col-12" style={{ height: 'fit-content' }}>
				<div className="fs-2 fw-bolder text-zeroloss-grey-900">
					{intl.formatMessage({
						id: 'ZEROLOSS.DASHBOARD.MEASUREMENT.RESULT_TITLE',
					})}
				</div>
				<p className="fs-6 text-zeroloss-grey-600">
					{intl.formatMessage({
						id: 'ZEROLOSS.DASHBOARD.MEASUREMENT.RESULT_DESCRIPTION',
					})}
				</p>
			</div>
			<div className="col-12 col-lg-4">
				<NumberBox
					id="measurement-exceeds"
					title="ค่าเกินมาตรฐาน"
					type="danger"
					value={50}
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
					title="ใกล้เกินมาตรฐาน"
					type="warning"
					value={100}
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
					title="อยู่ในเกณฑ์ปกติ"
					type="success"
					value={30}
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
