import React, { createElement, useRef } from 'react'
import { Icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { LocationMeasurementStationProps } from '@/Types/LocationMeasurementStation'

const LocationMeasurementStation: React.FC<LocationMeasurementStationProps> = ({
	draggable,
	position,
	popup,
	...props
}) => {
	const StationIcon = new Icon({
		iconUrl: `/media/measurement-type/${props.measurementTypeId ?? 1}.svg`,
		iconSize: [40, 40],
		className:
			'bg-zeroloss-base-white rounded-circle shadow-lg border-2 border-zeroloss-base-white p-2',
	})
	const markerRef = useRef<any>(null)

	return (
		<Marker
			ref={markerRef}
			icon={StationIcon}
			draggable={draggable}
			position={position}
			eventHandlers={{
				click: event => {
					event.target.openPopup()
				},
				// mouseover: event => event.target.openPopup(),
			}}>
			{popup && (
				<Popup closeButton={false}>
					{createElement(popup, {
						lat: position.lat,
						lng: position.lng,
						...props,
					})}
				</Popup>
			)}
		</Marker>
	)
}

export default LocationMeasurementStation
