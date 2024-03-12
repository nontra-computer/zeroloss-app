export interface LocationShapeProps {
	type: 'polygon' | 'circle'
	position: {
		lat: number
		lng: number
	}[]
	radius?: number
	popup?: React.FunctionComponent<any>
}
