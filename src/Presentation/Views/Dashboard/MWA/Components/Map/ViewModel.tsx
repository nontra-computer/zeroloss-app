import { useState, useEffect } from 'react'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useIntl } from 'react-intl'

const ViewModel = () => {
	const intl = useIntl()
	const [stageDimensions, setStageDimensions] = useState({ width: 0, height: 0 })
	const [expanded, setExpanded] = useState(false)
	const { mode } = useThemeMode()
	const [isShowHover, setIsShowHover] = useState(true)

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const onStartPanning = () => {
		setIsShowHover(false)
	}

	const onEndPanning = () => {
		setIsShowHover(true)
	}

	useEffect(() => {
		const updateStageDimensions = () => {
			const container = document.getElementById('mwa-data-connection-container')

			if (container) {
				setStageDimensions({
					width: container.offsetWidth,
					height: container.offsetHeight,
				})
			}
		}

		// Update dimensions initially
		updateStageDimensions()

		// Update dimensions whenever the window is resized
		window.addEventListener('resize', updateStageDimensions)

		// Clean up event listener when the component is unmounted
		return () => {
			window.removeEventListener('resize', updateStageDimensions)
		}
	}, [])

	// const firstBuild = document.querySelectorAll('#first-building')

	return {
		themeMode,
		intl,
		expanded,
		setExpanded,
		stageDimensions,
		isShowHover,
		onStartPanning,
		onEndPanning,
	}
}

export default ViewModel
