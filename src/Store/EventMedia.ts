import { create } from 'zustand'
import axios from 'axios'

interface EventMediaStore {
	create: (eventId: string, data: any) => Promise<{ data: any; success: boolean }>
	remove: (eventId: string, messageId: string) => Promise<{ data: any; success: boolean }>
}

export const API_SLUG = '/events/:eventId/medias'

export const useEventMediaStore = create<EventMediaStore>(() => ({
	create: async (eventId: string, data: any) => {
		const formData = new FormData()
		Object.keys(data).forEach(key => {
			formData.append(key, data[key])
		})

		return axios
			.post(`${API_SLUG.replace(':eventId', eventId)}`, data)
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
}))
