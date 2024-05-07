import React from 'react'
import { TableContextProvider } from './Table'
import { IncidentEventContextProvider } from './IncidentEvent'
import { EventMessageFormContextProvider } from '@/Presentation/Views/Events/MessageForm/Context'

const AppContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<React.Fragment>
			<IncidentEventContextProvider>
				<TableContextProvider>
					<EventMessageFormContextProvider>{children}</EventMessageFormContextProvider>
				</TableContextProvider>
			</IncidentEventContextProvider>
		</React.Fragment>
	)
}

export default AppContext
