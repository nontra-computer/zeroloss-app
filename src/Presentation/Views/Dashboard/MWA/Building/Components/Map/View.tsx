import React from 'react'
import Select from 'react-select'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Station1 from '@/Presentation/Components/Building/Station1/View'
import Station2 from '@/Presentation/Components/Building/Station2/View'
import Station3 from '@/Presentation/Components/Building/Station3/View'
import PhoneRotateCaution from '@/Presentation/Components/PhoneRotateCaution/View'
import clsx from 'clsx'

import useViewModel from './ViewModel'

interface Props {
	onSelectBuilding: (id: string) => void
}

const Map: React.FC<Props> = ({ onSelectBuilding }) => {
	const {
		isLargeMobile,
		isStation1,
		isStation2,
		isStation3,
		station1Sensor,
		station2Sensor,
		station3Sensor,
		intl,
		themeMode,
		stageDimensions,
		currentDropdownOption,
		stationDropdownOptions,
		onStartPanning,
		onEndPanning,
		wrapperRef,
	} = useViewModel()

	return (
		<React.Fragment>
			<div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-5 mb-lg-0">
				<div>
					<div
						className={clsx('fs-2 fw-bolder', {
							'text-zeroloss-base-white': themeMode === 'dark',
							'text-zeroloss-grey-900': themeMode === 'light',
						})}>
						{intl.formatMessage({
							id: 'ZEROLOSS.DASHBOARD.BUILDING_MWA_MEASUREMENT.MEASUREMENT_TITLE',
						})}
					</div>
					<p
						className={clsx('fs-6', {
							'text-zeroloss-base-white': themeMode === 'dark',
							'text-zeroloss-grey-600': themeMode === 'light',
						})}>
						{intl.formatMessage({
							id: 'ZEROLOSS.DASHBOARD.BUILDING_MWA_MEASUREMENT.MEASUREMENT_DESCRIPTION',
						})}
					</p>
				</div>

				<div className="w-100 w-lg-200px">
					<Select
						className="shadow-sm"
						options={stationDropdownOptions}
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
							menu: provided => ({
								...provided,
								borderRadius: '8px',
								backgroundColor: themeMode === 'dark' ? '#424242' : '#FFFFFF',
								color: themeMode === 'dark' ? '#E5E5E5' : undefined,
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
						value={currentDropdownOption}
						onChange={e => {
							if (e) onSelectBuilding(e.value)
						}}
					/>
				</div>
			</div>

			{/* begin:: Building */}
			<div
				id="measurement-map-container"
				className="d-none d-sm-block card border-12px border border-zeroloss-grey-200 p-0 overflow-hidden">
				<div
					className="card-body position-relative"
					style={{
						height: isLargeMobile ? '500px' : '45vh',
					}}>
					<TransformWrapper
						ref={wrapperRef}
						initialScale={0.8}
						minScale={0.7}
						centerOnInit
						centerZoomedOut
						limitToBounds={false}
						smooth
						onPanningStart={onStartPanning}
						onPanningStop={onEndPanning}
						zoomAnimation={{
							animationType: 'easeInOutQuad',
						}}
						maxScale={1.5}>
						{({ zoomIn, zoomOut }) => (
							<div className="position-relative w-100 h-100">
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

								<div
									className="position-absolute p-4"
									style={{ zIndex: 100, right: 20, top: stageDimensions.height - 220 }}>
									<div
										className="card border-radius-12px transition-300 overflow-hidden shadow-none"
										style={{
											height: 'auto',
											borderColor: 'transparent',
											backgroundColor:
												themeMode === 'light' ? 'transparent' : 'rgba(16, 24, 40, 0.8)',
										}}>
										<div
											className="card-body p-4 h-100"
											style={{
												backgroundColor:
													themeMode === 'light' ? 'transparent' : 'rgba(16, 24, 40, 0.8)',
											}}>
											<div
												className={clsx(
													'card border-radius-12px mb-3 h-100 text-zeroloss-base-white',
													{
														'bg-zeroloss-grey': themeMode === 'light',
														'bg-zeroloss-grey-950 border-1px border-zeroloss-grey-true-200':
															themeMode === 'dark',
													}
												)}>
												<div className="card-body p-4">
													<div className="d-flex flex-column justify-content-center h-100">
														<div className="mb-3 d-flex flex-row align-items-center">
															<span className="me-2 bullet bullet-dot bg-zeroloss-error h-12px w-12px p-2 border-zeroloss-base-white border-1px"></span>
															<span className="fs-6">
																{intl.formatMessage({
																	id: 'ZEROLOSS.DASHBOARD.BUILDING_MWA_MEASUREMENT.WEATHER_EXCEEDS',
																})}
															</span>
														</div>

														<div className="mb-3 d-flex flex-row align-items-center">
															<span className="me-2 bullet bullet-dot bg-zeroloss-success h-12px w-12px p-2 border-zeroloss-base-white border-1px"></span>
															<span className="fs-6">
																{intl.formatMessage({
																	id: 'ZEROLOSS.DASHBOARD.BUILDING_MWA_MEASUREMENT.WEATHER_NORMAL',
																})}
															</span>
														</div>

														<div className="mb-3 d-flex flex-row align-items-center">
															<span className="me-2 bullet bullet-dot bg-zeroloss-warning h-12px w-12px p-2 border-zeroloss-base-white border-1px"></span>
															<span className="fs-6">
																{intl.formatMessage({
																	id: 'ZEROLOSS.DASHBOARD.BUILDING_MWA_MEASUREMENT.WEATHER_CLOSE_TO_EXCEEDS',
																})}
															</span>
														</div>

														<div className="mb-3 d-flex flex-row align-items-center">
															<span className="me-2 bullet bullet-dot bg-zeroloss-grey h-12px w-12px p-2 border-zeroloss-base-white border-1px"></span>
															<span className="fs-6">
																{intl.formatMessage({
																	id: 'ZEROLOSS.DASHBOARD.BUILDING_MWA_MEASUREMENT.WEATHER_UNAVAILABLE',
																})}
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<TransformComponent>
									{isStation1 && <Station1 isDark={themeMode === 'dark'} {...station1Sensor} />}
									{isStation2 && <Station2 isDark={themeMode === 'dark'} {...station2Sensor} />}
									{isStation3 && <Station3 isDark={themeMode === 'dark'} {...station3Sensor} />}
								</TransformComponent>
							</div>
						)}
					</TransformWrapper>
				</div>
			</div>
			{/* end:: Building */}

			{/* begin:: Mobile Caution */}
			<PhoneRotateCaution />
			{/* end:: Mobile Caution */}
		</React.Fragment>
	)
}

export default Map
