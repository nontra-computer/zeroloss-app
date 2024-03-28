import React, { createElement, useRef, useMemo } from 'react'
import { Icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { PlainLocationProps } from '@/Types/PlainLocation'

const PlainLocation: React.FC<PlainLocationProps> = ({
	id,
	nameTh,
	nameEn,
	locationTypeId,
	latitude,
	longitude,
}) => {
	const markerRef = useRef<any>(null)

	return <React.Fragment></React.Fragment>
}

export default PlainLocation
