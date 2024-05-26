import React, { createElement, useRef, useMemo } from 'react'
import { Icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { EventWithStatusProps } from '@/Types/EventWithStatus'

const EventWithStatusPopup: React.FC<EventWithStatusProps> = ({
	id,
	type,
	draggable,
	popup,
	position,
	title,
	img,
	detail,
	eventTypeId,
	eventType,
	eventSubTypeTitle,
	hideViewMore,
	showNavigate,
}) => {
	const EventTypeIdIcon = new Icon({
		iconUrl: `/media/event-type/${eventTypeId}.svg`,
		iconSize: [40, 40],
		className:
			'bg-zeroloss-base-white rounded-circle shadow-lg border-2 border-zeroloss-base-white p-2',
	})

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

	// eslint-disable-next-line
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
			icon={EventTypeIdIcon}
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
						id,
						lat: position.lat,
						lng: position.lng,
						title,
						img,
						detail,
						eventTypeId,
						eventType,
						eventSubTypeTitle,
						hideViewMore,
						showNavigate,
					})}
				</Popup>
			)}
		</Marker>
	)
}

export default EventWithStatusPopup
