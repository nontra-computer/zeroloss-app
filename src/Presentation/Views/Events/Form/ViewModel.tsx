import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useCurrentTime } from '@/Hooks/useCurrentTime'
import { useLang } from '@/_metronic/i18n/Metronici18n'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import moment from 'moment-timezone'
import 'moment-timezone'

const ViewModel = () => {
	const intl = useIntl()
	const currentTime = useCurrentTime()
	const selectedLang = useLang()
	const location = useLocation()
	const timeStr = useMemo(() => {
		const time = moment(currentTime)
			.tz('Asia/Bangkok')
			.add(selectedLang === 'th' ? 543 : 0, 'year')
			.format('DD/MM/YYYY HH:mm')

		return intl.formatMessage({ id: 'ZEROLOSS.HEADER.CURRENT_TIME' }) + ' ' + time
	}, [currentTime, intl, selectedLang])
	const { mode } = useThemeMode()

	const isCreate = location.pathname === '/events/new'
	const title = isCreate ? 'All Events / สร้างเหตุการณ์ใหม่' : 'All Events / รายละเอียดเหตุการณ์'

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return {
		isCreate,
		timeStr,
		themeMode,
		title,
	}
}

export default ViewModel
