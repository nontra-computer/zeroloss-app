import React, { createElement, useRef } from 'react'
import { Icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { WindDirectionProps } from '@/Types/WindDirection'
import 'leaflet-rotatedmarker'

const WindDirection: React.FC<WindDirectionProps> = ({ draggable, popup, position, degree }) => {
	const WindIcon = new Icon({
		iconUrl: '/media/icons/zeroloss/map/wind/arrow.svg',
		iconSize: [40, 40],
	})
	const markerRef = useRef<any>(null)

	return (
		<Marker
			ref={markerRef}
			icon={WindIcon}
			draggable={draggable}
			position={position}
			eventHandlers={{
				mouseover: event => event.target.openPopup(),
			}}
			rotationAngle={degree}>
			{popup && (
				<Popup closeButton={false}>
					{createElement(popup, {
						lat: position.lat,
						lng: position.lng,
						degree,
					})}
				</Popup>
			)}
		</Marker>
	)
}

export default WindDirection
