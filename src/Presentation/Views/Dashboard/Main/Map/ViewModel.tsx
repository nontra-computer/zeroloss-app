import { useEffect, useMemo, useState } from 'react'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'
import { useEventStore } from '@/Store/Event'
import { useLocationStore } from '@/Store/Location'
import { useLocationTypeStore } from '@/Store/LocationType'
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
	{
		label: 'ข้อมูลจำลอง',
		value: 'simulation',
	},
	{
		label: 'ข้อมูลการวัด',
		value: 'measurement',
	},
]

const MOCK_DATA: any[] = [
	{
		id: 1,
		type: 'success',
		draggable: false,
		shapeType: 'circle',
		popup: null,
		position: {
			lat: 13.7473729,
			lng: 100.5137062,
		},
		degree: 0,
	},
	{
		id: 2,
		type: 'error',
		draggable: false,
		shapeType: 'circle',
		popup: null,
		position: {
			lat: 13.8527366,
			lng: 100.6882377,
		},
		degree: 78,
	},
	{
		id: 3,
		type: 'warning',
		draggable: false,
		shapeType: 'circle',
		popup: null,
		position: {
			lat: 13.7374361,
			lng: 100.7136729,
		},
		degree: 20,
	},
	{
		id: 4,
		type: 'success',
		draggable: false,
		shapeType: 'circle',
		popup: null,
		position: {
			lat: 13.7723976,
			lng: 100.5680649,
		},
		degree: 110,
	},
	{
		id: 5,
		type: 'error',
		draggable: false,
		shapeType: 'circle',
		popup: null,
		position: {
			lat: 13.8010716,
			lng: 100.5355079,
		},
		degree: 140,
	},
	{
		id: 6,
		type: 'warning',
		draggable: false,
		shapeType: 'circle',
		popup: null,
		position: {
			lat: 13.7374361,
			lng: 100.7136729,
		},
		degree: 270,
	},
	{
		id: 7,
		type: 'success',
		shapeType: 'circle',
		draggable: false,
		popup: null,
		position: {
			lat: 13.7473729,
			lng: 100.5137062,
		},
		degree: 150,
	},
	{
		id: 8,
		type: 'error',
		shapeType: 'circle',
		draggable: false,
		popup: null,
		position: {
			lat: 13.8221382,
			lng: 100.4998724,
		},
		degree: 290,
	},
	{
		id: 9,
		type: 'warning',
		shapeType: 'circle',
		draggable: false,
		popup: null,
		position: {
			lat: 13.7240437,
			lng: 100.4826123,
		},
	},
	{
		id: 10,
		type: 'success',
		shapeType: 'circle',
		draggable: false,
		popup: null,
		position: {
			lat: 13.7093509,
			lng: 100.4475244,
		},
		degree: 310,
	},
	{
		id: 11,
		type: 'error',
		shapeType: 'circle',
		draggable: false,
		popup: null,
		position: {
			lat: 13.6126487,
			lng: 100.5380794,
		},
		degree: 340,
	},
]

const INITIAL_STATE_FILTER: {
	type: any[]
	search: any[]
	locationTypeId: any
} = {
	type: [],
	search: [],
	locationTypeId: null,
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
	const measurementData = useMemo(() => {
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
		getLocations({
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
		getData().then(({ data: dataFetch, success }) => {
			if (!success) {
				toast.error(dataFetch)
			}
		})
	}

	const data = useMemo(() => {
		switch (type) {
			case 'all': {
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
							return filter.search.includes(d.title)
						}

						return true
					})

				return results
			}
			case 'wind-direction':
				return rawData?.wind ?? []
			case 'simulation':
				return MOCK_DATA
			case 'measurement':
				return rawData?.measurements ?? []
			default:
				return []
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type, dataEvents, rawData, filter, dataTypes])

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
			locationTypeId: null,
		}))
	}

	const confirmFilterEvent = () => {
		if (searchText.length > 0) {
			setFilter(prevState => ({
				locationTypeId: prevState.locationTypeId,
				search: [...prevState.search, searchText],
				type: preFilterState.type,
			}))
			setSearchText('')
		} else {
			setFilter(prevState => ({
				locationTypeId: prevState.locationTypeId,
				search: prevState.search,
				type: preFilterState.type,
			}))
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

	return {
		TYPE_OPTIONS,
		isMobile,
		isLargeMobile,
		isTablet,
		themeMode,
		data: data,
		dataTypeOptions,
		locationOptions,
		locationTypeOptions,
		distanceOptions,
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
		measurementData,
		onOpenMeasurementTable,
		onCloseMeasurementTable,
	}
}

export default ViewModel
