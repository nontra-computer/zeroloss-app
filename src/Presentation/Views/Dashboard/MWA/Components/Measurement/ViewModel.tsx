import { useMemo } from 'react'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useIntl } from 'react-intl'
import { useMWAStore } from '@/Store/MWA'

const ViewModel = () => {
	const intl = useIntl()
	const { mode } = useThemeMode()
	const { dashboardSensors } = useMWAStore(state => ({
		dashboardSensors: state.dashboardSensors,
	}))

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

	return {
		intl,
		themeMode,
		mode,
		data,
	}
}

export default ViewModel
