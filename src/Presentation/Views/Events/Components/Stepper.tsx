import React from 'react'
import clsx from 'clsx'

interface Props {
	steppers: any[]
}

const EventStepper: React.FC<Props> = ({ steppers }) => {
	return (
		<div className="timeline">
			{steppers.map((s, idx) => {
				let icon = '/media/stepper/blue-check.svg'
				if (s.status === 'done') {
					icon = '/media/stepper/blue-check.svg'
				} else if (s.status === 'active') {
					icon = '/media/stepper/active.svg'
				} else if (s.status === 'pending') {
					icon = '/media/stepper/pending.svg'
				}

				return (
					<div className="timeline-item" key={`stepper-${idx}`}>
						<div
							className={clsx('timeline-line w-40px border-left-2px', {
								'border-left-zeroloss-primary': s.status === 'done',
							})}></div>
						<div className="timeline-icon symbol symbol-circle symbol-40px me-4">
							<div className="symbol-label bg-light">
								<img src={icon} className="w-30px h-30px" alt="Stepper Icon" />
							</div>
						</div>

						<div
							className={clsx('timeline-content mb-10 mt-n1 p-3 rounded-3', {
								'bg-zeroloss-soft-warning-3 shadow-sm': s.status === 'active',
							})}>
							<div className="fs-4 fw-bold text-zeroloss-grey-700">
								{s.id}. {s.title}
							</div>
							<div
								className={clsx('mt-1 text-zeroloss-grey-600', {
									'text-zeroloss-grey-600': s.status !== 'active',
									'text-zeroloss-error-800': s.status === 'active',
								})}>
								{s.description}
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default EventStepper
