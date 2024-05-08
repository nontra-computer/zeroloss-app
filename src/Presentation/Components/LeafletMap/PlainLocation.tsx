import React, { createElement, useRef } from 'react'
import { Icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { PlainLocationProps } from '@/Types/PlainLocation'

const PlainLocation: React.FC<PlainLocationProps> = ({
	id,
	nameTh,
	nameEn,
	locationTypeId,
	locationType,
	latitude,
	longitude,
	popup,
}) => {
	const icon = new Icon({
		iconUrl: '/media/icons/zeroloss/map/cluster/success.svg',
		iconSize: [40, 40],
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
				mouseover: event => event.target.openPopup(),
			}}>
			{popup && (
				<Popup closeButton={false}>
					{createElement(popup, {
						latitude,
						longitude,
						id,
						nameTh,
						nameEn,
						locationTypeId,
						locationType,
					})}
				</Popup>
			)}
		</Marker>
	)
}

export default PlainLocation
