import React, { Fragment } from 'react'

import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
import { KTSVG } from '@/_metronic/helpers'

import useViewModel from './ViewModel'

const EventMessageForm: React.FC = () => {
	const {
		formType,
		open,
		onClose,
		formState,
		onChangeFormState,
		onRemovePicture,
		isSubmitting,
		onSubmit,
		uploadProgress,
	} = useViewModel()
	const modalsRoot = document.getElementById('root-modals') || document.body

	return createPortal(
		<Modal
			size="sm"
			id="kt_modal_supplier_location_selection_modal"
			tabIndex={-1}
			aria-hidden="true"
			dialogClassName="modal-fullscreen-lg-down modal-lg modal-dialog modal-dialog-centered"
			show={open}
			onHide={onClose}
			backdrop={isSubmitting ? 'static' : true}
			style={{ zIndex: 9999 }}>
			<div className="modal-content">
				<div className="modal-body py-lg-10 px-lg-10 min-h-300px">
					<h1 className="text-zeroloss-grey-900">
						{formType === 'create' ? 'เพิ่มรายงานเหตุการณ์' : 'รายละเอียดรายงานเหตุการณ์'}
					</h1>
					{/* <div className="text-kumupack-grey-600 text-center">
                            ทุกความคิดเห็นของท่านมีผลต่อการปรับปรุงระบบให้ดีิยิ่งขึ้น
                        </div> */}

					<div className="w-100 min-h-300px pt-5">
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
					</div>
					<FormGenerator
						formKey="picture"
						inputType="drag-and-drop"
						containerClassName="mt-5"
						multiple={false}
						disabled={isSubmitting}
						accept="image/*, video/*"
						onFileUpload={coverFiles => onChangeFormState('pictures', coverFiles[0])}
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
                #kt_body > div.fade.modal-backdrop.show {
                    z-index: 9999 !important;
                }
			`}</style>
		</Modal>,
		modalsRoot
	)
}

export default EventMessageForm
