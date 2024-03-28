import { KTSVG } from '@/_metronic/helpers'
import React from 'react'
import { WIND_TO } from '@/Configuration/Wind'

interface Props {
	title: string
	direction: number
	temp: number
	rh: number
	bp: number
	windTo: number
	windDeg: number
	ws: number
}

const WindPopup: React.FC<Props> = ({ title, windDeg, windTo, temp, rh, bp, ws }) => {
	const generateValue = (value: any, unit: string) => {
		if (value === undefined || value === null) {
			return '-'
		} else {
			return value + ' ' + unit
		}
	}

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
						<div className="text-zeroloss-base-white text-start mb-1">
							WS : {generateValue(ws, 'm/s')}
						</div>
						<div className="text-zeroloss-base-white text-start mb-1">
							{/* @ts-ignore */}
							WD : {generateValue(windDeg, `Deg ${WIND_TO[windTo] ?? ''}`)}
						</div>
						<div className="text-zeroloss-base-white text-start mb-1">
							Temp : {generateValue(temp, '°C')}
						</div>
						<div className="text-zeroloss-base-white text-start mb-1">
							RH : {generateValue(rh, '%')}
						</div>
						<div className="text-zeroloss-base-white text-start mb-3">
							BP :{generateValue(bp, 'HHmg')}
						</div>

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
