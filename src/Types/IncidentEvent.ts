import { EventContentArg } from '@fullcalendar/core/index.js'

export interface IncidentEventProps extends EventContentArg {
	type: number
	eventSubTypeTitle: string
	title: string
	detail: string
	img: string
	onClick: (id: any) => void
}
