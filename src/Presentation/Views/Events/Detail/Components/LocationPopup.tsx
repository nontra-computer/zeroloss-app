import React from 'react'

interface Props {
	nameTh: string
	locationType: string
	address: string
	phone: string
	mobile: string
}

const LocationPopup: React.FC<Props> = ({
	nameTh = '',
	locationType = '',
	address = '-',
	phone = '-',
	mobile = '-',
}) => {
	return (
		<React.Fragment>
			<div className="card min-h-100px min-w-250px bg-zeroloss-primary">
				<div className="card-body p-5">
					<div className="text-zeroloss-base-white fw-bold fs-4">{nameTh}</div>
					<div className="text-zeroloss-base-white fs-6">{locationType}</div>

					<div className="text-zeroloss-base-white fs-7 mt-4 text-start">ที่อยู่</div>
					<p className="text-zeroloss-base-white text-start">{address}</p>

					<div className="text-zeroloss-base-white fs-7 mt-4 text-start">เบอร์โทรศัพท์</div>
					<p className="text-zeroloss-base-white text-start">{phone}</p>

					<div className="text-zeroloss-base-white fs-7 mt-4 text-start">เบอร์มือถือ</div>
					<p className="text-zeroloss-base-white text-start">{mobile}</p>
				</div>
			</div>

			<style>{`
                .event-detail-map-container .leaflet-container .leaflet-popup .leaflet-popup-content-wrapper {
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

export default LocationPopup