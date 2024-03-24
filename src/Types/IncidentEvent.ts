import { EventContentArg } from '@fullcalendar/core/index.js'

export interface IncidentEventProps extends EventContentArg {
	type: number
	name: string
	detail: string
	img: string
	onClick: (id: string) => void
}
