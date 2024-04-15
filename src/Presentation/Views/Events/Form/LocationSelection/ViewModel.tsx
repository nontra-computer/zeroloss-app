import { useContext } from 'react'
import { LocationSelectionContext } from './Context'

const ViewModel = () => {
	const { open, setOpen, position, setPosition, setChangeConfirm } =
		useContext(LocationSelectionContext)

	const handleClose = () => {
		setOpen(false)
	}

	const handleConfirm = () => {
		setOpen(false)
		setChangeConfirm(true)
	}

	return {
		open,
		handleClose,
		handleConfirm,
		position,
		setPosition,
	}
}

export default ViewModel
