import React from 'react'
import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
import Select, { components } from 'react-select'
import ReactDatePicker from 'react-datepicker'
import useViewModel from './ViewModel'
import moment from 'moment'
import 'moment-timezone'

const EventNotificationScheduleForm: React.FC = () => {
	const {
		isOpenDatePicker,
		setIsOpenDatePicker,
		open,
		themeMode,
		notificationTimeOptions,
		timeText,
		formState,
		isSubmitting,
		onChangeFormState,
		onClose,
		onSubmit,
	} = useViewModel()
	const modalsRoot = document.getElementById('root-modals') || document.body

	return createPortal(
		<Modal
			size="sm"
			id="kt_modal_event_notification_schedule_form_modal"
			tabIndex={-1}
			aria-hidden="true"
			dialogClassName="modal-fullscreen-lg-down modal-lg modal-dialog modal-dialog-centered"
			show={open}
			onHide={onClose}
			backdrop={isSubmitting ? 'static' : true}
			style={{ zIndex: 9999 }}>
			<div className="modal-content">
				<div className="modal-body py-lg-10 px-lg-10 min-h-300px">
					<h1 className="text-zeroloss-grey-900">เพิ่มการแจ้งเตือน</h1>
					{/* <div className="text-kumupack-grey-600 text-center">
								ทุกความคิดเห็นของท่านมีผลต่อการปรับปรุงระบบให้ดีิยิ่งขึ้น
							</div> */}

					<div className="w-100 min-h-300px pt-5">
						<div className="mb-5">
							<label className="form-label">
								เวลาที่แจ้งเตือน <span className="required"></span>
							</label>
							<input
								onClick={() => setIsOpenDatePicker(true)}
								className="form-control form-control-sm"
								value={timeText}
							/>
							{isOpenDatePicker && (
								<div className="position-absolute" style={{ zIndex: 999, marginTop: '10px' }}>
									<ReactDatePicker
										inline
										fixedHeight
										showTimeSelect
										selected={
											formState.actionAt
												? moment(formState.actionAt).tz('Asia/Bangkok').toDate()
												: null
										}
										onChange={date => {
											if (date) {
												onChangeFormState('actionAt', date)
											}
										}}
										onBlur={() => setIsOpenDatePicker(false)}
										onClickOutside={() => setIsOpenDatePicker(false)}
									/>
								</div>
							)}
						</div>

						<FormGenerator
							formKey="message"
							label="ข้อความ"
							inputType="textarea"
							disabled={isSubmitting}
							additionalLabelCom={<span className="required" />}
							value={formState.message}
							additionalClassName="mb-5"
							onChange={e => onChangeFormState('message', e.target.value)}
						/>

						<div className="mb-5">
							<label
								className={`form-label d-flex flex-row`}
								data-testid="form-input-label-component">
								<div className="d-flex flex-column">
									<span>เวลาแจ้งล่วงหน้าก่อนถึงเวลาเกิดเหตุ</span>
								</div>
							</label>
							<Select
								placeholder="เลือกช่วงเวลา"
								noOptionsMessage={() => 'ไม่พบข้อมูล'}
								className="w-100 shadow-sm"
								options={notificationTimeOptions}
								value={
									notificationTimeOptions.find(
										option => option.value === formState.earlyMinuteAlarm
									) ?? null
								}
								onChange={option => onChangeFormState('earlyMinuteAlarm', option?.value)}
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
										<components.Placeholder {...props} className="cursor-pointer fs-7 fw-normal">
											เลือกช่วงเวลา
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

					<div
						className="modal-footer border-0px flex-row"
						style={{ rowGap: '12px', flexWrap: 'nowrap' }}>
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
			</div>

			<style>{`
				#kt_body > div.fade.modal-backdrop.show, 
				#kt_body > div.fade.modal.show > #kt_event_notification_schedule_form_modal {
					z-index: 9999 !important;
				}
			`}</style>
		</Modal>,
		modalsRoot
	)
}

export default EventNotificationScheduleForm
