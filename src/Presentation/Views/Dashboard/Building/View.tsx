import React from 'react'
import { PageTitle } from '@/_metronic/layout/core'
import Map from './Components/Map'
import TotalMeasurement from './Components/TotalMeasurement'
import Stat from './Components/Stat'
import MeasurementTable from './Components/Table'
import useViewModel from './ViewModel'
import clsx from 'clsx'

const MWABuildingDashboardView: React.FC = () => {
	const { timeStr, themeMode, datas } = useViewModel()

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

			<div className="row g-5 px-10 pb-10">
				<div className="col-12">
					<Map />
				</div>
				<div className="col-12 col-lg-3">
					<TotalMeasurement />
				</div>
				<div className="col-12 col-lg-9">
					<Stat />
				</div>
				<div className="col-12">
					<MeasurementTable datas={datas} />
				</div>
			</div>
		</React.Fragment>
	)
}

export default MWABuildingDashboardView
