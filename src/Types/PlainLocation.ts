export interface PlainLocationProps {
	id: number
	nameTh: string
	nameEn: string
	locationTypeId: number
	latitude: number
	longitude: number
	popup?: React.FunctionComponent<any>
}
