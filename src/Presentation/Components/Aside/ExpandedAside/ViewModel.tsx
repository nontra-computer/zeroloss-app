import useAsideMenu from '@/Hooks/useAsideMenu'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'

const ViewModel = () => {
	const intl = useIntl()
	const { isAsideExpanded, subMenu, onClickLinkAside } = useAsideMenu()
	const { mode } = useThemeMode()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return {
		intl,
		isAsideExpanded,
		subMenu,
		onClickLinkAside,
		themeMode,
	}
}

export default ViewModel
