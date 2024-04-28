import { useEffect, useState, useMemo, useRef } from 'react'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useIntl } from 'react-intl'
import { useMWAStore } from '@/Store/MWA'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'
import { toast } from 'react-toastify'
import { vhToPixels } from '@/Utils/vhToPixels'
import moment from 'moment'
import 'moment-timezone'

const ViewModel = () => {
	const intl = useIntl()
	const { mode } = useThemeMode()
	const { last24Connection, dashboardSensors, getDashboardSensors, getLast24Connection } =
		useMWAStore(state => ({
			dashboardSensors: state.dashboardSensors,
			last24Connection: state.last24Connection,
			getDashboardSensors: state.getDashboardSensors,
			getLast24Connection: state.getLast24Connection,
		}))
	const [isLoading, setIsLoading] = useState(false)
	const [isDataChanged, setIsDataChanged] = useState(false)
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
	const last24ConnectionData = useMemo(() => {
		const categories: any[] = []
		const offline: any = []
		const online: any[] = []

		last24Connection.forEach((item: any) => {
			categories.push(moment(item.dateTime).locale('en').tz('Asia/Bangkok').format('HH:mm A'))
			offline.push(item.offline)
			online.push(item.online)
		})

		return {
			categories,
			offline,
			online,
		}
	}, [last24Connection])
	const { isMobile, isLargeMobile, isLaptop, isFullHD, is4K, is8K } = useResolutionDetection()
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	const chartData = useMemo(
		() => [data?.onlinePercentage ?? 0, data?.offlinePercentage ?? 0],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[data, isFullHD, is4K, is8K, isMobile, isLargeMobile]
	)
	const chartOffsetX = useMemo(() => {
		if (is8K) return 100
		if (is4K) return 100
		if (isFullHD) return 40
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
		const currentOnlinePercentage = data?.onlinePercentage ?? 0
		const currentOfflinePercentage = data?.offlinePercentage ?? 0

		setIsLoading(true)
		getDashboardSensors().then(({ data, success }) => {
			if (!success) {
				toast.error(data)
				return
			} else {
				let offlinePercentage = 0

				if (
					data?.totalOnline !== undefined &&
					data?.totalOffline !== undefined &&
					data?.onlinePercentage !== undefined
				) {
					offlinePercentage = Math.round(
						(data?.onlinePercentage * data?.totalOffline) / data?.totalOnline
					)
				}

				if (
					currentOnlinePercentage !== data.onlinePercentage ||
					currentOfflinePercentage !== offlinePercentage
				) {
					setIsDataChanged(true)

					setTimeout(() => {
						setIsDataChanged(false)
					}, 1000)
				}
			}
		})

		getLast24Connection().then(({ data, success }) => {
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
		isLaptop,
		chartData,
		chartWidth,
		chartHeight,
		chartOffsetX,
		intl,
		themeMode,
		mode,
		isLoading,
		isDataChanged,
		data,
		last24ConnectionData,
	}
}

export default ViewModel
