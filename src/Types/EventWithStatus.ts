export interface EventWithStatusProps {
	type: 'success' | 'error' | 'warning'
	position: {
		lat: number
		lng: number
	}
	draggable?: boolean
	popup?: React.FunctionComponent<any>
	// Popup Props
	id?: number
	title?: string
	detail?: string
	img?: string
	eventTypeId?: number
	eventType?: {
		id: number
		name: string
	}
	eventSubTypeTitle?: string
}
