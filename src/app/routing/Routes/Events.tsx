import { Routes, Route, Navigate } from 'react-router-dom'

import EventOverviewView from '@/Presentation/Views/Events/Overview/View'
import EventFormView from '@/Presentation/Views/Events/Form/View'
import EventDetailView from '@/Presentation/Views/Events/Detail/View'

const EventsRoutes = () => (
	<Routes>
		<Route path="overview">
			<Route path="table" element={<EventOverviewView />} />
			<Route path="calendar" element={<EventOverviewView />} />

			<Route index element={<Navigate to="/events/overview/table" />} />
			<Route path="*" element={<Navigate to="/events/overview/table" />} />
		</Route>

		<Route path="new" element={<EventFormView />} />
		<Route path="edit/:eventId">
			<Route index element={<EventFormView />} />

			<Route path="location" element={<EventFormView />} />

			<Route path="informer" element={<EventFormView />} />

			<Route path="images" element={<EventFormView />} />

			<Route path="reporting" element={<EventFormView />} />

			<Route path="impact" element={<EventFormView />} />

			<Route path="notification" element={<EventFormView />} />

			<Route path="*" element={<Navigate to="." replace />} />
		</Route>

		<Route path="detail/:eventId">
			<Route index element={<EventDetailView />} />
			<Route path="map" element={<EventDetailView />} />

			<Route path="*" element={<Navigate to="." replace />} />
		</Route>

		<Route index element={<Navigate to="/events/overview" />} />
		<Route path="*" element={<Navigate to="/events/overview" />} />
	</Routes>
)

export default EventsRoutes
