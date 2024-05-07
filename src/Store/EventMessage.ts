import { create } from 'zustand'
import axios from 'axios'

interface EventMessageStore {
	data: any[]
	getAll: (eventId: string) => Promise<{ data: any; success: boolean }>
	create: (eventId: string, data: any) => Promise<{ data: any; success: boolean }>
	remove: (eventId: string, messageId: string) => Promise<{ data: any; success: boolean }>
	clearState: () => void
}

export const API_SLUG = '/events/:eventId/messages'

export const useEventMessageStore = create<EventMessageStore>(set => ({
	data: [],
	getAll: async (eventId: string) => {
		return axios
			.get(`${API_SLUG.replace(':eventId', eventId)}`)
			.then(response => {
				set({ data: response.data })

				return {
					data: response.data,
					success: true,
				}
			})
			.catch((error: any) => {
				return {
					data: error.response?.data?.message?.toString() ?? 'Something went wrong.',
					success: false,
				}
			})
	},
	create: async (eventId: string, data: any) => {
		const formData = new FormData()
		Object.keys(data).forEach(key => {
			formData.append(key, data[key])
		})

		return axios
			.post(`${API_SLUG.replace(':eventId', eventId)}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(response => {
				return {
					data: response.data,
					success: true,
				}
			})
			.catch((error: any) => {
				return {
					data: error.response?.data?.message?.toString() ?? 'Something went wrong.',
					success: false,
				}
			})
	},
	remove: async (eventId: string, messageId: string) => {
		return axios
			.delete(`${API_SLUG.replace(':eventId', eventId)}/${messageId}`)
			.then(response => {
				return {
					data: response.data,
					success: true,
				}
			})
			.catch((error: any) => {
				return {
					data: error.response?.data?.message?.toString() ?? 'Something went wrong.',
					success: false,
				}
			})
	},
	clearState: () => set({ data: [] }),
}))
