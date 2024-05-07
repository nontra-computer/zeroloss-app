import { createContext, useState } from 'react'
import { WithChildren } from '_metronic/helpers'

interface IContext {
	open: boolean
	onOpen: () => void
	onClose: () => void
}

export const EventMessageFormContext = createContext<IContext>({
	open: false,
	onOpen: () => {},
	onClose: () => {},
})

export const EventMessageFormContextProvider: React.FC<WithChildren> = ({ children }) => {
	const [open, setOpen] = useState<boolean>(false)

	const onOpen = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	return (
		<EventMessageFormContext.Provider value={{ open, onOpen, onClose }}>
			{children}
		</EventMessageFormContext.Provider>
	)
}
