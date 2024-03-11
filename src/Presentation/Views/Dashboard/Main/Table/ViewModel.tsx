import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'

const ViewModel = () => {
	const { mode } = useThemeMode()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return {
		themeMode,
	}
}

export default ViewModel
