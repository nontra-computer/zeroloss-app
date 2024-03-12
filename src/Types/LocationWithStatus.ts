export interface LocationWithStatusProps {
	type: 'success' | 'error' | 'warning'
	position: {
		lat: number
		lng: number
	}
	draggable?: boolean
	popup?: React.FunctionComponent<any>
}
