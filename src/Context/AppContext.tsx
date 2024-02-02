import { TableContextProvider } from './Table'

const AppContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<>
			<TableContextProvider>{children}</TableContextProvider>
		</>
	)
}

export default AppContext
