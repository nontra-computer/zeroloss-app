export interface IncidentEventDetailPopupProps {
	open: boolean
	onClose: () => void
	img?: string
	title?: string
	detail?: string
	start?: string | null
	end?: string | null
	location?: string
	locationName?: string
}
