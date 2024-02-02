import { useMemo } from 'react'
import { useCurrentTime } from '@/Hooks/useCurrentTime'
import { useLang } from '@/_metronic/i18n/Metronici18n'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useIntl } from 'react-intl'
import moment from 'moment-timezone'

const ViewModel = () => {
	const selectedLang = useLang()
	const intl = useIntl()
	// const currentTime = useCurrentTime()
	const timeStr = useMemo(() => {
		const time = moment()
			.tz('Asia/Bangkok')
			.add(selectedLang === 'th' ? 543 : 0, 'year')
			.format('DD/MM/YYYY HH:mm')

		return intl.formatMessage({ id: 'ZEROLOSS.HEADER.CURRENT_TIME' }) + ' ' + time
	}, [intl, selectedLang])
	const { mode } = useThemeMode()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const datas: any = [
		{
			id: 1,
			sensors: 'Sensor 1',
			location: 'Location 1',
			image: 'https://via.placeholder.com/50',
			status: 0,
			ppm: 100,
			scale: 25,
			scaleType: 'success',
		},
		{
			id: 2,
			sensors: 'Sensor 2',
			location: 'Location 2',
			image: 'https://via.placeholder.com/50',
			status: 1,
			ppm: 200,
			scale: 40,
			scaleType: 'warning',
		},
		{
			id: 3,
			sensors: 'Sensor 3',
			location: 'Location 3',
			image: 'https://via.placeholder.com/50',
			status: 1,
			ppm: 300,
			scale: 75,
			scaleType: 'danger',
		},
		{
			id: 4,
			sensors: 'Sensor 4',
			location: 'Location 4',
			image: 'https://via.placeholder.com/50',
			status: 0,
			ppm: 400,
			scale: 12,
			scaleType: 'success',
		},
	]

	return {
		timeStr,
		themeMode,
		datas,
	}
}

export default ViewModel
