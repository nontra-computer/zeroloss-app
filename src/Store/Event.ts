import { create } from 'zustand'
import axios from 'axios'

interface EventStore {
	data: any[]
	summary: any
	types: any[]
	setData: (data: any[]) => void
	setSummary: (summary: any) => void
	setTypes: (types: any[]) => void
	getAll: (filter: any) => Promise<{ data: any; success: boolean }>
	getTypes: () => Promise<{ data: any; success: boolean }>
	getSummary: () => Promise<{ data: any; success: boolean }>
	clearState: () => void
}

export const API_SLUG = '/events'

export const useEventStore = create<EventStore>(set => ({
	data: [],
	summary: {},
	types: [],
	setData: (data: any[]) => set({ data }),
	setSummary: (summary: any) => set({ summary }),
	setTypes: (types: any[]) => set({ types }),
	getAll: async (filter: any) => {
		return axios
			.get(`${API_SLUG}`, { params: filter })
			.then(response => {
				set({ data: response.data })
				return { data: response.data, success: true }
			})
			.catch(error => {
				return { data: error.response.data.message?.toString(), success: false }
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
				return { data: error.response.data.message?.toString(), success: false }
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
				return { data: error.response.data.message?.toString(), success: false }
			})
	},
	clearState: () => set({ data: [] }),
}))