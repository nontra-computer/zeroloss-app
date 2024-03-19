import React from 'react'
import Lottie from 'lottie-react'
import PhoneRotateLottie from '@/Assets/Lottie/phone-rotate.json'
import clsx from 'clsx'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'

const PhoneRotateCaution: React.FC = () => {
	const { mode } = useThemeMode()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return (
		<div
			className={clsx(
				'd-block d-sm-none card border-radius-12px border-1px p-0 overflow-hidden position-relative min-h-200px',
				{
					// 'h-100': !showStage,
					'bg-zeroloss-base-white border-zeroloss-grey-true-200': themeMode === 'light',
					'bg-zeroloss-grey-true-800 border-zeroloss-base-white': themeMode === 'dark',
				}
			)}>
			<div className="card-body">
				<Lottie
					animationData={PhoneRotateLottie}
					className=""
					loop={true}
					style={{
						height: '360px',
					}}
				/>
				<h3
					className={clsx('text-center', {
						'text-zeroloss-primary': themeMode === 'light',
						'text-zeroloss-base-white': themeMode === 'dark',
					})}>
					Please rotate your phone to view map
				</h3>
			</div>
		</div>
	)
}

export default PhoneRotateCaution
