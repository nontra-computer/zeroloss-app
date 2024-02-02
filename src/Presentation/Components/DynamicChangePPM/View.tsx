import clsx from 'clsx'
import React from 'react'
import { formatNumberCommas } from '@/Utils/formatNumberCommas'

interface Props {
	value: number
	isPositive: boolean
	change: number
}

const DynamicChangePPM: React.FC<Props> = ({ value, isPositive, change }) => {
	return (
		<div className="d-flex flex-row align-items-center">
			<span className="text-zeroloss-grey-900 fw-bold fs-1 me-2">{formatNumberCommas(value)}</span>
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
