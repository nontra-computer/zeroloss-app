import { useEffect, useMemo, useState } from 'react'
import { useEventStore } from '@/Store/Event'
import { useLocationTypeStore } from '@/Store/LocationType'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'

const MOCK_DATA = {
	id: 1,
	type: 'success',
	draggable: false,
	shapeType: 'circle' as 'polygon' | 'circle',
	popup: null,
	position: {
		lat: 13.7473729,
		lng: 100.5137062,
	},
	degree: 0,
}

const INITIAL_FILTER_STATE = {
	locationTypeId: null,
}

const ViewModel = () => {
	const { mode } = useThemeMode()
	const { eventTypes, getTypes, clearState } = useEventStore(state => ({
		eventTypes: state.types,
		getTypes: state.getTypes,
		clearState: state.clearState,
	}))
	const { locationTypes, getAllLocationTypes } = useLocationTypeStore(state => ({
		locationTypes: state.data,
		getAllLocationTypes: state.getAll,
	}))
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
			locationTypes.map(l => ({
				id: l.id,
				nameTh: l.nameTh,
				nameEn: l.nameEn,
				locationTypeId: l.locationTypeId,
				latitude: l?.latitude ? parseFloat(l.latitude) : 0,
				longitude: l?.longitude ? parseFloat(l.longitude) : 0,
			})),
		[locationTypes]
	)

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const fetchData = () => {
		getTypes()
		getAllLocationTypes()
	}

	const onChangeFilter = (key: string, value: any) => {
		setFilter({
			...filter,
			[key]: value,
		})
	}

	const confirmFilter = () => {}

	const clearFilter = () => {}

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		return () => {
			clearState()
		}
		// eslint-disable-next-line
	}, [])

	return {
		themeMode,
		data: MOCK_DATA,
		locationData,
		locationOptions,
		eventTypesOptions,
		distanceOptions,
		filter,
		onChangeFilter,
		confirmFilter,
		clearFilter,
	}
}

export default ViewModel
