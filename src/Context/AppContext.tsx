import React from 'react'
import { TableContextProvider } from './Table'
import { IncidentEventContextProvider } from './IncidentEvent'
import { EventMessageFormContextProvider } from '@/Presentation/Views/Events/MessageForm/Context'
import { EventNotificationScheduleContextProvider } from '@/Presentation/Views/Events/NotificationSchedule/Context'
import { LocationSelectionContextProvider } from '@/Presentation/Views/LocationSelection/Context'

const AppContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<React.Fragment>
			<LocationSelectionContextProvider>
				<IncidentEventContextProvider>
					<TableContextProvider>
						<EventMessageFormContextProvider>
							<EventNotificationScheduleContextProvider>
								{children}
							</EventNotificationScheduleContextProvider>
						</EventMessageFormContextProvider>
					</TableContextProvider>
				</IncidentEventContextProvider>
			</LocationSelectionContextProvider>
		</React.Fragment>
	)
}

export default AppContext
