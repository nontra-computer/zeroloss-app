import { useEventStore } from '@/Store/Event'
import { useEventNotificationStore } from '@/Store/EventNotification'

const ViewModel = () => {
	const getMediaPath = useEventStore(state => state.getEventMediaPath)
	const unreadMessages = useEventNotificationStore(state => state.unreadData)

	const onClick = (id: number) => {
		window.open(`/events/detail/${id}`, '_blank')
	}

	return {
		unreadMessages,
		getMediaPath,
		onClick,
	}
}

export default ViewModel
