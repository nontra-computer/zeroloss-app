export interface NewsHorizontalProps {
	detail: string
	date: string
	img: string | null
	id?: number
	onClick?: (id: number) => void
}
