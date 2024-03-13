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
					'bg-zeroloss-success-600': type === 'success',
					'bg-zeroloss-warning-500': type === 'warning',
					'bg-zeroloss-error-500': type === 'error',
					'bg-zeroloss-purple-1': type === 'info',
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
