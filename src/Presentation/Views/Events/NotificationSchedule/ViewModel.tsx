import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EventNotificationScheduleContext } from './Context'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useNotificationScheduleStore, INITIAL_STATE } from '@/Store/NotificationSchedule'
import { NOTIFIFCATION_TIME } from '../Form/Config'
import { toast } from 'react-toastify'
import moment from 'moment'
import 'moment-timezone'

const ViewModel = () => {
	const { mode } = useThemeMode()
	const notificationTimeOptions = NOTIFIFCATION_TIME.map((d: any) => ({
		label: d.name,
		value: d.value,
	}))
	const { eventId } = useParams<{ eventId: string }>()
	const { open, onClose: handleClose } = useContext(EventNotificationScheduleContext)

	const [formState, setFormState] = useState(INITIAL_STATE)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isOpenDatePicker, setIsOpenDatePicker] = useState(false)
	const { create, getAll } = useNotificationScheduleStore(state => state)

	const timeText = formState.actionAt
		? moment(formState.actionAt).tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm')
		: ''

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const onClose = () => {
		handleClose()
		setTimeout(() => {
			setFormState(INITIAL_STATE)
		}, 500)
	}

	const onChangeFormState = (key: string, value: any) => {
		setFormState({
			...formState,
			[key]: value,
		})
	}

	const onSubmit = () => {
		setIsSubmitting(true)

		if (formState.message.length === 0 || moment(formState.actionAt).isBefore(moment())) {
			toast.error('กรุณากรอกข้อมูลให้ครบถ้วน')
			setIsSubmitting(false)
			return
		}

		const body: { [key: string]: any } = {
			...formState,
			actionAt: moment(formState.actionAt).tz('Asia/Bangkok').toISOString(),
			eventId: eventId,
		}

		create(body)
			.then(({ success, data }) => {
				if (!success) {
					toast.error(`เพิ่มการแจ้งเตือน ไม่สำเร็จ : ${data}`)
					setIsSubmitting(false)
				} else {
					toast.success('เพิ่มการแจ้งเตือน สำเร็จ')
					onClose()
					setIsSubmitting(false)
					getAll({ eventId })
				}
			})
			.finally(() => {
				setIsSubmitting(false)
			})
	}

	return {
		isSubmitting,
		isOpenDatePicker,
		setIsOpenDatePicker,
		open,
		themeMode,
		notificationTimeOptions,
		formState,
		timeText,
		onChangeFormState,
		onClose,
		onSubmit,
	}
}

export default ViewModel
