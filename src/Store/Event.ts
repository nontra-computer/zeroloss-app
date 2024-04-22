import { create } from 'zustand'
import axios from 'axios'

interface EventStore {
	isLoadingData: boolean
	summary: any
	data: any[]
	dashboardData: any
	types: any[]
	subTypes: any[]
	setIsLoadingData: (isLoadingData: boolean) => void
	setSummary: (summary: any) => void
	setData: (data: any[]) => void
	setDashboardData: (data: any) => void
	setTypes: (types: any[]) => void
	setSubTypes: (subTypes: any[]) => void
	getSummary: () => Promise<{ data: any; success: boolean }>
	getAll: (filter: any) => Promise<{ data: any; success: boolean }>
	getDashboardData: () => Promise<{ data: any; success: boolean }>
	getTypes: () => Promise<{ data: any; success: boolean }>
	getSubTypes: () => Promise<{ data: any; success: boolean }>
	clearState: () => void
}

export const API_SLUG = '/events'

export const useEventStore = create<EventStore>(set => ({
	isLoadingData: false,
	summary: {},
	data: [],
	dashboardData: {},
	types: [],
	subTypes: [],
	setIsLoadingData: (isLoadingData: boolean) => set({ isLoadingData }),
	setData: (data: any[]) => set({ data }),
	setSummary: (summary: any) => set({ summary }),
	setDashboardData: (data: any) => set({ dashboardData: data }),
	setTypes: (types: any[]) => set({ types }),
	setSubTypes: (subTypes: any[]) => set({ subTypes }),
	getAll: async (filter: any) => {
		return axios
			.get(`${API_SLUG}`, { params: filter })
			.then(response => {
				set({ data: response.data })
				return { data: response.data, success: true }
			})
			.catch(error => {
				return {
					data: error.response?.data.message?.toString() ?? 'Something went wrong.',
					success: false,
				}
			})
	},
	getTypes: async () => {
		return axios
			.get(`/eventTypes`)
			.then(response => {
				set({ types: response.data })
				return { data: response.data, success: true }
			})
			.catch(error => {
				return {
					data: error.response?.data.message?.toString() ?? 'Something went wrong.',
					success: false,
				}
			})
	},
	getSubTypes: async () => {
		return axios
			.get(`/eventSubTypes`)
			.then(response => {
				set({ subTypes: response.data })
				return { data: response.data, success: true }
			})
			.catch(error => {
				return {
					data: error.response?.data.message?.toString() ?? 'Something went wrong.',
					success: false,
				}
			})
	},
	getSummary: async () => {
		return axios
			.get(`${API_SLUG}/summary`)
			.then(response => {
				set({ summary: response.data })
				return { data: response.data, success: true }
			})
			.catch(error => {
				return {
					data: error.response?.data.message?.toString() ?? 'Something went wrong.',
					success: false,
				}
			})
	},
	getDashboardData: async () => {
		return axios
			.get(`${API_SLUG}/dashboard-map`)
			.then(response => {
				set({ dashboardData: response.data })
				return { data: response.data, success: true }
			})
			.catch(error => {
				return {
					data: error.response?.data.message?.toString() ?? 'Something went wrong.',
					success: false,
				}
			})
	},
	clearState: () =>
		set({
			data: [],
			summary: {},
			dashboardData: {},
			types: [],
			subTypes: [],
		}),
}))
