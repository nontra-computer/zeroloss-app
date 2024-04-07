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
	startDate: moment().startOf('month').format('YYYY-MM-DD'),
	endDate: moment().endOf('month').format('YYYY-MM-DD'),
}

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
	const { setIsLoadingData, getAll, getTypes, clearState } = useEventStore(state => ({
		setIsLoadingData: state.setIsLoadingData,
		getAll: state.getAll,
		getTypes: state.getTypes,
		clearState: state.clearState,
	}))

	const [filter, setFilter] = useState(INITIAL_FILTER)
	const [isOpenDatePicker, setIsOpenDatePicker] = useState(false)

	const dateRange = useMemo(() => {
		if (filter.startDate && filter.endDate) {
			return `${moment(filter.startDate).format('MMM D, YYYY')} - ${moment(filter.endDate).format(
				'MMM D, YYYY'
			)}`
		}

		return 'Select Date Range'
	}, [filter.startDate, filter.endDate])

	const isShowTable = location.pathname === '/events/overview/table'
	const isShowCalendar = location.pathname === '/events/overview/calendar'

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const fetchData = () => {
		setIsLoadingData(true)
		getAll({}).then(({ success, data }) => {
			if (!success) {
				toast.error(data)
			} else {
				setIsLoadingData(false)
			}
		})
		getTypes()
	}

	const onClickView = (path: string) => {
		navigate(path)
	}

	const onChangeFilter = (key: string, value: any) => {
		if (key === 'startDate' || key === 'endDate') {
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
		setIsOpenDatePicker,
		onChangeFilter,
		onClickView,
	}
}

export default ViewModel
