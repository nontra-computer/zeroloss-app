import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EventMessageFormContext } from './Context'
import { useEventMessageStore } from '@/Store/EventMessage'
import { toast } from 'react-toastify'

const INITIAL_STATE = {
	detail: '',
	picture: null as File | null,
}

const ViewModel = () => {
	const { eventId } = useParams<{ eventId: string }>()
	const { open, onClose: handleClose } = useContext(EventMessageFormContext)
	const [formState, setFormState] = useState(INITIAL_STATE)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const createMessage = useEventMessageStore(state => state.create)

	const onChangeFormState = (key: string, value: any) => {
		setFormState({
			...formState,
			[key]: value,
		})
	}

	const onClose = () => {
		handleClose()
		setTimeout(() => {
			setFormState(INITIAL_STATE)
		}, 500)
	}

	const onSubmit = () => {
		setIsSubmitting(true)
		if (formState.detail === '' || formState.picture === null) {
			toast.error('กรุณากรอกข้อมูลให้ครบถ้วน')
			setIsSubmitting(false)
			return
		} else if (eventId !== undefined) {
			createMessage(eventId, formState).then(({ success, data }) => {
				if (!success) {
					toast.error(`เพิ่มรายงานเหตุการณ์ ไม่สำเร็จ : ${data}`)
					setIsSubmitting(false)
				} else {
					toast.success('เพิ่มรายงานเหตุการณ์ สำเร็จ')
					onClose()
					setIsSubmitting(false)
				}
			})
		}
	}

	return {
		open,
		onClose,
		isSubmitting,
		formState,
		onChangeFormState,
		onSubmit,
	}
}

export default ViewModel
