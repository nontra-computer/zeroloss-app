import React from 'react'
import { KTSVG } from '@/_metronic/helpers'

interface Props {
	id: number
	title: string
	onClick: (id: number) => void
}

const MeasurementDetailPopup: React.FC<Props> = ({ id, title, onClick }) => {
	return (
		<React.Fragment>
			<div className="card bg-zeroloss-base-white min-h-50px min-w-250px">
				<div className="card-body p-5">
					<div>
						<h6 className="text-center text-zeroloss-base-black fw-bold fs-5">
							สถานีตรวจวัด: {title ?? '-'}
						</h6>
					</div>

					<div>
						<button
							className="btn btn-sm white-button text-zeroloss-base-black w-100"
							onClick={() => {
								if (id) onClick(id)
							}}>
							ดูเพิ่มเติม
							<KTSVG path="media/icons/zeroloss/red-arrow-narrow-up-right.svg" className="ms-1" />
						</button>
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

export default MeasurementDetailPopup
