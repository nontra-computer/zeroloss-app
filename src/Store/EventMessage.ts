import { create } from 'zustand'
import axios from 'axios'

interface EventMessageStore {
	uploadProgress: number
	data: any[]
	setUploadProgress: (uploadProgress: number) => void
	getAll: (eventId: string) => Promise<{ data: any; success: boolean }>
	create: (eventId: string, data: any) => Promise<{ data: any; success: boolean }>
	edit: (eventId: string, messageId: number, data: any) => Promise<{ data: any; success: boolean }>
	remove: (eventId: string, messageId: string) => Promise<{ data: any; success: boolean }>
	clearState: () => void
}

export const API_SLUG = '/events/:eventId/messages'

export const useEventMessageStore = create<EventMessageStore>(set => ({
	data: [],
	uploadProgress: 0,
	setUploadProgress: (uploadProgress: number) => set({ uploadProgress }),
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
			if (key.includes('pictures')) {
				formData.append('pictures', data[key])
			} else {
				formData.append(key, data[key])
			}
		})

		return axios
			.post(`${API_SLUG.replace(':eventId', eventId)}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: progressEvent => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
					set({ uploadProgress: progress })
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
	edit: async (eventId: string, messageId: number, data: any) => {
		const formData = new FormData()
		Object.keys(data).forEach(key => {
			if (key.includes('pictures')) {
				formData.append('pictures', data[key])
			} else {
				formData.append(key, data[key])
			}
		})

		return axios
			.patch(`${API_SLUG.replace(':eventId', eventId)}/${messageId}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: progressEvent => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
					set({ uploadProgress: progress })
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
