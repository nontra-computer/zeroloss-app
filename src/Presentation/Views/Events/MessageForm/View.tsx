import React from 'react'

import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
import { KTSVG } from '@/_metronic/helpers'

import useViewModel from './ViewModel'

const EventMessageForm: React.FC = () => {
	const { open, onClose, formState, onChangeFormState, isSubmitting, onSubmit } = useViewModel()
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
					<h1 className="text-zeroloss-grey-900">รายงานเหตุการณ์</h1>
					{/* <div className="text-kumupack-grey-600 text-center">
                            ทุกความคิดเห็นของท่านมีผลต่อการปรับปรุงระบบให้ดีิยิ่งขึ้น
                        </div> */}

					<div className="w-100 min-h-300px pt-5">
						<FormGenerator
							formKey="detail"
							label="บรรยายเหตุการณ์"
							inputType="textarea"
							additionalLabelCom={<span className="required" />}
							value={formState.detail}
							onChange={e => onChangeFormState('detail', e.target.value)}
						/>

						<div
							className="w-100 rounded bg-kumopack-base-white border mb-5 text-center shadow d-flex align-items-center justify-content-center position-relative mt-5"
							style={{ height: '200px' }}>
							{formState.picture && (
								<div
									className="btn btn-sm btn-icon btn-danger btn-active-light-danger position-absolute"
									style={{ top: -10, right: -10 }}
									onClick={() => onChangeFormState('picture', null)}>
									<KTSVG className="svg-icon-1" path="media/icons/duotune/general/gen027.svg" />
								</div>
							)}
							{formState.picture && (
								<img
									className="mx-auto h-100 w-100 rounded"
									src={
										typeof formState.picture !== 'string'
											? URL.createObjectURL(formState.picture as any)
											: formState.picture
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
							{!formState.picture && (
								<div className="fw-bold fs-5 text-kumopack-grey-300 py-10">No Files Uploaded</div>
							)}
						</div>
						<FormGenerator
							formKey="picture"
							inputType="drag-and-drop"
							containerClassName="mt-5"
							multiple={false}
							accept="image/*"
							onFileUpload={coverFiles => onChangeFormState('picture', coverFiles[0])}
						/>
					</div>
				</div>

				<div
					className="modal-footer border-0px flex-row"
					style={{ rowGap: '12px', flexWrap: 'nowrap' }}>
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
