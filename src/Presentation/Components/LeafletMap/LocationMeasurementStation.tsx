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
	const status = props.status ?? false
	const state = props.state ?? 0
	const dataStatus = props.dataStatus ?? false
	let iconColor = 'black'

	if (state === 0) {
		iconColor = 'black'
	} else if (state == 2) {
		iconColor = 'blue'
	} else if (state === 1 && status === true && dataStatus === true) {
		iconColor = 'green'
	} else if (state === 1 && status === false && dataStatus === false) {
		iconColor = 'grey'
	} else if (state === 1 && status === true && dataStatus === false) {
		iconColor = 'red'
	}

	const StationIcon = new Icon({
		iconUrl: `/media/measurement-type/${props.measurementTypeId ?? 1}/${iconColor}.svg`,
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
