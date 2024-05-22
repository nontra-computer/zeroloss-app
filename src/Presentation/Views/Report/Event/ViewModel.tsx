import { useState, useMemo, useEffect } from 'react'
import { useCurrentTime } from '@/Hooks/useCurrentTime'
import { useLang } from '@/_metronic/i18n/Metronici18n'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useEventStore } from '@/Store/Event'
import { useMeasurementStore } from '@/Store/Measurement'
import moment from 'moment-timezone'
import { toast } from 'react-toastify'

const INITIAL_FILTER = {
	q: '',
	createdAtStartPeriod: null,
	createdAtEndPeriod: null,
	caseStartPeriod: null,
	caseEndPeriod: null,
	eventTypeId: null,
	eventSubTypeId: null,
	state: null,
}

const EVENT_STATUS_OPTIONS = [
	{
		label: 'แจ้งเหตุ',
		value: 1,
	},
	{
		label: 'รอพิจารณา',
		value: 2,
	},
	{
		label: 'เหตุการณ์ต่อเนื่อง',
		value: 3,
	},
	{
		label: 'เหตุการณ์สิ้นสุด',
		value: 4,
	},
]

const ViewModel = () => {
	const intl = useIntl()
	const currentTime = useCurrentTime()
	const selectedLang = useLang()
	const timeStr = useMemo(() => {
		const time = moment(currentTime)
			.tz('Asia/Bangkok')
			.add(selectedLang === 'th' ? 543 : 0, 'year')
			.format('DD/MM/YYYY HH:mm')

		return intl.formatMessage({ id: 'ZEROLOSS.HEADER.CURRENT_TIME' }) + ' ' + time
	}, [currentTime, intl, selectedLang])
	const { mode } = useThemeMode()
	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const {
		setIsLoadingData,
		dashboardData,
		events,
		eventTypes,
		eventSubTypes,
		getAll,
		getSubTypes,
		getTypes,
		getEventMediaPath,
		getDashboardMap,
		clearState,
	} = useEventStore(state => ({
		setIsLoadingData: state.setIsLoadingData,
		dashboardData: state.dashboardData,
		events: state.data,
		eventTypes: state.types,
		eventSubTypes: state.subTypes,
		getAll: state.getAll,
		getTypes: state.getTypes,
		getSubTypes: state.getSubTypes,
		getEventMediaPath: state.getEventMediaPath,
		getDashboardMap: state.getDashboardData,
		clearState: state.clearState,
	}))
	const { clearStateMeasurement } = useMeasurementStore(state => ({
		measurementTypes: state.types,
		getMeasurementTypes: state.getTypes,
		clearStateMeasurement: state.clearState,
	}))

	const [filter, setFilter] = useState(INITIAL_FILTER)
	const [hasSelectedFirstDataSource, setHasSelectedFirstDataSource] = useState(false)

	const [showMeasurementTable, setShowMeasurementTable] = useState<boolean>(false)
	const [measurementId, setMeasurementId] = useState<any>(null)

	const selectedMeasurementData = useMemo(() => {
		return (dashboardData?.measurements ?? []).find((d: any) => d.id === measurementId)
	}, [dashboardData?.measurements, measurementId])

	const measurements = dashboardData?.measurements ?? []

	const eventTypesOptions: {
		label: string
		value: any
	}[] = eventTypes.map(
		(d: any) => ({
			label: d.name,
			value: d.id,
		}),
		[]
	)

	const eventSubTypesOptions = useMemo(() => {
		return eventSubTypes
			.filter((d: any) => d.eventTypeId === filter.eventTypeId)
			.map((d: any) => ({
				label: d.name,
				value: d.id,
			}))
	}, [filter.eventTypeId, eventSubTypes])

	const data = useMemo(() => {
		const results = events.map((d: any) => ({
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

		return results
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [events, filter])

	const fetchProperties = () => {
		getTypes()
		getSubTypes()
		getDashboardMap({})
	}

	const confirmFilter = () => {
		const isSelectSomeFilter = Object.values(filter).some(value => value !== null && value !== '')

		if (!isSelectSomeFilter) {
			toast.error('กรุณาเลือกอย่างน้อย 1 ตัวกรอง')
			return
		}

		if (!hasSelectedFirstDataSource) {
			setHasSelectedFirstDataSource(true)
		}

		setIsLoadingData(true)
		const finaleFilter: { [key: string]: any } = Object.entries(filter).reduce(
			(acc: { [key: string]: any }, [key, value]) => {
				if (
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

		getAll(finaleFilter).then(({ success, data }) => {
			if (!success) {
				toast.error(data)
			} else {
				setIsLoadingData(false)
			}
		})
	}

	const clearFilter = () => {
		setFilter(INITIAL_FILTER)
	}

	const onChangeFilter = (key: string, value: any) => {
		if (
			['createdAtStartPeriod', 'createdAtEndPeriod', 'caseStartPeriod', 'caseEndPeriod'].includes(
				key
			)
		) {
			const finale = value !== null ? moment(value).format('YYYY-MM-DD') : null

			setFilter(prev => ({ ...prev, [key]: finale }))
		} else if (key === 'eventTypeId') {
			setFilter(prev => ({ ...prev, [key]: value, eventSubTypeId: null }))
		} else {
			setFilter(prev => ({ ...prev, [key]: value }))
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
		fetchProperties()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		return () => {
			clearState()
			clearStateMeasurement()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		themeMode,
		timeStr,
		hasSelectedFirstDataSource,
		filter,
		data,
		selectedMeasurementData,
		measurements,
		eventTypesOptions,
		eventStatusOptions: EVENT_STATUS_OPTIONS,
		eventSubTypesOptions,
		confirmFilter,
		clearFilter,
		showMeasurementTable,
		onChangeFilter,
		onOpenMeasurementTable,
		onCloseMeasurementTable,
	}
}

export default ViewModel
