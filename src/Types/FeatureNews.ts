export interface FeatureNewsProps {
	id?: number
	detail: string
	date: string
	img: string | null
	onClick?: (id: number) => void
}
