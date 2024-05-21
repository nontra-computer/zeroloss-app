import React, { useMemo } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { KTSVG } from '@/_metronic/helpers'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

import DraggableMarker from './Components/DragableMarker'

interface Props {
	position: { lat?: number; lng?: number; active?: boolean }[]
	popup?: React.FunctionComponent<any>
	setPosition?: (position: { lat: number; lng: number }) => void
	onClick?: (lat: number, long: number) => void
}

const FunctionalComponent: React.FC = () => {
	const map = useMapEvents({
		click: () => {
			// setPosition({
			// 	lat: e.latlng.lat,
			// 	lng: e.latlng.lng,
			// })
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

const MultipleLocationSelection: React.FC<Props> = ({
	popup,
	position = [],
	setPosition,
	onClick,
}) => {
	const center = { lat: 13.7563, lng: 100.5018 }

	const positionMemo = useMemo(() => {
		return position.map(pos => {
			return {
				lat: pos.lat,
				lng: pos.lng,
				active: pos.active,
			}
		})
	}, [position])

	return (
		<React.Fragment>
			<MapContainer
				center={center}
				zoom={8}
				scrollWheelZoom={true}
				dragging
				className="position-relative">
				<FunctionalComponent />
				<TileLayer
					attribution="@Copyright 2023 Kumopack"
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{positionMemo.map((pos, index) => (
					<React.Fragment key={`draggable-marker-${index}`}>
						{pos.lat && pos.lng ? (
							<DraggableMarker
								active={pos.active}
								popup={popup}
								position={{
									lat: pos.lat,
									lng: pos.lng,
								}}
								setPosition={setPosition}
								onClick={onClick}
							/>
						) : null}
					</React.Fragment>
				))}
			</MapContainer>

			<button
				id="get-current-location"
				className="position-absolute btn btn-sm btn-icon white-button"
				style={{ zIndex: 3, top: 180, left: 43 }}>
				<KTSVG path="/media/icons/duotune/maps/map007.svg" className="svg-icon svg-icon-2x" />
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

export default MultipleLocationSelection
