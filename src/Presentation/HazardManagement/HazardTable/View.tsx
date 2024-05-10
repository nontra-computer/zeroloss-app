import React from 'react'
import { PageTitle } from '@/_metronic/layout/core'

import HazardTable from './Table/View'

import useViewModel from './ViewModel'
import clsx from 'clsx'

const MainDashboardView: React.FC = () => {
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
				Hazard Management
			</PageTitle>

			<div className="row g-5 gy-10 px-5 pb-5">
				<div className="col-12 mt-lg-20">
					<HazardTable />
				</div>
			</div>
		</React.Fragment>
	)
}

export default MainDashboardView
