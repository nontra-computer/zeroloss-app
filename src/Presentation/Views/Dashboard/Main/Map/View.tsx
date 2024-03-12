import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { KTSVG } from '@/_metronic/helpers'
import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
import LocationWithStatus from '@/Presentation/Components/LeafletMap/LocationWithStatus'
import IncidentPopup from '@/Presentation/Components/LeafletMap/IncidentPopup'
import WindDirection from '@/Presentation/Components/LeafletMap/WindDirection'
import WindPopup from '@/Presentation/Components/LeafletMap/WindPopup'
import InfoBoard from '../../Components/InfoBoard/View'
import Alert from '../../Components/Alert/View'
import NewsHorizontal from '@/Presentation/Components/News/NewsHorizontal'
import Select from 'react-select'
import Filter from './Components/Filter'
import useViewModel from './ViewModel'
import clsx from 'clsx'

const MainDashboardMapView: React.FC = () => {
	const { themeMode, data, type, onTypeChange, TYPE_OPTIONS } = useViewModel()

	return (
		<React.Fragment>
			<Filter />

			<div className="row gy-5">
				{/* Header */}
				<div className="col-12">
					<div className="d-flex flex-row justify-content-between align-items-center">
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
							className="d-flex flex-row justify-content-between align-items-end"
							style={{ gap: '12px' }}>
							<FormGenerator
								formKey="search"
								inputType="plain"
								containerClassName="w-400px d-inline-block"
								additionalClassName="shadow-sm"
								placeholder="ค้นหาสถานที่/เหตุการณ์"
								label="ค้นหาเหตุการณ์"
							/>
							<div>
								<label className="form-label">ประเภทเหตุการณ์</label>
								<Select
									placeholder="เลือกประเภทเหตุการณ์"
									noOptionsMessage={() => 'ไม่พบข้อมูล'}
									className="shadow-sm"
									styles={{
										container: styles => ({
											...styles,
											width: '200px',
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
							<div>
								<label className="form-label">รูปแบบการมองเห็น</label>
								<Select
									placeholder="เลือกรูปแบบการมองเห็น"
									noOptionsMessage={() => 'ไม่พบข้อมูล'}
									options={TYPE_OPTIONS}
									value={TYPE_OPTIONS.find(option => option.value === type) ?? ''}
									onChange={option => {
										// @ts-ignore
										if (option?.value) onTypeChange(option?.value ?? 'all')
									}}
									className="shadow-sm"
									styles={{
										container: styles => ({
											...styles,
											width: '200px',
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
								className={clsx('btn btn-sm', {
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
				</div>

				{/* Table */}
				<div className="col-12">
					<div className="card">
						<div className="card-header">
							<div className="card-title fw-bold">
								Current Filter:
								<span className="ms-3 fw-normal">None</span>
							</div>
						</div>

						<div className="card-body pe-0">
							<div className="row gy-5 gx-0">
								<div className="col-12 col-lg-8">
									<h3>&nbsp;</h3>
									<div className="card h-800px">
										<div className="card-body p-0 position-relative">
											{(type === 'all' || type === 'simulation') && (
												<React.Fragment>
													<Alert />
												</React.Fragment>
											)}

											{type === 'measurement' && <React.Fragment></React.Fragment>}

											<Select
												placeholder="เลือกสถานที่"
												noOptionsMessage={() => 'ไม่พบข้อมูล'}
												className="position-absolute"
												styles={{
													container: styles => ({
														...styles,
														width: '200px',
														height: '44px',
														left: '5%',
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
											/>
											<InfoBoard />
											<MapContainer
												center={{
													lat: 13.7563,
													lng: 100.5018,
												}}
												zoom={13}>
												<TileLayer
													attribution="@Copyright 2024 Zeroloss"
													url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
												/>

												{data.map((d, index) => (
													<React.Fragment key={`map-data-${index}`}>
														{type === 'all' && <LocationWithStatus {...d} popup={IncidentPopup} />}
														{type === 'wind-direction' && (
															<WindDirection {...d} popup={WindPopup} />
														)}
													</React.Fragment>
												))}
											</MapContainer>
										</div>
									</div>
								</div>

								<div className="col-12 col-lg-4">
									<h3 className="mx-auto" style={{ width: '95%' }}>
										เหตุการณ์ที่เกี่ยวข้อง
									</h3>
									<div className="main-dashboard-news-container h-800px overflow-y-scroll ps-0">
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
								</div>
							</div>
						</div>
					</div>
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
