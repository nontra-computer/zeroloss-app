import { Routes, Route, Navigate } from 'react-router-dom'

import EventOverviewView from '@/Presentation/Views/Events/Overview/View'
import EventFormView from '@/Presentation/Views/Events/Form/View'
import EventDetailView from '@/Presentation/Views/Events/Detail/View'
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
		<Route path="edit/:eventId">
			<Route
				index
				element={
					<LocationSelectionContextProvider>
						<EventFormView />
					</LocationSelectionContextProvider>
				}
			/>

			<Route
				path="location"
				element={
					<LocationSelectionContextProvider>
						<EventFormView />
					</LocationSelectionContextProvider>
				}
			/>

			<Route
				path="informer"
				element={
					<LocationSelectionContextProvider>
						<EventFormView />
					</LocationSelectionContextProvider>
				}
			/>

			<Route
				path="images"
				element={
					<LocationSelectionContextProvider>
						<EventFormView />
					</LocationSelectionContextProvider>
				}
			/>

			<Route
				path="reporting"
				element={
					<LocationSelectionContextProvider>
						<EventFormView />
					</LocationSelectionContextProvider>
				}
			/>

			<Route
				path="impact"
				element={
					<LocationSelectionContextProvider>
						<EventFormView />
					</LocationSelectionContextProvider>
				}
			/>

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
