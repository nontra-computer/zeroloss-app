import React from 'react'
import { PageTitle } from '@/_metronic/layout/core'
import { KTSVG } from '@/_metronic/helpers'
import ReactDatePicker from 'react-datepicker'

import Filter from './Components/Filter'
import EventListTableView from './Table/View'
import EventListCalendarView from './Calendar/View'

import useViewModel from './ViewModel'
import moment from 'moment'
import clsx from 'clsx'

const EventOverviewView: React.FC = () => {
	const {
		isShowTable,
		isShowCalendar,
		timeStr,
		themeMode,
		filter,
		eventTypesOptions,
		eventStatusOptions,
		confirmFilter,
		clearFilter,
		onChangeFilter,
		isOpenDatePicker,
		setIsOpenDatePicker,
		dateRange,
		onClickView,
	} = useViewModel()

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
				All Events
			</PageTitle>

			<Filter
				filter={filter}
				onChangeFilter={onChangeFilter}
				confirmFilter={confirmFilter}
				clearFilter={clearFilter}
				eventTypeOptions={eventTypesOptions}
				eventStatusOptions={eventStatusOptions}
			/>

			<div className="row g-5 gy-10 px-10 pb-10 pt-10">
				<div className="col-12 mt-20 mt-lg-0">
					<div
						className="d-flex flex-column flex-lg-row justify-content-between"
						style={{ rowGap: '12px' }}>
						<div className="zeroloss-button-group w-fit-content shadow mx-auto mx-lg-0">
							<button
								className={clsx('btn btn-sm left cursor-pointer', {
									'white-button': themeMode === 'light',
									'btn-zeroloss-base-grey-carbon border-zeroloss-base-white border-1px':
										themeMode === 'dark',
								})}
								onClick={() => onClickView('/events/overview/table')}>
								{isShowTable && (
									<span className="d-inline-block bg-zeroloss-success-500 p-1 rounded-circle w-2px h-2px me-2" />
								)}
								Table
							</button>
							<button
								className={clsx('btn btn-sm right cursor-pointer', {
									'white-button': themeMode === 'light',
									'btn-zeroloss-base-grey-carbon border-zeroloss-base-white border-1px':
										themeMode === 'dark',
								})}
								onClick={() => onClickView('/events/overview/calendar')}>
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

						<div>
							<button
								className={clsx('btn btn-sm w-100 w-lg-auto me-lg-2', {
									'white-button': themeMode === 'light',
									'btn-zeroloss-base-grey-carbon border-zeroloss-base-white border-1px':
										themeMode === 'dark',
								})}
								onClick={() => setIsOpenDatePicker(true)}>
								{dateRange}
							</button>
							{isOpenDatePicker && (
								<div className="position-absolute" style={{ zIndex: 999, marginTop: '10px' }}>
									<ReactDatePicker
										inline
										fixedHeight
										selectsRange
										selectsStart
										selectsEnd
										startDate={filter.startPeriod ? moment(filter.startPeriod).toDate() : null}
										endDate={filter.endPeriod ? moment(filter.endPeriod).toDate() : null}
										onChange={dates => {
											if (dates) {
												onChangeFilter('startPeriod', dates[0])
												onChangeFilter('endPeriod', dates[1])

												if (dates[0] && dates[1]) {
													setIsOpenDatePicker(false)
												}
											}
										}}
										onBlur={() => setIsOpenDatePicker(false)}
										onClickOutside={() => setIsOpenDatePicker(false)}
									/>
								</div>
							)}

							<button
								id="kt_events_list_filter_toggle"
								className={clsx('btn btn-sm w-100 w-lg-auto mt-4 mt-lg-0', {
									'white-button': themeMode === 'light',
									'btn-zeroloss-base-grey-carbon border-zeroloss-base-white border-1px':
										themeMode === 'dark',
								})}>
								<KTSVG
									className="svg-icon-3 me-1"
									path={
										themeMode === 'light'
											? 'media/icons/zeroloss/filter-lines.svg'
											: 'media/icons/zeroloss/white-filter-lines.svg'
									}
								/>
								ตัวกรอง
							</button>
						</div>
					</div>
				</div>

				<div className="col-12 mt-lg-10">
					{isShowTable && <EventListTableView />}
					{isShowCalendar && <EventListCalendarView />}
				</div>
			</div>
		</React.Fragment>
	)
}

export default EventOverviewView
