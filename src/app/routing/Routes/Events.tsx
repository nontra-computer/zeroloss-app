import { Routes, Route, Navigate } from 'react-router-dom'

import EventOverviewView from '@/Presentation/Views/Events/Overview/View'
import EventFormView from '@/Presentation/Views/Events/Form/View'
import { LocationSelectionContextProvider } from '@/Presentation/Views/Events/Form/LocationSelection/Context'

const EventsRoutes = () => (
	<Routes>
		<Route path="overview">
			<Route path="table" element={<EventOverviewView />} />
			<Route path="calendar" element={<EventOverviewView />} />

			<Route index element={<Navigate to="/events/overview/table" />} />
			<Route path="*" element={<Navigate to="/events/overview/table" />} />
		</Route>

		<Route
			path="new"
			element={
				<LocationSelectionContextProvider>
					<EventFormView />
				</LocationSelectionContextProvider>
			}
		/>
		<Route
			path="edit/:eventId"
			element={
				<LocationSelectionContextProvider>
					<EventFormView />
				</LocationSelectionContextProvider>
			}
		/>

		<Route index element={<Navigate to="/events/overview" />} />
		<Route path="*" element={<Navigate to="/events/overview" />} />
	</Routes>
)

export default EventsRoutes
