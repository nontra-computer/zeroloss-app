import React from 'react'
import clsx from 'clsx'

interface Props {
	value: number
	type: 'success' | 'warning' | 'danger'
}

const Scale: React.FC<Props> = ({ value, type }) => {
	return (
		<div className="position-relative">
			<div className="progress bg-zeroloss-grey-200 shadow-sm">
				<div
					className={clsx('progress-bar', {
						'bg-zeroloss-success': type === 'success',
						'bg-zeroloss-warning': type === 'warning',
						'bg-zeroloss-error': type === 'danger',
					})}
					role="progressbar"
					aria-label="Basic example"
					style={{ width: `${value}%` }}
					aria-valuenow={value}
					aria-valuemin={0}
					aria-valuemax={100}></div>
			</div>
			<div
				className="h-40px w-5px bg-zeroloss-error-500 position-absolute top-50 translate-middle z-2 border-radius-12px"
				style={{ left: '60%' }}></div>
			<div
				className="h-40px w-5px bg-zeroloss-error-900 position-absolute top-50 translate-middle z-2 border-radius-12px"
				style={{ left: '90%' }}></div>
		</div>
	)
}

export default Scale
