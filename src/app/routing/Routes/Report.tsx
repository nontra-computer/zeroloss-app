import { Routes, Route, Navigate } from 'react-router-dom'

import ReportEventView from '@/Presentation/Views/Report/Event/View'

const ReportRoutes = () => (
	<Routes>
		<Route path="event" element={<ReportEventView />} />

		<Route index element={<Navigate to="/report/event" />} />
		<Route path="*" element={<Navigate to="/report/event" />} />
	</Routes>
)

export default ReportRoutes
