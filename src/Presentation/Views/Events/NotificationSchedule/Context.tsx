import { createContext, useState } from 'react'
import { WithChildren } from '_metronic/helpers'

interface IContext {
	open: boolean
	onOpen: () => void
	onClose: () => void
}

export const EventNotificationScheduleContext = createContext<IContext>({
	open: false,
	onOpen: () => {},
	onClose: () => {},
})

export const EventNotificationScheduleContextProvider: React.FC<WithChildren> = ({ children }) => {
	const [open, setOpen] = useState<boolean>(false)

	const onOpen = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	return (
		<EventNotificationScheduleContext.Provider value={{ open, onOpen, onClose }}>
			{children}
		</EventNotificationScheduleContext.Provider>
	)
}
