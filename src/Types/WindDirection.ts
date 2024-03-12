export interface WindDirectionProps {
	position: {
		lat: number
		lng: number
	}
	degree: number
	draggable?: boolean
	popup?: React.FunctionComponent<any>
}
