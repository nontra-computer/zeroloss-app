import { Routes, Route, Navigate } from 'react-router-dom'

import MwaMeasurementDashboardView from '@/Presentation/Views/Dashboard/MWA/Dashboard/View'
import MwaBuildingDashboardView from '@/Presentation/Views/Dashboard/MWA/Building/View'
import ReportSelectView from '@/Presentation/Views/Report/FormSelect/View'
import TimeSeries from '@/Presentation/Views/Report/Form/TimeSeries'
import WindRose from '@/Presentation/Views/Report/Form/WindRose'
import ReportEventView from '@/Presentation/Views/Report/Event/View'

const ReportRoutes = () => (
	<Routes>
		<Route path="event" element={<ReportEventView />} />

		<Route path="form">
			<Route path="select" element={<ReportSelectView />} />
			<Route path="time-series-report" element={<TimeSeries />} />
			<Route path="windrose-report" element={<WindRose />} />
		</Route>

		<Route path="mwa">
			<Route index element={<MwaMeasurementDashboardView />} />
			<Route path="building/:buildingId" element={<MwaBuildingDashboardView />} />
			<Route path="*" element={<Navigate to="/dashboard/mwa" />} />
		</Route>

		<Route index element={<Navigate to="/report/event" />} />
		<Route path="*" element={<Navigate to="/report/event" />} />
	</Routes>
)

export default ReportRoutes
