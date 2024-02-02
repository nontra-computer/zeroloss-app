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
			const container = document.getElementById('measurement-map-container')

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
						{/* {intl.formatMessage({
							id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.MEASUREMENT_TITLE',
						})} */}
						ระบบการเฝ้าระวัง Chlorine
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
				id="measurement-map-container"
				className="card border-12px h-600px border border-zeroloss-grey-200 p-0 overflow-hidden">
				<div
					className="card-body position-relative"
					style={{
						backgroundImage: 'url("/media/maps/building.svg")',
						backgroundOrigin: 'center',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'contain',
					}}>
					<div className="row h-100">
						<div className="col-9">
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
						<div className="col-3 h-100">
							<div className="d-flex justify-content-start align-items-end h-100 w-100">
								{/* Status */}
								<div className="card border-0 shadow-none w-100 bg-transparent">
									<div className="card-body p-4 h-100">
										<div className="card bg-zeroloss-grey border-radius-12px mb-3 h-100">
											<div className="card-body p-4">
												<div className="d-flex flex-column justify-content-center h-100">
													<div className="mb-3">
														<span className="me-2 bullet bullet-dot bg-zeroloss-error h-12px w-12px p-2"></span>
														<span className="fs-4 text-zeroloss-base-white">
															{intl.formatMessage({
																id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEARHER_EXCEEDS',
															})}
														</span>
													</div>

													<div className="mb-3">
														<span className="me-2 bullet bullet-dot bg-zeroloss-success h-12px w-12px p-2"></span>
														<span className="fs-4 text-zeroloss-base-white">
															{intl.formatMessage({
																id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEARHER_NORMAL',
															})}
														</span>
													</div>

													<div className="mb-3">
														<span className="me-2 bullet bullet-dot bg-zeroloss-warning h-12px w-12px p-2"></span>
														<span className="fs-4 text-zeroloss-base-white">
															{intl.formatMessage({
																id: 'ZEROLOSS.DASHBOARD.MWA_MEASUREMENT.WEARHER_CLOSE_TO_EXCEEDS',
															})}
														</span>
													</div>

													<div className="mb-3">
														<span className="me-2 bullet bullet-dot bg-zeroloss-none h-12px w-12px p-2"></span>
														<span className="fs-4 text-zeroloss-base-white">
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
