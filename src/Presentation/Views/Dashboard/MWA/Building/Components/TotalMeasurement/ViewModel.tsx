import { useMemo, useRef } from 'react'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useMWAStore } from '@/Store/MWA'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'

const ViewModel = () => {
	const intl = useIntl()
	const { mode } = useThemeMode()
	const totalChartRef = useRef<HTMLDivElement | null>(null)
	const { isMobile, isLargeMobile, isTablet, isFullHD, isLaptop, is4K, is8K } =
		useResolutionDetection()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const { data } = useMWAStore(state => ({
		data: state.selected,
	}))

	const chartOffsetX = useMemo(() => {
		if (is4K || is8K || isFullHD) return 0
		if (isLaptop) return 0
		if (isTablet || isLargeMobile) return 200
		if (isMobile) return 40
	}, [isMobile, isLargeMobile, isTablet, isLaptop, isFullHD, is4K, is8K])

	return {
		chartOffsetX,
		isMobile,
		isLargeMobile,
		isTablet,
		isFullHD,
		isLaptop,
		is4K,
		is8K,
		intl,
		themeMode,
		mode,
		totalChartRef,
		data,
	}
}

export default ViewModel
