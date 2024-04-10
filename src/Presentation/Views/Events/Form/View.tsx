import React from 'react'
import { PageTitle } from '@/_metronic/layout/core'

import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
import EventFormStepper from './Stepper/View'
import ReactDatePicker from 'react-datepicker'
import Select from 'react-select'

import useViewModel from './ViewModel'
import clsx from 'clsx'

const EventFormView: React.FC = () => {
	const { isCreate, timeStr, themeMode, title } = useViewModel()

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

			<div className="row">
				<div className="col-12 px-0">
					<div
						className={clsx(
							'h-400px px-10 py-10 d-flex flex-column flex-lg-row justify-content-between align-items-end position-relative',
							{
								'create-event-header-bg': isCreate,
							}
						)}>
						{/* Background Image */}
						<img
							src="/media/icons/zeroloss/soft-grey-image-plus.svg"
							className={clsx('position-absolute pointer-events-none', {
								'd-none': !isCreate,
							})}
							style={{ left: '43%', top: '25%' }}
							alt="Create Event Header Background"
						/>

						{/* Header */}
						<div>
							<div className="fs-2x fs-lg-4x text-zeroloss-base-white fw-bold">
								{isCreate ? 'สร้างเหตุการณ์ใหม่' : 'รายละเอียดเหตุการณ์'}
							</div>
							<p className="text-zeroloss-grey-25 fs-3">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulputate eu
								scelerisque felis. Sed id semper risus in
							</p>
						</div>

						{/* Call to Action */}
						<div className="w-25 text-end">
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
										{/* Date */}
										<div className="col-12 col-lg-8">
											<label
												className={`form-label d-flex flex-row`}
												data-testid="form-input-label-component">
												<div className="d-flex flex-column">
													<span>วันและเวลาที่เกิดเหตุ</span>
												</div>
											</label>
											<ReactDatePicker
												wrapperClassName="w-100"
												className="form-control form-control-sm"
												dateFormat={'dd/MM/yyyy HH:mm'}
												onChange={() => {}}
											/>
										</div>

										{/* Name */}
										<div className="col-12 col-lg-8">
											<FormGenerator
												formKey="name"
												inputType="plain"
												label="ชื่อเหตุการณ์"
												additionalLabel="ชื่อเหตุการณ์จะถูกนำไปใช้ในหลายตำแหน่ง"
												additionalClassName="form-control-sm"
											/>
										</div>

										{/* Description */}
										<div className="col-12 col-lg-8">
											<FormGenerator
												formKey="description"
												inputType="textarea"
												label="บรรยายเหตุการณ์"
												additionalLabelCom={
													<img
														className="ms-1 cursor-pointer"
														src="/media/icons/zeroloss/help.svg"
														alt="Help Icon"
													/>
												}
												limitCharacter={200}
											/>
										</div>

										<div className="col-12">
											<hr />
										</div>

										{/* Image */}
										<div className="col-12 col-lg-8">
											<FormGenerator
												formKey="image"
												inputType="drag-and-drop"
												label="รูปภาพปกเหตุการณ์"
											/>
										</div>

										<div className="col-12 col-lg-8">
											<label
												className={`form-label d-flex flex-row`}
												data-testid="form-input-label-component">
												<div className="d-flex flex-column">
													<span>สถานที่เกิดเหตุ</span>
													<span className={clsx('text-kumopack-grey-600 fs-8')}>
														Short Description
													</span>
												</div>
											</label>

											<Select
												placeholder="เลือกสถานที่"
												noOptionsMessage={() => 'ไม่พบสถานที่'}
												components={{
													IndicatorSeparator: () => null,
												}}
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
