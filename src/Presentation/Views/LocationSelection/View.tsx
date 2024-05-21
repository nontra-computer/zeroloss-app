import React from 'react'
import { createPortal } from 'react-dom'

import { Modal } from 'react-bootstrap'
import LocationSelectionComponent from '@/Presentation/Components/Map/Leaflet/LocationSelection'

import useViewModel from './ViewModel'

const LocationSelection: React.FC = () => {
	const { open, handleClose, handleConfirm, position, setPosition } = useViewModel()
	const modalsRoot = document.getElementById('root-modals') || document.body

	return createPortal(
		<Modal
			size="sm"
			id="kt_modal_location_selection_modal"
			tabIndex={-1}
			aria-hidden="true"
			dialogClassName="modal-fullscreen-lg-down modal-xl modal-dialog modal-dialog-centered"
			show={open}
			onHide={handleClose}
			backdrop={true}>
			<div className="modal-content">
				<div className="modal-body py-lg-10 px-lg-10 min-h-500px">
					<h1 className="text-kumopack-grey-900 text-center">เลือกสถานที่ตั้งของสถานประกอบการ</h1>
					{/* <div className="text-kumupack-grey-600 text-center">
                            ทุกความคิดเห็นของท่านมีผลต่อการปรับปรุงระบบให้ดีิยิ่งขึ้น
                        </div> */}

					<div className="separator my-5"></div>

					<div className="w-100 h-500px">
						<LocationSelectionComponent position={position} setPosition={setPosition} />
					</div>
				</div>

				<div className="modal-footer">
					<button
						className="btn btn-sm btn-kumopack-grey-300 text-kumopack-grey-600"
						onClick={handleClose}>
						ยกเลิก
					</button>

					<button
						className="btn btn-sm btn-kumopack-primary-600 text-kumopack-base-white"
						onClick={handleConfirm}>
						ยืนยัน
					</button>
				</div>
			</div>

			<style>{`
				.leaflet-container {
					height: 100%;
				}

				#kt_body > #kt_modal_location_selection_modal {
                    z-index: 10000 !important;
                }
			`}</style>
		</Modal>,
		modalsRoot
	)
}

export default LocationSelection
