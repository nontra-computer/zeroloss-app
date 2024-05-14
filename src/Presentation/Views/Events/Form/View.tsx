import React from 'react'
import { PageTitle } from '@/_metronic/layout/core'

import TabsButtonGroup from '@/Presentation/Components/Tabs/ButtonGroup'
import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
import ReactDatePicker from 'react-datepicker'
import EventStepper from '../Components/Stepper'
import Select, { components } from 'react-select'
import { KTSVG } from '@/_metronic/helpers'
import LocationSelection from './LocationSelection/View'
import { MapContainer, TileLayer } from 'react-leaflet'
import EventWithStatus from '@/Presentation/Components/LeafletMap/EventWithStatus'
import EventPopup from '@/Presentation/Components/LeafletMap/EventPopup'
import ImageUploader1 from '@/Presentation/Components/Uploader/Images/ImageUploader1'
import { ClientSideTable } from '@/Presentation/Components/Table'
import EventMessageForm from '../MessageForm/View'

import Lightbox from 'yet-another-react-lightbox'

import useViewModel from './ViewModel'
import clsx from 'clsx'
import moment from 'moment'
import 'moment-timezone'

const EventFormView: React.FC = () => {
	const {
		availableTabs,
		selectedTabName,
		currentActiveTabIdx,
		isCreate,
		isSubmitting,
		isEditDetail,
		isEditLocation,
		isEditImages,
		isEditInformer,
		isEditReporting,
		isEditImpact,
		timeStr,
		themeMode,
		title,
		imageIdx,
		isOpenLightBox,
		eventTypesOptions,
		eventSubTypesOptions,
		eventDangerLevelOptions,
		eventPictureCover,
		eventPictures,
		steppers,
		formState,
		messages,
		pollutionState,
		pollutionOptions,
		REPORTING_TABLE_CONFIGS,
		onChangeFormState,
		onChangePollutionState,
		onOpenLocationSelection,
		onChangeEditTab,
		onAddAdditionalPicture,
		onRemoveAdditionalPicture,
		onDownloadAdditionalPicture,
		onOpenLightBox,
		onCloseLightBox,
		impactWaterResourceOptions,
		impactGroundResourceOptions,
		impactAnimalOptions,
		onCancel,
		onSubmit,
		onCreateReportingMessage,
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
			<EventMessageForm />

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

						<div className="text-end">
							<button className="btn white-button fw-bold w-100 w-lg-auto" onClick={onCancel}>
								<span>ยกเลิก</span>
							</button>
						</div>

						<div className="text-end">
							<button
								type="button"
								className="btn btn-zeroloss-primary text-zeroloss-base-white fw-bold w-100 w-lg-auto"
								disabled={isSubmitting}
								onClick={onSubmit}>
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

				<div className="col-12 px-10 pt-10" style={{ paddingBottom: '12rem' }}>
					<div className="row">
						<div className="d-none d-lg-block col-12 col-lg-3">
							<div className="mb-10">
								<div className="fs-2 fw-bold text-zeroloss-grey-900">สถานะเหตุการณ์ล่าสุด</div>
								<p className="fs-4 text-zeroloss-grey-500">ความคืบหน้าของเหตุการณ์</p>
								<hr />
							</div>

							<EventStepper steppers={steppers} />
						</div>

						<div className="col-12 col-lg-9">
							{!isCreate && (
								<div className="mb-5">
									<TabsButtonGroup
										tabNames={availableTabs}
										tabContents={[]}
										activeTab={currentActiveTabIdx}
										changeTab={onChangeEditTab}
									/>
								</div>
							)}

							{!isEditImpact && (
								<div className="card">
									<div className="card-header bg-zeroloss-soft-blue">
										<div className="card-title text-zeroloss-primary fw-bolder">
											{isCreate ? 'รายละเอียดเหตุการณ์' : selectedTabName}
										</div>
										{!isCreate && isEditReporting && (
											<div className="card-toolbar">
												<button
													className="btn btn-sm btn-zeroloss-primary text-zeroloss-base-white"
													onClick={onCreateReportingMessage}>
													<img
														className="me-1"
														src="/media/icons/zeroloss/white-plus.svg"
														alt="White Plus Icon"
													/>
													เพิ่มรายงานเหตุการณ์
												</button>
											</div>
										)}
									</div>
									<div className="card-body">
										<div className="row gy-5">
											{(isCreate ? true : isEditDetail) && (
												<React.Fragment>
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
															disabled={true}
															showTimeInput
															showTimeSelect
															wrapperClassName="w-100"
															className="form-control form-control-sm"
															timeFormat="HH:mm"
															dateFormat="dd/MM/yyyy HH:mm"
															selected={
																formState.calledTime ? moment(formState.calledTime).toDate() : null
															}
															onChange={date => {
																onChangeFormState('calledTime', date)
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
															selected={formState.start ? moment(formState.start).toDate() : null}
															onChange={date => {
																onChangeFormState('start', date)
															}}
														/>
													</div>

													{/* Event End Date */}
													{!isCreate && (
														<div className="col-12 col-lg-8">
															<label
																className={`form-label d-flex flex-row`}
																data-testid="form-input-label-component">
																<div className="d-flex flex-column">
																	<span>วันที่และเวลาเหตุการณ์สิ้นสุด</span>
																</div>
															</label>
															<ReactDatePicker
																showTimeInput
																showTimeSelect
																wrapperClassName="w-100"
																className="form-control form-control-sm"
																timeFormat="HH:mm"
																dateFormat="dd/MM/yyyy HH:mm"
																minDate={formState.start ? moment(formState.start).toDate() : null}
																selected={formState.end ? moment(formState.end).toDate() : null}
																onChange={date => {
																	onChangeFormState('end', date)
																}}
															/>
														</div>
													)}

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
																eventTypesOptions.find(
																	option => option.value === formState.eventTypeId
																) ?? null
															}
															onChange={option => onChangeFormState('eventTypeId', option?.value)}
															styles={{
																container: styles => ({
																	...styles,
																	// height: '44px',
																	marginTop: '-2px',
																}),
																control: styles => ({
																	...styles,
																	// height: '44px',
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
																	<components.Option
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

													{/* Event Sub Type */}
													<div className="col-12 col-lg-8">
														<label
															className={`form-label d-flex flex-row`}
															data-testid="form-input-label-component">
															<div className="d-flex flex-column">
																<span>
																	ประเภทเหตุการณ์ย่อย
																	<span className="required" />
																</span>
															</div>
														</label>
														<Select
															placeholder="เลือกประเภทเหตุการณ์ย่อย"
															noOptionsMessage={() => 'ไม่พบข้อมูล'}
															className="w-100 shadow-sm"
															options={eventSubTypesOptions}
															value={
																eventSubTypesOptions.find(
																	option => option.value === formState.eventSubTypeId
																) ?? null
															}
															onChange={option =>
																onChangeFormState('eventSubTypeId', option?.value)
															}
															styles={{
																container: styles => ({
																	...styles,
																	// height: '44px',
																	marginTop: '-2px',
																}),
																control: styles => ({
																	...styles,
																	// height: '44px',
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
																	<components.Placeholder
																		{...props}
																		className="cursor-pointer fs-7 fw-normal">
																		เลือกประเภทเหตุการณ์ย่อย
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
													{isEditDetail && (
														<div className="col-12 col-lg-8">
															<FormGenerator
																formKey="name"
																inputType="plain"
																label="ชื่อเหตุการณ์"
																additionalLabelCom={<span className="required"></span>}
																additionalClassName="form-control-sm"
																value={formState.title}
																onChange={e => onChangeFormState('title', e.target.value)}
																limitCharacter={50}
															/>
														</div>
													)}

													{/* Description */}
													<div className="col-12 col-lg-8">
														<FormGenerator
															formKey="detail"
															inputType="textarea"
															label="บรรยายเหตุการณ์"
															additionalLabelCom={
																<span className="ms-1 text-zeroloss-grey-500">(ไม่จำเป็น)</span>
															}
															value={formState.detail}
															onChange={e => onChangeFormState('detail', e.target.value)}
														/>
													</div>

													<div className="col-12">
														<hr />
													</div>

													{/* Danger Level */}
													{isEditDetail && (
														<div className="col-12 col-lg-8">
															<label
																className={`form-label d-flex flex-row`}
																data-testid="form-input-label-component">
																<div className="d-flex flex-column">
																	<span>
																		ระดับความรุนแรงของเหตุการณ์
																		<span className="required" />
																	</span>
																</div>
															</label>
															<Select
																placeholder="เลือกระดับความรุนแรง"
																noOptionsMessage={() => 'ไม่พบข้อมูล'}
																options={eventDangerLevelOptions}
																value={
																	eventDangerLevelOptions.find(
																		o => o.value === formState.dangerLevel
																	) ?? null
																}
																onChange={option => onChangeFormState('dangerLevel', option?.value)}
																className="w-100 shadow-sm"
																styles={{
																	container: styles => ({
																		...styles,
																		// height: '44px',
																		marginTop: '-2px',
																	}),
																	control: styles => ({
																		...styles,
																		// height: '44px',
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
																		<components.Placeholder
																			{...props}
																			className="cursor-pointer fs-7 fw-normal">
																			เลือกระดับความรุนแรง
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
													)}

													{isEditDetail && (
														<div className="col-12 col-lg-8">
															<label
																className={`form-label d-flex flex-row`}
																data-testid="form-input-label-component">
																<div className="d-flex flex-column">
																	<span>
																		มลพิษ
																		<span className="required" />
																	</span>
																</div>
															</label>
															<Select
																isMulti
																isClearable
																isSearchable
																placeholder="เลือกระดับความรุนแรง"
																noOptionsMessage={() => 'ไม่พบข้อมูล'}
																className="w-100 shadow-sm"
																value={pollutionState}
																options={pollutionOptions}
																// eslint-disable-next-line @typescript-eslint/ban-ts-comment
																// @ts-ignore
																onChange={val => onChangePollutionState(val)}
																styles={{
																	container: styles => ({
																		...styles,
																		// height: '44px',
																		marginTop: '-2px',
																	}),
																	control: styles => ({
																		...styles,
																		// height: '44px',
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
																		<components.Placeholder
																			{...props}
																			className="cursor-pointer fs-7 fw-normal">
																			เลือกระดับความรุนแรง
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
													)}

													{/* Image */}
													{isCreate && (
														<div className="col-12 col-lg-8">
															<div
																className="w-100 rounded bg-kumopack-base-white border mb-5 text-center shadow d-flex align-items-center justify-content-center position-relative"
																style={{ height: '320px' }}>
																{formState.pictureCover && (
																	<div
																		className="btn btn-sm btn-icon btn-danger btn-active-light-danger position-absolute"
																		style={{ top: -10, right: -10 }}
																		onClick={() => onChangeFormState('pictureCover', null)}>
																		<KTSVG
																			className="svg-icon-1"
																			path="media/icons/duotune/general/gen027.svg"
																		/>
																	</div>
																)}
																{formState.pictureCover && (
																	<img
																		className="mx-auto h-100 w-100 rounded"
																		src={
																			typeof formState.pictureCover !== 'string'
																				? URL.createObjectURL(formState.pictureCover as any)
																				: formState.pictureCover
																		}
																		onError={(e: any) => {
																			e.target.onerror = null
																			e.target.src = '/media/icons/kumopack/default-placeholder.png'
																		}}
																		alt="Factory Cover"
																		style={{
																			userSelect: 'none',
																			pointerEvents: 'none',
																			objectFit: 'contain',
																		}}
																	/>
																)}
																{!formState.pictureCover && (
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
																	onChangeFormState('pictureCover', coverFiles[0])
																}
															/>
														</div>
													)}

													{isCreate && (
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
													)}
												</React.Fragment>
											)}

											{(isCreate ? false : isEditLocation && formState.id !== 0) && (
												<React.Fragment>
													<div className="col-12">
														<div className="card h-500px overflow-hidden">
															<div className="card-body p-0">
																<MapContainer
																	center={{
																		lat: formState.latitude,
																		lng: formState.longitude,
																	}}
																	zoom={13}>
																	<TileLayer
																		attribution="@Copyright 2024 Zeroloss"
																		url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
																	/>

																	<EventWithStatus
																		title={formState?.title ?? ''}
																		detail={formState?.detail ?? ''}
																		img={
																			eventPictureCover ??
																			'/media/icons/zeroloss/default-placeholder.png'
																		}
																		type="error"
																		position={{
																			lat: formState.latitude,
																			lng: formState.longitude,
																		}}
																		popup={EventPopup}
																		eventType={formState?.eventType ?? undefined}
																	/>
																</MapContainer>
															</div>
														</div>
													</div>
												</React.Fragment>
											)}
											{(isCreate ? false : isEditInformer) && (
												<React.Fragment>
													<div className="col-12 col-lg-8">
														<FormGenerator
															formKey="informerName"
															inputType="plain"
															label="ชื่อผู้แจ้ง"
															additionalClassName="form-control-sm"
															value={formState.informerName}
															onChange={e => onChangeFormState('informerName', e.target.value)}
														/>
													</div>
													<div className="col-12 col-lg-8">
														<FormGenerator
															formKey="informerTel"
															inputType="plain"
															label="เบอร์โทรศัพท์ผู้แจ้ง"
															additionalClassName="form-control-sm"
															value={formState.informerTel}
															onChange={e => onChangeFormState('informerTel', e.target.value)}
															markInput
															mark="999-999-9999"
															markChar={null}
														/>
													</div>
													<div className="col-12 col-lg-8">
														<FormGenerator
															formKey="informerLineId"
															inputType="plain"
															label="ไอดีไลน์ผู้แจ้ง"
															additionalClassName="form-control-sm"
															value={formState.informerLineId}
															onChange={e => onChangeFormState('informerLineId', e.target.value)}
														/>
													</div>
													<div className="col-12 col-lg-8">
														<FormGenerator
															formKey="informerEmail"
															inputType="plain"
															label="อีเมลผู้แจ้ง"
															additionalClassName="form-control-sm"
															value={formState.informerEmail}
															onChange={e => onChangeFormState('informerEmail', e.target.value)}
														/>
													</div>
												</React.Fragment>
											)}
											{(isCreate ? false : isEditImages) && (
												<React.Fragment>
													<Lightbox
														index={imageIdx}
														open={isOpenLightBox}
														close={onCloseLightBox}
														slides={eventPictures.map((p: any, idx: number) => ({
															src: p.picturePath,
															caption: `Event Picture ${idx + 1}`,
														}))}
														styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .6)' } }}
													/>

													<div className="col-12">
														<div
															className="d-flex flex-row align-items-center"
															style={{ gap: '24px' }}>
															<label
																className={`form-label d-flex flex-row`}
																data-testid="form-input-label-component">
																<div className="d-flex flex-column">
																	<span className="text-zeroloss-grey-900">รูปภาพปกเหตุการณ์</span>
																	<p className="text-zeroloss-grey-500">
																		This will be displayed on your profile.
																	</p>
																</div>
															</label>
															<ImageUploader1
																formKey="pictureCover"
																accept="image/jpg, image/jpeg, image/png"
																image={formState.pictureCover}
																changeImage={image => onChangeFormState('pictureCover', image)}
															/>
														</div>
													</div>
													<div className="col-12">
														<label
															className={`form-label d-flex flex-row`}
															data-testid="form-input-label-component">
															<div className="d-flex flex-column">
																<span className="text-zeroloss-grey-900">อัพโหลดรูปอื่นๆ</span>
																<p className="text-zeroloss-grey-500">
																	Share a few snippets of your work.
																</p>
															</div>
														</label>
														<div className="row g-10 mb-10">
															{eventPictures.length === 0 && (
																<div className="col-12 text-center fw-bold text-zeroloss-grey-700 my-10">
																	ไม่มีรูปภาพ
																</div>
															)}

															{eventPictures.map((image: any, index: number) => (
																<div key={index} className="col-6 col-md-4">
																	<div className="position-relative h-300px cursor-pointer shadow-lg">
																		<img
																			src={image.picturePath}
																			className="w-100 rounded object-fit-cover h-100 hover-filter-brightness transition-300"
																			alt="Additional Picture"
																			onClick={() => onOpenLightBox(index)}
																		/>
																		<button
																			className="btn btn-sm btn-icon btn-primary btn-active-light-primary position-absolute"
																			style={{ top: -10, right: 30 }}
																			onClick={() => onDownloadAdditionalPicture(index)}>
																			<KTSVG
																				className="svg-icon-1"
																				path="media/icons/duotune/files/fil017.svg"
																			/>
																		</button>
																		<button
																			className="btn btn-sm btn-icon btn-danger btn-active-light-danger position-absolute"
																			style={{ top: -10, right: -10 }}
																			onClick={() => onRemoveAdditionalPicture(index)}>
																			<KTSVG
																				className="svg-icon-1"
																				path="media/icons/duotune/general/gen027.svg"
																			/>
																		</button>
																	</div>
																	{image.createdAt && (
																		<div className="mt-3 text-zeroloss-grey-500 fw-bold text-center">
																			วันและเวลาที่อัพโหลด:{' '}
																			{moment(image.createdAt)
																				.tz('Asia/Bangkok')
																				.format('DD/MM/YYYY HH:mm')}
																		</div>
																	)}
																</div>
															))}
														</div>

														<FormGenerator
															formKey="galleries"
															inputType="drag-and-drop"
															multiple={false}
															accept="image/*"
															onFileUpload={coverFiles => onAddAdditionalPicture(coverFiles[0])}
														/>
													</div>
												</React.Fragment>
											)}
											{(isCreate ? false : isEditReporting) && (
												<React.Fragment>
													<div className="col-12">
														<div className="card">
															<div className="card-body pt-0 px-0">
																<ClientSideTable
																	data={messages}
																	columns={REPORTING_TABLE_CONFIGS}
																	items_per_page={10}
																/>
															</div>
														</div>
													</div>
												</React.Fragment>
											)}
										</div>
									</div>
								</div>
							)}

							{isCreate
								? false
								: isEditLocation && (
										<div className="card my-5">
											<div className="card-header bg-zeroloss-soft-blue">
												<div className="card-title text-zeroloss-primary fw-bolder">
													รายละเอียดสถานที่เกิดเหตุ
												</div>
											</div>
											<div className="card-body">
												<div className="row gy-5">
													<div className="col-12 col-lg-8">
														<FormGenerator
															formKey="locationName"
															inputType="plain"
															label="ชื่อสถานที่"
															additionalClassName="form-control-sm"
															value={formState.locationName}
															onChange={e => onChangeFormState('locationName', e.target.value)}
														/>
													</div>

													<div className="col-12 col-lg-8">
														<FormGenerator
															formKey="locationAddress"
															inputType="textarea"
															label="ที่ตั้ง"
															additionalClassName="form-control-sm"
															value={formState.locationAddress}
															onChange={e => onChangeFormState('locationAddress', e.target.value)}
															limitCharacter={300}
														/>
													</div>

													<div className="col-12 col-lg-8">
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
									)}

							{(isCreate ? false : isEditImpact) && (
								<React.Fragment>
									<div className="card mb-5">
										<div className="card-header bg-zeroloss-soft-blue">
											<div className="card-title text-zeroloss-primary fw-bolder">
												ผลกระทบต่อสุขภาพประชาชนใกล้จุดเกิดเหตุ
											</div>
										</div>
										<div className="card-body">
											<div className="row gy-5">
												<div className="col-12 col-lg-8">
													<FormGenerator
														formKey="effectOnPeople"
														inputType="plain"
														label="ได้รับความเดือนร้อนรำคาญ (ราย)*"
														additionalClassName="form-control-sm"
														value={formState.effectOnPeople}
														onChange={e => onChangeFormState('effectOnPeople', e.target.value)}
													/>
												</div>
												<div className="col-12 col-lg-8">
													<FormGenerator
														formKey="effectOnBreathing"
														inputType="plain"
														label="สูดดม ระคายเคืองจมูกและคอ มีเสมหะ หายใจติดขัด เจ็บหน้าอก (ราย)*"
														additionalClassName="form-control-sm"
														value={formState.effectOnBreathing}
														onChange={e => onChangeFormState('effectOnBreathing', e.target.value)}
													/>
												</div>
												<div className="col-12 col-lg-8">
													<FormGenerator
														formKey="effectOnSkin"
														inputType="plain"
														label="สัมผัสผิวหนัง ผื่นแดง ปวด ผิวหนังอักเสบ กัดกร่อนผิวหนัง แผลไหม้ (ราย)*"
														additionalClassName="form-control-sm"
														value={formState.effectOnSkin}
														onChange={e => onChangeFormState('effectOnSkin', e.target.value)}
													/>
												</div>
												<div className="col-12 col-lg-8">
													<FormGenerator
														formKey="effectOnEyes"
														inputType="plain"
														label="สัมผัสตา เจ็บตา น้ำตาไหล ตาบวม คันตา (ราย)*"
														additionalClassName="form-control-sm"
														value={formState.effectOnEyes}
														onChange={e => onChangeFormState('effectOnEyes', e.target.value)}
													/>
												</div>
												<div className="col-12 col-lg-8">
													<FormGenerator
														formKey="effectOnSickness"
														inputType="plain"
														label="เจ็บป่วย (ราย)*"
														additionalClassName="form-control-sm"
														value={formState.effectOnSickness}
														onChange={e => onChangeFormState('effectOnSickness', e.target.value)}
													/>
												</div>
												<div className="col-12 col-lg-8">
													<FormGenerator
														formKey="effectOnDeaths"
														inputType="plain"
														label="เสียชีวิต (ราย)*"
														additionalClassName="form-control-sm"
														value={formState.effectOnDeaths}
														onChange={e => onChangeFormState('effectOnDeaths', e.target.value)}
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="card mb-5">
										<div className="card-header bg-zeroloss-soft-blue">
											<div className="card-title text-zeroloss-primary fw-bolder">
												ผลกระทบอื่น ๆ
											</div>
										</div>
										<div className="card-body">
											<div className="row gy-5">
												<div className="col-12 col-lg-8">
													<label
														className={`form-label d-flex flex-row`}
														data-testid="form-input-label-component">
														<div className="d-flex flex-column">
															<span>แม่น้ำ ลำคลอง มีสภาพผิดปกติ</span>
														</div>
													</label>
													<Select
														placeholder="เลือกความผิดปกติ"
														noOptionsMessage={() => 'ไม่พบข้อมูล'}
														className="w-100 shadow-sm"
														options={impactWaterResourceOptions}
														value={
															impactWaterResourceOptions.find(
																option => option.value === formState.isWasteWater
															) ?? null
														}
														onChange={option => onChangeFormState('isWasteWater', option?.value)}
														styles={{
															container: styles => ({
																...styles,
																// height: '44px',
																marginTop: '-2px',
															}),
															control: styles => ({
																...styles,
																// height: '44px',
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
																<components.Placeholder
																	{...props}
																	className="cursor-pointer fs-7 fw-normal">
																	เลือกความผิดปกติ
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
												<div className="col-12 col-lg-8">
													<label
														className={`form-label d-flex flex-row`}
														data-testid="form-input-label-component">
														<div className="d-flex flex-column">
															<span>ดินมีสภาพผิดปกติ</span>
														</div>
													</label>
													<Select
														placeholder="เลือกความผิดปกติ"
														noOptionsMessage={() => 'ไม่พบข้อมูล'}
														className="w-100 shadow-sm"
														options={impactGroundResourceOptions}
														value={
															impactGroundResourceOptions.find(
																option => option.value === formState.isSoilPollution
															) ?? null
														}
														onChange={option => onChangeFormState('isSoilPollution', option?.value)}
														styles={{
															container: styles => ({
																...styles,
																// height: '44px',
																marginTop: '-2px',
															}),
															control: styles => ({
																...styles,
																// height: '44px',
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
																<components.Placeholder
																	{...props}
																	className="cursor-pointer fs-7 fw-normal">
																	เลือกความผิดปกติ
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
												<div className="col-12 col-lg-8">
													<label
														className={`form-label d-flex flex-row`}
														data-testid="form-input-label-component">
														<div className="d-flex flex-column">
															<span>สิ่งมีชีวิต เช่น ปลา นก ต้นไม้ ฯ มีความผิดปกติเฉียบพลัน</span>
														</div>
													</label>
													<Select
														placeholder="เลือกความผิดปกติ"
														noOptionsMessage={() => 'ไม่พบข้อมูล'}
														className="w-100 shadow-sm"
														options={impactAnimalOptions}
														value={
															impactAnimalOptions.find(
																option => option.value === formState.isAnimal
															) ?? null
														}
														onChange={option => onChangeFormState('isAnimal', option?.value)}
														styles={{
															container: styles => ({
																...styles,
																// height: '44px',
																marginTop: '-2px',
															}),
															control: styles => ({
																...styles,
																// height: '44px',
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
																<components.Placeholder
																	{...props}
																	className="cursor-pointer fs-7 fw-normal">
																	เลือกความผิดปกติ
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
											</div>
										</div>
									</div>

									<div className="card">
										<div className="card-header bg-zeroloss-soft-blue">
											<div className="card-title text-zeroloss-primary fw-bolder">
												ผลกระทบต่อทรัพย์สิน
											</div>
										</div>
										<div className="card-body">
											<div className="row gy-5">
												<div className="col-12 col-lg-8">
													<FormGenerator
														formKey="effectOnProperty"
														inputType="textarea"
														label="ทรัพย์สินเสียหาย (ระบุ)"
														additionalClassName="form-control-sm"
														value={formState.effectOnProperty}
														onChange={e => onChangeFormState('effectOnProperty', e.target.value)}
														limitCharacter={100}
													/>
												</div>
												<div className="col-12 col-lg-8">
													<FormGenerator
														formKey="impactAnnoyAmount"
														inputType="textarea"
														label="รายละเอียดเพิ่มเติม"
														additionalClassName="form-control-sm"
														value={formState.impactOther}
														onChange={e => onChangeFormState('impactOther', e.target.value)}
														limitCharacter={100}
													/>
												</div>
											</div>
										</div>
									</div>
								</React.Fragment>
							)}
						</div>
					</div>
				</div>
			</div>

			<style>{`
				.leaflet-container {
					height: 100% !important;
				}


				.create-event-header-bg {
					background: linear-gradient(85.81deg, rgba(0, 0, 0, 0.7) 15.45%, rgba(0, 0, 0, 0) 96.00%);
				}

				
				.hover-filter-brightness:hover {
					transiton: all 0.3s ease-in-out;
					filter: brightness(0.6);
				}
			`}</style>
		</React.Fragment>
	)
}

export default EventFormView
