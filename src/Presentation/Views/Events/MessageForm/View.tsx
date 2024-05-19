import React, { Fragment } from 'react'

import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import LocationSelection from '../../LocationSelection/View'
import LocationSelectionComponent from '@/Presentation/Components/Map/Leaflet/LocationSelection'
import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
import { KTSVG } from '@/_metronic/helpers'

import useViewModel from './ViewModel'

const EventMessageForm: React.FC = () => {
	const {
		isSubmitting,
		formType,
		open,
		onClose,
		formState,
		onChangeFormState,
		onRemovePicture,
		onSubmit,
		uploadProgress,
	} = useViewModel()
	const modalsRoot = document.getElementById('root-modals') || document.body

	return createPortal(
		<Modal
			size="sm"
			id="kt_modal_event_message_form_modal"
			tabIndex={-1}
			aria-hidden="true"
			dialogClassName="modal-fullscreen-lg-down modal-lg modal-dialog modal-dialog-centered"
			show={open}
			onHide={onClose}
			backdrop={isSubmitting ? 'static' : true}
			style={{ zIndex: 9999 }}>
			<LocationSelection />

			<div className="modal-content">
				<div className="modal-body py-lg-10 px-lg-10 min-h-300px">
					<h1 className="text-zeroloss-grey-900">
						{formType === 'create' ? 'เพิ่มรายงานเหตุการณ์' : 'รายละเอียดรายงานเหตุการณ์'}
					</h1>
					{/* <div className="text-kumupack-grey-600 text-center">
                            ทุกความคิดเห็นของท่านมีผลต่อการปรับปรุงระบบให้ดีิยิ่งขึ้น
                        </div> */}

					<div className="w-100 min-h-300px pt-5">
						<div className="mb-5">
							<label
								className={`form-label d-flex flex-row`}
								data-testid="form-input-label-component">
								<div className="d-flex flex-column">
									<span>
										เลือกพิกัดเหตุการณ์ <span className="required"></span>
									</span>
								</div>
							</label>

							<div className="w-100 h-300px">
								<LocationSelectionComponent
									position={{ lat: formState.latitude, lng: formState.longitude }}
									setPosition={({ lat, lng }) => {
										onChangeFormState('coordinate', { lat, lng })
									}}
								/>
							</div>
						</div>

						<FormGenerator
							formKey="locationName"
							label="ชื่อสถานที่"
							inputType="plain"
							disabled={isSubmitting}
							additionalLabelCom={<span className="required" />}
							additionalClassName="mb-5"
							value={formState.locationName}
							onChange={e => onChangeFormState('locationName', e.target.value)}
						/>

						<FormGenerator
							formKey="detail"
							label="บรรยายเหตุการณ์"
							inputType="textarea"
							disabled={isSubmitting}
							additionalLabelCom={<span className="required" />}
							value={formState.detail}
							onChange={e => onChangeFormState('detail', e.target.value)}
						/>

						<label
							className={`form-label d-flex flex-row my-5`}
							data-testid="form-input-label-component">
							<div className="d-flex flex-column">
								<span>
									รูปภาพ / วีดีโอประกอบ
									<span className="required" />
								</span>
							</div>
						</label>

						{/* {formState.pictures && (
								<div
									className="btn btn-sm btn-icon btn-danger btn-active-light-danger position-absolute"
									style={{ top: -10, right: -10 }}
									onClick={() => onChangeFormState('picture', null)}>
									<KTSVG className="svg-icon-1" path="media/icons/duotune/general/gen027.svg" />
								</div>
							)}
							{formState.pictures && (
								<img
									className="mx-auto h-100 w-100 rounded"
									src={
										typeof formState.pictures !== 'string'
											? URL.createObjectURL(formState.pictures as any)
											: formState.pictures
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
							)} */}
						{formState.pictures.length === 0 && (
							<div className="fs-7 text-kumopack-grey-300 py-10 text-center">No Files Uploaded</div>
						)}
						{formType === 'create' && (
							<div className="row g-5">
								{formState.pictures.map((p, idx) => (
									<div className="col-12 col-lg-4">
										{p.type.includes('image') && (
											<Fragment>
												<div className="position-relative h-150px shadow-lg">
													<img
														src={URL.createObjectURL(p)}
														className="w-100 rounded object-fit-contain h-100 hover-filter-brightness cursor-pointer  transition-300"
														alt="Additional Picture"
													/>
													<button
														className="btn btn-sm btn-icon btn-danger btn-active-light-danger position-absolute"
														style={{ top: -10, right: -10 }}
														onClick={() => onRemovePicture(idx)}>
														<KTSVG
															className="svg-icon-1"
															path="media/icons/duotune/general/gen027.svg"
														/>
													</button>
												</div>
											</Fragment>
										)}

										{p.type.includes('video') && (
											<Fragment>
												<div className="position-relative h-150px shadow-lg">
													<video
														src={URL.createObjectURL(p)}
														className="w-100 rounded object-fit-contain h-100 hover-filter-brightness cursor-pointer  transition-300"
														controls
													/>
													<button
														className="btn btn-sm btn-icon btn-danger btn-active-light-danger position-absolute"
														style={{ top: -10, right: -10 }}
														onClick={() => onRemovePicture(idx)}>
														<KTSVG
															className="svg-icon-1"
															path="media/icons/duotune/general/gen027.svg"
														/>
													</button>
												</div>
											</Fragment>
										)}
									</div>
								))}
							</div>
						)}

						{formType === 'edit' && (
							<div className="row g-5">
								{formState.pictures.map((p, idx) => {
									let isImage = false
									let isVideo = false

									if (p?.isNew) {
										isImage = p.picturePath.type.includes('image')
										isVideo = p.picturePath.type.includes('video')
									} else {
										isImage =
											p.picturePath.includes('png') ||
											p.picturePath.includes('jpg') ||
											p.picturePath.includes('jpeg')
										isVideo =
											p.picturePath.includes('mp4') ||
											p.picturePath.includes('mov') ||
											p.picturePath.includes('avi')
									}

									return (
										<div className="col-12 col-lg-4">
											{isImage && (
												<Fragment>
													<div className="position-relative h-150px shadow-lg">
														<img
															src={
																p?.isNew
																	? URL.createObjectURL(p.picturePath)
																	: p.picturePath ?? '/media/icons/zeroloss/default-placeholder.png'
															}
															onError={e => {
																e.currentTarget.src =
																	'/media/icons/zeroloss/default-placeholder.png'
																e.currentTarget.onerror = null
															}}
															alt="Additional Picture"
															className="w-100 rounded object-fit-contain h-100 hover-filter-brightness cursor-pointer  transition-300"
														/>
														<button
															className="btn btn-sm btn-icon btn-danger btn-active-light-danger position-absolute"
															style={{ top: -10, right: -10 }}
															onClick={() => onRemovePicture(idx)}>
															<KTSVG
																className="svg-icon-1"
																path="media/icons/duotune/general/gen027.svg"
															/>
														</button>
													</div>
												</Fragment>
											)}

											{isVideo && (
												<Fragment>
													<div className="position-relative h-150px shadow-lg">
														<video
															src={p.picturePath}
															className="w-100 rounded object-fit-contain h-100 hover-filter-brightness cursor-pointer  transition-300"
															controls
														/>
														<button
															className="btn btn-sm btn-icon btn-danger btn-active-light-danger position-absolute"
															style={{ top: -10, right: -10 }}
															onClick={() => onRemovePicture(idx)}>
															<KTSVG
																className="svg-icon-1"
																path="media/icons/duotune/general/gen027.svg"
															/>
														</button>
													</div>
												</Fragment>
											)}
										</div>
									)
								})}
							</div>
						)}
					</div>
					<FormGenerator
						formKey="picture"
						inputType="drag-and-drop"
						containerClassName="mt-5"
						multiple={false}
						disabled={isSubmitting}
						accept="image/jpg, image/jpeg, image/png, video/mp4, video/mov"
						onFileUpload={coverFiles => onChangeFormState('pictures', coverFiles[0])}
						customHelpText={
							<React.Fragment>
								<span>or drag and drop</span>
								<p>Allowed: JPG, JPEG, PNG, MP4, MOV</p>
							</React.Fragment>
						}
					/>
				</div>

				<div
					className="modal-footer border-0px flex-row"
					style={{ rowGap: '12px', flexWrap: 'nowrap' }}>
					{isSubmitting && (
						<div className="w-100">
							<div className="progress bg-zeroloss-grey-200 shadow-sm">
								<div
									className="progress-bar bg-zeroloss-primary"
									role="progressbar"
									aria-label="Basic example"
									style={{ width: `${uploadProgress}%` }}
									aria-valuenow={uploadProgress}
									aria-valuemin={0}
									aria-valuemax={100}></div>
							</div>
						</div>
					)}

					{!isSubmitting && (
						<React.Fragment>
							<div className="w-50">
								<button
									className="btn btn-sm btn-zeroloss-grey-300 text-zeroloss-grey-600 w-100 mx-0"
									disabled={isSubmitting}
									onClick={onClose}>
									ยกเลิก
								</button>
							</div>

							<div className="w-50">
								<button
									className="btn btn-sm btn-zeroloss-primary text-zeroloss-base-white w-100 mx-0"
									disabled={isSubmitting}
									onClick={onSubmit}>
									<img
										src="/media/icons/zeroloss/white-save-01.svg"
										alt="White Save Icon"
										className="me-1"
									/>
									ยืนยัน
								</button>
							</div>
						</React.Fragment>
					)}
				</div>
			</div>

			<style>{`
				#kt_body > div.fade.modal-backdrop.show, 
				#kt_body > div.fade.modal.show > #kt_modal_event_message_form_modal {
                    z-index: 9999 !important;
                }
			`}</style>
		</Modal>,
		modalsRoot
	)
}

export default EventMessageForm
