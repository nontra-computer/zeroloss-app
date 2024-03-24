import { KTSVG } from '@/_metronic/helpers'
import React from 'react'

interface Props {
	title: string
	direction: number
	speed: number
	temp: number
	rh: number
	bp: number
}

const WindPopup: React.FC<Props> = ({ title, direction, speed, temp, rh, bp }) => {
	return (
		<React.Fragment>
			<div className="card bg-zeroloss-primary min-h-200px min-w-150px">
				<div className="card-body p-5">
					<div className="position-relative rounded overflow-hidden shadow border-1px border-zeroloss-grey-600">
						<img
							src="/media/examples/windy-1.png"
							alt="incident-1"
							className="w-100 h-150px object-fit-cover"
						/>
					</div>
					<div className="mt-4 text-start">
						<h6 className="text-start text-zeroloss-base-white fw-bold fs-4">{title ?? '-'}</h6>
						<div className="text-zeroloss-base-white text-start mb-1">WS : {speed ?? 0} m/s</div>
						<div className="text-zeroloss-base-white text-start mb-1">
							WD : {direction ?? 0} Deg NE
						</div>
						<div className="text-zeroloss-base-white text-start mb-1">Temp : {temp ?? 0} Deg C</div>
						<div className="text-zeroloss-base-white text-start mb-1">RH : {rh ?? 0}%</div>
						<div className="text-zeroloss-base-white text-start mb-3">BP :{bp ?? 0} HHmg</div>

						<span className="cursor-pointer fw-bold text-zeroloss-base-white">
							รายละเอียดเพิ่มเติม
							<KTSVG path="media/icons/zeroloss/red-arrow-narrow-up-right.svg" className="ms-1" />
						</span>
					</div>
				</div>
			</div>

			<style>{`
                .leaflet-container .leaflet-popup-content-wrapper, .leaflet-popup {
                    background-color: transparent !important;
					box-shadow: none !important;
                }

                .leaflet-popup-content  {
                    min-width: 250px;
                    max-width: auto;
                }

                .leaflet-popup-tip-container {
                    display: none;
                }
            `}</style>
		</React.Fragment>
	)
}

export default WindPopup
