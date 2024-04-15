import React from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { KTSVG } from '@/_metronic/helpers'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

import DraggableMarker from './Components/DragableMarker'

interface Props {
	position: { lat?: number; lng?: number }
	setPosition: (position: { lat: number; lng: number }) => void
}

const FunctionalComponent: React.FC<Props> = ({ setPosition }) => {
	const map = useMapEvents({
		click: e => {
			setPosition({
				lat: e.latlng.lat,
				lng: e.latlng.lng,
			})
		},
	})

	const moveToCurrentPosition = () => {
		if (navigator.geolocation) {
			navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
				if (result.state === 'granted') {
					toast.info('กำลังค้นหาตำแหน่งปัจจุบันของคุณ')

					navigator.geolocation.getCurrentPosition(geoLocation => {
						const { latitude, longitude } = geoLocation.coords
						map.setView({ lat: latitude, lng: longitude }, 15, { animate: true })
						// setPosition({ lat: latitude, lng: longitude })
					})
				} else if (result.state === 'prompt') {
					toast.info(
						'อนุญาติให้เข้าถึงตำแหน่งปัจจุบันของคุณ เพื่อให้เราสามารถแสดงตำแหน่งปัจจุบันของคุณได้'
					)

					navigator.geolocation.getCurrentPosition(geoLocation => {
						const { latitude, longitude } = geoLocation.coords
						map.setView({ lat: latitude, lng: longitude }, 15, { animate: true })
						// setPosition({ lat: latitude, lng: longitude })
					})
				} else if (result.state === 'denied') {
					Swal.fire({
						title: 'ไม่สามารถเข้าถึงตำแหน่งปัจจุบันได้',
						text: 'กรุณาอนุญาติให้เข้าถึงตำแหน่งปัจจุบันของคุณ',
						icon: 'error',
					})
				}
			})
		} else {
			Swal.fire({
				title: 'ไม่สามารถเข้าถึงตำแหน่งปัจจุบันได้',
				text: 'กรุณาตรวจสอบการอนุญาติให้เข้าถึงตำแหน่งปัจจุบันของคุณ',
				icon: 'error',
			})
		}
	}

	document.getElementById('get-current-location')?.addEventListener('click', moveToCurrentPosition)

	return null
}

const LocationSelection: React.FC<Props> = ({
	position: { lat = 13.7563, lng = 100.5018 },
	setPosition,
}) => {
	return (
		<React.Fragment>
			<MapContainer
				center={{
					lat: lat,
					lng: lng,
				}}
				zoom={13}
				scrollWheelZoom={true}
				dragging
				className="position-relative">
				<FunctionalComponent position={{ lat: lat, lng: lng }} setPosition={setPosition} />
				<TileLayer
					attribution="@Copyright 2024 Zeroloss"
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<DraggableMarker
					position={{
						lat: lat,
						lng: lng,
					}}
					setPosition={setPosition}
				/>
			</MapContainer>

			<button
				id="get-current-location"
				className="position-absolute btn btn-sm btn-icon white-button"
				style={{ zIndex: 3, top: 180, left: 43 }}>
				<KTSVG path="media/icons/duotune/maps/map007.svg" className="svg-icon svg-icon-2x" />
			</button>

			<style>{`
				#get-current-location {
					border: 2px solid rgba(0,0,0,0.2) !important;
					background-clip: padding-box !important;
					border-radius: 4px !important;
				}

				#get-current-location path {
					border-color: #101828 !important;
				}
			`}</style>
		</React.Fragment>
	)
}

export default LocationSelection
