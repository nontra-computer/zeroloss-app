import { useRef } from 'react'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useMWAStore } from '@/Store/MWA'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'

const ViewModel = () => {
	const intl = useIntl()
	const { mode } = useThemeMode()
	const totalChartRef = useRef<HTMLDivElement | null>(null)
	const { isMobile, isLargeMobile, isTablet } = useResolutionDetection()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const { data } = useMWAStore(state => ({
		data: state.selected,
	}))

	return {
		isMobile,
		isLargeMobile,
		isTablet,
		intl,
		themeMode,
		mode,
		totalChartRef,
		data,
	}
}

export default ViewModel
