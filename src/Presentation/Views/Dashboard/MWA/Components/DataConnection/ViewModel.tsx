import { useEffect, useState, useMemo, useRef } from 'react'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useIntl } from 'react-intl'
import { useMWAStore } from '@/Store/MWA'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'
import { toast } from 'react-toastify'

const ViewModel = () => {
	const intl = useIntl()
	const { mode } = useThemeMode()
	const { dashboardSensors, getDashboardSensors } = useMWAStore(state => ({
		dashboardSensors: state.dashboardSensors,
		getDashboardSensors: state.getDashboardSensors,
	}))
	const [isLoading, setIsLoading] = useState(false)
	const data = useMemo(() => {
		if (!dashboardSensors) return {}

		const offlinePercentage = Math.round(
			(dashboardSensors?.onlinePercentage * dashboardSensors?.totalOffline) /
				dashboardSensors?.totalOnline
		)

		return {
			...dashboardSensors,
			offlinePercentage,
		}
	}, [dashboardSensors])
	const { is4K, is8K } = useResolutionDetection()
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const fetchData = () => {
		setIsLoading(true)
		getDashboardSensors().then(({ data, success }) => {
			if (!success) {
				toast.error(data)
				return
			} else {
				setIsLoading(false)
			}
		})
	}

	useEffect(() => {
		fetchData()
		// Fetch getSensor every 5 seconds
		intervalRef.current = setInterval(fetchData, 5000)

		return () => {
			// Clear the interval when the component is unmounted
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		is4K,
		is8K,
		intl,
		themeMode,
		mode,
		isLoading,
		data,
	}
}

export default ViewModel
