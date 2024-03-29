import React from 'react'
import { NewsHorizontalProps } from '@/Types/NewsHorizontal'
import { KTSVG } from '@/_metronic/helpers'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import clsx from 'clsx'
import moment from 'moment'
import 'moment/locale/th'

const NewsHorizontal: React.FC<NewsHorizontalProps> = () => {
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
				className={clsx('news-horizontal-card card overflow-hidden h-100px w-100 shadow', {
					'bg-zeroloss-base-white border-0': themeMode === 'light',
					'bg-zeroloss-grey-true-800 border-zeroloss-base-white border-1px': themeMode === 'dark',
				})}>
				<div className="card-body p-0">
					<div className="row h-100px w-100 gx-0">
						<div className="col-4">
							<img
								src="/media/examples/incident-1.jpg"
								alt="Incident 1"
								className="w-100 h-100 object-fit-cover"
							/>
						</div>
						<div className="col-8">
							<div className="p-4 pt-1">
								<div className="d-flex flex-row align-items-center justify-content-between">
									<div
										className={clsx('', {
											'text-zeroloss-base-white': themeMode === 'dark',
											'text-zeroloss-grey-500': themeMode === 'light',
										})}>
										{moment().format('DD/MM/YYYY HH:mm')}
									</div>
									<button className="btn btn-sm btn-icon btn-active-light">
										<KTSVG path="media/icons/zeroloss/x-close.svg" />
									</button>
								</div>
								<h6
									className={clsx('new-title mt-2 fw-bold fs-4', {
										'text-zeroloss-base-white': themeMode === 'dark',
										'text-zeroloss-grey-900': themeMode === 'light',
									})}>
									ด่วน! เหตุเพลิงไหม้โรงงานพลาสติก จังหวัดนครปฐม
								</h6>
								<p
									className={clsx('new-description ', {
										'text-zeroloss-base-white': themeMode === 'dark',
										'text-zeroloss-grey-900': themeMode === 'light',
									})}>
									ระทึก 'ไฟไหม้' โรงงานผลิตกล่องโฟม ภายในนิคมอุต สาหกรรมโรจนะ ขณะนี้ยังไม่สามารถคุม
									<span className="ms-1 text-underline cursor-pointer">เพิ่มเติม</span>
								</p>
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

export default NewsHorizontal
