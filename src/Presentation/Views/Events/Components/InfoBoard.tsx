import React from 'react'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import clsx from 'clsx'

interface Props {
	data: {
		label: string
		value: any
	}[]
}

const InfoBoard: React.FC<Props> = ({ data }) => {
	const { mode } = useThemeMode()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return (
		<React.Fragment>
			<div className="position-absolute" style={{ zIndex: 1000, right: '0.5%', bottom: '0.5%' }}>
				<div
					className="card border-radius-12px transition-300 overflow-hidden shadow-none"
					style={{
						height: 'auto',
						borderColor: 'transparent',
						backgroundColor: themeMode === 'light' ? 'transparent' : 'rgba(16, 24, 40, 0.8)',
					}}>
					<div
						className="card-body p-4 h-100"
						style={{
							backgroundColor: themeMode === 'light' ? 'transparent' : 'rgba(16, 24, 40, 0.8)',
						}}>
						<div
							className={clsx('card border-radius-12px mb-3 h-100 text-zeroloss-base-white', {
								'bg-zeroloss-grey': themeMode === 'light',
								'bg-zeroloss-grey-950 border-1px border-zeroloss-grey-true-200':
									themeMode === 'dark',
							})}>
							<div className="card-body p-4">
								<div className="d-flex flex-column justify-content-center h-100">
									{data.map(d => (
										<div className="mb-3 d-flex flex-row align-items-center">
											<span
												className={clsx(
													'me-2 bullet bullet-dot  h-12px w-12px p-2 border-zeroloss-base-white border-1px',
													{
														'bg-zeroloss-error': d.value === 1,
														'bg-zeroloss-warning': d.value === 2,
														'bg-zeroloss-success': d.value === 3,
														'bg-zeroloss-primary': d.value === 4,
														'bg-zeroloss-brand-600': d.value === 5,
														'bg-zeroloss-primary-400': d.value === 6,
													}
												)}></span>
											<span className="fs-6">{d.label}</span>
										</div>
									))}

									{/* <div className="mb-3 d-flex flex-row align-items-center">
										<span className="me-2 bullet bullet-dot bg-zeroloss-error h-12px w-12px p-2 border-zeroloss-base-white border-1px"></span>
										<span className="fs-6">เหตุการณ์ฉุกเฉิน</span>
									</div>

									<div className="mb-3 d-flex flex-row align-items-center">
										<span className="me-2 bullet bullet-dot bg-zeroloss-success h-12px w-12px p-2 border-zeroloss-base-white border-1px"></span>
										<span className="fs-6">พื้นที่มีการลักลอบทิ้งสารเคมี</span>
									</div>

									<div className="mb-3 d-flex flex-row align-items-center">
										<span className="me-2 bullet bullet-dot bg-zeroloss-warning h-12px w-12px p-2 border-zeroloss-base-white border-1px"></span>
										<span className="fs-6">พื้นที่ลักลอบทิ้งขยะ</span>
									</div>

									<div className="mb-3 d-flex flex-row align-items-center">
										<span className="me-2 bullet bullet-dot bg-zeroloss-grey h-12px w-12px p-2 border-zeroloss-base-white border-1px"></span>
										<span className="fs-6">พื้นที่รกร้าง</span>
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default InfoBoard
