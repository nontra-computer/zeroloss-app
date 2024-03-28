import { create } from 'zustand'
import axios from 'axios'

interface LocationStore {
	data: any[]
	dataMapMarker: any[]
	setData: (data: any[]) => void
	setDataMapMarker: (data: any[]) => void
	getAll: (filter?: any) => Promise<{ data: any; success: boolean }>
	getAllMapMarker: () => Promise<{ data: any; success: boolean }>
	clearState: () => void
}

export const API_SLUG = '/locations'

export const useLocationStore = create<LocationStore>(set => ({
	data: [],
	dataMapMarker: [],
	setData: (data: any[]) => set({ data }),
	setDataMapMarker: (data: any[]) => set({ dataMapMarker: data }),
	getAll: async (filter?: any) => {
		return axios
			.get(`${API_SLUG}`, { params: filter ?? {} })
			.then(response => {
				set({ data: response.data })
				return { data: response.data, success: true }
			})
			.catch(error => {
				return { data: error.response.data.message?.toString(), success: false }
			})
	},
	getAllMapMarker: async () => {
		return axios
			.get(`${API_SLUG}/map-marker`)
			.then(response => {
				set({ dataMapMarker: response.data })
				return { data: response.data, success: true }
			})
			.catch(error => {
				return { data: error.response.data.message?.toString(), success: false }
			})
	},
	clearState: () => set({ data: [], dataMapMarker: [] }),
}))
