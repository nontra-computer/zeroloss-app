import React from 'react'
import { NewsHorizontalProps } from '@/Types/NewsHorizontal'
// import { KTSVG } from '@/_metronic/helpers'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import clsx from 'clsx'
import moment from 'moment'
import 'moment/locale/th'

const NewsNotification: React.FC<NewsHorizontalProps> = ({ date, img, detail, id, onClick }) => {
	const { mode } = useThemeMode()
	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const isImage =
		(img ?? '').includes('.png') || (img ?? '').includes('.jpg') || (img ?? '').includes('.jpeg')

	const isVideo =
		(img ?? '').includes('.mp4') ||
		(img ?? '').includes('.avi') ||
		(img ?? '').includes('.mov') ||
		(img ?? '').includes('.flv')

	return (
		<React.Fragment>
			<div
				onClick={() => {
					if (id && onClick) {
						onClick(id)
					}
				}}
				className={clsx(
					'transition-150 hover-opacity news-horizontal-card card overflow-hidden min-h-50px w-100',
					{
						'bg-zeroloss-base-white border-zeroloss-grey-300 border-1px': themeMode === 'light',
						'bg-zeroloss-grey-true-800 border-zeroloss-base-white border-1px': themeMode === 'dark',
					}
				)}>
				<div className="card-body p-0">
					<div className="row min-h-50px w-100 gx-0">
						<div className="col-4">
							{isImage && (
								<img
									src={img ?? '/media/icons/zeroloss/default-placeholder.png'}
									onError={e => {
										e.currentTarget.src = '/media/icons/zeroloss/default-placeholder.png'
										e.currentTarget.onerror = null
									}}
									alt="Incident 1"
									className="object-fit-contain"
									style={{ maxWidth: '100%' }}
								/>
							)}
							{isVideo && (
								<video
									controls={false}
									autoPlay
									muted
									loop
									src={img ?? ''}
									className="object-fit-contain mx-auto"
									style={{ maxWidth: '100%', height: '150px' }}>
									Your browser does not support the video tag.
								</video>
							)}
						</div>
						<div className="col-8">
							<div className="p-4 pt-4">
								<div className="d-flex flex-row align-items-center justify-content-between">
									<div
										className={clsx('', {
											'text-zeroloss-base-white': themeMode === 'dark',
											'text-zeroloss-grey-500': themeMode === 'light',
										})}>
										{moment(date).tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm')}
									</div>
									{/* <button className="btn btn-sm btn-icon btn-active-light">
										<KTSVG path="media/icons/zeroloss/x-close.svg" />
									</button> */}
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

								<span className="ms-1 text-underline cursor-pointer d-block">เพิ่มเติม</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<style>{`
				.news-horizontal-card .new-title, .news-horizontal-card .new-description {
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.news-horizontal-card:hover {
					transition: all 150ms;
					cursor: pointer;
					filter: brightness(0.8);
				}

				.news-horizontal-card:active {
					transition: all 150ms;
					filter: brightness(0.6);
				}
			`}</style>
		</React.Fragment>
	)
}

export default NewsNotification
