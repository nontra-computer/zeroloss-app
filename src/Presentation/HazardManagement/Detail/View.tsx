import React from 'react'
import { PageTitle } from '@/_metronic/layout/core'

import EventMessageForm from '@/Presentation/Views/Events/MessageForm/View'

import useViewModel from './ViewModel'
import NumberBox from '@/Presentation/Components/NumberBox/View'
import clsx from 'clsx'
import EventDetailMapView from './Components/MapView/View'
import DetailCard from './Components/DetailCard/DetailCard'
import MOCK_DATA from './MOCK_DATA.json'

const HazardManagementDetailView: React.FC = () => {
	const { timeStr, themeMode } = useViewModel()

	return (
		<React.Fragment>
			<PageTitle
				description={
					<React.Fragment>
						<i
							className={clsx('bi bi-calendar3 me-3 fs-4 text-zeroloss-base-white', {
								'text-zeroloss-base-white': themeMode === 'dark',
								'text-zeroloss-base-grey-carbon': themeMode === 'light',
							})}
						/>
						{timeStr}
					</React.Fragment>
				}
				aditionalDescription="Your current sales summary and activity.">
				Hazard Management Dashboard
			</PageTitle>

			<EventMessageForm />
			<div className="row mx-5">
				<div className="col-6 col-lg-4 col-xxl-4 h-100">
					<NumberBox id="red" title="Red Threat zone" type="danger" value={0} />
				</div>
				<div className="col-6 col-lg-4 col-xxl-4 h-100">
					<NumberBox id="orange" title="Orange Threat zone" type="warning" value={0} />
				</div>
				<div className="col-6 col-lg-4 col-xxl-4 h-100">
					<NumberBox id="yellow" title="Yellow Threat zone" type="warning" value={0} />
				</div>
			</div>
			<div className="row mx-5 mt-5 h-100">
				<div className="col-4">
					<DetailCard data={MOCK_DATA.location} />
					<DetailCard data={MOCK_DATA.chemical} />
				</div>
				<div className="col-8">
					<EventDetailMapView />
				</div>
			</div>
			<div className="row mx-5 mt-5 h-100">
				<div className="col-4">
					<DetailCard data={MOCK_DATA.location} />
				</div>
				<div className="col-4">
					<DetailCard data={MOCK_DATA.location} />
				</div>
				<div className="col-4">
					<DetailCard data={MOCK_DATA.location} />
				</div>
			</div>

			<style>{`
				.create-event-header-bg {
					background: linear-gradient(85.81deg, rgba(0, 0, 0, 0.7) 15.45%, rgba(0, 0, 0, 0) 96.00%);
				}

				.hover-filter-brightness:hover {
					transiton: all 0.3s ease-in-out;
					filter: brightness(0.6);
				}

				.event-detail-news-container {
					-ms-overflow-style: none;
					scrollbar-width: none; 
				}

				.event-detail-news-container::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</React.Fragment>
	)
}

export default HazardManagementDetailView
