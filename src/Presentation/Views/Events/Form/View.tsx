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
import LocationWithStatus from '@/Presentation/Components/LeafletMap/LocationWithStatus'
import IncidentPopup from '@/Presentation/Components/LeafletMap/IncidentPopup'
import ImageUploader1 from '@/Presentation/Components/Uploader/Images/ImageUploader1'

import useViewModel from './ViewModel'
import clsx from 'clsx'

const EventFormView: React.FC = () => {
	const {
		availableTabs,
		selectedTabName,
		currentActiveTabIdx,
		isCreate,
		isEditDetail,
		isEditLocation,
		isEditImages,
		isEditInformer,
		isEditReporting,
		isEditImpact,
		timeStr,
		themeMode,
		title,
		eventTypesOptions,
		eventSubTypesOptions,
		steppers,
		formState,
		onChangeFormState,
		onOpenLocationSelection,
		onChangeEditTab,
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

							<div className="card">
								<div className="card-header bg-zeroloss-soft-blue">
									<div className="card-title text-zeroloss-primary fw-bolder">
										{isCreate ? 'รายละเอียดเหตุการณ์' : selectedTabName}
									</div>
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
															selected={formState.eventOccuredAt}
															onChange={date => {
																onChangeFormState('eventOccuredAt', date)
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
																option => option.value === formState.eventType
															) ?? null
														}
														onChange={option => onChangeFormState('eventType', option?.value)}
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
																option => option.value === formState.eventSubType
															) ?? null
														}
														onChange={option => onChangeFormState('eventSubType', option?.value)}
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
														/>
													</div>
												)}

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
															placeholder="เลือกระดับความรุนแรง"
															noOptionsMessage={() => 'ไม่พบข้อมูล'}
															className="w-100 shadow-sm pointer-events-none"
															value={[
																{
																	label: 'น้ำเสีย',
																	value: 1,
																},
																{
																	label: 'กลิ่นเหม็น',
																	value: 2,
																},
															]}
															options={[
																{
																	label: 'น้ำเสีย',
																	value: 1,
																},
																{
																	label: 'กลิ่นเหม็น',
																	value: 2,
																},
															]}
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
																Menu: () => null,
																DownChevron: () => null,
																ClearIndicator: () => null,
																DropdownIndicator: () => null,
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

										{(isCreate ? true : isEditLocation) && (
											<React.Fragment>
												<div className="col-12 col-lg-8">
													<label
														className={`form-label d-flex flex-row`}
														data-testid="form-input-label-component">
														<div className="d-flex flex-column">
															<span>ค้นหาจากฐานข้อมูล</span>
														</div>
													</label>
													<Select
														className="w-100 shadow-sm"
														placeholder="ค้นหาจากฐานข้อมูล"
														noOptionsMessage={() => 'ไม่พบข้อมูล'}
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
																	ค้นหาจากฐานข้อมูล
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

																<LocationWithStatus
																	title="เหตุการณ์"
																	detail="รายละเอียดเหตุการณ์"
																	type="error"
																	position={{
																		lat: formState.latitude,
																		lng: formState.longitude,
																	}}
																	popup={IncidentPopup}
																	eventType={{
																		id: 1,
																		name: 'Accident',
																	}}
																/>
															</MapContainer>
														</div>
													</div>
												</div>
											</React.Fragment>
										)}
										{(isCreate ? true : isEditInformer) && (
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
														formKey="informerPhone"
														inputType="plain"
														label="เบอร์โทรศัพท์ผู้แจ้ง"
														additionalClassName="form-control-sm"
														value={formState.informerPhone}
														onChange={e => onChangeFormState('informerPhone', e.target.value)}
														markInput
														mark="999-999-9999"
														markChar={null}
													/>
												</div>
												<div className="col-12 col-lg-8">
													<FormGenerator
														formKey="informerLineID"
														inputType="plain"
														label="ไอดีไลน์ผู้แจ้ง"
														additionalClassName="form-control-sm"
														value={formState.informerLineID}
														onChange={e => onChangeFormState('informerLineID', e.target.value)}
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
										{(isCreate ? true : isEditImages) && (
											<React.Fragment>
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
															formKey="featurePicture"
															accept="image/jpg, image/jpeg, image/png"
															image={formState.featurePicture}
															changeImage={image => onChangeFormState('featurePicture', image)}
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
												</div>
											</React.Fragment>
										)}
										{(isCreate ? true : isEditReporting) && <React.Fragment></React.Fragment>}
										{(isCreate ? true : isEditImpact) && <React.Fragment></React.Fragment>}
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


				.create-event-header-bg {
					background: linear-gradient(85.81deg, rgba(0, 0, 0, 0.7) 15.45%, rgba(0, 0, 0, 0) 96.00%);
				}
			`}</style>
		</React.Fragment>
	)
}

export default EventFormView
