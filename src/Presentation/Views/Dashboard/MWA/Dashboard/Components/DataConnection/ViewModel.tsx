import { useEffect, useState, useMemo, useRef } from 'react'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useIntl } from 'react-intl'
import { useMWAStore } from '@/Store/MWA'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'
import { toast } from 'react-toastify'
import { vhToPixels } from '@/Utils/vhToPixels'

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

		let offlinePercentage = 0

		if (
			dashboardSensors?.totalOnline !== undefined &&
			dashboardSensors?.totalOffline !== undefined &&
			dashboardSensors?.onlinePercentage !== undefined
		) {
			offlinePercentage = Math.round(
				(dashboardSensors?.onlinePercentage * dashboardSensors?.totalOffline) /
					dashboardSensors?.totalOnline
			)
		}

		return {
			...dashboardSensors,
			offlinePercentage,
		}
	}, [dashboardSensors])
	const { isMobile, isLargeMobile, isFullHD, is4K, is8K } = useResolutionDetection()
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	const chartData = useMemo(
		() => [data?.onlinePercentage ?? 0, data?.offlinePercentage ?? 0],
		[data]
	)
	const chartOffsetX = useMemo(() => {
		if (is8K) return 100
		if (is4K) return 100
		if (isFullHD) return -20
		if (isLargeMobile) return 100
		if (isMobile) return 20
		return 0
	}, [isFullHD, is4K, is8K, isMobile, isLargeMobile])
	const chartWidth = useMemo(() => {
		if (is8K || is4K) return '500px'
		else return '300px'
	}, [is4K, is8K])
	const chartHeight = useMemo(() => {
		const random = Math.random()

		if (is8K || is4K) return vhToPixels(25) + random
		else return 20 + random
	}, [is4K, is8K])

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
		isLargeMobile,
		isFullHD,
		is4K,
		is8K,
		chartData,
		chartWidth,
		chartHeight,
		chartOffsetX,
		intl,
		themeMode,
		mode,
		isLoading,
		data,
	}
}

export default ViewModel
