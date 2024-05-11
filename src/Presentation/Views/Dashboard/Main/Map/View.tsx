import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { KTSVG } from '@/_metronic/helpers'
import PlainLocation from '@/Presentation/Components/LeafletMap/PlainLocation'
import LocationPopup from '@/Presentation/Views/Events/Detail/Components/LocationPopup'
import EventWithStatus from '@/Presentation/Components/LeafletMap/EventWithStatus'
import IncidentPopup from '@/Presentation/Components/LeafletMap/IncidentPopup'
import WindDirection from '@/Presentation/Components/LeafletMap/WindDirection'
import WindPopup from '@/Presentation/Components/LeafletMap/WindPopup'
import LocationPolygon from '@/Presentation/Components/LeafletMap/LocationPolygon'
import LocationMeasurementStation from '@/Presentation/Components/LeafletMap/LocationMeasurementStation'
import InfoBoard from '../../Components/InfoBoard/View'
// import Alert from '../../Components/Alert/View'
import MeasurementTable from '../../Components/MeasurementTable/View'
// import FeatureNews from '@/Presentation/Components/News/FeatureNews'
// import NewsHorizontal from '@/Presentation/Components/News/NewsHorizontal'
import PhoneRotateCaution from '@/Presentation/Components/PhoneRotateCaution/View'
import Select from 'react-select'
import Filter from './Components/Filter'
import LocationFilter from './Components/LocationFilter'
import useViewModel from './ViewModel'
import clsx from 'clsx'

const MainDashboardMapView: React.FC = () => {
	const {
		isMobile,
		themeMode,
		locationData,
		data,
		dataTypeOptions,
		locationTypeOptions,
		distanceOptions,
		type,
		onTypeChange,
		TYPE_OPTIONS,
		filter,
		preFilterState,
		displayFilter,
		searchText,
		setSearchText,
		onChangeFilter,
		onAddFilter,
		onRemoveFilter,
		confirmFilterEvent,
		clearFilterEvent,
		confirmFilterLocation,
		clearFilterLocation,
	} = useViewModel()

	return (
		<React.Fragment>
			<Filter
				searchText={searchText}
				setSearchText={setSearchText}
				eventTypeOptions={dataTypeOptions}
				filter={preFilterState}
				onChangeFilter={onAddFilter}
				confirmFilter={confirmFilterEvent}
				clearFilter={clearFilterEvent}
			/>

			<LocationFilter
				locationOptions={locationTypeOptions}
				distanceOccuredOptions={distanceOptions}
				filter={filter}
				onChangeFilter={onChangeFilter}
				confirmFilter={confirmFilterLocation}
				clearFilter={clearFilterLocation}
			/>

			<div className="row gy-5">
				{/* Header */}
				<div className="col-12">
					<div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">
						<div>
							<div
								className={clsx('fs-2 fw-bolder', {
									'text-zeroloss-grey-900': themeMode === 'light',
									'text-zeroloss-base-white': themeMode === 'dark',
								})}>
								แผนที่เหตุการณ์
							</div>
							<p
								className={clsx('fs-6', {
									'text-zeroloss-base-white': themeMode === 'dark',
									'text-zeroloss-grey-600': themeMode === 'light',
								})}>
								Keep track of vendors and their security ratings.
							</p>
						</div>

						<div
							className="w-100 w-lg-auto d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-end"
							style={{ gap: '12px' }}>
							<div className="w-100 w-lg-auto">
								<label className="form-label">รูปแบบการมองเห็น</label>
								<Select
									placeholder="เลือกรูปแบบการมองเห็น"
									noOptionsMessage={() => 'ไม่พบข้อมูล'}
									options={TYPE_OPTIONS}
									value={TYPE_OPTIONS.find(option => option.value === type) ?? null}
									onChange={option => {
										if (option?.value)
											onTypeChange(
												(option?.value ?? 'all') as
													| 'all'
													| 'wind-direction'
													| 'simulation'
													| 'measurement'
											)
									}}
									className="shadow-sm w-100 w-lg-200px"
									styles={{
										container: styles => ({
											...styles,
											height: '44px',
										}),
										control: styles => ({
											...styles,
											height: '44px',
											borderColor: themeMode === 'dark' ? '#363843' : '#dbdfe9',
											backgroundColor: themeMode === 'dark' ? '#15171c' : '#FFFFFF',
											color: themeMode === 'dark' ? '#FFFFFF' : '#000000',
										}),
										menu: styles => ({
											...styles,
											backgroundColor: themeMode === 'dark' ? '#15171c' : '#FFFFFF',
											color: themeMode === 'dark' ? '#FFFFFF' : '#000000',
											zIndex: 1000,
										}),
										input: styles => ({
											...styles,
											color: themeMode === 'dark' ? '#FFFFFF' : '#000000',
										}),
									}}
									components={{
										IndicatorSeparator: () => null,
									}}
								/>
							</div>
							<button
								id="kt_main_dashboard_map_filter_toggle"
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
							<button
								id="kt_main_dashboard_map_location_filter_toggle"
								className={clsx('btn btn-sm w-100 w-lg-auto', {
									'white-button': themeMode === 'light',
									'btn-zeroloss-base-grey-carbon border-zeroloss-base-white border-1px':
										themeMode === 'dark',
								})}
								style={{ height: '44px' }}>
								{/* <KTSVG
									className="svg-icon-3 me-1"
									path={
										themeMode === 'light'
											? 'media/icons/zeroloss/filter-lines.svg'
											: 'media/icons/zeroloss/white-filter-lines.svg'
									}
								/> */}
								ค้นหาสถานที่
							</button>
						</div>
					</div>
				</div>

				{/* Table */}
				<div className="col-12">
					<div className="card">
						<div className="card-header">
							<div className="card-title fw-bold w-100 w-lg-auto flex-column flex-lg-row align-items-lg-center">
								<div className="d-none d-lg-block">ตัวกรอง:</div>
								{(displayFilter?.search ?? []).length + (displayFilter?.type ?? []).length === 0 ? (
									<span
										className={clsx('fw-normal', {
											'ms-3': !isMobile,
											'mt-3': isMobile,
										})}>
										<span className="d-inine-block d-lg-none">ตัวกรอง: </span> ไม่มีตัวกรอง
									</span>
								) : (
									<React.Fragment>
										<div
											className="d-flex flex-column flex-lg-row align-items-center w-100 w-lg-auto ms-3"
											style={{ gap: '12px' }}>
											{(displayFilter?.search ?? []).map((item: any, index: number) => (
												<div
													key={index}
													className={clsx(
														'btn btn-sm btn-light-danger text-zeroloss-error fw-bolder d-flex',
														{
															'w-100': isMobile,
															'flex-row justify-content-between': isMobile,
														}
													)}>
													<span>{item}</span>
													<button
														className="btn-close ms-2 text-zeroloss-error"
														onClick={() => onRemoveFilter('search', item)}
													/>
												</div>
											))}
											{(displayFilter?.type ?? []).map((item: any, index: number) => (
												<div
													key={index}
													className={clsx(
														'btn btn-sm btn-light-danger text-zeroloss-error fw-bolder d-flex',
														{
															'w-100': isMobile,
															'flex-row justify-content-between': isMobile,
														}
													)}>
													<span>{item?.name}</span>
													<button
														className="btn-close ms-2 text-zeroloss-error"
														onClick={() => onRemoveFilter('type', item?.id)}
													/>
												</div>
											))}
										</div>
									</React.Fragment>
								)}
							</div>
						</div>

						<div className="card-body px-0 py-0">
							<div className="row gy-5 gx-0">
								{/* begin:: Map */}
								<div className="d-none d-sm-block col-12">
									<div className="card h-800px">
										<div className="card-body p-0 position-relative main-dashboard-map-container">
											{/* {(type === 'all' || type === 'simulation') && (
												<React.Fragment>
													<div
														className="position-absolute w-50"
														style={{ right: '1.5%', top: '2%', zIndex: 999 }}>
														
														<Alert {...{}} />
													</div>
												</React.Fragment>
											)} */}

											{type === 'measurement' && (
												<React.Fragment>
													<MeasurementTable />
												</React.Fragment>
											)}

											{/* <Select
												placeholder="เลือกสถานที่"
												noOptionsMessage={() => 'ไม่พบข้อมูล'}
												className="position-absolute"
												options={locationOptions}
												styles={{
													container: styles => ({
														...styles,
														width: '200px',
														height: '44px',
														left: isMobile || isLargeMobile ? '7%' : '5%',
														top: '1.5%',
														zIndex: 1000,
													}),
													control: styles => ({
														...styles,
														height: '44px',
														borderColor: themeMode === 'dark' ? '#363843' : '#dbdfe9',
														backgroundColor: themeMode === 'dark' ? '#15171c' : '#FFFFFF',
														color: themeMode === 'dark' ? '#FFFFFF' : '#000000',
													}),
													menu: styles => ({
														...styles,
														position: 'absolute',
														zIndex: 1000,
														backgroundColor: themeMode === 'dark' ? '#15171c' : '#FFFFFF',
														color: themeMode === 'dark' ? '#FFFFFF' : '#000000',
													}),
													input: styles => ({
														...styles,
														color: themeMode === 'dark' ? '#FFFFFF' : '#000000',
													}),
												}}
												components={{
													IndicatorSeparator: () => null,
												}}
											/> */}
											<InfoBoard data={dataTypeOptions} />
											<MapContainer
												center={{
													lat: 13.7563,
													lng: 100.5018,
												}}
												zoom={7}>
												<TileLayer
													attribution="@Copyright 2024 Zeroloss"
													url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
												/>

												{data.map((d: any, index: number) => {
													return (
														<React.Fragment key={`map-data-${index}`}>
															{type === 'all' && (
																<React.Fragment>
																	<EventWithStatus {...d} popup={IncidentPopup} />

																	{locationData.map((l, idx) => (
																		<PlainLocation
																			key={`location-${idx}`}
																			{...l}
																			latitude={l?.latitude ?? 0}
																			longitude={l?.longitude ?? 0}
																			popup={LocationPopup}
																		/>
																	))}
																</React.Fragment>
															)}
															{type === 'wind-direction' && (
																<WindDirection
																	{...d}
																	popup={WindPopup}
																	position={{
																		lat: d?.latitude ?? 0,
																		lng: d?.longitude ?? 0,
																	}}
																	degree={d?.direction ?? 0}
																/>
															)}
															{type === 'simulation' && (
																<LocationPolygon
																	type={d.shapeType}
																	position={[d.position]}
																	radius={1500}
																/>
															)}
															{type === 'measurement' && (
																<LocationMeasurementStation
																	{...d}
																	position={{
																		lat: d?.latitude ?? 0,
																		lng: d?.longitude ?? 0,
																	}}
																/>
															)}
														</React.Fragment>
													)
												})}
											</MapContainer>
										</div>
									</div>
								</div>
								{/* end:: Map */}

								{/* begin:: Mobile Caution */}
								<PhoneRotateCaution />
								{/* end:: Mobile Caution */}

								{/* <div className="col-12 col-lg-4">
									<h3 className="mx-auto" style={{ width: '95%' }}>
										เหตุการณ์ที่เกี่ยวข้อง
									</h3>
									<div className="main-dashboard-news-container h-800px overflow-y-scroll ps-0">
										{type === 'simulation' && (
											<div style={{ width: '95%' }} className="mx-auto mb-5">
												<FeatureNews />
											</div>
										)}

										{[...Array(10)].map((_, index) => (
											<div
												key={index}
												style={{ width: '95%' }}
												className={clsx('mx-auto', {
													'mb-5': index !== 9,
												})}>
												<NewsHorizontal {..._} />
											</div>
										))}
									</div>
								</div> */}
							</div>
						</div>
					</div>
					{/* end:: Map */}
				</div>
			</div>

			<style>{`
				.leaflet-container {
					height: 100% !important;
				}

				.main-dashboard-news-container {
					-ms-overflow-style: none;
					scrollbar-width: none; 
				}

				.main-dashboard-news-container::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</React.Fragment>
	)
}

export default MainDashboardMapView
