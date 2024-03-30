import React from 'react'
import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { IncidentEventDetailPopupProps } from '@/Types/IncidentEventDetailPopup'
import { KTSVG } from '@/_metronic/helpers'
import clsx from 'clsx'
import moment from 'moment'
import 'moment/locale/th'

const IncidentEventDetailPopup: React.FC<IncidentEventDetailPopupProps> = ({
	open,
	onClose,
	title,
	detail,
	img,
	start,
	end,
	locationName,
}) => {
	const { mode } = useThemeMode()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const modalsRoot = document.getElementById('root-modals') || document.body

	return createPortal(
		<Modal
			size="sm"
			id="kt_modal_multiple_location_selection_modal"
			tabIndex={-1}
			aria-hidden="true"
			dialogClassName="modal-fullscreen-lg-down modal-lg modal-dialog modal-dialog-centered"
			show={open}
			onHide={onClose}
			backdrop={true}>
			<div className="modal-content">
				<div
					className={clsx(
						'modal-body py-lg-10 px-lg-10 min-h-300px position-relative border-2px rounded',
						{
							'border-zeroloss-primary-700': themeMode === 'light',
							'border-zeroloss-base-white': themeMode === 'dark',
						}
					)}>
					<div className="d-flex flex-row align-items-center justify-content-between">
						<div className="d-flex flex-row align-items-center">
							<span className="me-2">
								<i
									className={clsx('bi bi-calendar-check fs-2', {
										'text-zeroloss-grey-900': themeMode === 'light',
										'text-zeroloss-base-white': themeMode === 'dark',
									})}></i>
							</span>
							<span>
								{moment(start).format('DD/MM/YYYY HH:mm')} -{' '}
								{moment(end).format('DD/MM/YYYY HH:mm')}
							</span>
						</div>

						<button
							className="btn btn-sm btn-bg-white btn-active-light-danger text-center"
							onClick={onClose}>
							<KTSVG
								path="media/icons/duotune/arrows/arr015.svg"
								className="svg-icon svg-icon-2x mx-auto"
							/>
						</button>
					</div>

					<div className="rounded-3 shadow overflow-hidden mt-4">
						<img
							className="object-fit-cover h-200px w-100"
							src={img ?? '/media/icons/zeroloss/default-placeholder.png'}
							onError={e => {
								e.currentTarget.src = '/media/icons/zeroloss/default-placeholder.png'
							}}
							alt={title}
						/>
					</div>

					<div className="mt-10">
						<h3
							className={clsx('fs-6', {
								'text-zeroloss-primary': themeMode === 'light',
								'text-zeroloss-base-white': themeMode === 'dark',
							})}>
							{title}
						</h3>
						<p
							className={clsx('fs-5', {
								'text-zeroloss-grey-900': themeMode === 'light',
								'text-zeroloss-base-white': themeMode === 'dark',
							})}>
							{detail}
						</p>
					</div>

					{/* <div className="mt-10 d-flex flex-row align-items-center">
						<span className="me-2">
							<i
								className={clsx('bi bi-geo-alt-fill fs-2', {
									'text-zeroloss-grey-900': themeMode === 'light',
									'text-zeroloss-base-white': themeMode === 'dark',
								})}></i>
						</span>
						<span>ชื่อเขต หน่วยงาน</span>
					</div> */}

					<div className="mt-4 d-flex flex-row align-items-center">
						<span className="me-2">
							<i
								className={clsx('bi bi-houses-fill fs-2', {
									'text-zeroloss-grey-900': themeMode === 'light',
									'text-zeroloss-base-white': themeMode === 'dark',
								})}></i>
						</span>
						<span>{locationName}</span>
					</div>
				</div>
			</div>
		</Modal>,
		modalsRoot
	)
}
export default IncidentEventDetailPopup
