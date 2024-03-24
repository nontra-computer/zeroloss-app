export interface WindDirectionProps {
	position: {
		lat: number
		lng: number
	}
	degree: number
	draggable?: boolean
	popup?: React.FunctionComponent<any>
	title?: string
	direction?: number
	speed?: number
	temp?: number
	rh?: number
	bp?: number
}
