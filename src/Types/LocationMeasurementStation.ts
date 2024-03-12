export interface LocationMeasurementStationProps {
	position: {
		lat: number
		lng: number
	}
	draggable?: boolean
	popup?: React.FunctionComponent<any>
}
