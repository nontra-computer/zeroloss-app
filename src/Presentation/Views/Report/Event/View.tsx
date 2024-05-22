import React from 'react'
import { PageTitle } from '@/_metronic/layout/core'
import { KTSVG } from '@/_metronic/helpers'
import { MapContainer, TileLayer } from 'react-leaflet'
import Filter from './Components/Filter'
import EventWithStatus from '@/Presentation/Components/LeafletMap/EventWithStatus'
import EventPopup from '@/Presentation/Components/LeafletMap/EventPopup'
import LocationMeasurementStation from '@/Presentation/Components/LeafletMap/LocationMeasurementStation'
import MeasurementDetailPopup from '@/Presentation/Components/LeafletMap/MeasurementDetailPopup'
import MeasurementTable from '../../Dashboard/Components/MeasurementTable/View'

import useViewModel from './ViewModel'
import { BangkhenWaterTreatmentPlant } from '@/Configuration/​MapCoordinates'
import clsx from 'clsx'

const ReportEventView: React.FC = () => {
	const {
		timeStr,
		themeMode,
		filter,
		eventTypesOptions,
		eventSubTypesOptions,
		eventStatusOptions,
		confirmFilter,
		clearFilter,
		onChangeFilter,
		data,
		measurements,
		selectedMeasurementData,
		showMeasurementTable,
		hasSelectedFirstDataSource,
		onOpenMeasurementTable,
		onCloseMeasurementTable,
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
				Report / Event
			</PageTitle>

			<Filter
				filter={filter}
				onChangeFilter={onChangeFilter}
				confirmFilter={confirmFilter}
				clearFilter={clearFilter}
				eventTypeOptions={eventTypesOptions}
				eventSubTypeOptions={eventSubTypesOptions}
				eventStatusOptions={eventStatusOptions}
			/>

			<div className="row g-5 gy-10 px-10 pb-10 pt-10">
				<div className="col-12"></div>

				<div className="col-12 mt-20 mt-lg-0">
					<div
						className={clsx('row align-items-center', {
							'justify-content-between': !hasSelectedFirstDataSource,
							'justify-content-end': hasSelectedFirstDataSource,
						})}
						style={{ rowGap: '12px' }}>
						{!hasSelectedFirstDataSource && (
							<div className="col-10">
								<div className="alert alert-primary d-flex align-items-center p-5">
									<span className="svg-icon svg-icon-2hx svg-icon-primary me-3">
										<KTSVG
											className="svg-icon-3 me-1 svg-icon-primary"
											path={'media/icons/duotune/files/fil024.svg'}
										/>
									</span>

									<div className="d-flex flex-column">
										<h5 className="mb-1">กรุณาเลือกตัวกรองเพื่อค้นหาเหตุการณ์</h5>
										<span>
											เลือกเหตุการณ์ที่ต้องการดูรายละเอียด และกำหนดวันที่ที่ต้องการดูรายละเอียด
										</span>
									</div>
								</div>
							</div>
						)}

						<div className="col-2 text-end">
							<button
								id="kt_report_event_filter_toggle"
								className={clsx('btn btn-sm w-100 w-lg-auto mt-4 mt-lg-0 h-45px', {
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
					<div className="card-body px-0 py-0">
						<div className="row gy-5 gx-0">
							{/* begin:: Map */}
							<div className="d-none d-sm-block col-12">
								<div className="card h-600px">
									<div className="card-body p-0 pb-20 position-relative main-dashboard-map-container">
										{showMeasurementTable && (
											<MeasurementTable
												data={selectedMeasurementData}
												onClose={onCloseMeasurementTable}
											/>
										)}

										<MapContainer
											center={{
												lat: BangkhenWaterTreatmentPlant.lat,
												lng: BangkhenWaterTreatmentPlant.lng,
											}}
											zoom={16}>
											<TileLayer
												attribution="@Copyright 2024 Zeroloss"
												url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
											/>

											{data.map((d: any, index: number) => {
												return (
													<EventWithStatus key={`map-data-${index}`} {...d} popup={EventPopup} />
												)
											})}

											{measurements.map((d: any, index: number) => (
												<LocationMeasurementStation
													key={`measurement-data-${index}`}
													{...d}
													position={{
														lat: d?.latitude ?? 0,
														lng: d?.longitude ?? 0,
													}}
													popup={MeasurementDetailPopup}
													onClick={onOpenMeasurementTable}
												/>
											))}
										</MapContainer>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default ReportEventView
