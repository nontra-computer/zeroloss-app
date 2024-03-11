import { useState, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useParams, useNavigate } from 'react-router-dom'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'
import { useMWAStore } from '@/Store/MWA'

const ViewModel = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { buildingId } = useParams<{ buildingId?: string }>()
	const { mode } = useThemeMode()
	const { stations, sensors } = useMWAStore(state => ({
		stations: state.stations,
		sensors: state.selectedSensors,
	}))
	const [stageDimensions, setStageDimensions] = useState({ width: 0, height: 0 })
	const [isShowHover, setIsShowHover] = useState(true)
	const { isFullHD, is4K, is8K } = useResolutionDetection()

	const isStation1 = useMemo(() => buildingId === '1', [buildingId])
	const isStation2 = useMemo(() => buildingId === '2', [buildingId])
	const isStation3 = useMemo(() => buildingId === '3', [buildingId])

	const canZoomAndPan = useMemo(() => {
		return !isFullHD && !is4K && !is8K
	}, [isFullHD, is4K, is8K])

	const generateSensorColor = (status: number) => {
		switch (status) {
			case 3:
				return 'danger'
			case 2:
				return 'warning'
			case 1:
				return 'success'
			default:
				return 'default'
		}
	}

	const findSensorStatus = (id: number) => {
		const sensor = sensors.find((s: any) => s.id === id)
		if (sensor) {
			return sensor.status
		} else {
			return 0
		}
	}

	const station1Sensor: { [key: string]: 'success' | 'warning' | 'danger' | 'default' } =
		useMemo(() => {
			if (isStation1) {
				return {
					gd11: generateSensorColor(findSensorStatus(1)),
					gd12: generateSensorColor(findSensorStatus(2)),
					gd13: generateSensorColor(findSensorStatus(3)),
					gd14: generateSensorColor(findSensorStatus(4)),
					gd15: generateSensorColor(findSensorStatus(5)),
					gd16: generateSensorColor(findSensorStatus(6)),
					gd17: generateSensorColor(findSensorStatus(7)),
					gd18: generateSensorColor(findSensorStatus(7)),
				}
			} else {
				return {
					gd11: 'default',
					gd12: 'default',
					gd13: 'default',
					gd14: 'default',
					gd15: 'default',
					gd16: 'default',
					gd17: 'default',
					gd18: 'default',
				}
			}
			// eslint-disable-next-line
		}, [isStation1, sensors])

	const station2Sensor: { [key: string]: 'success' | 'warning' | 'danger' | 'default' } =
		useMemo(() => {
			if (isStation2) {
				return {
					gd21: generateSensorColor(findSensorStatus(9)),
					gd22: generateSensorColor(findSensorStatus(10)),
					gd23: generateSensorColor(findSensorStatus(11)),
					gd24: generateSensorColor(findSensorStatus(12)),
					gd25: generateSensorColor(findSensorStatus(13)),
					gd26: generateSensorColor(findSensorStatus(14)),
					gd27: generateSensorColor(findSensorStatus(15)),
					gd28: generateSensorColor(findSensorStatus(16)),
				}
			} else {
				return {
					gd21: 'default',
					gd22: 'default',
					gd23: 'default',
					gd24: 'default',
					gd25: 'default',
					gd26: 'default',
					gd27: 'default',
					gd28: 'default',
				}
			}
			// eslint-disable-next-line
		}, [isStation2, sensors])

	const station3Sensor: { [key: string]: 'success' | 'warning' | 'danger' | 'default' } =
		useMemo(() => {
			if (isStation3) {
				return {
					gd31: generateSensorColor(findSensorStatus(17)),
					gd32: generateSensorColor(findSensorStatus(18)),
					gd33: generateSensorColor(findSensorStatus(19)),
					gd34: generateSensorColor(findSensorStatus(20)),
					gd35: generateSensorColor(findSensorStatus(21)),
					gd36: generateSensorColor(findSensorStatus(22)),
					gd37: generateSensorColor(findSensorStatus(23)),
					gd38: generateSensorColor(findSensorStatus(24)),
				}
			} else {
				return {
					gd31: 'default',
					gd32: 'default',
					gd33: 'default',
					gd34: 'default',
					gd35: 'default',
					gd36: 'default',
					gd37: 'default',
					gd38: 'default',
				}
			}
			// eslint-disable-next-line
		}, [isStation3, sensors])

	const stationDropdownOptions = stations.map((b: any) => ({
		label: b.building,
		value: b.id,
	}))
	const currentDropdownOption = stationDropdownOptions.find(
		(b: any) => b.value === parseInt(buildingId ?? '0')
	)

	const onSelectBuilding = (id: string) => {
		navigate(`/dashboard/mwa/building/${id}`)
	}

	const onStartPanning = () => {
		setIsShowHover(false)
	}

	const onEndPanning = () => {
		setIsShowHover(true)
	}

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	useEffect(() => {
		const updateStageDimensions = () => {
			const container = document.getElementById('measurement-map-container')

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

	return {
		canZoomAndPan,
		isStation1,
		isStation2,
		isStation3,
		station1Sensor,
		station2Sensor,
		station3Sensor,
		mode,
		themeMode,
		intl,
		isShowHover,
		stageDimensions,
		currentDropdownOption,
		stationDropdownOptions,
		onSelectBuilding,
		onStartPanning,
		onEndPanning,
	}
}

export default ViewModel
