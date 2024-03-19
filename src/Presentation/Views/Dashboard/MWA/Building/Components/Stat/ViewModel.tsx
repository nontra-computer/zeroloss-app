import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'
import { useMWAStore } from '@/Store/MWA'

const ViewModel = () => {
	const intl = useIntl()
	const { isMobile, isLargeMobile } = useResolutionDetection()
	const { mode } = useThemeMode()
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
		intl,
		themeMode,
		data,
	}
}

export default ViewModel
