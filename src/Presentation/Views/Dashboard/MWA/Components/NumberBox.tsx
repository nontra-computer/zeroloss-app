import React from 'react'
import { Tooltip } from 'react-tooltip'
import { formatNumberAbbreviation } from '@/Utils/formatNumberAbbreviation'
import { formatNumberCommas } from '@/Utils/formatNumberCommas'
import clsx from 'clsx'

interface Props {
	id: string
	title: string
	type: 'success' | 'warning' | 'danger' | 'none'
	value: number
}

const NumberBox: React.FC<Props> = ({ id, title, type, value }) => {
	return (
		<div className="card h-100 border border-zeroloss-grey-200">
			<div
				style={{ minHeight: '15px' }}
				className={clsx('card-header px-0 h-15px', {
					'bg-zeroloss-success': type === 'success',
					'bg-zeroloss-warning': type === 'warning',
					'bg-zeroloss-error': type === 'danger',
					'bg-zeroloss-none': type === 'none',
				})}></div>
			<div
				className={clsx('card-body px-4 py-4', {
					'bg-zeroloss-success-25': type === 'success',
					'bg-zeroloss-warning-25': type === 'warning',
					'bg-zeroloss-error-25': type === 'danger',
					'bg-zeroloss-none-25': type === 'none',
				})}>
				<p className="fs-3 fw-bolder my-0 text-zeroloss-grey-900">{title}</p>

				<div className="d-flex align-items-end h-100">
					<div id={id} className="fs-5x fs-lg-7x fw-bolder text-zeroloss-grey-900">
						{formatNumberAbbreviation(value)}
					</div>
				</div>
				<Tooltip anchorSelect={`#${id}`} className='fs-5'>{formatNumberCommas(value)}</Tooltip>
			</div>
		</div>
	)
}

export default NumberBox
