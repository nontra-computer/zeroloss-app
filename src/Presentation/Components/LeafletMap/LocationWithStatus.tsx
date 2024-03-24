import React, { createElement, useRef, useMemo } from 'react'
import { Icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { LocationWithStatusProps } from '@/Types/LocationWithStatus'

const LocationWithStatus: React.FC<LocationWithStatusProps> = ({
	type,
	draggable,
	popup,
	position,
	title,
	img,
	detail,
	eventType,
}) => {
	const SuccessIcon = new Icon({
		iconUrl: '/media/icons/zeroloss/map/cluster/success.svg',
		iconSize: [40, 40],
	})
	const ErrorIcon = new Icon({
		iconUrl: '/media/icons/zeroloss/map/cluster/error.svg',
		iconSize: [40, 40],
	})
	const WarningIcon = new Icon({
		iconUrl: '/media/icons/zeroloss/map/cluster/warning.svg',
		iconSize: [40, 40],
	})
	const markerRef = useRef<any>(null)

	const icon = useMemo(() => {
		switch (type) {
			case 'success':
				return SuccessIcon
			case 'error':
				return ErrorIcon
			case 'warning':
				return WarningIcon
			default:
				return SuccessIcon
		}
		// eslint-disable-next-line
	}, [type])

	return (
		<Marker
			ref={markerRef}
			icon={icon}
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
						title,
						img,
						detail,
						eventType,
					})}
				</Popup>
			)}
		</Marker>
	)
}

export default LocationWithStatus
