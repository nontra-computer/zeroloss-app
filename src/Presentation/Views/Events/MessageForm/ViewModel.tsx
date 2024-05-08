import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EventMessageFormContext } from './Context'
import { useEventStore } from '@/Store/Event'
import { useEventMessageStore } from '@/Store/EventMessage'
import { toast } from 'react-toastify'

const INITIAL_STATE = {
	detail: '',
	pictures: [] as any[],
}

const ViewModel = () => {
	const { eventId } = useParams<{ eventId: string }>()
	const {
		open,
		formType,
		editId,
		onClose: handleClose,
		setEditId,
		setFormType,
	} = useContext(EventMessageFormContext)
	const [formState, setFormState] = useState(INITIAL_STATE)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const getMediaPath = useEventStore(state => state.getEventMediaPath)
	const { messages, uploadProgress, setUploadProgress, getAllMessages, createMessage } =
		useEventMessageStore(state => ({
			messages: state.data,
			uploadProgress: state.uploadProgress,
			setUploadProgress: state.setUploadProgress,
			getAllMessages: state.getAll,
			createMessage: state.create,
		}))

	const handleOpenEditForm = () => {
		if (open && formType === 'edit' && editId !== 0) {
			const finded = messages.find(m => m.id === editId)
			if (finded) {
				setFormState({
					detail: finded.detail,
					pictures: finded.medias.map((m: any) => ({
						...m,
						picturePath: getMediaPath(m.picturePath),
					})),
				})
			}
		}
	}

	const onChangeFormState = (key: string, value: any) => {
		if (key === 'pictures') {
			setFormState(prevState => ({
				...formState,
				pictures: [...prevState.pictures, value],
			}))
		} else {
			setFormState({
				...formState,
				[key]: value,
			})
		}
	}

	const onRemovePicture = (index: number) => {
		setFormState(prevState => {
			const newPictures = prevState.pictures.filter((_, i) => i !== index)
			return {
				...prevState,
				pictures: newPictures,
			}
		})
	}

	const onClose = () => {
		handleClose()
		setTimeout(() => {
			setFormState(INITIAL_STATE)
			setEditId(0)
			setFormType('create')
			setUploadProgress(0)
		}, 500)
	}

	const onSubmit = () => {
		setIsSubmitting(true)
		if (formState.detail === '' || formState.pictures.length === 0) {
			toast.error('กรุณากรอกข้อมูลให้ครบถ้วน')
			setIsSubmitting(false)
			return
		} else if (eventId !== undefined) {
			const body: { [key: string]: any } = {
				detail: formState.detail,
			}
			formState.pictures.forEach((p, i) => {
				body[`pictures[${i}]`] = p
			})

			toast.info('กำลังสร้างรายงานเหตุการณ์...')
			createMessage(eventId, body).then(({ success, data }) => {
				if (!success) {
					toast.error(`เพิ่มรายงานเหตุการณ์ ไม่สำเร็จ : ${data}`)
					setIsSubmitting(false)
				} else {
					toast.success('เพิ่มรายงานเหตุการณ์ สำเร็จ')
					onClose()
					setIsSubmitting(false)
					getAllMessages(eventId)
				}

				setUploadProgress(0)
			})
		}
	}

	useEffect(() => {
		handleOpenEditForm()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open, formType, editId, messages])

	return {
		uploadProgress,
		formType,
		open,
		onClose,
		isSubmitting,
		formState,
		onChangeFormState,
		onRemovePicture,
		onSubmit,
	}
}

export default ViewModel
