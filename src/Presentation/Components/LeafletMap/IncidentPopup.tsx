import React from 'react'
import clsx from 'clsx'

interface Props {
	eventType: {
		id: number
		name: string
	}
	img: string
	title: string
	detail: string
}

const IncidentPopup: React.FC<Props> = ({ title, detail, eventType, img }) => {
	return (
		<React.Fragment>
			<div className="card bg-zeroloss-primary min-h-200px min-w-250px">
				<div className="card-body p-5">
					<div className="position-relative rounded overflow-hidden shadow border-1px border-zeroloss-grey-600">
						<img
							src={img ?? '/media/icons/zeroloss/default-placeholder.png'}
							onError={e => {
								e.currentTarget.src = '/media/icons/zeroloss/default-placeholder.png'
							}}
							alt="incident-1"
							className="w-100 h-150px object-fit-cover"
						/>

						<div
							className={clsx(
								'position-absolute bg-zeroloss-error-600 border-zeroloss-base-white text-zeroloss-base-white border-1px fw-bold rounded px-4 py-2',
								{
									'bg-zeroloss-error':
										eventType?.id === 1 || eventType?.id === undefined || eventType?.id === null,
									'bg-zeroloss-warning': eventType?.id === 2,
									'bg-zeroloss-success': eventType?.id === 3,
									'bg-zeroloss-primary': eventType?.id === 4,
									'bg-zeroloss-brand-600': eventType?.id === 5,
									'bg-zeroloss-primary-400': eventType?.id === 6,
								}
							)}
							style={{ left: '3%', bottom: '5%' }}>
							{eventType?.name ?? 'Unknown'}
						</div>
					</div>
					<div className="mt-4">
						<h6 className="text-start text-zeroloss-base-white fw-bold fs-4">{title ?? '-'}</h6>
						<p className="text-zeroloss-base-white fs-6 text-start">{detail ?? '-'}</p>
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
