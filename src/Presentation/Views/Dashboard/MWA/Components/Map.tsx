import React, { useState, useEffect } from 'react'
import { Stage, Layer } from 'react-konva'
import KonvaImage from '@/Presentation/Components/Konva/Image/View'
import Select from 'react-select'
import { useIntl } from 'react-intl'

const Map: React.FC = () => {
	const intl = useIntl()
	const [stageDimensions, setStageDimensions] = useState({ width: 0, height: 0 })
	const [showStage, setShowStage] = useState(false)

	useEffect(() => {
		const updateStageDimensions = () => {
			const container = document.getElementById('mwa-menu-container')

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
					<div className="fs-2 fw-bolder text-zeroloss-grey-900">
						{intl.formatMessage({
							id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.MEASUREMENT_TITLE',
						})}
					</div>
					<p className="fs-6 text-zeroloss-grey-600">
						{intl.formatMessage({
							id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.MEASUREMENT_DESCRIPTION',
						})}
					</p>
				</div>

				<div className="w-200px">
					<Select
						className="shadow-sm"
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
							control: provided => ({
								...provided,
								borderRadius: '8px',
							}),
						}}
						components={{
							IndicatorSeparator: () => null,
						}}
					/>
				</div>
			</div>

			<div
				id="mwa-menu-container"
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
								style={{ height: '70%', background: 'rgba(255, 255, 255, 0.80)' }}>
								<div className="card-body p-4 h-100">
									<div
										className="d-flex flex-row align-items-center mb-3"
										style={{ columnGap: '12px' }}>
										<div className="fs-1 text-zeroloss-primary fw-bold d-inline-block">
											{intl.formatMessage({
												id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEARHER_TITLE',
											})}
										</div>
										<div className="border-radius-6px badge bg-zeroloss-base-white border border-zeroloss-grey-200">
											<span className="me-2 bullet bullet-dot bg-success h-6px w-6px animation-blink"></span>
											Online
										</div>
									</div>

									<div className="card bg-zeroloss-base-white border-radius-12px mb-3 h-25">
										<div className="card-body p-4">
											<div className="fs-2 text-zeroloss-primary fw-bold mb-5">
												{intl.formatMessage({
													id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEARHER_WIND',
												})}
											</div>

											{/* Wind */}
											<i className="d-inline-block bi bi-wind text-zeroloss-grey-600 fs-2x"></i>
											<div className="ms-2 d-inline-block fs-4 fw-semibold text-zeroloss-grey-600">
												NE 2.6 m/s
											</div>
										</div>
									</div>

									<div
										className="card bg-zeroloss-base-white border-radius-12px"
										style={{ height: '60%' }}>
										<div className="card-body p-4">
											{/* Temperature */}
											<div className="mb-7">
												<i className="d-inline-block bi bi-thermometer-high text-zeroloss-grey-600 fs-2x"></i>
												<div className="ms-2 d-inline-block fs-4 fw-semibold text-zeroloss-grey-600">
													Temperature : 30C
												</div>
											</div>

											{/* Water / Droplet */}
											<div className="mb-7">
												<i className="d-inline-block bi bi-droplet-fill text-zeroloss-grey-600 fs-2x"></i>
												<div className="ms-2 d-inline-block fs-4 fw-semibold text-zeroloss-grey-600">
													RH : 60%
												</div>
											</div>

											{/* Pressure */}
											<div className="mb-7">
												<i
													className="d-inline-block bi bi-unindent text-zeroloss-grey-600 fs-2x"
													style={{ transform: 'rotate(270deg)' }}></i>
												<div className="ms-2 d-inline-block fs-4 fw-semibold text-zeroloss-grey-600">
													Pressure : 1024 mBar
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Status */}
							<div
								className="card border-12px"
								style={{ height: '30%', background: 'rgba(255, 255, 255, 0.80)' }}>
								<div className="card-body p-4 h-100">
									<div className="card bg-zeroloss-base-white border-radius-12px mb-3 h-100">
										<div className="card-body p-4">
											<div className="d-flex flex-column justify-content-center h-100">
												<div className="mb-3">
													<span className="me-2 bullet bullet-dot bg-zeroloss-error h-12px w-12px p-2"></span>
													<span className="fs-4">
														{intl.formatMessage({
															id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEARHER_EXCEEDS',
														})}
													</span>
												</div>

												<div className="mb-3">
													<span className="me-2 bullet bullet-dot bg-zeroloss-success h-12px w-12px p-2"></span>
													<span className="fs-4">
														{intl.formatMessage({
															id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEARHER_NORMAL',
														})}
													</span>
												</div>

												<div className="mb-3">
													<span className="me-2 bullet bullet-dot bg-zeroloss-warning h-12px w-12px p-2"></span>
													<span className="fs-4">
														{intl.formatMessage({
															id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEARHER_CLOSE_TO_EXCEEDS',
														})}
													</span>
												</div>

												<div className="mb-3">
													<span className="me-2 bullet bullet-dot bg-zeroloss-grey h-12px w-12px p-2"></span>
													<span className="fs-4">
														{intl.formatMessage({
															id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEARHER_UNAVAILABLE',
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
