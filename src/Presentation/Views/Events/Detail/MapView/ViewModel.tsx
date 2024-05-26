import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEventStore } from '@/Store/Event'
import { useLocationStore } from '@/Store/Location'
import { useLocationTypeStore } from '@/Store/LocationType'
import { useMeasurementStore } from '@/Store/Measurement'
import { useGoogleMap } from '@/Hooks/useGoogleMap'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { toast } from 'react-toastify'

const INITIAL_FILTER_STATE = {
	name: '',
	locationTypeId: null,
	distance: null,
}

const ViewModel = () => {
	const { eventId } = useParams()
	const { mode } = useThemeMode()
	const { selected, eventTypes, eventSubTypes, getTypes, getSubTypes, getMediaPath } =
		useEventStore(state => ({
			selected: state.selected,
			eventTypes: state.types,
			eventSubTypes: state.subTypes,
			getTypes: state.getTypes,
			getSubTypes: state.getSubTypes,
			getMediaPath: state.getEventMediaPath,
			clearState: state.clearState,
		}))
	const { locations, setLocations, getAllLocations } = useLocationStore(state => ({
		locations: state.dataMapMarker,
		setLocations: state.setDataMapMarker,
		getAllLocations: state.getAllMapMarker,
	}))
	const { locationTypes, getAllLocationTypes } = useLocationTypeStore(state => ({
		locationTypes: state.data,
		getAllLocationTypes: state.getAll,
	}))
	const { getAllMeasurements } = useMeasurementStore(state => ({
		measurements: state.data,
		getAllMeasurements: state.getAll,
	}))
	const { onNavigate } = useGoogleMap()
	const [filter, setFilter] = useState(INITIAL_FILTER_STATE)

	const eventTypesOptions: {
		label: string
		value: any
	}[] = eventTypes.map((d: any) => ({
		label: d.name,
		value: d.id,
	}))
	const locationOptions: {
		label: string
		value: any
	}[] = locationTypes.map((d: any) => ({
		label: d.name,
		value: d.id,
	}))
	const distanceOptions: {
		label: string
		value: any
	}[] = [
		{
			label: '1 กิโลเมตร',
			value: 1,
		},
		{
			label: '3 กิโลเมตร',
			value: 3,
		},
		{
			label: '5 กิโลเมตร',
			value: 5,
		},
		{
			label: '10 กิโลเมตร',
			value: 10,
		},
	]

	const locationData = useMemo(
		() =>
			locations.map(l => ({
				id: l.id,
				nameTh: l.nameTh,
				nameEn: l.nameEn,
				locationTypeId: l.locationTypeId,
				locationType: locationTypes.find(t => t.id === l.locationTypeId)?.name,
				latitude: l?.latitude ? parseFloat(l.latitude) : 0,
				longitude: l?.longitude ? parseFloat(l.longitude) : 0,
				fullAddress: l?.fullAddress,
				phone: l?.phone,
				mobile: l?.mobile,
			})),
		[locations, locationTypes]
	)

	const eventSubTypesOptions = useMemo(() => {
		return eventSubTypes
			.filter((d: any) => d.eventTypeId === selected?.eventTypeId)
			.map((d: any) => ({
				label: d.name,
				value: d.id,
			}))
	}, [selected, eventSubTypes])

	const eventPictureCover = useMemo(() => {
		const galleries = selected?.galleries || []
		const finded = galleries.find((g: any) => g.isPictureCover === true)

		return finded ? getMediaPath(finded.picturePath) : null
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected])

	const canViewSimulation = useMemo(() => {
		return (selected?.riskModelInputs ?? [])?.[0]?.id !== undefined
	}, [selected])

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const fetchData = () => {
		getAllMeasurements()
		getTypes()
		getAllLocationTypes()
		getSubTypes()
	}

	const onViewSimulation = () => {
		const riskModelId = (selected?.riskModelInputs ?? [])?.[0]?.id
		window.open(`${import.meta.env.VITE_APP_ZEROLOSS_SIMULATION_URL.replace(':id', riskModelId)}`)
	}

	const onChangeFilter = (key: string, value: any) => {
		setFilter({
			...filter,
			[key]: value,
		})
	}

	const confirmFilter = () => {
		if (
			filter.locationTypeId === null ||
			filter.locationTypeId === 0 ||
			filter.locationTypeId === '' ||
			filter.locationTypeId === undefined
		) {
			toast.error('กรุณาระบุประเภทสถานที่')
			return
		}

		if (
			(filter.locationTypeId !== null && filter.locationTypeId !== 0) ||
			filter.name !== '' ||
			filter.distance !== null
		) {
			const fetchFilter: { [key: string]: any } = {}
			if (filter.distance !== null) {
				fetchFilter.distanceKm = filter.distance
				fetchFilter.eventId = eventId
			}
			if (filter.name.length > 0) {
				fetchFilter.name = filter.name
			}
			if (filter.locationTypeId !== null && filter.locationTypeId !== 0) {
				fetchFilter.locationTypeId = filter.locationTypeId
			}

			getAllLocations(fetchFilter)
		} else {
			toast.error('กรุณาระบุตัวกรองในการค้นหาสถานที่')
		}
	}

	const clearFilter = () => {
		setLocations([])
		setFilter(INITIAL_FILTER_STATE)
	}

	const onNavigateToEvent = () => {
		onNavigate(selected?.latitude, selected?.longitude)
	}

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		setLocations([])

		// eslint-disable-next-line
	}, [])

	return {
		themeMode,
		data: {
			...selected,
			eventPictureCover: eventPictureCover,
		},
		canViewSimulation,
		locationData,
		locationOptions,
		eventTypesOptions,
		distanceOptions,
		eventSubTypesOptions,
		filter,
		onNavigateToEvent,
		onChangeFilter,
		confirmFilter,
		onViewSimulation,
		clearFilter,
	}
}

export default ViewModel
