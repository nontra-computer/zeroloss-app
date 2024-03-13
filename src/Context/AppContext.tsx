import React from 'react'
import { TableContextProvider } from './Table'
import { IncidentEventContextProvider } from './IncidentEvent'

const AppContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<React.Fragment>
			<IncidentEventContextProvider>
				<TableContextProvider>{children}</TableContextProvider>
			</IncidentEventContextProvider>
		</React.Fragment>
	)
}

export default AppContext
