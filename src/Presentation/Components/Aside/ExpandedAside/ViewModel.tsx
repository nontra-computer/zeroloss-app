import { useEffect, useRef } from 'react'
import useAsideMenu from '@/Hooks/useAsideMenu'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'

const ViewModel = () => {
	const asideRef = useRef<HTMLDivElement | null>(null)
	const intl = useIntl()
	const { isAsideExpanded, subMenu, onClickLinkAside } = useAsideMenu()
	const { mode } = useThemeMode()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const onClickOutside = (e: MouseEvent) => {
		if (
			asideRef.current &&
			!asideRef.current.contains(e.target as Node) &&
			(e.target as HTMLElement).getAttribute('id') !== 'setting-menu'
		) {
			onClickLinkAside()
		}
	}

	useEffect(() => {
		document.addEventListener('click', onClickOutside)
		return () => {
			document.removeEventListener('click', onClickOutside)
		}
	})

	return {
		asideRef,
		intl,
		isAsideExpanded,
		subMenu,
		onClickLinkAside,
		themeMode,
	}
}

export default ViewModel
