import React, { useEffect, useState } from 'react'
import { PageTitle } from '@/_metronic/layout/core'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import EventMessageForm from '@/Presentation/Views/Events/MessageForm/View'
import useViewModel from './ViewModel'
import NumberBox from './Components/HazardNumberBox/View'
import clsx from 'clsx'
import EventDetailMapView from './Components/MapView/View'
import HazardDetailCard from './Components/DetailCard/HazardDetailCard'
import WeatherCard from './Components/DetailCard/WeatherCard'
import SourceCard from './Components/DetailCard/SourceCard'
import EffectCard from './Components/DetailCard/EffectCard'

const HazardManagementDetailView: React.FC = () => {
	const { timeStr, themeMode } = useViewModel()
	const { id } = useParams() // Extract the ID from the URL path
	const [detailData, setDetailData] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const response = await axios.get(`/hazard-model/${id}/dashboard`)
				setDetailData(response.data)
				setIsLoading(false)
			} catch (error) {
				setError(error.message)
				setIsLoading(false)
			}
		}

		fetchData()

		return () => {
			// Cleanup function if needed
		}
	}, [id])

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
					<NumberBox
						id="red"
						title="Red Threat zone"
						type="danger"
						value={detailData?.output?.redDistance ?? 0}
						unit={detailData?.output?.redDistanceUnit ?? ''}
					/>
				</div>
				<div className="col-6 col-lg-4 col-xxl-4 h-100">
					<NumberBox
						id="orange"
						title="Orange Threat zone"
						type="warning"
						value={detailData?.output?.orangeDistance ?? 0}
						unit={detailData?.output?.orangeDistanceUnit ?? ''}
					/>
				</div>
				<div className="col-6 col-lg-4 col-xxl-4 h-100">
					<NumberBox
						id="yellow"
						title="Yellow Threat zone"
						type="warning"
						value={detailData?.output?.yellowDistance ?? 0}
						unit={detailData?.output?.yellowDistanceUnit ?? ''}
					/>
				</div>
			</div>
			{!isLoading && !error && detailData && (
				<>
					<div className="row mx-5 mt-5 h-100">
						<div className="col-4">
							<HazardDetailCard data={detailData.input} />
						</div>
						<div className="col-8">
							<EventDetailMapView />
						</div>
					</div>
					<div className="row mx-5 mt-5 h-100">
						<div className="col-4">
							<SourceCard data={detailData.input} />
						</div>
						<div className="col-4">
							<WeatherCard data={detailData.input} />
						</div>
						<div className="col-4">
							<EffectCard />
						</div>
					</div>
				</>
			)}

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
