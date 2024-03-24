import React from 'react'
import NumberBox from '@/Presentation/Components/NumberBox/View'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useEventStore } from '@/Store/Event'
import clsx from 'clsx'

const StatZoneView: React.FC = () => {
	const { mode } = useThemeMode()
	const summary = useEventStore(state => state.summary)

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return (
		<React.Fragment>
			<div className="row g-5">
				<div className="col-6 col-lg-4 col-xxl-2 h-100">
					<NumberBox id="accident" title="Accident" type="danger" value={summary?.accident ?? 0} />
					<div className="mt-2 row fs-7">
						<div className="col-6 col-lg-3">
							แจ้งเหตุ{' '}
							<span
								className={clsx('ms-1 fw-bolder text-zeroloss-success-700', {
									'text-zeroloss-success-500': themeMode === 'dark',
									'text-zeroloss-success-700': themeMode === 'light',
								})}>
								{summary?.accidentDetail?.inform ?? 0}
							</span>
						</div>
						<div className="col-6 col-lg-3">
							Lv. 1{' '}
							<span
								className={clsx('ms-1 fw-bolder text-zeroloss-success-700', {
									'text-zeroloss-success-500': themeMode === 'dark',
									'text-zeroloss-success-700': themeMode === 'light',
								})}>
								{summary?.accidentDetail?.lv1 ?? 0}
							</span>
						</div>
						<div className="col-6 col-lg-3">
							Lv. 2{' '}
							<span
								className={clsx('ms-1 fw-bolder text-zeroloss-success-700', {
									'text-zeroloss-success-500': themeMode === 'dark',
									'text-zeroloss-success-700': themeMode === 'light',
								})}>
								{summary?.accidentDetail?.lv2 ?? 0}
							</span>
						</div>
						<div className="col-6 col-lg-3">
							Lv. 3{' '}
							<span
								className={clsx('ms-1 fw-bolder text-zeroloss-success-700', {
									'text-zeroloss-success-500': themeMode === 'dark',
									'text-zeroloss-success-700': themeMode === 'light',
								})}>
								{summary?.accidentDetail?.lv3 ?? 0}
							</span>
						</div>
					</div>
				</div>
				<div className="col-6 col-lg-4 col-xxl-2 h-100">
					<NumberBox
						id="nearMiss"
						title="Near Miss"
						type="warning"
						value={summary?.accidentDetail?.nearMiss ?? 0}
					/>
				</div>
				<div className="col-6 col-lg-4 col-xxl-2 h-100">
					<NumberBox
						id="surveillance"
						title="Surveillance"
						type="success"
						value={summary?.accidentDetail?.surveilance ?? 0}
					/>
				</div>
				<div className="col-6 col-lg-4 col-xxl-2 h-100">
					<NumberBox
						id="maintenance"
						title="Maintenance"
						type="primary"
						value={summary?.accidentDetail?.maintenance ?? 0}
					/>
					<div className="mt-2 d-flex flex-row justify-content-between">
						<div>
							รอดำเนินการ{' '}
							<span
								className={clsx('ms-1 fw-bolder text-zeroloss-success-700', {
									'text-zeroloss-success-500': themeMode === 'dark',
									'text-zeroloss-success-700': themeMode === 'light',
								})}>
								{summary?.accidentDetail?.waitMaintenance ?? 0}
							</span>
						</div>
					</div>
				</div>
				<div className="col-6 col-lg-4 col-xxl-2 h-100">
					<NumberBox
						id="activities"
						title="Activities"
						type="info"
						value={summary?.accidentDetail?.activity ?? 0}
					/>
					<div className="mt-2 d-flex flex-row justify-content-between">
						<div>
							รอดำเนินการ{' '}
							<span
								className={clsx('ms-1 fw-bolder text-zeroloss-success-700', {
									'text-zeroloss-success-500': themeMode === 'dark',
									'text-zeroloss-success-700': themeMode === 'light',
								})}>
								{summary?.accidentDetail?.waitActivity ?? 0}
							</span>
						</div>
					</div>
				</div>
				<div className="col-6 col-lg-4 col-xxl-2 h-100">
					<NumberBox
						id="measurement"
						title="Measurement"
						type="soft-info"
						value={summary?.accidentDetail?.measurement ?? 0}
					/>
				</div>
			</div>
		</React.Fragment>
	)
}

export default StatZoneView
