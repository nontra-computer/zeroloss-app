import React, { useEffect } from 'react'
import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
import Select, { components } from 'react-select'
import { DrawerComponent } from '@/_metronic/assets/ts/components'
import { KTSVG } from '@/_metronic/helpers'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import clsx from 'clsx'

interface Props {
	eventTypeOptions: any[]
	measurementTypeOptions: any[]
	measurementIsOverStdOptions: any[]
	measurementStatusOptions: any[]
	filter: any
	searchText: string
	setSearchText: (value: string) => void
	onChangeFilter: (key: string, value: any) => void
	confirmFilter: () => void
	clearFilter: () => void
}

const Filter: React.FC<Props> = ({
	searchText,
	setSearchText,
	filter,
	onChangeFilter,
	confirmFilter,
	clearFilter,
	eventTypeOptions,
	measurementTypeOptions,
	measurementIsOverStdOptions,
	measurementStatusOptions,
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
			id="kt_main_dashboard_map_filter"
			className="bg-body"
			data-kt-drawer="true"
			data-kt-drawer-name="chat"
			data-kt-drawer-activate="true"
			data-kt-drawer-overlay="true"
			data-kt-drawer-width="{default:'300px', 'md': '500px'}"
			data-kt-drawer-direction="end"
			data-kt-drawer-toggle="#kt_main_dashboard_map_filter_toggle"
			data-kt-drawer-close="#kt_main_dashboard_map_filter_close"
			style={{ zIndex: 9999 }}>
			<div className="card w-100 rounded-0" style={{ zIndex: 9999 }}>
				<div className="card-header pe-5">
					<div className="card-title">
						{/* begin:: Title */}
						<div className="d-flex justify-content-center flex-column me-3">
							<span className="fs-4 fw-bolder text-zeroloss-grey-900 text-hover-primary me-1 mb-2 lh-1">
								ตัวกรองเหตุการณ์
							</span>
						</div>
						{/* end:: Title */}
					</div>

					<div className="card-toolbar">
						{/* begin:: Close Button */}
						<button
							className="btn btn-sm btn-bg-white btn-active-light-danger text-center"
							id="kt_main_dashboard_map_filter_close">
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
									containerClassName="w-100 d-inline-block"
									additionalClassName="shadow-sm"
									placeholder="ค้นหาสถานที่/เหตุการณ์"
									label="ค้นหาเหตุการณ์"
									value={searchText}
									onChange={e => setSearchText(e.target.value)}
								/>
							</div>
							{/* END:: Search Text */}

							{/* BEGIN:: Event Type */}
							<div className="col-12">
								<label className="form-label">ประเภทเหตุการณ์</label>
								<Select
									isMulti
									placeholder="เลือกประเภทเหตุการณ์"
									noOptionsMessage={() => 'ไม่พบข้อมูล'}
									className="shadow-sm w-100"
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
									options={eventTypeOptions}
									value={
										eventTypeOptions.filter(option =>
											filter.type.find((item: any) => item.value === option.value)
										) ?? null
									}
									onChange={option => onChangeFilter('type', option)}
									components={{
										IndicatorSeparator: () => null,
										SingleValue: props => (
											<components.SingleValue {...props} className="cursor-pointer">
												<span
													className={clsx('me-2 bullet bullet-dot h-6px w-6px', {
														'bg-zeroloss-error': props.data.value === 1,
														'bg-zeroloss-warning': props.data.value === 2,
														'bg-zeroloss-success': props.data.value === 3,
														'bg-zeroloss-primary': props.data.value === 4,
														'bg-zeroloss-brand-600': props.data.value === 5,
														'bg-zeroloss-primary-400': props.data.value === 6,
													})}></span>
												{props.data.label}
											</components.SingleValue>
										),
										Option: props => (
											<components.Option {...props} className="cursor-pointer">
												<span
													className={clsx('me-2 bullet bullet-dot h-6px w-6px', {
														'bg-zeroloss-error': props.data.value === 1,
														'bg-zeroloss-warning': props.data.value === 2,
														'bg-zeroloss-success': props.data.value === 3,
														'bg-zeroloss-primary': props.data.value === 4,
														'bg-zeroloss-brand-600': props.data.value === 5,
														'bg-zeroloss-primary-400': props.data.value === 6,
													})}></span>
												{props.data.label}
											</components.Option>
										),
									}}
								/>
							</div>
							{/* END:: Event Type */}

							{/* BEGIN:: Measurement Type */}
							<div className="col-12">
								<label className="form-label">ประเภทตรวจวัด</label>
								<Select
									isMulti={false}
									placeholder="เลือกประเภทตรวจวัด"
									noOptionsMessage={() => 'ไม่พบข้อมูล'}
									className="shadow-sm w-100"
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
									options={measurementTypeOptions}
									value={
										measurementTypeOptions.filter(
											option => option.value === filter.measurementType
										) ?? null
									}
									onChange={option => onChangeFilter('measurementType', option.value)}
									components={{
										IndicatorSeparator: () => null,
									}}
								/>
							</div>
							{/* END:: Measurement Type */}

							{/* BEGIN:: Measurement Is Over Standard */}
							<div className="col-12">
								<label className="form-label">ระบบตรวจวัดที่มีค่าเกินมาตรฐาน</label>
								<Select
									isMulti={false}
									placeholder="เลือกระบบตรวจวัดที่มีค่าเกินมาตรฐาน"
									noOptionsMessage={() => 'ไม่พบข้อมูล'}
									className="shadow-sm w-100"
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
									options={measurementIsOverStdOptions}
									value={
										measurementIsOverStdOptions.filter(
											option => option.value === filter.measurementIsOverStd
										) ?? null
									}
									onChange={option => onChangeFilter('measurementIsOverStd', option.value)}
									components={{
										IndicatorSeparator: () => null,
									}}
								/>
							</div>
							{/* END:: Measurement Is Over Standard */}

							{/* BEGIN:: Measurement Status */}
							<div className="col-12">
								<label className="form-label">การเชื่อมโยงข้อมูลของระบบตรวจวัด</label>
								<Select
									isMulti={false}
									placeholder="เลือกการเชื่อมโยงข้อมูลของระบบตรวจวัด"
									noOptionsMessage={() => 'ไม่พบข้อมูล'}
									className="shadow-sm w-100"
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
									options={measurementStatusOptions}
									value={
										measurementStatusOptions.filter(
											option => option.value === filter.measurementStatus
										) ?? null
									}
									onChange={option => onChangeFilter('measurementStatus', option.value)}
									components={{
										IndicatorSeparator: () => null,
									}}
								/>
							</div>
							{/* END:: Measurement Status */}

							{/* BEGIN:: Call to Action */}
							<div className="col-12 d-flex flex-row">
								<button
									id="kt_main_dashboard_map_filter_close"
									className="btn btn-sm btn-zeroloss-primary-500 text-zeroloss-base-white me-4 w-50 fw-bold"
									onClick={confirmFilter}>
									ค้นหา
								</button>
								<button
									id="kt_main_dashboard_map_filter_close"
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

export default Filter
