import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useMWAStore } from '@/Store/MWA'

const ViewModel = () => {
	const intl = useIntl()
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
		intl,
		themeMode,
		data,
	}
}

export default ViewModel
