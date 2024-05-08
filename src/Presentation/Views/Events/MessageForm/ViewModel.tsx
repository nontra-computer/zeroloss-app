import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EventMessageFormContext } from './Context'
import { useEventStore } from '@/Store/Event'
import { useEventMessageStore } from '@/Store/EventMessage'
import { useEventMediaStore } from '@/Store/EventMedia'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

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
	const {
		messages,
		uploadProgress,
		setUploadProgress,
		getAllMessages,
		createMessage,
		editMessage,
	} = useEventMessageStore(state => ({
		messages: state.data,
		uploadProgress: state.uploadProgress,
		setUploadProgress: state.setUploadProgress,
		getAllMessages: state.getAll,
		createMessage: state.create,
		editMessage: state.edit,
	}))
	const removeEventMedia = useEventMediaStore(state => state.remove)

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
			if (formType === 'create') {
				setFormState(prevState => ({
					...formState,
					pictures: [...prevState.pictures, value],
				}))
			} else {
				setFormState(prevState => ({
					...formState,
					pictures: [...prevState.pictures, { picturePath: value, isNew: true }],
				}))
			}
		} else {
			setFormState({
				...formState,
				[key]: value,
			})
		}
	}

	const onRemovePicture = (index: number) => {
		if (formType === 'create') {
			setFormState(prevState => {
				const newPictures = prevState.pictures.filter((_, i) => i !== index)
				return {
					...prevState,
					pictures: newPictures,
				}
			})
		} else {
			const finded = formState.pictures.find((m, i) => i === index)
			if (finded) {
				Swal.fire({
					title: 'คุณแน่ใจหรือไม่ที่จะลบรูปภาพหรือวีดีโอนี้ใช่หรือไม่?',
					showCancelButton: true,
					confirmButtonText: 'ใช่',
					cancelButtonText: 'ไม่ใช่',
				}).then(result => {
					if (result.isConfirmed) {
						removeEventMedia(eventId ?? '', finded.id).then(({ success }) => {
							if (success) {
								getAllMessages(eventId ?? '')
							} else {
								toast.error('ไม่สามารถลบรูปภาพนี้ได้')
								return
							}
						})
					}
				})
			}
		}
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
			if (formType === 'create') {
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
			} else if (editId !== 0) {
				const body: { [key: string]: any } = {
					detail: formState.detail,
				}
				formState.pictures.forEach((p, i) => {
					if (p.isNew) {
						body[`pictures[${i}]`] = p.picturePath
					}
				})

				toast.info('กำลังแก้ไขรายงานเหตุการณ์...')
				editMessage(eventId, editId, body).then(({ success, data }) => {
					if (!success) {
						toast.error(`แก้ไขรายงานเหตุการณ์ ไม่สำเร็จ : ${data}`)
						setIsSubmitting(false)
					} else {
						toast.success('แก้ไขรายงานเหตุการณ์ สำเร็จ')
						onClose()
						setIsSubmitting(false)
						getAllMessages(eventId)
					}

					setUploadProgress(0)
				})
			}
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
