import EventAlert from '@/Presentation/Components/Alert/EventAlert'
import { useEffect, useRef } from 'react'
import { useEventNotificationStore } from '@/Store/EventNotification'
import { toast } from 'react-toastify'

const SOCKET_SERVER = import.meta.env.VITE_APP_ZEROLOSS_SOCKET_URL

const useZerolossSocket = () => {
	const socketRef = useRef<WebSocket | null>(null)
	const { setIsThereAnyUnreadMessage } = useEventNotificationStore(state => ({
		setIsThereAnyUnreadMessage: state.setIsThereAnyUnreadMessage,
	}))

	useEffect(() => {
		socketRef.current = new WebSocket(SOCKET_SERVER)

		socketRef.current.onopen = () => {
			console.log('Connected to WebSocket server')
		}

		socketRef.current.onmessage = message => {
			console.log('Socket On Message', message)

			const { data: rawData } = message
			const isJson = rawData.startsWith('{') && rawData.endsWith('}')

			if (isJson) {
				const data = JSON.parse(rawData)

				if (data?.isThereAnyUnreadMessage === true) {
					setIsThereAnyUnreadMessage(true)
				}

				if (data?.type === 'event') {
					const eventData = data?.data

					toast.success(toastProps => <EventAlert {...toastProps} {...eventData} />, {
						className: 'zeroloss-toast',
						bodyClassName: 'zeroloss-toast-body',
						icon: false,
						hideProgressBar: true,
					})
				}
			}
		}

		return () => {
			socketRef.current?.close()
		}
	}, [])

	return {}
}

export default useZerolossSocket
