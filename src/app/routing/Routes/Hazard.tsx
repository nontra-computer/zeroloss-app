import { Routes, Route, Navigate } from 'react-router-dom'

import EventOverviewView from '@/Presentation/Views/Events/Overview/View'
import EventFormView from '@/Presentation/Views/Events/Form/View'
import { LocationSelectionContextProvider } from '@/Presentation/Views/LocationSelection/Context'
import HazardTable from '@/Presentation/Views/Dashboard/HazardTable/View'
import HazardManagementDetailView from '@/Presentation/Views/HazardManagement/Detail/View'

const HazardManagementRoutes = () => (
	<Routes>
		<Route path="overview">
			<Route path="table" element={<HazardTable />} />
			<Route path="calendar" element={<EventOverviewView />} />

			<Route index element={<Navigate to="/hazard-modeling/overview/table" />} />
			<Route path="*" element={<Navigate to="hazard-modeling/overview/table" />} />
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

		<Route path="detail/:id">
			<Route index element={<HazardManagementDetailView />} />

			<Route path="*" element={<Navigate to="." replace />} />
		</Route>

		<Route index element={<Navigate to="/events/overview" />} />
		<Route path="*" element={<Navigate to="/events/overview" />} />
	</Routes>
)

export default HazardManagementRoutes
