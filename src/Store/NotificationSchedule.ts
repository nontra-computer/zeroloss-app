import { create } from 'zustand'
import axios from 'axios'
import { cleanParamsFilter } from '@/Utils/cleanParamsFilter'

export const INITIAL_STATE = {
	message: '',
	actionAt: null as any,
	earlyMinuteAlarm: 0,
	eventId: 0,
}

export interface NotificationSchedule {
	data: any[]
	setData: (data: any[]) => void
	getAll: (filter?: any) => Promise<{ data: any; success: boolean }>
	create: (data: any) => Promise<{ data: any; success: boolean }>
	remove: (id: number) => Promise<{ data: any; success: boolean }>
	clearState: () => void
}

export const API_SLUG = '/notification-schedule'

export const useNotificationScheduleStore = create<NotificationSchedule>(set => ({
	data: [],
	setData: (data: any[]) => set({ data }),
	getAll: async (filter = {}) => {
		return axios
			.get(`${API_SLUG}`, { params: cleanParamsFilter(filter ?? {}) })
			.then(response => {
				set({ data: response.data })
				return { data: response.data, success: true }
			})
			.catch(error => {
				return { data: error.response?.data?.message?.toString(), success: false }
			})
	},
	create: async data => {
		const formData = new FormData()
		Object.keys(data).forEach(key => {
			if (data[key] !== null && data[key] !== undefined) formData.append(key, data[key])
		})

		return axios
			.post(`${API_SLUG}`, formData)
			.then(response => {
				return { data: response.data, success: true }
			})
			.catch(error => {
				return { data: error.response?.data?.message?.toString(), success: false }
			})
	},
	remove: async id => {
		return axios
			.delete(`${API_SLUG}/${id}`)
			.then(response => {
				return { data: response.data, success: true }
			})
			.catch(error => {
				return { data: error.response?.data?.message?.toString(), success: false }
			})
	},
	clearState: () => set({ data: [] }),
}))
