import { create } from 'zustand'
import axios from 'axios'

interface HazardManagementStore {
	isLoadingData: boolean
	data: any[]
	selected: any
	setIsLoadingData: (isLoadingData: boolean) => void
	setData: (data: any[]) => void
	getAll: (filter: any) => Promise<{ data: any; success: boolean }>
	clearState: () => void
}

export const API_SLUG = '/hazard-model'

export const useHazardManagementStore = create<HazardManagementStore>(set => ({
	isLoadingData: false,
	data: [],
	selected: {},
	setIsLoadingData: (isLoadingData: boolean) => set({ isLoadingData }),
	setData: (data: any[]) => set({ data }),
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
	clearState: () =>
		set({
			data: [],
			selected: {},
		}),
}))
