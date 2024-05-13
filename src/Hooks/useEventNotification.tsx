import EventAlert from '@/Presentation/Components/Alert/EventAlert'
import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

const SOCKET_SERVER = import.meta.env.VITE_APP_ZEROLOSS_SOCKET_URL

const useEventNotification = () => {
	const socketRef = useRef<WebSocket | null>(null)

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

export default useEventNotification
