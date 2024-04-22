import { useEffect, useMemo, useState } from 'react'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'
import { useEventStore } from '@/Store/Event'
import { useLocationStore } from '@/Store/Location'
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
} = {
	type: [],
	search: [],
}

const ViewModel = () => {
	const { mode } = useThemeMode()
	const { isMobile, isLargeMobile, isTablet } = useResolutionDetection()
	const [type, setType] = useState<'all' | 'wind-direction' | 'simulation' | 'measurement'>('all')
	const { rawData, dataTypes, getData, getTypes, clearState } = useEventStore(state => ({
		rawData: state.dashboardData,
		dataTypes: state.types,
		getData: state.getDashboardData,
		getTypes: state.getTypes,
		clearState: state.clearState,
	}))
	const { locations } = useLocationStore(state => ({
		locations: state.dataMapMarker,
	}))
	const [searchText, setSearchText] = useState('')
	const [filter, setFilter] = useState(INITIAL_STATE_FILTER)

	const displayFilter = useMemo(() => {
		const results: any = {}

		Object.keys(filter).forEach(key => {
			if (key === 'type') {
				results[key] = dataTypes.filter((d: any) => filter[key].includes(d.id))
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

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const fetchData = () => {
		getTypes()
		getData().then(({ data: dataFetch, success }) => {
			if (!success) {
				toast.error(dataFetch)
			}
		})
	}

	const data = useMemo(() => {
		switch (type) {
			case 'all':
				return rawData?.events
					? rawData.events.map((e: any) => ({
							...e,
							eventType: {
								id: e.idEventType,
								name: dataTypes.find((d: any) => d.id === e.idEventType)?.name,
							},
						}))
					: []
			case 'wind-direction':
				return rawData?.wind ?? []
			case 'simulation':
				return MOCK_DATA
			case 'measurement':
				return rawData?.measurements ?? []
			default:
				return MOCK_DATA
		}
	}, [type, rawData, filter, dataTypes])

	const onTypeChange = (value: 'all' | 'wind-direction' | 'simulation' | 'measurement') => {
		setType(value)
	}

	const onAddFilter = (key: string, value: any) => {
		setFilter((prev: any) => ({
			...prev,
			[key]: [...prev[key], value],
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
				[key]: prevState[key].filter((v: any) => v !== value),
			}))
		}
	}

	useEffect(() => {
		fetchData()

		return () => {
			clearState()
		}
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
		type,
		onTypeChange,
		filter,
		displayFilter,
		searchText,
		setSearchText,
		onAddFilter,
		onRemoveFilter,
	}
}

export default ViewModel
