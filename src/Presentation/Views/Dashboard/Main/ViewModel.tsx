import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCurrentTime } from '@/Hooks/useCurrentTime'
import { useLang } from '@/_metronic/i18n/Metronici18n'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useIntl } from 'react-intl'
import { toast } from 'react-toastify'
import moment from 'moment-timezone'
import Alert from '../Components/Alert/View'

const ViewModel = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const selectedLang = useLang()
	const intl = useIntl()

	const currentTime = useCurrentTime()
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

	const isShowTable = location.pathname === '/dashboard/overview/table'
	const isShowMap = location.pathname === '/dashboard/overview/map'
	const isShowCalendar = location.pathname === '/dashboard/overview/calendar'

	const onClickView = (path: string) => {
		navigate(path)
	}

	const handleShowAlertTemp = () => {
		toast.success(<Alert />, {
			className: 'zeroloss-toast',
			bodyClassName: 'zeroloss-toast-body',
			icon: false,
			hideProgressBar: true,
		})
	}

	useEffect(() => {
		handleShowAlertTemp()
	}, [])

	return {
		timeStr,
		themeMode,
		isShowTable,
		isShowMap,
		isShowCalendar,
		onClickView,
	}
}

export default ViewModel
