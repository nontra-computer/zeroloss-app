export interface IncidentEventDetailPopupProps {
    open: boolean
    onClose: () => void
    img: string
    title: string
    description: string
    start: string;
    end: string;
    location: string;
    locationName: string;
}
