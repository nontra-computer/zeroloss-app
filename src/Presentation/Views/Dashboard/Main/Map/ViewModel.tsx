import { useEffect, useMemo, useState } from 'react'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'
import { useEventStore } from '@/Store/Event'
import { useLocationStore } from '@/Store/Location'
import { useLocationTypeStore } from '@/Store/LocationType'
import { useMeasurementStore } from '@/Store/Measurement'
import { toast } from 'react-toastify'

const TYPE_OPTIONS = [
	{
		label: 'ทั้งหมด',
		value: 'all',
	},
	{
		label: 'ข้อมูลทิศทางลม',
		value: 'wind-direction',
	},
	// {
	// 	label: 'ข้อมูลจำลอง',
	// 	value: 'simulation',
	// },
	{
		label: 'ข้อมูลการวัด',
		value: 'measurement',
	},
]

const INITIAL_STATE_FILTER: {
	type: any[]
	search: any[]
	locationName: string
	locationTypeId: any
	measurementType: any
	measurementIsOverStd: any
	measurementStatus: any
} = {
	type: [],
	search: [],
	locationName: '',
	locationTypeId: null,
	measurementType: null,
	measurementIsOverStd: null,
	measurementStatus: null,
}

const ViewModel = () => {
	const { mode } = useThemeMode()
	const { isMobile, isLargeMobile, isTablet } = useResolutionDetection()
	const [type, setType] = useState<'all' | 'wind-direction' | 'simulation' | 'measurement'>('all')
	const { rawData, dataTypes, dataEvents, getEvents, getEventMediaPath, getData, getTypes } =
		useEventStore(state => ({
			rawData: state.dashboardData,
			dataTypes: state.types,
			dataEvents: state.data,
			getData: state.getDashboardData,
			getEvents: state.getAll,
			getEventMediaPath: state.getEventMediaPath,
			getTypes: state.getTypes,
			clearState: state.clearState,
		}))
	const { locations, setLocation, getLocations } = useLocationStore(state => ({
		locations: state.dataMapMarker,
		setLocation: state.setDataMapMarker,
		getLocations: state.getAllMapMarker,
	}))
	const { locationTypes, getAllLocationTypes } = useLocationTypeStore(state => ({
		locationTypes: state.data,
		getAllLocationTypes: state.getAll,
	}))
	const { measurementTypes, getMeasurementTypes } = useMeasurementStore(state => ({
		measurementTypes: state.types,
		getMeasurementTypes: state.getTypes,
	}))
	const [searchText, setSearchText] = useState('')
	const [filter, setFilter] = useState(INITIAL_STATE_FILTER)
	const [preFilterState, setPreFilterState] = useState(INITIAL_STATE_FILTER)

	const [showMeasurementTable, setShowMeasurementTable] = useState<boolean>(false)
	const [measurementId, setMeasurementId] = useState<any>(null)

	const displayFilter = useMemo(() => {
		const results: any = {}

		Object.keys(filter).forEach(key => {
			if (key === 'type') {
				results[key] = dataTypes.filter((d: any) => filter[key].find((f: any) => f.value === d.id))
			} else if (key === 'search') {
				results[key] = filter[key]
			}
		})

		return results
	}, [filter, dataTypes])
	const dataTypeOptions: {
		label: string
		value: any
	}[] = dataTypes.map((d: any) => ({
		label: d.name,
		value: d.id,
	}))
	const locationOptions: {
		label: string
		value: any
	}[] = locations.map((d: any) => ({
		label: d.nameTh,
		value: d.id,
	}))
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
	const locationTypeOptions: {
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
	const measurementTypeOptions: {
		label: string
		value: any
	}[] = measurementTypes.map((d: any) => ({
		label: `${d.nameTh} (${d.code})`,
		value: d.id,
	}))
	const measurementIsOverStdOptions: {
		label: string
		value: any
	}[] = [
		{
			label: 'Normal',
			value: false,
		},
		{
			label: 'Over Standard',
			value: true,
		},
	]
	const measurementStatusOptions: {
		label: string
		value: any
	}[] = [
		{
			label: 'เชื่อมไม่ได้',
			value: false,
		},
		{
			label: 'เชื่อมได้',
			value: true,
		},
	]

	const selectedMeasurementData = useMemo(() => {
		return rawData?.measurements?.find((d: any) => d.id === measurementId)
	}, [rawData?.measurements, measurementId])

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const fetchEventData = () => {
		const finaleFilter: { [key: string]: any } = Object.entries(filter).reduce(
			(acc: { [key: string]: any }, [key, value]) => {
				if (['type', 'search'].includes(key)) {
					return acc
				} else if (
					[
						'createdAtStartPeriod',
						'createdAtEndPeriod',
						'caseStartPeriod',
						'caseEndPeriod',
					].includes(key) &&
					value === null
				) {
					return acc
				} else if (value !== null && value !== '') {
					acc[key] = value
				}

				return acc
			},
			{}
		)

		getEvents(finaleFilter).then(({ success, data }) => {
			if (!success) {
				toast.error(data)
			}
		})
	}

	const fetchLocations = () => {
		if (filter.locationName.length === 0 && filter.locationTypeId === null) {
			toast.error('กรุณาระบุตัวกรองในการค้นหาสถานที่')
			return
		}

		getLocations({
			name: filter.locationName,
			locationTypeId: filter.locationTypeId,
		}).then(({ success, data }) => {
			if (!success) {
				toast.error(`ค้นหาสถานที่ไม่สำเร็จ: ${data}`)
			}
		})
	}

	const fetchData = () => {
		getTypes()
		getAllLocationTypes()
		getMeasurementTypes()
		getData({}).then(({ data: dataFetch, success }) => {
			if (!success) {
				toast.error(dataFetch)
			}
		})
	}

	const fetchDataDashboardWithMeasurementFilter = () => {
		if (filter.measurementType || filter.measurementIsOverStd || filter.measurementStatus) {
			getData({
				measurementType: filter.measurementType,
				measurementIsOverStd: filter.measurementIsOverStd,
				measurementStatus: filter.measurementStatus,
			}).then(({ data: dataFetch, success }) => {
				if (!success) {
					toast.error(dataFetch)
				}
			})
		}
	}

	const data = useMemo(() => {
		const results = dataEvents
			.map((d: any) => ({
				...d,
				position: {
					lat: d?.latitude ?? 0,
					lng: d?.longitude ?? 0,
				},
				img: d?.pictureCover ? getEventMediaPath(d.pictureCover) : '',
				eventTypeId: d?.eventTypeId ?? 0,
				eventType: {
					id: d?.eventTypeId ?? 0,
					name: d?.eventTypeTitle ?? '',
				},
				eventSubTypeTitle: d?.eventSubTypeTitle ?? '',
			}))
			.filter((d: any) => {
				if (filter.type?.length > 0) {
					return filter.type.find((item: any) => item.value === d.eventTypeId)
				}

				if (filter.search?.length > 0) {
					return (
						filter.search.find((item: any) => {
							const reg = new RegExp(item, 'i')
							return reg.test(d.title)
						}) !== undefined
					)
				}

				return true
			})

		return results
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataEvents, filter])

	const windData = useMemo(() => {
		return rawData?.wind ?? []
	}, [rawData])
	const measurementData = useMemo(() => {
		return rawData?.measurements ?? []
	}, [rawData])

	const onTypeChange = (value: 'all' | 'wind-direction' | 'simulation' | 'measurement') => {
		setType(value)
	}

	const confirmFilterLocation = () => {
		fetchLocations()
	}

	const clearFilterLocation = () => {
		setLocation([])
		setFilter(prevState => ({
			...prevState,
			locationName: '',
			locationTypeId: null,
		}))
	}

	const confirmFilterEvent = () => {
		setFilter(prevState => ({
			locationTypeId: prevState.locationTypeId,
			search: searchText.length > 0 ? [...prevState.search, searchText] : prevState.search,
			locationName: prevState.locationName,
			type: preFilterState.type,
			measurementType: preFilterState.measurementType,
			measurementIsOverStd: preFilterState.measurementIsOverStd,
			measurementStatus: preFilterState.measurementStatus,
		}))

		if (searchText.length > 0) {
			setSearchText('')
		}
	}

	const clearFilterEvent = () => {
		setFilter(INITIAL_STATE_FILTER)
		setPreFilterState(INITIAL_STATE_FILTER)
		setSearchText('')
	}

	const onChangeFilter = (key: string, value: any) => {
		setFilter({
			...filter,
			[key]: value,
		})
	}

	const onAddFilter = (key: string, value: any) => {
		console.log('key', key)
		console.log('value', value)
		setPreFilterState((prev: any) => ({
			...prev,
			[key]: value,
		}))

		if (key === 'search') {
			setSearchText('')
		}
	}

	const onRemoveFilter = (key: string, value: any) => {
		if (key === 'search') {
			setSearchText('')
			setFilter(prevState => ({
				...prevState,
				[key]: prevState[key].filter((v: any) => v !== value),
			}))
		} else if (key === 'type') {
			setFilter(prevState => ({
				...prevState,
				[key]: prevState[key].filter((v: any) => v.value !== value),
			}))
			setPreFilterState(prevState => ({
				...prevState,
				[key]: prevState[key].filter((v: any) => v.value !== value),
			}))
		}
	}

	const onOpenMeasurementTable = (id: any) => {
		setMeasurementId(id)
		setShowMeasurementTable(true)
	}

	const onCloseMeasurementTable = () => {
		setMeasurementId(null)
		setShowMeasurementTable(false)
	}

	useEffect(() => {
		fetchData()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		fetchDataDashboardWithMeasurementFilter()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter.measurementType, filter.measurementIsOverStd, filter.measurementStatus])

	return {
		TYPE_OPTIONS,
		isMobile,
		isLargeMobile,
		isTablet,
		themeMode,
		data: data,
		windData,
		measurementData,
		selectedMeasurementData,
		dataTypeOptions,
		locationOptions,
		locationTypeOptions,
		distanceOptions,
		measurementTypeOptions,
		measurementIsOverStdOptions,
		measurementStatusOptions,
		locationData,
		type,
		onTypeChange,
		filter,
		preFilterState,
		displayFilter,
		searchText,
		setSearchText,
		onChangeFilter,
		onAddFilter,
		onRemoveFilter,
		confirmFilterEvent,
		clearFilterEvent,
		confirmFilterLocation,
		clearFilterLocation,
		getEventMediaPath,
		showMeasurementTable,
		onOpenMeasurementTable,
		onCloseMeasurementTable,
	}
}

export default ViewModel
