import React from 'react'
import Select from 'react-select'
import PlantStation from '@/Presentation/Components/PlantStation/View'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { Tooltip } from 'react-tooltip'

import useViewModel from './ViewModel'
import clsx from 'clsx'

interface Props {
	onSelectBuilding: (id: string) => void
}

const Map: React.FC<Props> = ({ onSelectBuilding }) => {
	const {
		intl,
		expanded,
		setExpanded,
		stageDimensions,
		themeMode,
		isShowHover,
		onEndPanning,
		onStartPanning,
		dropdownOptions,
		buildingOne,
		buildingTwo,
		buildingThree,
		generateIcon,
	} = useViewModel()

	return (
		<React.Fragment>
			<div className="d-flex flex-row justify-content-between align-items-center">
				<div>
					<div
						className={clsx('fs-2 fw-bolder', {
							'text-zeroloss-base-white': themeMode === 'dark',
							'text-zeroloss-grey-900': themeMode === 'light',
						})}>
						{intl.formatMessage({
							id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.MEASUREMENT_TITLE',
						})}
					</div>
					<p
						className={clsx('fs-6', {
							'text-zeroloss-base-white': themeMode === 'dark',
							'text-zeroloss-grey-600': themeMode === 'light',
						})}>
						{intl.formatMessage({
							id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.MEASUREMENT_DESCRIPTION',
						})}
					</p>
				</div>

				<div className="w-300px">
					<Select
						className="shadow-sm transition-300"
						placeholder={'Select Building to View Measurement'}
						options={dropdownOptions}
						styles={{
							container: provided => ({
								...provided,
								width: '100%',
							}),
							control: (provided, state) => ({
								...provided,
								borderRadius: '8px',
								border:
									themeMode === 'dark'
										? state.isFocused
											? '2px solid #E5E5E5'
											: '1px solid #E5E5E5'
										: state.isFocused
											? '2px solid #07217f'
											: '1px solid #07217f',
								'&:hover': {
									border: themeMode === 'dark' ? '2px solid #E5E5E5' : '2px solid #07217f',
								},
								backgroundColor: themeMode === 'dark' ? 'transparent' : '#FFFFFF',
								boxShadow: themeMode === 'dark' ? 'none' : undefined,
								color: themeMode === 'dark' ? '#E5E5E5' : undefined,
							}),
							singleValue: provided => ({
								...provided,
								color: themeMode === 'dark' ? '#E5E5E5' : undefined,
								backgroundColor: themeMode === 'dark' ? 'transparent' : '#FFFFFF',
							}),
							placeholder: provided => ({
								...provided,
								color: themeMode === 'dark' ? '#a3a3a3' : undefined,
							}),
							menu: provided => ({
								...provided,
								borderRadius: '8px',
								backgroundColor: themeMode === 'dark' ? '#424242' : '#FFFFFF',
								color: themeMode === 'dark' ? '#E5E5E5' : undefined,
								zIndex: 1000,
							}),
							option: (provided, state) => ({
								...provided,
								backgroundColor: state.isSelected
									? themeMode === 'dark'
										? '#FFFFFF'
										: '#07217f'
									: themeMode === 'dark'
										? '#424242'
										: '#FFFFFF',
								color: state.isSelected
									? themeMode === 'dark'
										? '#424242'
										: '#FFFFFF'
									: themeMode === 'dark'
										? '#E5E5E5'
										: '#07217f',
								'&:hover': {
									backgroundColor: themeMode === 'dark' ? '#606060' : '#3351be',
									color: themeMode === 'dark' ? '#E5E5E5' : '#FFFFFF',
								},
							}),
						}}
						components={{
							IndicatorSeparator: () => null,
						}}
						onChange={e => {
							if (e) onSelectBuilding(e.value)
						}}
					/>
				</div>
			</div>

			{stageDimensions.height > 0 && (
				<React.Fragment>
					<div
						id="mwa-map-container"
						className={clsx('card border-radius-12px border-1px p-0 overflow-hidden', {
							// 'h-100': !showStage,
							'bg-zeroloss-base-white border-zeroloss-grey-true-200': themeMode === 'light',
							'bg-zeroloss-grey-true-800 border-zeroloss-base-white': themeMode === 'dark',
						})}
						style={{ height: stageDimensions.height }}>
						{buildingOne && (
							<Tooltip
								place="top"
								anchorSelect="#first-building-group"
								className="fs-3 fw-bold"
								style={{ zIndex: 10 }}
								isOpen={isShowHover}>
								<div className="position-relative">
									<img
										src={`/media/maps/${generateIcon(buildingOne?.id)}-time.svg`}
										height={50}
										alt="Green Time Icon"
										className="position-absolute"
										style={{ left: -70, top: -5 }}
									/>{' '}
									{buildingOne?.building}
								</div>
							</Tooltip>
						)}

						{buildingTwo && (
							<Tooltip
								place="top"
								anchorSelect="#second-building-group"
								className="fs-3 fw-bold"
								style={{ zIndex: 10 }}
								isOpen={isShowHover}>
								<div className="position-relative">
									<img
										src={`/media/maps/${generateIcon(buildingTwo?.id)}-time.svg`}
										height={50}
										alt="Green Time Icon"
										className="position-absolute"
										style={{ left: -70, top: -5 }}
									/>{' '}
									{buildingTwo?.building}
								</div>
							</Tooltip>
						)}

						{buildingThree && (
							<Tooltip
								place="top"
								anchorSelect="#third-building-group"
								className="fs-3 fw-bold"
								style={{ zIndex: 10 }}
								isOpen={isShowHover}>
								<div className="position-relative">
									<img
										src={`/media/maps/${generateIcon(buildingThree?.id)}-time.svg`}
										height={50}
										alt="Green Time Icon"
										className="position-absolute"
										style={{ left: -70, top: -5 }}
									/>{' '}
									{buildingThree?.building}
								</div>
							</Tooltip>
						)}

						<div className="card-body position-relative p-0">
							<TransformWrapper
								initialScale={0.8}
								minScale={0.8}
								centerOnInit
								disablePadding
								limitToBounds={false}
								onPanningStart={onStartPanning}
								onPanningStop={onEndPanning}
								maxScale={1.5}>
								{({ zoomIn, zoomOut }) => (
									<React.Fragment>
										<div
											className="position-absolute d-flex justify-content-start align-items-end"
											style={{ zIndex: 100, left: 20, top: stageDimensions.height - 100 }}>
											<div className="border-radius-4px overflow-hidden shadow transition-300 cursor-pointer">
												<div
													className="bg-zeroloss-base-white p-3 hover-enabled transition-300"
													onClick={() => zoomIn()}>
													<i className="bi bi-zoom-in text-zeroloss-grey-900 fs-5"></i>
												</div>
												<div
													className="bg-zeroloss-base-white p-3 hover-enabled transition-300"
													onClick={() => zoomOut()}>
													<i className="bi bi-zoom-out text-zeroloss-grey-900 fs-5"></i>
												</div>
											</div>
										</div>

										<div className="position-absolute p-4" style={{ zIndex: 100, right: 20 }}>
											<div
												className="card border-radius-12px mb-3 transition-300"
												style={{
													height: '70%',
													background:
														themeMode === 'light'
															? 'rgba(255, 255, 255, 0.80)'
															: 'rgba(20, 20, 20, 0.80)',
												}}>
												<div className="card-body p-4 h-100">
													<div
														className={clsx('d-flex flex-row align-items-center mb-3', {
															'justify-content-start': expanded,
															'justify-content-between': !expanded,
														})}
														style={{ columnGap: '12px' }}>
														<div
															className={clsx('fs-4 fw-bold d-inline-block', {
																'd-none': !expanded,
																'd-block': expanded,
																'text-zeroloss-primary': themeMode === 'light',
																'text-zeroloss-base-white': themeMode === 'dark',
															})}>
															{intl.formatMessage({
																id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEATHER_TITLE',
															})}
														</div>
														<div
															className={clsx(
																'border-radius-6px badge text-zeroloss-grey-900 bg-zeroloss-base-white border border-zeroloss-grey-200'
															)}>
															<span className="me-2 bullet bullet-dot bg-success h-6px w-6px animation-blink"></span>
															Online
														</div>
														<div
															className="cursor-pointer ms-4 text-end"
															onClick={() => setExpanded(prevState => !prevState)}>
															<i
																className={clsx('bi fs-1 fw-bold', {
																	'bi-list': !expanded,
																	'bi-x-lg': expanded,
																	'text-zeroloss-grey-600': themeMode === 'light',
																	'text-zeroloss-base-white': themeMode === 'dark',
																})}></i>
														</div>
													</div>

													<div
														className={clsx('card border-radius-12px mb-3', {
															'h-0 border-0 overflow-y-hidden': !expanded,
															'h-25 border-1px': expanded,
															'bg-zeroloss-base-white': themeMode === 'light',
															'zeroloss-background-grey-opacity border-zeroloss-grey-true-200':
																themeMode === 'dark',
														})}>
														<div className="card-body p-4">
															<div
																className={clsx('fs-5 fw-bold mb-5', {
																	'text-zeroloss-primary': themeMode === 'light',
																	'text-zeroloss-base-white': themeMode === 'dark',
																})}>
																{intl.formatMessage({
																	id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEATHER_WIND',
																})}
															</div>

															<i
																className={clsx('d-inline-block bi bi-wind fs-4', {
																	'text-zeroloss-grey-600': themeMode === 'light',
																	'text-zeroloss-base-white': themeMode === 'dark',
																})}></i>
															<div
																className={clsx('ms-2 d-inline-block fs-5 fw-semibold', {
																	'text-zeroloss-base-white': themeMode === 'dark',
																	'text-zeroloss-grey-600': themeMode === 'light',
																})}>
																NE 2.6 m/s
															</div>
														</div>
													</div>

													<div
														className={clsx('card border-radius-12px', {
															'bg-zeroloss-base-white': themeMode === 'light',
															'zeroloss-background-grey-opacity border-1px border-zeroloss-grey-true-200':
																themeMode === 'dark',
														})}
														style={{ height: '60%' }}>
														<div className="card-body p-4">
															<div
																className={clsx({
																	'd-none': expanded,
																	'd-block': expanded,
																})}>
																<i
																	className={clsx('d-inline-block bi bi-wind fs-4', {
																		'text-zeroloss-grey-600': themeMode === 'light',
																		'text-zeroloss-base-white': themeMode === 'dark',
																	})}></i>
																<div
																	className={clsx('ms-2 d-inline-block fs-5 fw-semibold', {
																		'text-zeroloss-base-white': themeMode === 'dark',
																		'text-zeroloss-grey-600': themeMode === 'light',
																	})}>
																	<span
																		className={clsx({
																			'd-none': !expanded,
																			'd-inline-block': expanded,
																		})}>
																		NE :{' '}
																	</span>
																	<span>2.6 m/s</span>
																</div>
															</div>

															<hr
																className={clsx({
																	'd-block': !expanded,
																	'd-none': expanded,
																})}
															/>

															<div className="mb-7">
																<i
																	className={clsx('d-inline-block bi bi-thermometer-high fs-4', {
																		'text-zeroloss-base-white': themeMode === 'dark',
																		'text-zeroloss-grey-600': themeMode === 'light',
																	})}></i>
																<div
																	className={clsx('ms-2 d-inline-block fs-5 fw-semibold', {
																		'text-zeroloss-base-white': themeMode === 'dark',
																		'text-zeroloss-grey-600': themeMode === 'light',
																	})}>
																	<span
																		className={clsx({
																			'd-none': !expanded,
																			'd-inline-block': expanded,
																		})}>
																		Temperature :{' '}
																	</span>
																	<span> 30C</span>
																</div>
															</div>

															<div className="mb-7">
																<i
																	className={clsx('d-inline-block bi bi-droplet-fill fs-5', {
																		'text-zeroloss-base-white': themeMode === 'dark',
																		'text-zeroloss-grey-600': themeMode === 'light',
																	})}></i>
																<div
																	className={clsx('ms-2 d-inline-block fs-5 fw-semibold', {
																		'text-zeroloss-base-white': themeMode === 'dark',
																		'text-zeroloss-grey-600': themeMode === 'light',
																	})}>
																	<span
																		className={clsx({
																			'd-none': !expanded,
																			'd-inline-block': expanded,
																		})}>
																		RH :{' '}
																	</span>
																	<span> 60%</span>
																</div>
															</div>

															<div className="mb-7">
																<i
																	className={clsx('d-inline-block bi bi-unindent fs-2', {
																		'text-zeroloss-base-white': themeMode === 'dark',
																		'text-zeroloss-grey-600': themeMode === 'light',
																	})}
																	style={{ transform: 'rotate(270deg)' }}></i>
																<div
																	className={clsx('ms-2 d-inline-block fs-5 fw-semibold', {
																		'text-zeroloss-base-white': themeMode === 'dark',
																		'text-zeroloss-grey-600': themeMode === 'light',
																	})}>
																	<span
																		className={clsx({
																			'd-none': !expanded,
																			'd-inline-block': expanded,
																		})}>
																		Pressure :{' '}
																	</span>
																	<span> 1024 mBar</span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div
												className="card border-radius-12px transition-300"
												style={{
													height: 'auto',
													background:
														themeMode === 'light'
															? 'rgba(255, 255, 255, 0.80)'
															: 'rgba(20, 20, 20, 0.80)',
												}}>
												<div className="card-body p-4 h-100">
													<div
														className={clsx('card border-radius-12px mb-3 h-100', {
															'bg-zeroloss-base-white': themeMode === 'light',
															'zeroloss-background-grey-opacity border-1px border-zeroloss-grey-true-200':
																themeMode === 'dark',
														})}>
														<div className="card-body p-4">
															<div className="d-flex flex-column justify-content-center h-100">
																<div className="mb-3">
																	<span className="me-2 bullet bullet-dot bg-zeroloss-error h-12px w-12px p-2"></span>
																	<span className="fs-6">
																		{intl.formatMessage({
																			id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEATHER_EXCEEDS',
																		})}
																	</span>
																</div>

																<div className="mb-3">
																	<span className="me-2 bullet bullet-dot bg-zeroloss-success h-12px w-12px p-2"></span>
																	<span className="fs-6">
																		{intl.formatMessage({
																			id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEATHER_NORMAL',
																		})}
																	</span>
																</div>

																<div className="mb-3">
																	<span className="me-2 bullet bullet-dot bg-zeroloss-warning h-12px w-12px p-2"></span>
																	<span className="fs-6">
																		{intl.formatMessage({
																			id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEATHER_CLOSE_TO_EXCEEDS',
																		})}
																	</span>
																</div>

																<div className="mb-3">
																	<span className="me-2 bullet bullet-dot bg-zeroloss-grey h-12px w-12px p-2"></span>
																	<span className="fs-6">
																		{intl.formatMessage({
																			id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEATHER_UNAVAILABLE',
																		})}
																	</span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<TransformComponent wrapperClass="">
											<PlantStation />
										</TransformComponent>
									</React.Fragment>
								)}
							</TransformWrapper>

							{/* <MapInteractionCSS showControls>
						<PlantStation />
					</MapInteractionCSS> */}

							{/* {showStage && (
						<Stage
							ref={stageRef}
							width={stageDimensions.width}
							height={stageDimensions.height}
							scaleX={scale}
							scaleY={scale}
							draggable>
							<Layer>
								<KonvaImage image="/media/maps/plant-station-master.svg" />
							</Layer>
						</Stage>
					)} */}
						</div>
					</div>
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

export default Map
