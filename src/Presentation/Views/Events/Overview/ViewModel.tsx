import { useState, useMemo, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCurrentTime } from '@/Hooks/useCurrentTime'
import { useLang } from '@/_metronic/i18n/Metronici18n'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useEventStore } from '@/Store/Event'
import moment from 'moment-timezone'
import { toast } from 'react-toastify'

const INITIAL_FILTER = {
	startPeriod: moment().startOf('month').format('YYYY-MM-DD'),
	endPeriod: moment().endOf('month').format('YYYY-MM-DD'),
	eventTypeId: null,
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
	const location = useLocation()
	const navigate = useNavigate()
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
	const { setIsLoadingData, eventTypes, getAll, getTypes, clearState } = useEventStore(state => ({
		setIsLoadingData: state.setIsLoadingData,
		eventTypes: state.types,
		getAll: state.getAll,
		getTypes: state.getTypes,
		clearState: state.clearState,
	}))

	const [filter, setFilter] = useState(INITIAL_FILTER)
	const [isOpenDatePicker, setIsOpenDatePicker] = useState(false)

	const dateRange = useMemo(() => {
		if (filter.startPeriod && filter.endPeriod) {
			return `${moment(filter.startPeriod).format('MMM D, YYYY')} - ${moment(
				filter.endPeriod
			).format('MMM D, YYYY')}`
		}

		return 'Select Date Range'
	}, [filter.startPeriod, filter.endPeriod])

	const isShowTable = location.pathname === '/events/overview/table'
	const isShowCalendar = location.pathname === '/events/overview/calendar'

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

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

	const fetchData = () => {
		setIsLoadingData(true)
		let finaleFilter: { [key: string]: any } = {
			...filter,
		}

		if (isShowCalendar) {
			finaleFilter = Object.entries(filter).reduce((acc: { [key: string]: any }, [key, value]) => {
				if (key === 'startPeriod' || key === 'endPeriod') {
					return acc
				} else {
					acc[key] = value
				}

				return acc
			}, {})
		} else {
			finaleFilter = filter
		}

		getAll(finaleFilter).then(({ success, data }) => {
			if (!success) {
				toast.error(data)
			} else {
				setIsLoadingData(false)
			}
		})
		getTypes()
	}

	const confirmFilter = () => {
		fetchData()
	}

	const clearFilter = () => {
		setFilter(INITIAL_FILTER)
		setIsLoadingData(true)
		getAll(INITIAL_FILTER).then(({ success, data }) => {
			if (!success) {
				toast.error(data)
			} else {
				setIsLoadingData(false)
			}
		})
	}

	const onClickView = (path: string) => {
		navigate(path)
	}

	const onCreateEvent = () => {
		navigate('/events/new')
	}

	const onChangeFilter = (key: string, value: any) => {
		if (key === 'startPeriod' || key === 'endPeriod') {
			const finale = value !== null ? moment(value).format('YYYY-MM-DD') : null

			setFilter(prev => ({ ...prev, [key]: finale }))
		} else {
			setFilter(prev => ({ ...prev, [key]: value }))
		}
	}

	useEffect(() => {
		fetchData()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		return () => {
			clearState()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		isShowTable,
		isShowCalendar,
		timeStr,
		themeMode,
		filter,
		isOpenDatePicker,
		dateRange,
		eventTypesOptions,
		eventStatusOptions: EVENT_STATUS_OPTIONS,
		setIsOpenDatePicker,
		confirmFilter,
		clearFilter,
		onChangeFilter,
		onClickView,
		onCreateEvent,
	}
}

export default ViewModel
