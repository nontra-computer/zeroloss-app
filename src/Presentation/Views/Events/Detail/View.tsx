import React from 'react'
import { PageTitle } from '@/_metronic/layout/core'
import Lightbox from 'yet-another-react-lightbox'

import Select from 'react-select'
import FeatureNews from '@/Presentation/Components/News/FeatureNews'
import NewsHorizontal from '@/Presentation/Components/News/NewsHorizontal'
import EventMessageForm from '../MessageForm/View'
import EventStepper from '../Components/Stepper'

import EventDetailDefaultView from './DefaultView/View'
import EventDetailMapView from './MapView/View'

import useViewModel from './ViewModel'
import clsx from 'clsx'

const EventDetailView: React.FC = () => {
	const {
		downloadComponentRef,
		isPrinting,
		isOpenExportType,
		setIsOpenExportType,
		isDefaultView,
		isMapView,
		timeStr,
		themeMode,
		isHideEventChangeStatusButton,
		eventStatusOptions,
		data,
		openChangeEventStatus,
		setOpenChangeEventStatus,
		pictureCover,
		galleryImages,
		galleryVideos,
		locationAddress,
		eventSubTypes,
		steppers,
		eventMessages,
		isOpenLightBox,
		imageIdx,
		isEventMessageMax,
		onOpenLightBox,
		onCloseLightBox,
		onChangeViewType,
		onViewInDetail,
		onOpenEventMessageForm,
		onViewDetailEventMessageForm,
		onApproveEvent,
		loadMoreEventMessage,
		onExportPrint,
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
				Event Dashboard
			</PageTitle>

			<EventMessageForm />

			<Lightbox
				index={imageIdx}
				open={isOpenLightBox}
				close={onCloseLightBox}
				slides={galleryImages.map((p: any, idx: number) => ({
					src: p,
					caption: `Event Picture ${idx + 1}`,
				}))}
				on={{
					view: props => {
						onOpenLightBox(props.index)
					},
				}}
				styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .6)' } }}
			/>

			{isPrinting && <div id="event-detail-printing" className="fade modal-backdrop show"></div>}

			<div className="row" ref={downloadComponentRef}>
				<div className="col-12 px-0">
					<div
						className={clsx('px-10 d-flex flex-column flex-lg-row position-relative', {
							'create-event-header-bg h-300px justify-content-between align-items-end':
								isPrinting === false,
						})}
						style={{ gap: '12px' }}>
						{/* Background Image */}
						{/* <img
							src="/media/icons/zeroloss/soft-grey-image-plus.svg"
							className={'position-absolute pointer-events-none'}
							style={{ left: '43%', top: '25%' }}
							alt="Event Detail Background"
						/> */}

						{/* Header */}
						<div>
							<div
								className={clsx('fs-2x fw-bold', {
									'text-zeroloss-grey-300': isPrinting === false,
									'text-zeroloss-base-black': isPrinting === true,
								})}>
								{data?.title ?? '-'}
							</div>
							<p
								className={clsx('fs-3', {
									'text-zeroloss-grey-300': isPrinting === false,
									'text-zeroloss-base-black': isPrinting === true,
								})}>
								{data?.eventTypeTitle} (
								{eventSubTypes.find(item => item.id === data?.eventSubTypeId)?.name})
							</p>
						</div>

						{/* Call to Action */}
						<div
							className={clsx('text-end no-print', {
								'mb-5': isPrinting === false,
							})}>
							{!isHideEventChangeStatusButton && (
								<div className="d-inline-block position-relative no-print">
									<button
										type="button"
										className="btn white-button text-zeroloss-base-black fw-bold me-4 text-start no-print"
										onClick={() => {
											setOpenChangeEventStatus(prevState => !prevState)
										}}>
										เปลี่ยนสถานะเหตุการณ์
									</button>
									<div className="text-start">
										<Select
											menuIsOpen={openChangeEventStatus}
											onBlur={() => setOpenChangeEventStatus(false)}
											components={{
												Input: () => null,
												Control: () => null,
											}}
											options={eventStatusOptions}
											onChange={option => onApproveEvent(option?.value as number)}
										/>
									</div>
								</div>
							)}
							<div className="d-inline-block position-relative no-print">
								<button
									type="button"
									className="btn btn-zeroloss-brand-600 text-zeroloss-grey-200 fw-bold me-4 no-print"
									onClick={() => {
										setIsOpenExportType(prevState => !prevState)
									}}>
									<span>นำออกเอกสาร</span>
								</button>
								<div className="text-start">
									<Select
										menuIsOpen={isOpenExportType}
										onBlur={() => setIsOpenExportType(false)}
										components={{
											Input: () => null,
											Control: () => null,
										}}
										options={[
											{
												label: 'PDF',
												value: 'pdf',
											},
											{
												label: 'Word',
												value: 'docx',
											},
										]}
										onChange={option => onExportPrint((option?.value ?? 'pdf') as 'pdf' | 'docx')}
									/>
								</div>
							</div>
							<button
								type="button"
								className="btn btn-zeroloss-primary text-zeroloss-base-white fw-bold no-print"
								onClick={onViewInDetail}>
								{/* <img
									className="me-1"
									src="/media/icons/zeroloss/white-save-01.svg"
									alt="White Save Icon"
								/> */}
								<span>ข้อมูลเหตุการณ์ทั้งหมด</span>
							</button>
						</div>
					</div>
				</div>

				<div className="col-12 p-10">
					<div className="row gy-10">
						<div className="col-12">
							<div className="fs-2 fw-bold text-zeroloss-grey-900">ข้อมูลเหตุการณ์เบื้องต้น</div>
							<p className="fs-4 text-zeroloss-grey-500">
								Keep tracks of vendors and security ratings
							</p>
						</div>

						<div className="col-12 col-lg-6">
							<div className="d-flex flex-column flex-lg-row" style={{ gap: '12px' }}>
								{/* Feature Picture */}
								<div className="rounded-3 overflow-hidden h-450px w-lg-50">
									<img
										src={pictureCover ?? '/media/icons/zeroloss/default-placeholder.png'}
										onError={e => {
											e.currentTarget.src = '/media/icons/zeroloss/default-placeholder.png'
											e.currentTarget.onerror = null
										}}
										alt="Event Feature Picture"
										className="w-100 h-100 object-fit-cover"
										style={{ userSelect: 'none', pointerEvents: 'none' }}
									/>
								</div>

								{/* Additional Pictures */}
								<div className="row w-lg-50 g-5" style={{ height: 'fit-content' }}>
									{isPrinting === false &&
										galleryVideos.map((item: any, index: number) => (
											<div
												key={`event-additional-picture-${index}`}
												className={clsx('', {
													'col-4': isPrinting === false,
													'col-6': isPrinting,
												})}
												onClick={() => {
													window.open(item, '_blank')
												}}>
												<div
													className={clsx(
														'rounded-3 overflow-hidden cursor-pointer hover-filter-brightness transition-300',
														{
															'h-100px': isPrinting === false,
															'h-150px': isPrinting,
														}
													)}>
													<video
														id={`event-detail-video-${index}`}
														controls={false}
														autoPlay
														muted
														loop
														src={item ?? ''}
														className="object-fit-cover mx-auto"
														onClick={() => {
															// window.open(item, '_blank')
															const el = document.getElementById(`event-detail-video-${index}`)
															if (!el) return

															if (el.requestFullscreen) {
																el.requestFullscreen()
															}
														}}
														style={{ maxWidth: '100%', height: '150px' }}>
														Your browser does not support the video tag.
													</video>
												</div>
											</div>
										))}

									{(isPrinting === false ? galleryImages.slice(0, 9) : galleryImages).map(
										(item: any, index: number) => {
											return (
												<div
													key={`event-additional-picture-${index}`}
													className={clsx('', {
														'col-4': isPrinting === false,
														'col-6': isPrinting === true,
													})}
													onClick={() => {
														onOpenLightBox(index)
													}}>
													<div
														className={clsx(
															'rounded-3 overflow-hidden cursor-pointer hover-filter-brightness transition-300',
															{
																'h-100px': isPrinting === false,
																'h-150px': isPrinting === true,
															}
														)}>
														<img
															src={item ?? '/media/icons/zeroloss/default-placeholder.png'}
															onError={e => {
																e.currentTarget.src =
																	'/media/icons/zeroloss/default-placeholder.png'
																e.currentTarget.onerror = null
															}}
															alt="Event Additional Picture"
															className="w-100 h-100 object-fit-cover"
															style={{ userSelect: 'none', pointerEvents: 'none' }}
														/>
													</div>
												</div>
											)
										}
									)}

									{/* More Pictures */}
									{galleryImages.length > 9 && (
										<div
											className="col-4 no-print"
											onClick={() => {
												onOpenLightBox(8)
											}}>
											<div
												className="h-100px rounded-3 d-flex justify-content-center align-items-center fs-3 fw-bold text-zeroloss-base-white cursor-pointer hover-filter-brightness"
												style={{ background: 'rgba(0, 0, 0, 0.7)' }}>
												+{galleryImages?.length - 9}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>

						<div className="col-12 col-lg-6">
							<div className="card bg-zeroloss-soft-warning-2 border-1px border-zeroloss-soft-warning-1 rounded-3">
								<div className="card-body p-5 text-zeroloss-grey-700">
									<div className="d-flex flex-row align-items-center mb-2">
										<img src="/media/icons/zeroloss/home-03.svg" alt="Home Icon" />
										<span className="ms-2 fs-5 fw-semibold">{data?.locationName ?? '-'}</span>
									</div>
									<div className="d-flex flex-row align-items-center mb-2">
										<img src="/media/icons/zeroloss/marker-pin-01.svg" alt="Marker Pin Icon" />
										<span className="mx-2 fs-5 fw-semibold">{locationAddress ?? '-'}</span>
										{/* {locationAddress && (
											<img
												className="cursor-pointer w-15px h-15px"
												src="/media/icons/zeroloss/orange-arrow-circle-up-right.svg"
												alt="Orange Arrow Circle Up Right Icon"
											/>
										)} */}
									</div>
									<div className="d-flex flex-row align-items-center mb-2">
										<img
											src="/media/icons/zeroloss/detail.svg"
											alt="Marker Pin Icon"
											className="w-15px h-15px"
										/>
										<span className="ms-2 fs-5 fw-semibold">{data?.detail}</span>
									</div>
									<div className="d-flex flex-row align-items-center mb-2">
										<img
											src="/media/icons/zeroloss/chemical-drop.svg"
											alt="Marker Pin Icon"
											className="w-15px h-15px"
										/>
										<span className="ms-2 fs-5 fw-semibold">
											สารเคมีที่เกี่ยวข้อง:{' '}
											{data?.chemical?.nameTh && data?.chemical?.nameEn
												? `${data?.chemical?.nameTh ? `${data?.chemical?.nameTh} - ` : ''}${data?.chemical?.nameEn}`
												: '-'}
										</span>
									</div>
									<div className="d-flex flex-row align-items-center mb-2">
										<img
											src="/media/icons/zeroloss/instruction-support-information.svg"
											alt="Marker Pin Icon"
											className="w-15px h-15px"
										/>
										<span className="ms-2 fs-5 fw-semibold">
											คำแนะนำในการปฎิบัติ: {data?.emergencyResponse ?? '-'}
										</span>
									</div>

									<div className="d-flex flex-row align-items-center mb-2">
										<button
											className="btn btn-muted btn-sm text-zeroloss-error text-decoration-underline"
											onClick={onOpenEventMessageForm}>
											<span>เพิ่มลำดับเหตุการณ์</span>
											<img
												className="ms-2"
												src="/media/icons/zeroloss/orange-plus-circle.svg"
												alt="Orange Plus Circle Icon"
											/>
										</button>
									</div>
								</div>
							</div>
						</div>

						<div className="col-12">
							<hr className="border-zeroloss-grey-400" />
						</div>

						<div className="col-12">
							<div className="card border-1px border-zeroloss-grey-300">
								<div className="card-header">
									<div className="card-title">
										<div>
											<div className="fs-4 fw-bold text-zeroloss-grey-900">รายละเอียดเหตุการณ์</div>
											<p className="fs-5 text-zeroloss-grey-500 mb-0">
												Keep tracks of vendors and security ratings
											</p>
										</div>
									</div>

									<div className="card-toolbar">
										<div className="zeroloss-button-group w-fit-content shadow mx-auto mx-lg-0 no-print">
											<button
												className={clsx('btn btn-sm left cursor-pointer', {
													'white-button': themeMode === 'light',
													'btn-zeroloss-base-grey-carbon border-zeroloss-base-white border-1px':
														themeMode === 'dark',
												})}
												onClick={() => onChangeViewType('default')}>
												{isDefaultView && (
													<span className="d-inline-block bg-zeroloss-success-500 p-1 rounded-circle w-2px h-2px me-2" />
												)}
												Default
											</button>
											<button
												className={clsx('btn btn-sm right cursor-pointer', {
													'white-button': themeMode === 'light',
													'btn-zeroloss-base-grey-carbon border-zeroloss-base-white border-1px':
														themeMode === 'dark',
												})}
												onClick={() => onChangeViewType('map')}>
												{isMapView && (
													<span className="d-inline-block bg-zeroloss-success-500 p-1 rounded-circle w-2px h-2px me-2" />
												)}
												Map
											</button>
										</div>
									</div>
								</div>
								<div className="card-body">
									<div
										className={clsx('row', {
											'g-0': isPrinting === true,
										})}>
										<div className="d-none d-lg-block col-12 col-lg-3 no-print">
											<div className="mb-10">
												<div className="fs-4 fw-bold text-zeroloss-grey-900">ลำดับเหตุการณ์</div>
											</div>

											<EventStepper steppers={steppers} />
										</div>

										<div className="col-12 col-lg-3">
											<div
												className="mx-auto fs-4 fw-bold text-zeroloss-grey-900 mb-lg-5"
												style={{ width: '95%' }}>
												รายงานเหตุการณ์ (เรื่องเล่า รูปภาพ)
											</div>
											<div className="event-detail-news-container h-850px overflow-y-scroll ps-0">
												{eventMessages.length === 0 && (
													<div className="text-center text-zeroloss-grey-500 my-10">
														ไม่มีข้อมูลรายงานเหตุการณ์
													</div>
												)}

												{eventMessages.length > 0 && (
													<React.Fragment>
														<div style={{ width: '95%' }} className="mx-auto mb-5">
															<FeatureNews
																{...eventMessages?.[0]}
																onClick={onViewDetailEventMessageForm}
															/>
														</div>

														{eventMessages.slice(1).map((item, index) => (
															<div
																key={index}
																style={{ width: '95%' }}
																className={clsx('mx-auto', {
																	'mb-5': index !== 9,
																})}>
																<NewsHorizontal {...item} onClick={onViewDetailEventMessageForm} />
															</div>
														))}

														{!isEventMessageMax && (
															<div className="text-center mt-5 no-print">
																<button
																	className="btn btn-zeroloss-primary btn-sm text-zeroloss-base-white w-100"
																	onClick={loadMoreEventMessage}>
																	ดูเพิ่มเติม
																</button>
															</div>
														)}
													</React.Fragment>
												)}
											</div>
										</div>

										<div className="col-12 col-lg-6">
											{isDefaultView && <EventDetailDefaultView />}
											{isMapView && <EventDetailMapView />}
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

				.hover-filter-brightness:hover {
					transiton: all 0.3s ease-in-out;
					filter: brightness(0.6);
				}

				.event-detail-news-container {
					-ms-overflow-style: none;
					scrollbar-width: none; 
				}

				.event-detail-news-container::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</React.Fragment>
	)
}

export default EventDetailView
