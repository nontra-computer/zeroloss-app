import { useState, useEffect } from 'react'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useIntl } from 'react-intl'
import { useMWAStore } from '@/Store/MWA'
import { toast } from 'react-toastify'

const ViewModel = () => {
	const intl = useIntl()
	const [stageDimensions, setStageDimensions] = useState({ width: 0, height: 0 })
	const [expanded, setExpanded] = useState(false)
	const { mode } = useThemeMode()
	const [isShowHover, setIsShowHover] = useState(true)

	const { data, getData } = useMWAStore(state => ({
		data: state.buildings,
		getData: state.getBuildingMeasurement,
	}))

	const buildingOne = data.find((b: any) => b.id === 1)
	const buildingTwo = data.find((b: any) => b.id === 2)
	const buildingThree = data.find((b: any) => b.id === 3)

	const dropdownOptions = data.map((b: any) => ({
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
		getData().then(({ data, success }) => {
			if (!success) {
				toast.error(data)
			}
		})
	}

	const generateIcon = (buildingId: number) => {
		const building = data.find((b: any) => b.id === buildingId)
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
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// const firstBuild = document.querySelectorAll('#first-building')

	return {
		themeMode,
		intl,
		data,
		dropdownOptions,
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
