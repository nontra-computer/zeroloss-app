import EventAlert from '@/Presentation/Components/Alert/EventAlert'
import { toast } from 'react-toastify'

const SOCKET_SERVER = import.meta.env.VITE_APP_ZEROLOSS_SOCKET_URL

const useEventNotification = () => {
	const socket = new WebSocket(SOCKET_SERVER)

	socket.onopen = () => {
		console.log('Connected to WebSocket server')
	}

	// Event listener for incoming messages
	socket.onmessage = message => {
		const { data } = message

		console.log('Received message:', data)

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

	return {}
}

export default useEventNotification
