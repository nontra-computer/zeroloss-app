import { create } from 'zustand'
import axios from 'axios'
import { cleanParamsFilter } from '@/Utils/cleanParamsFilter'

export interface ChemicalStore {
	data: any[]
	setData: (data: any[]) => void
	getAll: (filter?: any) => Promise<{ data: any; success: boolean }>
	clearState: () => void
}

export const API_SLUG = '/chemicals'

export const useChemicalStore = create<ChemicalStore>(set => ({
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
	clearState: () => set({ data: [] }),
}))
