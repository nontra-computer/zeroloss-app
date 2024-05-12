import React from 'react'
// import { KTSVG } from '@/_metronic/helpers'
import { MapContainer, TileLayer } from 'react-leaflet'
// import Filter from '@/Presentation/Views/Events/Overview/Components/Filter'
import PlainLocation from '@/Presentation/Components/LeafletMap/PlainLocation'
import LocationPolygon from '@/Presentation/Components/LeafletMap/LocationPolygon'
import PhoneRotateCaution from '@/Presentation/Components/PhoneRotateCaution/View'
import InfoBoard from '@/Presentation/Components/InfoBoard'
import LocationPopup from '@/Presentation/Views/Events/Detail/Components/LocationPopup'

import useViewModel from './ViewModel'
// import clsx from 'clsx'

const EventDetailMapView: React.FC = () => {
	const {
		// themeMode,
		data,
		locationData,
		eventTypesOptions,
		// locationOptions,
		// distanceOptions,
		// filter,
		// onChangeFilter,
		// confirmFilter,
		// clearFilter,
	} = useViewModel()

	return (
		<React.Fragment>
			<div className="d-none d-sm-block col-12">
				{/* <Filter
				locationOptions={locationOptions}
				distanceOccuredOptions={distanceOptions}
				filter={filter}
				onChangeFilter={onChangeFilter}
				confirmFilter={confirmFilter}
				clearFilter={clearFilter}
				/> */}

				<div className="card h-500px shadow overflow-hidden border-zeroloss-grey-300">
					{/* <div className="card-header px-5">
						<div className="card-title fw-bold w-100 w-lg-auto flex-column flex-lg-row align-items-lg-center">
							<div className="d-none d-lg-block">ตัวกรอง:</div>
						</div>
						<div className="card-toolbar">
							<button
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
					</div> */}

					<div className="card-body p-0 position-relative event-detail-map-container">
						<InfoBoard data={eventTypesOptions} />

						<MapContainer
							center={{
								lat: data.position.lat,
								lng: data.position.lng,
							}}
							zoom={14}>
							<TileLayer
								attribution="@Copyright 2024 Zeroloss"
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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

							<LocationPolygon type={data.shapeType} position={[data.position]} radius={1500} />
						</MapContainer>
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
