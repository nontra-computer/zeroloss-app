import { createContext, useState } from 'react'
import { WithChildren } from '_metronic/helpers'

interface IContext {
	editId: number
	formType: 'create' | 'edit'
	open: boolean
	setEditId: (editId: number) => void
	setFormType: (formType: 'create' | 'edit') => void
	onOpen: () => void
	onClose: () => void
}

export const EventMessageFormContext = createContext<IContext>({
	editId: 0,
	formType: 'create',
	open: false,
	setEditId: () => {},
	setFormType: () => {},
	onOpen: () => {},
	onClose: () => {},
})

export const EventMessageFormContextProvider: React.FC<WithChildren> = ({ children }) => {
	const [open, setOpen] = useState<boolean>(false)
	const [editId, setEditId] = useState<number>(0)
	const [formType, setFormType] = useState<'create' | 'edit'>('create')

	const onOpen = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	return (
		<EventMessageFormContext.Provider
			value={{ open, editId, formType, setEditId, setFormType, onOpen, onClose }}>
			{children}
		</EventMessageFormContext.Provider>
	)
}
