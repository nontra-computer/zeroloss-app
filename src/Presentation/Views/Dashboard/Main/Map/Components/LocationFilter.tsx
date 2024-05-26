import React, { useEffect } from 'react'
import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
import Select from 'react-select'
import { DrawerComponent } from '@/_metronic/assets/ts/components'
import { KTSVG } from '@/_metronic/helpers'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'

interface Props {
	locationOptions: any[]
	distanceOccuredOptions: any[]
	filter: any
	onChangeFilter: (key: string, value: any) => void
	confirmFilter: () => void
	clearFilter: () => void
}

const LocationFilter: React.FC<Props> = ({
	filter,
	onChangeFilter,
	locationOptions,
	// distanceOccuredOptions,
	confirmFilter,
	clearFilter,
}) => {
	const { mode } = useThemeMode()
	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	useEffect(() => {
		DrawerComponent.reinitialization()
	}, [])

	return (
		<div
			id="kt_main_dashboard_map_location_filter"
			className="bg-body"
			data-kt-drawer="true"
			data-kt-drawer-name="chat"
			data-kt-drawer-activate="true"
			data-kt-drawer-overlay="true"
			data-kt-drawer-width="{default:'300px', 'md': '500px'}"
			data-kt-drawer-direction="end"
			data-kt-drawer-toggle="#kt_main_dashboard_map_location_filter_toggle"
			data-kt-drawer-close="#kt_main_dashboard_map_location_filter_close"
			style={{ zIndex: 9999 }}>
			<div className="card w-100 rounded-0" style={{ zIndex: 9999 }}>
				<div className="card-header pe-5">
					<div className="card-title">
						{/* begin:: Title */}
						<div className="d-flex justify-content-center flex-column me-3">
							<span className="fs-4 fw-bolder text-zeroloss-grey-900 text-hover-primary me-1 mb-2 lh-1">
								ค้นหาสถานที่เพิ่มเติม
							</span>
						</div>
						{/* end:: Title */}
					</div>

					<div className="card-toolbar">
						{/* begin:: Close Button */}
						<button
							className="btn btn-sm btn-bg-white btn-active-light-danger text-center"
							id="kt_main_dashboard_map_location_filter_close">
							<KTSVG
								path="media/icons/duotune/arrows/arr015.svg"
								className="svg-icon svg-icon-2x mx-auto"
							/>
						</button>
						{/* end:: Close Button */}
					</div>
				</div>

				<div className="card-body">
					<div
						data-kt-element="messages"
						data-kt-scroll="true"
						data-kt-scroll-activate="{default: false, lg: true}"
						data-kt-scroll-max-height="auto"
						data-kt-scroll-offset="5px">
						<div className="row gy-5">
							{/* BEGIN:: Search Text */}
							<div className="col-12">
								<FormGenerator
									formKey="search"
									inputType="plain"
									label="ค้นหาด้วยชื่อสถานที่"
									placeholder=""
									additionalClassName="fs-7 bg-zeroloss-base-white"
									value={filter.locationName}
									onChange={e => onChangeFilter('locationName', e.target.value)}
								/>
							</div>
							{/* END:: Search Text */}

							{/* BEGIN:: Location Type */}
							<div className="col-12">
								<label className="form-label">ประเภทสถานที่</label>
								<Select
									placeholder="เลือกประเภทสถานที่"
									noOptionsMessage={() => 'ไม่พบข้อมูล'}
									className="w-100 shadow-sm"
									options={locationOptions}
									value={
										locationOptions.find(option => option.value === filter.locationTypeId) ?? null
									}
									onChange={option => onChangeFilter('locationTypeId', option?.value)}
									styles={{
										container: styles => ({
											...styles,
											height: '44px',
											marginTop: '-2px',
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
							{/* END:: Location Type */}

							{/* BEGIN:: Distance from Event */}
							{/* <div className="col-12">
								<label className="form-label">ระยะห่างจากจุดเกิดเหตุ</label>
								<Select
									placeholder="เลือกระยะห่างจากจุดเกิดเหตุ"
									noOptionsMessage={() => 'ไม่พบข้อมูล'}
									className="w-100 shadow-sm"
									options={distanceOccuredOptions}
									components={{
										IndicatorSeparator: () => null,
									}}
									styles={{
										container: styles => ({
											...styles,
											height: '44px',
											marginTop: '-2px',
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
								/>
							</div> */}
							{/* END:: Distance from Event */}

							{/* BEGIN:: Call to Action */}
							<div className="col-12 d-flex flex-row">
								<button
									id="kt_main_dashboard_map_location_filter_close"
									className="btn btn-sm btn-zeroloss-primary-500 text-zeroloss-base-white me-4 w-50 fw-bold"
									onClick={confirmFilter}>
									ค้นหา
								</button>
								<button
									id="kt_main_dashboard_map_location_filter_close"
									className="btn btn-sm btn-zeroloss-grey-100 btn-zeroloss-grey-500 w-50 fw-bolder"
									onClick={clearFilter}>
									ล้างตัวกรอง
								</button>
							</div>
							{/* END:: Call to Action */}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LocationFilter
