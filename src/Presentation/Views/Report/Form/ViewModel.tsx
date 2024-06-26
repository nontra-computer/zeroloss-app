import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrentTime } from '@/Hooks/useCurrentTime'
import { useLang } from '@/_metronic/i18n/Metronici18n'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useIntl } from 'react-intl'
import { useEventStore } from '@/Store/Event'
import { useLocationStore } from '@/Store/Location'
import { toast } from 'react-toastify'
import moment from 'moment-timezone'
import data from '../Measurement/data.json' // Make sure this path is correct

const useViewModel = () => {
	const navigate = useNavigate()
	const selectedLang = useLang()
	const intl = useIntl()
	const { summary, getSummary } = useEventStore(state => ({
		summary: state.summary,
		getSummary: state.getSummary,
	}))
	const { getAllMapMarker } = useLocationStore(state => ({
		dataMapMarker: state.dataMapMarker,
		getAllMapMarker: state.getAllMapMarker,
	}))

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

	const fetchData = () => {
		getAllMapMarker()
		getSummary().then(({ data, success }) => {
			if (!success) {
				toast.error(data)
			}
		})
	}

	const onClickView = (path: string) => {
		navigate(path)
	}

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const processData = () => {
		interface ProcessedDataRow {
			date: string
			[key: string]: any
		}

		const processedData = data.data.map(item => {
			const processedRow = {
				date: moment(item.date_time).format('DD/MM/YYYY HH:mm'),
				wind_speed: item.wind_speed,
				wind_direction: item.wind_direction,
			}

			data.parameters.forEach(param => {
				const paramName = param.name
				const paramNumber = paramName.split('-')[1]
				const paramKey = `p${paramNumber}`
				processedRow[`p_${paramName}`] = item[paramKey]
			})

			return processedRow
		})

		const parameters = data.parameters.filter(param => param.id !== 31 && param.id !== 32)

		console.log(parameters)

		const stats = parameters.map(param => {
			const paramName = param.name
			const values = processedData.map(row => row[`p_${paramName}`])
			const min = Math.min(...values).toFixed(2)
			const max = Math.max(...values).toFixed(2)

			return { paramName, min, max }
		})

		const average = parameters.map(param => {
			const paramName = param.name
			const total = processedData.reduce(
				(sum, row: ProcessedDataRow) => sum + row[`p_${paramName}`],
				0
			)
			const average = total / processedData.length
			return { paramName, average: average.toFixed(2) }
		})

		return {
			processedData,
			parameters,
			average,
			stats,
		}
	}

	return {
		timeStr,
		themeMode,
		summary,
		onClickView,
		processData,
	}
}

export default useViewModel
