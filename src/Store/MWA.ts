import { create } from 'zustand'
import axios from 'axios'

interface MWAStore {
	stations: any[]
	dashboardSensors: any
	selected: any
	selectedSensors: any[]
	setStations: (stations: any[]) => void
	setDashboardSensors: (dashboardSensors: any) => void
	setSelected: (selected: any) => void
	setSelectedSensors: (selectedSensors: any[]) => void
	getStations: () => Promise<{ data: any; success: boolean }>
	getDashboardSensors: () => Promise<{ data: any; success: boolean }>
	getStationMeasurementDetail: (buildingId: number) => Promise<{ data: any; success: boolean }>
	getStationMeasurementDetailSensor: (
		buildingId: number
	) => Promise<{ data: any; success: boolean }>
	clearState: () => void
}

export const useMWAStore = create<MWAStore>(set => ({
	stations: [],
	dashboardSensors: {},
	selected: {},
	selectedSensors: [],
	setStations: (stations: any[]) => set({ stations }),
	setDashboardSensors: (dashboardSensors: any) => set({ dashboardSensors }),
	setSelected: (selected: any) => set({ selected }),
	setSelectedSensors: (selectedSensors: any[]) => set({ selectedSensors }),
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
			.get(`/dashboard/stations/${buildingId}`)
			.then(response => {
				set({ selected: response.data })
				return { data: response.data, success: true }
			})
			.catch(error => {
				return { data: error.response.data.message?.toString(), success: false }
			})
	},
	getStationMeasurementDetailSensor: async (buildingId: number) => {
		return axios
			.get(`/sensor?dashboardId=${buildingId}`)
			.then(response => {
				set({ selectedSensors: response.data })
				return { data: response.data, success: true }
			})
			.catch(error => {
				return { data: error.response.data.message?.toString(), success: false }
			})
	},
	clearState: () => set({ stations: [], selected: {}, selectedSensors: [], dashboardSensors: {} }),
}))
