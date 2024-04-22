import React from 'react'

import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
import ReactDatePicker from 'react-datepicker'
import Select, { components } from 'react-select'

import useViewModel from './ViewModel'
import clsx from 'clsx'

const EventDetailDefaultView: React.FC = () => {
	const { themeMode, data, eventTypesOptions } = useViewModel()

	return (
		<React.Fragment>
			<div className="row gy-5">
				{/* Event Occurred Date */}
				<div className="col-12">
					<label className={`form-label d-flex flex-row`} data-testid="form-input-label-component">
						<div className="d-flex flex-column">
							<span>วันและเวลาที่เกิดเหตุ</span>
						</div>
					</label>
					<ReactDatePicker
						showTimeInput
						showTimeSelect
						wrapperClassName="w-100"
						className={clsx('form-control form-control-sm', {
							'bg-zeroloss-base-white': themeMode === 'light',
							'bg-zeroloss-base-dark': themeMode === 'dark',
						})}
						timeFormat="HH:mm"
						dateFormat="dd/MM/yyyy HH:mm"
						selected={data.eventOccuredAt}
						onChange={() => {
							// onChangeFormState('eventOccuredAt', date)
						}}
					/>
				</div>

				{/* Event Type */}
				<div className="col-12">
					<label className={`form-label d-flex flex-row`} data-testid="form-input-label-component">
						<div className="d-flex flex-column">
							<span>ประเภทเหตุการณ์</span>
						</div>
					</label>
					<Select
						placeholder="เลือกประเภทเหตุการณ์"
						noOptionsMessage={() => 'ไม่พบข้อมูล'}
						className="w-100 shadow-sm"
						options={eventTypesOptions}
						value={eventTypesOptions.find(option => option.value === data.eventType) ?? null}
						styles={{
							container: styles => ({
								...styles,
								marginTop: '-2px',
							}),
							control: styles => ({
								...styles,
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
								<components.NoOptionsMessage {...props} className="cursor-pointer fs-7 fw-normal">
									ไม่พบข้อมูล
								</components.NoOptionsMessage>
							),
						}}
					/>
				</div>

				{/* Name */}
				<div className="col-12">
					<FormGenerator
						formKey="name"
						inputType="plain"
						label="ชื่อเหตุการณ์"
						additionalClassName="form-control-sm"
						value={data.eventTitle}
					/>
				</div>

				{/* Description */}
				<div className="col-12">
					<FormGenerator
						formKey="description"
						inputType="textarea"
						label="บรรยายเหตุการณ์"
						value={data.detail}
					/>
				</div>

				<div className="col-12">
					<hr />
				</div>

				{/* Danger Level */}
				<div className="col-12">
					<label className={`form-label d-flex flex-row`} data-testid="form-input-label-component">
						<div className="d-flex flex-column">
							<span>ระดับความรุนแรงเหตุการณ์</span>
						</div>
					</label>
					<Select
						placeholder="เลือกระดับความรุนแรงเหตุการณ์"
						noOptionsMessage={() => 'ไม่พบข้อมูล'}
						className="w-100 shadow-sm"
						components={{
							IndicatorSeparator: () => null,
						}}
					/>
				</div>

				{/* Pollution */}
				<div className="col-12">
					<label className={`form-label d-flex flex-row`} data-testid="form-input-label-component">
						<div className="d-flex flex-column">
							<span>มลพิษ</span>
						</div>
					</label>
					<Select
						isMulti
						placeholder=""
						noOptionsMessage={() => 'ไม่พบข้อมูล'}
						className="w-100 shadow-sm"
						components={{
							IndicatorSeparator: () => null,
							Menu: () => null,
						}}
						options={(data?.pollution ?? []).map((d: any) => ({
							label: d.title,
							value: d.title,
						}))}
						value={(data?.pollution ?? []).map((d: any) => ({
							label: d.title,
							value: d.title,
						}))}
					/>
				</div>
			</div>
		</React.Fragment>
	)
}

export default EventDetailDefaultView
