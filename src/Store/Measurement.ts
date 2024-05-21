import { create } from 'zustand'
import axios from 'axios'

interface MeasurementStore {
	data: any[]
	types: any[]
	setData: (data: any[]) => void
	setTypes: (types: any[]) => void
	getAll: () => Promise<{ data: any; success: boolean }>
	getTypes: () => Promise<{ data: any; success: boolean }>
	clearState: () => void
}

export const API_SLUG = '/measurements'

export const useMeasurementStore = create<MeasurementStore>(set => ({
	data: [],
	types: [],
	setData: data => set({ data }),
	setTypes: types => set({ types }),
	getAll: async () => {
		return axios
			.get(`${API_SLUG}`)
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
	getTypes: async () => {
		return axios
			.get(`/measurementType`)
			.then(response => {
				set({ types: response.data })

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
