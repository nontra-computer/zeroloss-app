export interface LocationMeasurementStationProps {
	position: {
		lat: number
		lng: number
	}
	draggable?: boolean
	popup?: React.FunctionComponent<any>
	onClick?: (data: any) => void
	id?: number
	measurementTypeId?: number
	title?: string
	state?: number
	status?: boolean
	dataStatus?: any
}
