import React from 'react'
import { FeatureNewsProps } from '@/Types/FeatureNews'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import clsx from 'clsx'
import moment from 'moment'
import 'moment/locale/th'

const FeatureNews: React.FC<FeatureNewsProps> = ({ date, detail, img }) => {
	const { mode } = useThemeMode()
	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return (
		<React.Fragment>
			<div
				className={clsx('feature-news-card card overflow-hidden min-h-200px w-100', {
					'bg-zeroloss-base-white border-zeroloss-grey-300 border-1px': themeMode === 'light',
					'bg-zeroloss-grey-true-800 border-zeroloss-base-white border-1px': themeMode === 'dark',
				})}>
				<div className="card-body p-0">
					<div className="h-150px">
						<img
							src={img ?? '/media/icons/zeroloss/default-placeholder.png'}
							onError={e => {
								e.currentTarget.src = '/media/icons/zeroloss/default-placeholder.png'
								e.currentTarget.onerror = null
							}}
							alt="Incident 1"
							className="w-100 h-100 object-fit-contain"
						/>
					</div>

					<div className="px-4 py-5">
						<div
							className={clsx('', {
								'text-zeroloss-base-white': themeMode === 'dark',
								'text-zeroloss-grey-500': themeMode === 'light',
							})}>
							{moment(date).tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm')}
						</div>
						{/* <h6
							className={clsx('new-title mt-2 fw-bold fs-4', {
								'text-zeroloss-base-white': themeMode === 'dark',
								'text-zeroloss-grey-900': themeMode === 'light',
							})}>
							ด่วน! เหตุเพลิงไหม้โรงงานพลาสติก จังหวัดนครปฐม
						</h6> */}
						<p
							className={clsx('new-description ', {
								'text-zeroloss-base-white': themeMode === 'dark',
								'text-zeroloss-grey-900': themeMode === 'light',
							})}>
							{detail}
						</p>

						{/* <div className="mb-7">
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
								<span>Temperature : </span>
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
								<span>RH : </span>
								<span> 60%</span>
							</div>
						</div>

						<div>
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
								<span>Pressure : </span>
								<span> 1024 mBar</span>
							</div>
						</div> */}
					</div>
				</div>
			</div>
			<style>{`
                .feature-news-card .new-title, .feature-news-card .new-description {
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.feature-news-card .new-description {
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
            `}</style>
		</React.Fragment>
	)
}

export default FeatureNews
