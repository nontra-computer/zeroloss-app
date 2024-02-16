import { useEffect, useState, useMemo } from 'react'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useIntl } from 'react-intl'
import { useMWAStore } from '@/Store/MWA'
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
		// eslint-disable-next-line
	}, [])

	return {
		intl,
		themeMode,
		mode,
		isLoading,
		data,
	}
}

export default ViewModel
