import React from 'react'
import { Tooltip } from 'react-tooltip'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { formatNumberAbbreviation } from '@/Utils/formatNumberAbbreviation'
import { formatNumberCommas } from '@/Utils/formatNumberCommas'
import clsx from 'clsx'

interface Props {
	id: string
	title: string
	type: 'success' | 'warning' | 'danger' | 'primary' | 'info' | 'soft-info' | 'none'
	value: number
	infos?: {
		label: string
		value: any
	}[]
	height?: number
}

const NumberBox: React.FC<Props> = ({ id, title, type, value, infos, height }) => {
	const { mode } = useThemeMode()
	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return (
		<div
			className={clsx('card border-1px', {
				'h-100': !height,
				[`h-${height}px`]: height,
				'border-zeroloss-grey-200': themeMode === 'light',
				'border-zeroloss-base-white': themeMode === 'dark',
			})}>
			<div
				style={{ minHeight: '15px' }}
				className={clsx('card-header px-0 h-15px', {
					'bg-zeroloss-primary': type === 'primary',
					'bg-zeroloss-success': type === 'success',
					'bg-zeroloss-warning': type === 'warning',
					'bg-zeroloss-error': type === 'danger',
					'bg-zeroloss-purple-1': type === 'info',
					'bg-zeroloss-primary-500': type === 'soft-info',
					'bg-zeroloss-none': type === 'none',
				})}></div>
			<div
				className={clsx('card-body px-4 py-4 border-radius-12px rounded-0 rounded-bottom', {
					'bg-zeroloss-primary-25':
						(type === 'primary' || type === 'soft-info') && themeMode === 'light',
					'bg-zeroloss-success-25': type === 'success' && themeMode === 'light',
					'bg-zeroloss-warning-25': type === 'warning' && themeMode === 'light',
					'bg-zeroloss-error-25': type === 'danger' && themeMode === 'light',
					'bg-zeroloss-purple-1-25': type === 'info' && themeMode === 'light',
					'bg-zeroloss-none-25': type === 'none' && themeMode === 'light',
					'bg-zeroloss-grey-true-800 border-zeroloss-base-white': themeMode === 'dark',
				})}>
				<p
					className={clsx('fs-3 fw-bolder my-0', {
						'text-zeroloss-base-white': themeMode === 'dark',
						'text-zeroloss-grey-900': themeMode === 'light',
					})}>
					{title}
				</p>

				<div
					className="d-flex flex-row align-items-end justify-content-between"
					style={{ columnGap: '12px' }}>
					<h1
						id={id}
						className={clsx('fs-5x fs-lg-7x fw-bolder my-0', {
							'text-zeroloss-success': type === 'success' && themeMode === 'dark',
							'text-zeroloss-warning': type === 'warning' && themeMode === 'dark',
							'text-zeroloss-error': type === 'danger' && themeMode === 'dark',
							'text-zeroloss-grey': type === 'none' && themeMode === 'dark',
							'text-zeroloss-grey-900': themeMode === 'light',
						})}>
						{formatNumberAbbreviation(value)}
					</h1>

					{infos && infos.length > 0 && (
						<div className="d-flex flex-column" style={{ gap: '8px' }}>
							{infos.map((info, index) => (
								<div key={`number-box-info-${index}`} className="fs-5">
									<span
										className={clsx('me-2', {
											'text-zeroloss-grey-900': themeMode === 'light',
											'text-zeroloss-base-white': themeMode === 'dark',
										})}>
										{info.label}
									</span>
									<span
										className={clsx(
											themeMode === 'light'
												? {
														'text-zeroloss-success-700': type === 'success',
														'text-zeroloss-warning-700': type === 'warning',
														'text-zeroloss-error-700': type === 'danger',
														'text-zeroloss-grey-700': type === 'none',
													}
												: {
														'text-zeroloss-success-500': type === 'success',
														'text-zeroloss-warning-500': type === 'warning',
														'text-zeroloss-error-500': type === 'danger',
														'text-zeroloss-grey-500': type === 'none',
													}
										)}>
										{info.value}
									</span>
								</div>
							))}
						</div>
					)}
				</div>
				<Tooltip anchorSelect={`#${id}`} className="fs-5">
					{formatNumberCommas(value)}
				</Tooltip>
			</div>
		</div>
	)
}

export default NumberBox
