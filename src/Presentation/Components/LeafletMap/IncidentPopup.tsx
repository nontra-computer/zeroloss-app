import React from 'react'

const IncidentPopup = () => {
	return (
		<React.Fragment>
			<div className="card bg-zeroloss-primary min-h-200px min-w-250px">
				<div className="card-body p-5">
					<div className="position-relative rounded overflow-hidden shadow border-1px border-zeroloss-grey-600">
						<img
							src="/media/examples/incident-1.jpg"
							alt="incident-1"
							className="w-100 h-150px object-fit-cover"
						/>

						<div
							className="position-absolute bg-zeroloss-error-600 border-zeroloss-base-white text-zeroloss-base-white border-1px fw-bold rounded px-4 py-2"
							style={{ left: '3%', bottom: '5%' }}>
							เหตุการณ์ต่อเนื่อง
						</div>
					</div>
					<div className="mt-4">
						<h6 className="text-start text-zeroloss-base-white fw-bold fs-4">
							เหตุการณ์เพลิงไหม้โรงพลาสติก
						</h6>
						<p className="text-zeroloss-base-white fs-6 text-start">
							ระทึก 'ไฟไหม้' โรงงานผลิตกล่องโฟม ภายในนิคมอุต สาหกรรมโรจนะ
						</p>
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

export default IncidentPopup
