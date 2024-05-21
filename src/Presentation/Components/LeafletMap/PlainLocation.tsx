import React, { createElement, useRef } from 'react'
import { Icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { PlainLocationProps } from '@/Types/PlainLocation'

const PlainLocation: React.FC<PlainLocationProps> = ({ latitude, longitude, popup, ...props }) => {
	const icon = new Icon({
		iconUrl: `/media/location-type/${props.locationTypeId ?? 1}.svg`,
		iconSize: [40, 40],
		className:
			'bg-zeroloss-base-white rounded-circle shadow-lg border-2 border-zeroloss-base-white p-2',
	})
	const markerRef = useRef<any>(null)

	if (!latitude || !longitude) return null

	return (
		<Marker
			ref={markerRef}
			icon={icon}
			position={{
				lat: latitude,
				lng: longitude,
			}}
			eventHandlers={{
				click: event => {
					event.target.openPopup()
				},
				// mouseover: event => event.target.openPopup(),
			}}>
			{popup && (
				<Popup closeButton={false}>
					{createElement(popup, {
						...props,
					})}
				</Popup>
			)}
		</Marker>
	)
}

export default PlainLocation
