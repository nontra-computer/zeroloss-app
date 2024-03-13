import { EventContentArg } from '@fullcalendar/core/index.js'

export interface IncidentEventProps extends EventContentArg {
	type: 'success' | 'warning' | 'error' | 'info'
	name: string
	description: string
	img: string
	onClick: (id: string) => void
}
