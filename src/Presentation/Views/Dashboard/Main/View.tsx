import React from 'react'
import { PageTitle } from '@/_metronic/layout/core'

import StatZoneView from '../Components/Stat/View'
import MainDashboardTableView from './Table/View'
import MainDashboardMapView from './Map/View'
import MainDashboardCalendarView from './Calendar/View'

import useViewModel from './ViewModel'
import clsx from 'clsx'

const MainDashboardView: React.FC = () => {
	const { timeStr, themeMode, isShowTable, isShowMap, isShowCalendar, onClickView } = useViewModel()

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
				Main Dashboard
			</PageTitle>

			<div className="row g-5 gy-10 px-10 pb-10 pt-10">
				<div className="col-12 mt-20 mt-lg-0">
					<div>
						<div className="zeroloss-button-group w-fit-content shadow">
							<button
								className={clsx('btn btn-sm left cursor-pointer', {
									'white-button': themeMode === 'light',
									'btn-zeroloss-base-grey-carbon border-zeroloss-base-white border-1px': themeMode === 'dark',
								})}
								onClick={() => onClickView('/dashboard/overview/table')}>
								{isShowTable && (
									<span className="d-inline-block bg-zeroloss-success-500 p-1 rounded-circle w-2px h-2px me-2" />
								)}
								Default
							</button>
							<button
								className={clsx('btn btn-sm middle cursor-pointer', {
									'white-button': themeMode === 'light',
									'btn-zeroloss-base-grey-carbon border-zeroloss-base-white border-1px': themeMode === 'dark',
								})}
								onClick={() => onClickView('/dashboard/overview/map')}>
								{isShowMap && (
									<span className="d-inline-block bg-zeroloss-success-500 p-1 rounded-circle w-2px h-2px me-2" />
								)}
								Maps
							</button>
							<button
								className={clsx('btn btn-sm right cursor-pointer', {
									'white-button': themeMode === 'light',
									'btn-zeroloss-base-grey-carbon border-zeroloss-base-white border-1px': themeMode === 'dark',
								})}
								onClick={() => onClickView('/dashboard/overview/calendar')}>
								{isShowCalendar && (
									<span className="d-inline-block bg-zeroloss-success-500 p-1 rounded-circle w-2px h-2px me-2" />
								)}
								Calendar
							</button>
							{/* <button
								className={clsx('btn btn-sm right cursor-pointer', {
									'white-button': themeMode === 'light',
									'btn-zeroloss-base-grey-carbon border-zeroloss-base-white border-1px': themeMode === 'dark',
								})}>
								<img src="/media/icons/zeroloss/plus.svg" alt="Plus Icon" width={18} height={18} />
							</button> */}
						</div>
					</div>
				</div>

				<div className="col-12">
					<StatZoneView />
				</div>

				<div className="col-12 mt-lg-20">
					{isShowTable && <MainDashboardTableView />}
					{isShowMap && <MainDashboardMapView />}
					{isShowCalendar && <MainDashboardCalendarView />}
				</div>
			</div>
		</React.Fragment>
	)
}

export default MainDashboardView
