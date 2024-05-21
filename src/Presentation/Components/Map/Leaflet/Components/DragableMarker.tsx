import { createElement, useRef } from 'react'
import { Icon, LeafletMouseEvent } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'

interface Props {
	draggable?: boolean
	popup?: React.FunctionComponent<any>
	active?: boolean
	position: {
		lat: number
		lng: number
	}
	setPosition?: (position: { lat: number; lng: number }) => void
	onClick?: (lat: number, long: number) => void
}

const MarkerCustomIcon = new Icon({
	iconUrl: '/media/icons/zeroloss/red-location-marker.svg',
	iconSize: [40, 40],
})

const MarkerCustomIconActive = new Icon({
	iconUrl: '/media/icons/zeroloss/green-location-marker.svg',
	iconSize: [40, 40],
})

const DraggableMarker: React.FC<Props> = ({
	active,
	popup,
	position,
	setPosition,
	draggable,
	onClick,
}) => {
	const markerRef = useRef<any>(null)

	return (
		<Marker
			draggable={draggable}
			eventHandlers={{
				dragend() {
					const marker = markerRef.current
					if (marker != null && setPosition) {
						setPosition(marker.getLatLng())
					}
				},
				click(e: LeafletMouseEvent) {
					if (onClick) {
						onClick(e.latlng.lat, e.latlng.lng)
					}
				},
				mouseover() {
					if (markerRef) markerRef.current.openPopup()
				},
				mouseout() {
					if (markerRef) markerRef.current.closePopup()
				},
			}}
			position={position}
			ref={markerRef}
			icon={active ? MarkerCustomIconActive : MarkerCustomIcon}>
			{popup && (
				<Popup minWidth={90}>
					{createElement(popup, {
						lat: position.lat,
						lng: position.lng,
					})}
				</Popup>
			)}
		</Marker>
	)
}

export default DraggableMarker
