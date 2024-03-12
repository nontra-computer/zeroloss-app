import React, { createElement, useRef } from 'react'
import { Icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { LocationMeasurementStationProps } from '@/Types/LocationMeasurementStation'

const LocationMeasurementStation: React.FC<LocationMeasurementStationProps> = ({
	draggable,
	position,
	popup,
}) => {
	const StationIcon = new Icon({
		iconUrl: '/media/icons/zeroloss/map/measurement/station-1.svg',
		iconSize: [60, 60],
	})
	const markerRef = useRef<any>(null)

	return (
		<Marker
			ref={markerRef}
			icon={StationIcon}
			draggable={draggable}
			position={position}
			eventHandlers={{
				mouseover: event => event.target.openPopup(),
			}}>
			{popup && (
				<Popup closeButton={false}>
					{createElement(popup, {
						lat: position.lat,
						lng: position.lng,
					})}
				</Popup>
			)}
		</Marker>
	)
}

export default LocationMeasurementStation
