import React from 'react'
import { ClientSideTable } from '@/Presentation/Components/Table'
import clsx from 'clsx'

import useViewModel from './ViewModel'

const MeasurementTable: React.FC = () => {
	const { intl, themeMode, columns, data } = useViewModel()

	return (
		<React.Fragment>
			<div className="row">
				<div className="col-12" style={{ height: 'fit-content' }}>
					<div
						className={clsx('fs-2 fw-bolder', {
							'text-zeroloss-grey-900': themeMode === 'light',
							'text-zeroloss-base-white': themeMode === 'dark',
						})}>
						{intl.formatMessage({
							id: 'ZEROLOSS.DASHBOARD.BUILDING_MWA_MEASUREMENT.SENSOR_TITLE',
						})}
					</div>
					<p
						className={clsx('fs-6', {
							'text-zeroloss-base-white': themeMode === 'dark',
							'text-zeroloss-grey-600': themeMode === 'light',
						})}>
						{intl.formatMessage({
							id: 'ZEROLOSS.DASHBOARD.BUILDING_MWA_MEASUREMENT.SENSOR_DESCRIPTION',
						})}
					</p>
				</div>
				<div className="col-12">
					<div
						className={clsx('card border-radius-12px border-1px h-100', {
							'bg-zeroloss-base-white border-zeroloss-grey-200': themeMode === 'light',
							'bg-zeroloss-grey-true-800 border-zeroloss-base-white': themeMode === 'dark',
						})}>
						<div className="card-body px-0 pt-2">
							<ClientSideTable columns={columns} data={data} items_per_page={10} />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default MeasurementTable
