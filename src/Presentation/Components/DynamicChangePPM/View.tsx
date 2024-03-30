import React from 'react'

import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { formatNumberCommas } from '@/Utils/formatNumberCommas'
import clsx from 'clsx'

interface Props {
	value: number
	arrow: boolean
	minus: boolean
	direction: 'up' | 'down'
	type: 'success' | 'warning' | 'danger'
	change: number
	valueColor?: 'black' | 'success' | 'warning' | 'danger'
}

const DynamicChangePPM: React.FC<Props> = ({
	arrow,
	minus,
	value,
	direction,
	type,
	change,
	valueColor,
}) => {
	const { mode } = useThemeMode()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	let valueColorClassLight = ''
	let valueColorClassDark = ''

	if (valueColor === 'black') {
		valueColorClassLight = 'text-zeroloss-grey-900'
		valueColorClassDark = 'text-zeroloss-base-white'
	}
	if (valueColor === 'success') {
		valueColorClassLight = 'text-zeroloss-success-600'
		valueColorClassDark = 'text-zeroloss-success-500'
	}
	if (valueColor === 'warning') {
		valueColorClassLight = 'text-zeroloss-warning-600'
		valueColorClassDark = 'text-zeroloss-warning-500'
	}
	if (valueColor === 'danger') {
		valueColorClassLight = 'text-zeroloss-error-600'
		valueColorClassDark = 'text-zeroloss-error-500'
	}

	return (
		<div className="d-flex flex-row align-items-center">
			<span
				className={clsx('fw-bold fs-1 me-2', {
					[valueColorClassDark]: themeMode === 'dark',
					[valueColorClassLight]: themeMode === 'light',
				})}>
				{formatNumberCommas(value)}
			</span>
			<span className="text-zeroloss-grey-400 fs-3 me-5">ppm</span>
			<span>
				<i
					className={clsx('bi fs-2', {
						'bi-dash': minus,
						'bi-arrow-up': arrow && direction === 'up',
						'bi-arrow-down': arrow && direction === 'down',
						'text-zeroloss-success-500': type === 'success',
						'text-zeroloss-warning-500': type === 'warning',
						'text-zeroloss-error-500': type === 'danger',
					})}></i>
			</span>
			<span
				className={clsx('fs-6 fw-bold', {
					'text-zeroloss-success-500': type === 'success',
					'text-zeroloss-warning-500': type === 'warning',
					'text-zeroloss-error-500': type === 'danger',
				})}>
				{formatNumberCommas(change)} %
			</span>
		</div>
	)
}

export default DynamicChangePPM
