import React, { useEffect } from 'react'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { KTSVG } from '@/_metronic/helpers'
import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
import Select, { components } from 'react-select'
import { DrawerComponent } from '@/_metronic/assets/ts/components'
import clsx from 'clsx'

interface Props {
	filter: any
	onChangeFilter: (key: string, value: any) => void
	eventTypeOptions: any[]
	eventStatusOptions: any[]
	confirmFilter: () => void
	clearFilter: () => void
}

const Filter: React.FC<Props> = ({
	filter,
	onChangeFilter,
	eventTypeOptions,
	eventStatusOptions,
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
			id="kt_events_list_filter"
			className="bg-body"
			data-kt-drawer="true"
			data-kt-drawer-name="chat"
			data-kt-drawer-activate="true"
			data-kt-drawer-overlay="true"
			data-kt-drawer-width="{default:'300px', 'md': '500px'}"
			data-kt-drawer-direction="end"
			data-kt-drawer-toggle="#kt_events_list_filter_toggle"
			data-kt-drawer-close="#kt_events_list_filter_close"
			style={{ zIndex: 9999 }}>
			<div className="card w-100 rounded-0" style={{ zIndex: 9999 }}>
				<div className="card-header pe-5">
					<div className="card-title">
						{/* begin:: Title */}
						<div className="d-flex justify-content-center flex-column me-3">
							<span className="fs-4 fw-bolder text-zeroloss-grey-900 text-hover-primary me-1 mb-2 lh-1">
								ตัวกรอง
							</span>
						</div>
						{/* end:: Title */}
					</div>

					<div className="card-toolbar">
						{/* begin:: Close Button */}
						<button
							className="btn btn-sm btn-bg-white btn-active-light-danger text-center"
							id="kt_events_list_filter_close">
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
									label="ค้นหาด้วยคำค้น"
									placeholder="ค้นหาด้วยรายละเอียเหตุการณ์, สถานที่เกิดเหตุ"
									additionalClassName="fs-7 bg-zeroloss-base-white"
									// value={filter.contract_code}
									// onChange={e => onChangeFilter('contract_code', e.target.value)}
								/>
							</div>
							{/* END:: Search Text */}

							{/* BEGIN:: Event Type */}
							<div className="col-12">
								<label className="form-label">ประเภทเหตุการณ์หลัก</label>
								<Select
									placeholder="เลือกประเภทเหตุการณ์"
									noOptionsMessage={() => 'ไม่พบข้อมูล'}
									className="w-100 shadow-sm"
									options={eventTypeOptions}
									value={
										eventTypeOptions.find(option => option.value === filter.eventTypeId) ?? null
									}
									onChange={option => onChangeFilter('eventTypeId', option?.value)}
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
										SingleValue: props => (
											<components.SingleValue {...props} className="cursor-pointer fs-7 fw-normal">
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
											<components.Option {...props} className="cursor-pointer fs-7 fw-normal">
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
										Placeholder: props => (
											<components.Placeholder {...props} className="cursor-pointer fs-7 fw-normal">
												เลือกประเภทเหตุการณ์
											</components.Placeholder>
										),
										NoOptionsMessage: props => (
											<components.NoOptionsMessage
												{...props}
												className="cursor-pointer fs-7 fw-normal">
												ไม่พบข้อมูล
											</components.NoOptionsMessage>
										),
									}}
								/>
							</div>
							{/* END:: Event Type */}

							{/* BEGIN:: Event Sub Type */}
							<div className="col-12">
								<label className="form-label">ประเภทเหตุการณ์ย่อย</label>
								<Select
									placeholder="เลือกประเภทเหตุการณ์"
									noOptionsMessage={() => 'ไม่พบข้อมูล'}
									className="w-100 shadow-sm"
									options={eventTypeOptions}
									// value={
									// 	eventTypeOptions.find(option => option.value === filter.eventTypeId) ?? null
									// }
									// onChange={option => onChangeFilter('eventTypeId', option?.value)}
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
										SingleValue: props => (
											<components.SingleValue {...props} className="cursor-pointer fs-7 fw-normal">
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
											<components.Option {...props} className="cursor-pointer fs-7 fw-normal">
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
										Placeholder: props => (
											<components.Placeholder {...props} className="cursor-pointer fs-7 fw-normal">
												เลือกประเภทเหตุการณ์
											</components.Placeholder>
										),
										NoOptionsMessage: props => (
											<components.NoOptionsMessage
												{...props}
												className="cursor-pointer fs-7 fw-normal">
												ไม่พบข้อมูล
											</components.NoOptionsMessage>
										),
									}}
								/>
							</div>
							{/* END:: Event Sub Type */}

							{/* BEGIN:: Event Status */}
							<div className="col-12">
								<label className="form-label">สถานะเหตุการณ์</label>
								<Select
									placeholder="เลือกสถานะเหตุการณ์"
									options={eventStatusOptions}
									value={eventTypeOptions.find(option => option.value === filter.state) ?? null}
									onChange={option => onChangeFilter('state', option?.value)}
									noOptionsMessage={() => 'ไม่พบข้อมูล'}
									className="w-100 shadow-sm"
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

										Placeholder: props => (
											<components.Placeholder {...props} className="cursor-pointer fs-7 fw-normal">
												เลือกสถานะเหตุการณ์
											</components.Placeholder>
										),
										NoOptionsMessage: props => (
											<components.NoOptionsMessage
												{...props}
												className="cursor-pointer fs-7 fw-normal">
												ไม่พบข้อมูล
											</components.NoOptionsMessage>
										),
									}}
								/>
							</div>
							{/* END:: Event Status */}

							{/* BEGIN:: Call to Action */}
							<div className="col-12 d-flex flex-row">
								<button
									id="kt_events_list_filter_close"
									className="btn btn-sm btn-zeroloss-primary-500 text-zeroloss-base-white me-4 w-50 fw-bold"
									onClick={confirmFilter}>
									ค้นหา
								</button>
								<button
									id="kt_events_list_filter_close"
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
