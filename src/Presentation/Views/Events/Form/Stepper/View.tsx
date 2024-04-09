import React from 'react'
import useViewModel from './ViewModel'
import clsx from 'clsx'

const EventFormStepper: React.FC = () => {
	const { steppers } = useViewModel()

	return (
		<div className="timeline">
			{steppers.map((s, idx) => (
				<div className="timeline-item" key={`stepper-${idx}`}>
					<div
						className={clsx('timeline-line w-40px border-left-2px', {
							'border-left-zeroloss-primary': s.status,
						})}></div>
					<div className="timeline-icon symbol symbol-circle symbol-40px me-4">
						<div className="symbol-label bg-light">
							<img
								src={s.status ? '/media/stepper/blue-check.svg' : '/media/stepper/pending.svg'}
								className="w-30px h-30px"
								alt="Stepper Icon"
							/>
						</div>
					</div>

					<div className="timeline-content mb-10 mt-n1">
						<div className="fs-4 fw-bold text-zeroloss-grey-700">
							{s.id}. {s.title}
						</div>
						<div className="mt-1 text-zeroloss-grey-600">{s.description}</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default EventFormStepper
