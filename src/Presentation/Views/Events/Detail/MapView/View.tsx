import React from 'react'
import { KTSVG } from '@/_metronic/helpers'
import { MapContainer, TileLayer } from 'react-leaflet'
import Filter from '../Components/Filter'
import PlainLocation from '@/Presentation/Components/LeafletMap/PlainLocation'
// import LocationPolygon from '@/Presentation/Components/LeafletMap/LocationPolygon'
import PhoneRotateCaution from '@/Presentation/Components/PhoneRotateCaution/View'
import InfoBoard from '@/Presentation/Components/InfoBoard'
import LocationPopup from '../Components/LocationPopup'
import EventWithStatus from '@/Presentation/Components/LeafletMap/EventWithStatus'
import EventPopup from '@/Presentation/Components/LeafletMap/EventPopup'

import useViewModel from './ViewModel'
import clsx from 'clsx'
import { Bangkok } from '@/Configuration/​MapCoordinates'

const EventDetailMapView: React.FC = () => {
	const {
		themeMode,
		data,
		locationData,
		canViewSimulation,
		eventTypesOptions,
		locationOptions,
		distanceOptions,
		eventSubTypesOptions,
		filter,
		onNavigateToEvent,
		onChangeFilter,
		onViewSimulation,
		confirmFilter,
		clearFilter,
	} = useViewModel()

	return (
		<React.Fragment>
			<div className="d-none d-sm-block col-12">
				<Filter
					locationOptions={locationOptions}
					distanceOccuredOptions={distanceOptions}
					filter={filter}
					onChangeFilter={onChangeFilter}
					confirmFilter={confirmFilter}
					clearFilter={clearFilter}
				/>

				<div className="card h-900px shadow overflow-hidden border-zeroloss-grey-300">
					<div className="card-header px-5">
						<div className="card-title fw-bold w-100 w-lg-auto flex-column flex-lg-row align-items-lg-center">
							{/* <div className="d-none d-lg-block">ตัวกรอง:</div> */}
						</div>
						<div className="card-toolbar">
							{canViewSimulation && (
								<button
									type="button"
									className="btn btn-sm w-100 w-lg-auto white-button me-4"
									onClick={onViewSimulation}
									style={{ height: 44 }}>
									แบบจำลองการแพร่ของมลพิษ
								</button>
							)}
							<button
								type="button"
								className="btn btn-sm w-100 w-lg-auto white-button me-4"
								onClick={onNavigateToEvent}
								style={{ height: 44 }}>
								<KTSVG
									className="svg-icon-3 me-1"
									path={
										themeMode === 'light'
											? 'media/icons/zeroloss/arrow-right.svg'
											: 'media/icons/zeroloss/white-arrow-right.svg'
									}
								/>
								นำทาง
							</button>
							<button
								type="button"
								id="kt_event_detail_filter_toggle"
								className={clsx('btn btn-sm w-100 w-lg-auto', {
									'white-button': themeMode === 'light',
									'btn-zeroloss-base-grey-carbon border-zeroloss-base-white border-1px':
										themeMode === 'dark',
								})}
								style={{ height: '44px' }}>
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
					<div className="card-body p-0 position-relative event-detail-map-container">
						<InfoBoard data={eventTypesOptions} />

						{data?.latitude && data?.longitude && (
							<MapContainer
								center={{
									lat: data?.latitude ?? Bangkok.lat,
									lng: data?.longitude ?? Bangkok.lng,
								}}
								zoom={14}>
								<TileLayer
									attribution="@Copyright 2024 Zeroloss"
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								/>

								<EventWithStatus
									title={data?.title ?? ''}
									detail={data?.detail ?? ''}
									img={data?.eventPictureCover}
									type="error"
									position={{
										lat: data.latitude,
										lng: data.longitude,
									}}
									popup={EventPopup}
									eventTypeId={data?.eventTypeId ?? ''}
									eventSubTypeTitle={
										eventSubTypesOptions.find(d => d.value === data?.eventSubTypeId)?.label ?? ''
									}
									eventType={data?.eventType ?? ''}
									hideViewMore
									showNavigate
								/>

								{locationData.map((l, idx) => (
									<PlainLocation
										key={`location-${idx}`}
										{...l}
										latitude={l?.latitude ?? 0}
										longitude={l?.longitude ?? 0}
										popup={LocationPopup}
									/>
								))}

								{/* <LocationPolygon type={data.shapeType} position={[data.position]} radius={1500} /> */}
							</MapContainer>
						)}
					</div>
				</div>
			</div>

			<PhoneRotateCaution />

			<style>{`
				.leaflet-container {
					height: 100% !important;
				}
			`}</style>
		</React.Fragment>
	)
}

export default EventDetailMapView
