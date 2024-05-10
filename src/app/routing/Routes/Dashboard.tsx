import { Routes, Route, Navigate } from 'react-router-dom'

import MainDashboardView from '@/Presentation/Views/Dashboard/Main/View'
import MwaMeasurementDashboardView from '@/Presentation/Views/Dashboard/MWA/Dashboard/View'
import MwaBuildingDashboardView from '@/Presentation/Views/Dashboard/MWA/Building/View'
import HazardTable from '@/Presentation/Views/Dashboard/Main/HazardTable/View'

const DashboardRoutes = () => (
	<Routes>
		<Route path="overview">
			<Route path="table" element={<MainDashboardView />} />
			<Route path="map" element={<MainDashboardView />} />
			<Route path="calendar" element={<MainDashboardView />} />
			<Route path="hazard-model" element={<HazardTable />} />

			<Route index element={<Navigate to="/dashboard/overview/table" />} />
			<Route path="*" element={<Navigate to="/dashboard/overview/table" />} />
		</Route>

		<Route path="mwa">
			<Route index element={<MwaMeasurementDashboardView />} />
			<Route path="building/:buildingId" element={<MwaBuildingDashboardView />} />

			<Route path="*" element={<Navigate to="/dashboard/mwa" />} />
		</Route>

		<Route index element={<Navigate to="/dashboard/overview" />} />
		<Route path="*" element={<Navigate to="/dashboard/overview" />} />
	</Routes>
)

export default DashboardRoutes
