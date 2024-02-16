import { create } from 'zustand'
import axios from 'axios'

interface MWAStore {
	stations: any[]
	dashboardSensors: any
	selected: any
	setStations: (stations: any[]) => void
	setDashboardSensors: (dashboardSensors: any) => void
	setSelected: (selected: any) => void
	getStations: () => Promise<{ data: any; success: boolean }>
	getDashboardSensors: () => Promise<{ data: any; success: boolean }>
	getStationMeasurementDetail: (buildingId: number) => Promise<{ data: any; success: boolean }>
	clearState: () => void
}

export const useMWAStore = create<MWAStore>(set => ({
	stations: [],
	dashboardSensors: {},
	selected: {},
	setStations: (stations: any[]) => set({ stations }),
	setDashboardSensors: (dashboardSensors: any) => set({ dashboardSensors }),
	setSelected: (selected: any) => set({ selected }),
	getStations: async () => {
		return axios
			.get('/dashboard/stations')
			.then(response => {
				set({ stations: response.data })
				return { data: response.data, success: true }
			})
			.catch(error => {
				return { data: error.response.data.message?.toString(), success: false }
			})
	},
	getDashboardSensors: async () => {
		return axios
			.get('/dashboard/sensors')
			.then(response => {
				set({ dashboardSensors: response.data })
				return { data: response.data, success: true }
			})
			.catch(error => {
				return { data: error.response.data.message?.toString(), success: false }
			})
	},
	getStationMeasurementDetail: async (buildingId: number) => {
		return axios
			.get(`/sensor?dashboardId=${buildingId}`)
			.then(response => {
				set({ selected: response.data })
				return { data: response.data, success: true }
			})
			.catch(error => {
				return { data: error.response.data.message?.toString(), success: false }
			})
	},
	clearState: () => set({ stations: [], selected: {}, dashboardSensors: {} }),
}))
