import { create } from 'zustand'
import axios from 'axios'

interface MWAStore {
	buildings: any[]
	buildingData: any
	setBuildings: (buildings: any[]) => void
	setBuildingData: (buildingData: any) => void
	getBuildingMeasurement: () => Promise<{ data: any; success: boolean }>
	getBuildingMeasurementDetail: (buildingId: number) => Promise<{ data: any; success: boolean }>
	clearState: () => void
}

export const useMWAStore = create<MWAStore>(set => ({
	buildings: [],
	buildingData: {},
	setBuildings: (buildings: any[]) => set({ buildings }),
	setBuildingData: (buildingData: any) => set({ buildingData }),
	getBuildingMeasurement: async () => {
		return axios
			.get('/dashboard/station')
			.then(response => {
				set({ buildings: response.data })
				return { data: response.data, success: true }
			})
			.catch(error => {
				return { data: error.response.data.message?.toString(), success: false }
			})
	},
	getBuildingMeasurementDetail: async (buildingId: number) => {
		return axios
			.get(`/sensor?dashboardId=${buildingId}`)
			.then(response => {
				set({ buildingData: response.data })
				return { data: response.data, success: true }
			})
			.catch(error => {
				return { data: error.response.data.message?.toString(), success: false }
			})
	},
	clearState: () => set({ buildings: [], buildingData: {} }),
}))
