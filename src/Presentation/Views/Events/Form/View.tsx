import React from 'react'
import { PageTitle } from '@/_metronic/layout/core'

import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
import EventFormStepper from './Stepper/View'
import ReactDatePicker from 'react-datepicker'
import Select, { components } from 'react-select'
import { KTSVG } from '@/_metronic/helpers'
import LocationSelection from './LocationSelection/View'

import useViewModel from './ViewModel'
import clsx from 'clsx'

const EventFormView: React.FC = () => {
	const {
		isCreate,
		timeStr,
		themeMode,
		title,
		eventTypesOptions,
		formState,
		onChangeFormState,
		onOpenLocationSelection,
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
				{title}
			</PageTitle>

			<LocationSelection />

			<div className="row">
				<div className="col-12 px-0">
					<div
						className={clsx(
							'px-10 d-flex flex-column flex-lg-row justify-content-end align-items-end position-relative'
							// {
							// 	'create-event-header-bg': isCreate,
							// }
						)}
						style={{ gap: '12px' }}>
						{/* Background Image */}
						{/* <img
							src="/media/icons/zeroloss/soft-grey-image-plus.svg"
							className={clsx('position-absolute pointer-events-none', {
								'd-none': !isCreate,
							})}
							style={{ left: '43%', top: '25%' }}
							alt="Create Event Header Background"
						/> */}

						{/* Header */}
						{/* <div>
							<div className="fs-2x fs-lg-4x text-zeroloss-base-white fw-bold">
								{isCreate ? 'สร้างเหตุการณ์ใหม่' : 'รายละเอียดเหตุการณ์'}
							</div>
							<p className="text-zeroloss-grey-25 fs-3">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulputate eu
								scelerisque felis. Sed id semper risus in
							</p>
						</div> */}

						{/* Call to Action */}
						{!isCreate && (
							<div className="text-end">
								<button className="btn white-button fw-bold w-100 w-lg-auto">
									<span>ยกเลิก</span>
								</button>
							</div>
						)}
						<div className="text-end">
							<button className="btn btn-zeroloss-primary text-zeroloss-base-white fw-bold w-100 w-lg-auto">
								<img
									className="me-1"
									src="/media/icons/zeroloss/white-save-01.svg"
									alt="White Save Icon"
								/>
								<span>บันทึกเหตุการณ์</span>
							</button>
						</div>
					</div>
				</div>

				<div className="col-12 p-10">
					<div className="row">
						<div className="d-none d-lg-block col-12 col-lg-3">
							<div className="mb-10">
								<div className="fs-2 fw-bold text-zeroloss-grey-900">สถานะเหตุการณ์ล่าสุด</div>
								<p className="fs-4 text-zeroloss-grey-500">ความคืบหน้าของเหตุการณ์</p>
								<hr />
							</div>

							<EventFormStepper />
						</div>

						<div className="col-12 col-lg-9">
							<div className="card">
								<div className="card-header bg-zeroloss-soft-blue">
									<div className="card-title text-zeroloss-primary fw-bolder">
										รายละเอียดเหตุการณ์
									</div>
								</div>
								<div className="card-body">
									<div className="row gy-5">
										{/* Inform Date */}
										<div className="col-12 col-lg-8">
											<label
												className={`form-label d-flex flex-row`}
												data-testid="form-input-label-component">
												<div className="d-flex flex-column">
													<span>
														วันและเวลาที่แจ้งเหตุ
														<span className="required" />
													</span>
												</div>
											</label>
											<ReactDatePicker
												disabled={isCreate ? true : false}
												showTimeInput
												showTimeSelect
												wrapperClassName="w-100"
												className="form-control form-control-sm"
												timeFormat="HH:mm"
												dateFormat="dd/MM/yyyy HH:mm"
												selected={formState.createdAt}
												onChange={date => {
													onChangeFormState('createdAt', date)
												}}
											/>
										</div>

										{/* Event Occurred Date */}
										<div className="col-12 col-lg-8">
											<label
												className={`form-label d-flex flex-row`}
												data-testid="form-input-label-component">
												<div className="d-flex flex-column">
													<span>
														วันและเวลาที่เกิดเหตุ
														<span className="required" />
													</span>
												</div>
											</label>
											<ReactDatePicker
												showTimeInput
												showTimeSelect
												wrapperClassName="w-100"
												className="form-control form-control-sm"
												timeFormat="HH:mm"
												dateFormat="dd/MM/yyyy HH:mm"
												selected={formState.eventOccuredAt}
												onChange={date => {
													onChangeFormState('eventOccuredAt', date)
												}}
											/>
										</div>

										{/* Event Type */}
										<div className="col-12 col-lg-8">
											<label
												className={`form-label d-flex flex-row`}
												data-testid="form-input-label-component">
												<div className="d-flex flex-column">
													<span>
														ประเภทเหตุการณ์
														<span className="required" />
													</span>
												</div>
											</label>
											<Select
												placeholder="เลือกประเภทเหตุการณ์"
												noOptionsMessage={() => 'ไม่พบข้อมูล'}
												className="w-100 shadow-sm"
												options={eventTypesOptions}
												value={
													eventTypesOptions.find(option => option.value === formState.eventType) ??
													null
												}
												onChange={option => onChangeFormState('eventType', option?.value)}
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
														<components.SingleValue
															{...props}
															className="cursor-pointer fs-7 fw-normal">
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
														<components.Placeholder
															{...props}
															className="cursor-pointer fs-7 fw-normal">
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

										{/* Name */}
										{/* <div className="col-12 col-lg-8">
											<FormGenerator
												formKey="name"
												inputType="plain"
												label="ชื่อเหตุการณ์"
												additionalLabel="ชื่อเหตุการณ์จะถูกนำไปใช้ในหลายตำแหน่ง"
												additionalClassName="form-control-sm"
											/>
										</div> */}

										{/* Description */}
										<div className="col-12 col-lg-8">
											<FormGenerator
												formKey="description"
												inputType="textarea"
												label="บรรยายเหตุการณ์"
												additionalLabelCom={
													<span className="ms-1 text-zeroloss-grey-500">(ไม่จำเป็น)</span>
												}
												limitCharacter={50}
												value={formState.detail}
												onChange={e => onChangeFormState('detail', e.target.value)}
											/>
										</div>

										<div className="col-12">
											<hr />
										</div>

										{/* Image */}
										<div className="col-12 col-lg-8">
											<div
												className="w-100 rounded bg-kumopack-base-white border mb-5 text-center shadow d-flex align-items-center justify-content-center position-relative"
												style={{ height: '320px' }}>
												{formState.featurePicture && (
													<div
														className="btn btn-sm btn-icon btn-danger btn-active-light-danger position-absolute"
														style={{ top: -10, right: -10 }}
														onClick={() => onChangeFormState('featurePicture', null)}>
														<KTSVG
															className="svg-icon-1"
															path="media/icons/duotune/general/gen027.svg"
														/>
													</div>
												)}
												{formState.featurePicture && (
													<img
														className="mx-auto h-100 w-100 rounded"
														src={
															typeof formState.featurePicture !== 'string'
																? URL.createObjectURL(formState.featurePicture as any)
																: formState.featurePicture
														}
														onError={(e: any) => {
															e.target.onerror = null
															e.target.src = '/media/icons/kumopack/default-placeholder.png'
														}}
														alt="Factory Cover"
														style={{
															userSelect: 'none',
															pointerEvents: 'none',
															objectFit: 'cover',
														}}
													/>
												)}
												{!formState.featurePicture && (
													<div className="fw-bold fs-5 text-kumopack-grey-300 py-10">
														No Files Uploaded
													</div>
												)}
											</div>
											<FormGenerator
												formKey="image"
												inputType="drag-and-drop"
												label="รูปภาพปกเหตุการณ์"
												additionalLabelCom={
													<span className="ms-1 text-zeroloss-grey-500">(ไม่จำเป็น)</span>
												}
												multiple={false}
												accept="image/*"
												onFileUpload={coverFiles =>
													onChangeFormState('featurePicture', coverFiles[0])
												}
											/>
										</div>

										<div className="col-12 col-lg-8">
											<label
												className={`form-label d-flex flex-row`}
												data-testid="form-input-label-component">
												<div className="d-flex flex-column">
													<span>
														พิกัดเกิดเหตุ <span className="required"></span>
													</span>
												</div>
											</label>

											<FormGenerator
												formKey="longitude"
												value={`${formState.latitude ?? ''}, ${formState.longitude ?? ''}`}
												inputType="plain"
												additionalLabelCom={<span className="required" />}
												additionalComInput={
													<button
														className="mt-5 btn btn-sm btn-zeroloss-primary text-zeroloss-base-white"
														onClick={onOpenLocationSelection}>
														คลิกเพื่อเลือกจากแผนที่
													</button>
												}
												placeholder="100.5018"
												containerClassName="mb-5"
												disabled
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<style>{`
				.create-event-header-bg {
					background: linear-gradient(85.81deg, rgba(0, 0, 0, 0.7) 15.45%, rgba(0, 0, 0, 0) 96.00%);
				}
			`}</style>
		</React.Fragment>
	)
}

export default EventFormView
