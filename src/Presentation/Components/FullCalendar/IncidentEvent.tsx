import React from 'react'
import { IncidentEventProps } from '@/Types/IncidentEvent'
import { Tooltip } from 'react-tooltip'
import clsx from 'clsx'
import moment from 'moment'
import 'moment/locale/th'

const IncidentEvent: React.FC<IncidentEventProps> = ({ type, name, event, onClick }) => {
	return (
		<React.Fragment>
			<div
				id={`incident-card-${event.id}`}
				className={clsx('incident-calendar-event border-radius-4px h-70px p-2 cursor-pointer', {
					'bg-zeroloss-error': type === 1,
					'bg-zeroloss-warning': type === 2,
					'bg-zeroloss-success': type === 3,
					'bg-zeroloss-primary': type === 4,
					'bg-zeroloss-brand-600': type === 5,
					'bg-zeroloss-primary-400': type === 6,
				})}
				onClick={() => onClick(event.id)}>
				<div className="text-zeroloss-base-white fw-bold fs-4">
					{moment(event.start).format('HH:mm')}
				</div>
				<div className="text-zeroloss-base-white fs-5 overflow-hidden">{name}</div>
			</div>

			<Tooltip anchorSelect={`#incident-card-${event.id}`}>
				<span className="fs-4">กดเพื่อดูรายละเอียด</span>
			</Tooltip>

			<style>{`
				.incident-calendar-event {
					transition: all 150ms;
				}

				.incident-calendar-event:hover {
					filter: brightness(0.8);
				}

				.incident-calendar-event:active {
					filter: brightness(0.6);
				}
			`}</style>
		</React.Fragment>
	)
}

export default IncidentEvent
