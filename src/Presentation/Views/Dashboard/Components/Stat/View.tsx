import React from 'react'
import NumberBox from '@/Presentation/Components/NumberBox/View'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import clsx from 'clsx'

const StatZoneView: React.FC = () => {
	const { mode } = useThemeMode()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return (
		<React.Fragment>
			<div className="row g-5">
				<div className="col-6 col-lg-2">
					<NumberBox id="accident" title="Accident" type="danger" value={51} />
					<div className="mt-2 d-flex flex-row justify-content-between">
						<div>
							แจ้งเหตุ{' '}
							<span
								className={clsx('ms-1 fw-bolder text-zeroloss-success-700', {
									'text-zeroloss-success-500': themeMode === 'dark',
									'text-zeroloss-success-700': themeMode === 'light',
								})}>
								3
							</span>
						</div>
						<div>
							Lv. 1{' '}
							<span
								className={clsx('ms-1 fw-bolder text-zeroloss-success-700', {
									'text-zeroloss-success-500': themeMode === 'dark',
									'text-zeroloss-success-700': themeMode === 'light',
								})}>
								3
							</span>
						</div>
						<div>
							Lv. 2{' '}
							<span
								className={clsx('ms-1 fw-bolder text-zeroloss-success-700', {
									'text-zeroloss-success-500': themeMode === 'dark',
									'text-zeroloss-success-700': themeMode === 'light',
								})}>
								3
							</span>
						</div>
						<div>
							Lv. 3{' '}
							<span
								className={clsx('ms-1 fw-bolder text-zeroloss-success-700', {
									'text-zeroloss-success-500': themeMode === 'dark',
									'text-zeroloss-success-700': themeMode === 'light',
								})}>
								3
							</span>
						</div>
					</div>
				</div>
				<div className="col-6 col-lg-2">
					<NumberBox id="nearMiss" title="Near Miss" type="warning" value={0} />
				</div>
				<div className="col-6 col-lg-2">
					<NumberBox id="surveillance" title="Surveillance" type="success" value={1} />
				</div>
				<div className="col-6 col-lg-2">
					<NumberBox id="maintenance" title="Maintenance" type="primary" value={3} />
					<div className="mt-2 d-flex flex-row justify-content-between">
						<div>
							รอดำเนินการ{' '}
							<span
								className={clsx('ms-1 fw-bolder text-zeroloss-success-700', {
									'text-zeroloss-success-500': themeMode === 'dark',
									'text-zeroloss-success-700': themeMode === 'light',
								})}>
								2
							</span>
						</div>
					</div>
				</div>
				<div className="col-6 col-lg-2">
					<NumberBox id="activities" title="Activities" type="info" value={2} />
					<div className="mt-2 d-flex flex-row justify-content-between">
						<div>
							รอดำเนินการ{' '}
							<span
								className={clsx('ms-1 fw-bolder text-zeroloss-success-700', {
									'text-zeroloss-success-500': themeMode === 'dark',
									'text-zeroloss-success-700': themeMode === 'light',
								})}>
								2
							</span>
						</div>
					</div>
				</div>
				<div className="col-6 col-lg-2">
					<NumberBox id="measurement" title="Measurement" type="soft-info" value={1} />
				</div>
			</div>
		</React.Fragment>
	)
}

export default StatZoneView
