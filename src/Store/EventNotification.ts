import { create } from 'zustand'
import axios from 'axios'

interface EventNotificationStore {
	isThereAnyUnreadMessage: boolean
	unreadData: any[]
	setIsThereAnyUnreadMessage: (isThereAnyUnreadMessage: boolean) => void
	setUnreadData: (unreadData: any[]) => void
	readAllMessages: () => Promise<{ success: boolean; data: any }>
	getUnreadMessages: () => Promise<{ success: boolean; data: any }>
}

export const useEventNotificationStore = create<EventNotificationStore>(set => ({
	isThereAnyUnreadMessage: false,
	unreadData: [],
	setIsThereAnyUnreadMessage: (isThereAnyUnreadMessage: boolean) =>
		set({ isThereAnyUnreadMessage }),
	setUnreadData: (unreadData: any[]) => set({ unreadData }),
	readAllMessages: async () => {
		return axios
			.post('/events/readAllEvent')
			.then(response => {
				set({ isThereAnyUnreadMessage: false })
				return { success: true, data: response.data }
			})
			.catch(error => {
				return { success: false, data: error.response.data }
			})
	},
	getUnreadMessages: async () => {
		return axios
			.get('/events', {
				params: {
					isUnread: true,
				},
			})
			.then(response => {
				set({ unreadData: response.data })
				return { success: true, data: response.data }
			})
			.catch(error => {
				return { success: false, data: error.response.data }
			})
	},
}))
