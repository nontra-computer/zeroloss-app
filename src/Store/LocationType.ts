import { create } from 'zustand'
import axios from 'axios'

interface LocationTypeStore {
	data: any[]
	setData: (data: any[]) => void
	getAll: (filter?: any) => Promise<{ data: any; success: boolean }>
	clearState: () => void
}

export const API_SLUG = '/locationTypes'

export const useLocationTypeStore = create<LocationTypeStore>(set => ({
	data: [],
	setData: (data: any[]) => set({ data }),
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
	clearState: () => set({ data: [] }),
}))
