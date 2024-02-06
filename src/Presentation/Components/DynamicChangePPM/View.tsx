import React from 'react'

import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { formatNumberCommas } from '@/Utils/formatNumberCommas'
import clsx from 'clsx'

interface Props {
	value: number
	isPositive: boolean
	change: number
}

const DynamicChangePPM: React.FC<Props> = ({ value, isPositive, change }) => {
	const { mode } = useThemeMode()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return (
		<div className="d-flex flex-row align-items-center">
			<span
				className={clsx('fw-bold fs-1 me-2', {
					'text-zeroloss-base-white': themeMode === 'dark',
					'text-zeroloss-grey-900': themeMode === 'light',
				})}>
				{formatNumberCommas(value)}
			</span>
			<span className="text-zeroloss-grey-400 fs-3 me-5">ppm</span>
			<span>
				<i
					className={clsx('bi fs-2', {
						'text-zeroloss-success-500 bi-arrow-up': isPositive,
						'text-zeroloss-error-500 bi-arrow-down': !isPositive,
					})}></i>
			</span>
			<span
				className={clsx('fs-6 fw-bold', {
					'text-zeroloss-success-500': isPositive,
					'text-zeroloss-error-500': !isPositive,
				})}>
				{formatNumberCommas(change)} %
			</span>
		</div>
	)
}

export default DynamicChangePPM
