import { createContext, useState } from 'react'
import { WithChildren } from '_metronic/helpers'

interface IContext {
	open: boolean
	setOpen: (isOpen: boolean) => void
	position: { lat: number; lng: number }
	setPosition: (position: { lat: number; lng: number }) => void

	changeConfirm: boolean
	setChangeConfirm: (changeConfirm: boolean) => void
}

export const LocationSelectionContext = createContext<IContext>({
	open: false,
	setOpen: () => {},
	position: { lat: 13.7563, lng: 100.5018 },
	setPosition: () => {},
	changeConfirm: false,
	setChangeConfirm: () => {},
})

export const LocationSelectionContextProvider: React.FC<WithChildren> = ({ children }) => {
	const [open, setOpen] = useState<boolean>(false)
	const [position, setPosition] = useState<{ lat: number; lng: number }>({
		lat: 13.7563,
		lng: 100.5018,
	})
	const [changeConfirm, setChangeConfirm] = useState<boolean>(false)

	return (
		<LocationSelectionContext.Provider
			value={{
				open,
				position,
				setOpen,
				setPosition,
				changeConfirm,
				setChangeConfirm,
			}}>
			{children}
		</LocationSelectionContext.Provider>
	)
}
