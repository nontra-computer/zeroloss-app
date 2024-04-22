import React, { createElement, useEffect, useRef } from 'react'
import { Circle, Polygon } from 'react-leaflet'
import { Popup } from 'react-leaflet'
import { LocationShapeProps } from '@/Types/LocationPolygon'

const LocationShape: React.FC<LocationShapeProps> = ({ type, position, popup, radius }) => {
	const markerRef = useRef<any>(null)

	useEffect(() => {
		if (markerRef.current) {
			console.log('markerRef', markerRef.current)
		}
	}, [])

	return (
		<React.Fragment>
			{type === 'polygon' && (
				<Polygon
					ref={markerRef}
					// center={[13.736717, 100.523186, 13.80717]} radius={2000}
					positions={position}>
					{popup && position.length > 0 && (
						<Popup closeButton={false}>
							{createElement(popup, {
								lat: position?.[0]?.lat,
								lng: position?.[0]?.lng,
							})}
						</Popup>
					)}
				</Polygon>
			)}

			{type === 'circle' && (
				<React.Fragment>
					<Circle
						ref={markerRef}
						center={position?.[0]}
						radius={radius}
						pathOptions={{
							stroke: false,
							color: '#DBDE48',
							fillOpacity: 0.7,
						}}>
						{popup && position.length > 0 && (
							<Popup closeButton={false}>
								{createElement(popup, {
									lat: position?.[0]?.lat,
									lng: position?.[0]?.lng,
								})}
							</Popup>
						)}
					</Circle>

					<Circle
						center={position?.[0]}
						radius={(radius ?? 0) / 2}
						pathOptions={{
							stroke: false,
							color: '#EF510E',
							fillOpacity: 1,
						}}></Circle>

					<Circle
						center={position?.[0]}
						radius={(radius ?? 0) / 5}
						pathOptions={{
							stroke: false,
							color: '#D53918',
							fillOpacity: 1,
						}}></Circle>
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

export default LocationShape
