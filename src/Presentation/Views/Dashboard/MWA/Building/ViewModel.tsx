import { useEffect, useMemo, useRef } from 'react'
import { useCurrentTime } from '@/Hooks/useCurrentTime'
// import { useNavigate } from 'react-router-dom'
import { useLang } from '@/_metronic/i18n/Metronici18n'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { useMWAStore } from '@/Store/MWA'
import moment from 'moment-timezone'
import { toast } from 'react-toastify'

const ViewModel = () => {
	const selectedLang = useLang()
	const intl = useIntl()
	// const navigate = useNavigate()
	const currentTime = useCurrentTime()
	const timeStr = useMemo(() => {
		const time = moment(currentTime)
			.tz('Asia/Bangkok')
			.add(selectedLang === 'th' ? 543 : 0, 'year')
			.format('DD/MM/YYYY HH:mm')

		return intl.formatMessage({ id: 'ZEROLOSS.HEADER.CURRENT_TIME' }) + ' ' + time
	}, [currentTime, intl, selectedLang])
	const { mode } = useThemeMode()
	const { buildingId } = useParams<{ buildingId?: string }>()

	const { getSensor, getData, getStations, clearState } = useMWAStore(state => ({
		getData: state.getStationMeasurementDetail,
		getStations: state.getStations,
		getSensor: state.getStationMeasurementDetailSensor,
		clearState: state.clearState,
	}))
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const onSelectBuilding = (id: string) => {
		window.open(`/dashboard/mwa/building/${id}`, '_blank')
		// navigate(`/dashboard/mwa/building/${id}`)

		if (intervalRef.current) {
			clearInterval(intervalRef.current)
		}
	}

	const fetchData = () => {
		if (buildingId) {
			getStations().then(({ data, success }) => {
				if (!success) {
					toast.error(data)
					return
				}
			})

			getData(parseInt(buildingId)).then(({ data, success }) => {
				if (!success) {
					toast.error(data)
					return
				}
			})

			getSensor(parseInt(buildingId)).then(({ data, success }) => {
				if (!success) {
					toast.error(data)
					return
				}
			})
		}
	}

	useEffect(() => {
		fetchData()

		// Fetch getSensor every 5 seconds
		intervalRef.current = setInterval(fetchData, 5000)

		return () => {
			clearState()

			// Clear the interval when the component is unmounted
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [buildingId])

	return {
		timeStr,
		themeMode,
		onSelectBuilding,
	}
}

export default ViewModel
