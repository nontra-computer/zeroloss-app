import React, { useState, useEffect } from 'react'
import { Stage, Layer } from 'react-konva'
import KonvaImage from '@/Presentation/Components/Konva/Image/View'
import Select from 'react-select'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import clsx from 'clsx'

interface Props {
	onSelectBuilding: (id: string) => void
}

const Map: React.FC<Props> = ({ onSelectBuilding }) => {
	const intl = useIntl()
	const [stageDimensions, setStageDimensions] = useState({ width: 0, height: 0 })
	const [showStage, setShowStage] = useState(false)
	const { mode } = useThemeMode()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	useEffect(() => {
		const updateStageDimensions = () => {
			const container = document.getElementById('mwa-map-container')

			if (container) {
				setStageDimensions({
					width: container.getBoundingClientRect().width,
					height: container.getBoundingClientRect().height,
				})
				setShowStage(true)
			}
		}

		// Update dimensions initially
		updateStageDimensions()

		// Update dimensions whenever the window is resized
		window.addEventListener('resize', updateStageDimensions)

		// Clean up event listener when the component is unmounted
		return () => {
			window.removeEventListener('resize', updateStageDimensions)
		}
	}, [])

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

				<div className="w-200px">
					<Select
						className="shadow-sm transition-300"
						defaultValue={{ label: '1. CHLORINE Station 1', value: '1' }}
						options={[
							{
								label: '1. CHLORINE Station 1',
								value: '1',
							},
							{
								label: '2. CHLORINE Station 2',
								value: '2',
							},
							{
								label: '3. CHLORINE Station 3',
								value: '3',
							},
						]}
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
						onChange={e => {
							if (e) onSelectBuilding(e.value)
						}}
					/>
				</div>
			</div>

			<div
				id="mwa-map-container"
				className="card border-12px h-100 border border-zeroloss-grey-200 p-0 overflow-hidden">
				<div
					className="card-body position-relative"
					style={{ backgroundImage: 'url("/media/maps/plant-station.svg")' }}>
					<div className="row h-100">
						<div className="col-7">
							<div className="d-flex justify-content-start align-items-end h-100">
								<div className="border-radius-4px overflow-hidden shadow transition-300 cursor-pointer">
									<div className="bg-zeroloss-base-white p-3 hover-enabled transition-300">
										<i className="bi bi-zoom-in text-zeroloss-grey-900 fs-5"></i>
									</div>
									<div className="bg-zeroloss-base-white p-3 hover-enabled transition-300">
										<i className="bi bi-zoom-out text-zeroloss-grey-900 fs-5"></i>
									</div>
								</div>
							</div>
						</div>
						<div className="col-5 h-100">
							{/* Weather Info */}
							<div
								className="card border-radius-12px mb-3"
								style={{
									height: '70%',
									background:
										themeMode === 'light' ? 'rgba(255, 255, 255, 0.80)' : 'rgba(20, 20, 20, 0.80)',
								}}>
								<div className="card-body p-4 h-100">
									<div
										className="d-flex flex-row align-items-center mb-3"
										style={{ columnGap: '12px' }}>
										<div
											className={clsx('fs-1 fw-bold d-inline-block', {
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
									</div>

									<div
										className={clsx('card border-radius-12px mb-3 h-25', {
											'bg-zeroloss-base-white': themeMode === 'light',
											'zeroloss-background-grey-opacity border-1px border-zeroloss-grey-true-200':
												themeMode === 'dark',
										})}>
										<div className="card-body p-4">
											<div
												className={clsx('fs-2 fw-bold mb-5', {
													'text-zeroloss-primary': themeMode === 'light',
													'text-zeroloss-base-white': themeMode === 'dark',
												})}>
												{intl.formatMessage({
													id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEATHER_WIND',
												})}
											</div>

											{/* Wind */}
											<i
												className={clsx('d-inline-block bi bi-wind fs-2x', {
													'text-zeroloss-grey-600': themeMode === 'light',
													'text-zeroloss-base-white': themeMode === 'dark',
												})}></i>
											<div
												className={clsx('ms-2 d-inline-block fs-4 fw-semibold', {
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
											{/* Temperature */}
											<div className="mb-7">
												<i
													className={clsx('d-inline-block bi bi-thermometer-high fs-2x', {
														'text-zeroloss-base-white': themeMode === 'dark',
														'text-zeroloss-grey-600': themeMode === 'light',
													})}></i>
												<div
													className={clsx('ms-2 d-inline-block fs-4 fw-semibold', {
														'text-zeroloss-base-white': themeMode === 'dark',
														'text-zeroloss-grey-600': themeMode === 'light',
													})}>
													Temperature : 30C
												</div>
											</div>

											{/* Water / Droplet */}
											<div className="mb-7">
												<i
													className={clsx('d-inline-block bi bi-droplet-fill fs-2x', {
														'text-zeroloss-base-white': themeMode === 'dark',
														'text-zeroloss-grey-600': themeMode === 'light',
													})}></i>
												<div
													className={clsx('ms-2 d-inline-block fs-4 fw-semibold', {
														'text-zeroloss-base-white': themeMode === 'dark',
														'text-zeroloss-grey-600': themeMode === 'light',
													})}>
													RH : 60%
												</div>
											</div>

											{/* Pressure */}
											<div className="mb-7">
												<i
													className={clsx('d-inline-block bi bi-unindent fs-2x', {
														'text-zeroloss-base-white': themeMode === 'dark',
														'text-zeroloss-grey-600': themeMode === 'light',
													})}
													style={{ transform: 'rotate(270deg)' }}></i>
												<div
													className={clsx('ms-2 d-inline-block fs-4 fw-semibold', {
														'text-zeroloss-base-white': themeMode === 'dark',
														'text-zeroloss-grey-600': themeMode === 'light',
													})}>
													Pressure : 1024 mBar
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Status */}
							<div
								className="card border-radius-12px"
								style={{
									height: '30%',
									background:
										themeMode === 'light' ? 'rgba(255, 255, 255, 0.80)' : 'rgba(20, 20, 20, 0.80)',
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
													<span className="fs-4">
														{intl.formatMessage({
															id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEATHER_EXCEEDS',
														})}
													</span>
												</div>

												<div className="mb-3">
													<span className="me-2 bullet bullet-dot bg-zeroloss-success h-12px w-12px p-2"></span>
													<span className="fs-4">
														{intl.formatMessage({
															id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEATHER_NORMAL',
														})}
													</span>
												</div>

												<div className="mb-3">
													<span className="me-2 bullet bullet-dot bg-zeroloss-warning h-12px w-12px p-2"></span>
													<span className="fs-4">
														{intl.formatMessage({
															id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEATHER_CLOSE_TO_EXCEEDS',
														})}
													</span>
												</div>

												<div className="mb-3">
													<span className="me-2 bullet bullet-dot bg-zeroloss-grey h-12px w-12px p-2"></span>
													<span className="fs-4">
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
					</div>
					{/* {showStage && (
						<Stage width={stageDimensions.width} height={stageDimensions.height}>
							<Layer>
								<KonvaImage image="/media/maps/plant-station.svg" />
							</Layer>
						</Stage>
					)} */}
				</div>
			</div>
		</React.Fragment>
	)
}

export default Map
