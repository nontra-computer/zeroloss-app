export interface PlainLocationProps {
	id: number
	nameTh: string
	nameEn: string
	locationTypeId: number
	locationType?: string
	latitude: number
	longitude: number
	popup?: React.FunctionComponent<any>
	fullAddress?: string
	phone?: string
	mobile?: string
}
