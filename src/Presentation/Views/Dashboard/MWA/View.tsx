import React from 'react'
import { PageTitle } from '@/_metronic/layout/core'
import DataConnection from './Components/DataConnection'
import useViewModel from './ViewModel'
import clsx from 'clsx'

const MwaMeasurementDashboardView: React.FC = () => {
	const { timeStr, themeMode } = useViewModel()

	return (
		<React.Fragment>
			<PageTitle
				description={
					<React.Fragment>
						<i
							className={clsx('bi bi-calendar3 me-3 fs-4 text-zeroloss-base-white', {
								'text-zeroloss-base-white': themeMode === 'dark',
								'text-zeroloss-base-grey-carbon': themeMode === 'light',
							})}
						/>
						{timeStr}
					</React.Fragment>
				}
				aditionalDescription="Your current sales summary and activity.">
				การประปานครหลวง
			</PageTitle>

			<div className="row g-5 px-10">
				<div className="col-12 col-lg-8"></div>
				<div className="col-12 col-lg-4">
					<DataConnection />
				</div>
			</div>
		</React.Fragment>
	)
}

export default MwaMeasurementDashboardView
