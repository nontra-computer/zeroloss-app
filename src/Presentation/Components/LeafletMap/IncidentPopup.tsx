import React from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { KTSVG } from '@/_metronic/helpers'

interface Props {
	eventType: {
		id: number
		name: string
	}
	eventSubTypeTitle: string
	eventTypeId: number
	img: string
	title: string
	detail: string
	id: number
}

const IncidentPopup: React.FC<Props> = ({
	id,
	title,
	detail,
	eventType,
	eventSubTypeTitle,
	img,
	eventTypeId,
}) => {
	const navigate = useNavigate()

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
								'position-absolute border-zeroloss-base-white text-zeroloss-base-white border-1px fw-bold rounded px-4 py-2',
								{
									'bg-zeroloss-error':
										eventTypeId === 1 || eventTypeId === undefined || eventTypeId === null,
									'bg-zeroloss-warning': eventTypeId === 2,
									'bg-zeroloss-success': eventTypeId === 3,
									'bg-zeroloss-primary': eventTypeId === 4,
									'bg-zeroloss-brand-600': eventTypeId === 5,
									'bg-zeroloss-primary-400': eventTypeId === 6,
									'bg-zeroloss-grey': eventTypeId === 7,
								}
							)}
							style={{ left: '3%', bottom: '5%' }}>
							{eventType?.name ?? 'Unknown'}
							{eventType?.name ? ` (${eventSubTypeTitle})` : ''}
						</div>
					</div>
					<div className="mt-4">
						<h6 className="text-start text-zeroloss-base-white fw-bold fs-4">{title ?? '-'}</h6>
						<p className="text-zeroloss-base-white fs-6 text-start">{detail ?? '-'}</p>
					</div>

					<div className="mt-4">
						<button
							className="btn btn-sm white-button text-zeroloss-base-black w-100"
							onClick={() => {
								if (id) navigate(`/events/detail/${id}`)
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

export default IncidentPopup
