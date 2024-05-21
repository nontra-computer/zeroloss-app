import React, { useMemo } from 'react'
import { KTSVG } from '@/_metronic/helpers'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { ToastContentProps } from 'react-toastify'
import clsx from 'clsx'
import moment from 'moment'
import 'moment/locale/th'
import { useEventStore } from '@/Store/Event'

interface Props extends ToastContentProps {
	id: number
	calledTime: string
	title: string
	detail: string
	galleries: any[]
	pictureCover: string
}

const EventAlert: React.FC<Props> = ({
	closeToast,
	id,
	calledTime,
	title,
	detail,
	galleries = [],
	pictureCover = null,
}) => {
	const { mode } = useThemeMode()
	const getEventMediaPath = useEventStore(state => state.getEventMediaPath)

	const findedPictureCover = useMemo(() => {
		// const finded = galleries.find(gallery => gallery.isPictureCover === true)

		// if (finded) {
		// 	return getEventMediaPath(finded.picturePath)
		// } else {
		// 	return '/media/icons/zeroloss/default-placeholder.png'
		// }

		if (pictureCover) {
			return getEventMediaPath(pictureCover)
		} else {
			return '/media/icons/zeroloss/default-placeholder.png'
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pictureCover])

	const onClick = () => {
		window.open(`/events/detail/${id}`, '_blank')
	}

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const onClose = () => {
		if (closeToast) {
			closeToast()
		}
	}

	return (
		<React.Fragment>
			<div
				className={clsx('alert-map-card card w-100 min-h-80px overflow-hidden shadow', {
					'bg-zeroloss-base-white border-1px border-zeroloss-grey-100': themeMode === 'light',
					'bg-zeroloss-grey-true-800 border-zeroloss-base-white border-1px': themeMode === 'dark',
				})}
				onClick={onClick}
				// style={{ right: '2%', top: '1.5%', zIndex: 1000 }}
			>
				<div className="card-body p-0">
					<div className="row min-h-80px w-100 gx-0">
						<div className="col-4">
							<img
								src={findedPictureCover}
								onError={e => {
									e.currentTarget.src = '/media/icons/zeroloss/default-placeholder.png'
									e.currentTarget.onerror = null
								}}
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
										{calledTime
											? moment(calledTime).format('DD/MM/YYYY HH:mm')
											: 'ไม่มีข้อมูลเวลาที่แจ้งเหตุ'}
									</div>
									<button className="btn btn-sm btn-icon btn-active-light" onClick={onClose}>
										<KTSVG path="media/icons/zeroloss/x-close.svg" />
									</button>
								</div>
								<h6
									className={clsx('alert-title mt-2 fw-bold fs-4', {
										'text-zeroloss-base-white': themeMode === 'dark',
										'text-zeroloss-grey-900': themeMode === 'light',
									})}>
									{title}
								</h6>
								<p
									className={clsx('alert-description ', {
										'text-zeroloss-base-white': themeMode === 'dark',
										'text-zeroloss-grey-900': themeMode === 'light',
									})}>
									{detail}
									<span className="ms-1 text-underline cursor-pointer" onClick={onClick}>
										เพิ่มเติม
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<style>{`
				.alert-map-card .alert-title {
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.alert-map-card .alert-description {
					display: -webkit-box;
					-webkit-line-clamp: 3s;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			`}</style>
		</React.Fragment>
	)
}

export default EventAlert
