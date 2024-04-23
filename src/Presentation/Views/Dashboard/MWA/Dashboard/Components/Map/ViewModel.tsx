import { useState, useEffect, useMemo, useRef } from 'react'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'
import { useIntl } from 'react-intl'
import { useMWAStore } from '@/Store/MWA'
import { toast } from 'react-toastify'

const ViewModel = () => {
	const intl = useIntl()
	const [stageDimensions, setStageDimensions] = useState({ width: 0, height: 0 })
	const [expanded, setExpanded] = useState(false)
	const { mode } = useThemeMode()
	const [isShowHover, setIsShowHover] = useState(true)

	const [hasFetchFirstTime, setHasFetchFirstTime] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { stations, getStations } = useMWAStore(state => ({
		stations: state.stations,
		getStations: state.getStations,
	}))
	const { isLargeMobile, is4K, is8K } = useResolutionDetection()

	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	const buildingOne = stations.find((b: any) => b.id === 1)
	const buildingTwo = stations.find((b: any) => b.id === 2)
	const buildingThree = stations.find((b: any) => b.id === 3)
	const weatherInfo = useMemo(() => {
		if (buildingOne) {
			return {
				metStatus: buildingOne.metStatus === 1,
				wdText: buildingOne.wdText,
				ws: buildingOne.ws,
				temp: buildingOne.temp,
				rh: buildingOne.rh,
				bp: buildingOne.bp,
			}
		} else {
			return {
				metStatus: 0,
				wdText: '',
				ws: 0,
				temp: 0,
				rh: 0,
				bp: 0,
			}
		}
	}, [buildingOne])

	const stationDropdownOptions = stations.map((b: any) => ({
		label: b.building,
		value: b.id,
	}))

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const fetchData = () => {
		if (!hasFetchFirstTime) {
			setIsLoading(true)
		}
		getStations().then(({ data, success }) => {
			if (!success) {
				toast.error(data)
			} else {
				if (!hasFetchFirstTime) {
					setHasFetchFirstTime(true)
					setIsLoading(false)
				}
			}
		})
	}

	const generateIcon = (buildingId: number) => {
		const building = stations.find((b: any) => b.id === buildingId)
		if (building) {
			// Sensor มีสถานะ Online ทั้งหมด และมีผลการตรวจวัดที่เกินมาตรฐาน || แต่หากมี Sensor บางตัวที่ยัง Online และอ่านค่าได้เกินมาตรฐาน ก็ให้แสดงเป็นสีแดงแทน
			if (building.sumSensor > 0 && building.valueOverStd > 0) {
				return 'red'
			}
			// Sensor มีสถานะ Online ทั้งหมด และมีผลการตรวจวัดที่ใกล้เกินมาตรฐาน
			else if (building.sumSensor === building.sensorOnline && building.valueNearStd > 0) {
				return 'orange'
			}
			// มี Sensor ที่ Online ทั้งหมดและผลการตรวจวัดอยู่ในเกณฑ์ปกติ
			else if (
				building.sumSensor === building.sensorOnline &&
				building.sensorOnline === building.valueNormal
			) {
				return 'green'
			}
			// มี Sensor บางตัวที่ Offline
			else if (building.sensorOffline > 0) {
				return 'grey'
			} else {
				return null
			}
		} else {
			return null
		}
	}

	const onStartPanning = () => {
		setIsShowHover(false)
	}

	const onEndPanning = () => {
		setIsShowHover(true)
	}

	const onClickBuildingOne = () => {
		window.open(`/dashboard/mwa/building/${buildingOne?.id}`, '_blank')
	}

	const onClickBuildingTwo = () => {
		window.open(`/dashboard/mwa/building/${buildingTwo?.id}`, '_blank')
	}

	const onClickBuildingThree = () => {
		window.open(`/dashboard/mwa/building/${buildingThree?.id}`, '_blank')
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

	useEffect(() => {
		const buildingOneGroup = document.querySelector('#chlorine-station-1')
		const buildingTwoGroup = document.querySelector('#chlorine-station-2')
		const buildingThreeGroup = document.querySelector('#chlorine-station-3')

		if (buildingOneGroup) {
			buildingOneGroup.addEventListener('click', onClickBuildingOne)
		}

		if (buildingTwoGroup) {
			buildingTwoGroup.addEventListener('click', onClickBuildingTwo)
		}

		if (buildingThreeGroup) {
			buildingThreeGroup.addEventListener('click', onClickBuildingThree)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [buildingOne, buildingTwo, buildingThree])

	useEffect(() => {
		fetchData()
		// Fetch getSensor every 5 seconds
		intervalRef.current = setInterval(fetchData, 5000)

		return () => {
			// Clear the interval when the component is unmounted
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasFetchFirstTime])

	// const firstBuild = document.querySelectorAll('#first-building')

	return {
		isLargeMobile,
		is4K,
		is8K,
		isLoading,
		themeMode,
		intl,
		stationDropdownOptions,
		weatherInfo,
		buildingOne,
		buildingTwo,
		buildingThree,
		expanded,
		setExpanded,
		stageDimensions,
		isShowHover,
		onStartPanning,
		onEndPanning,
		generateIcon,
	}
}

export default ViewModel
