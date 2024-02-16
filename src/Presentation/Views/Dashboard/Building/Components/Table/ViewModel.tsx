import { useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useMWAStore } from '@/Store/MWA'
import { TableContext } from '@/Context/Table'

import DoubleLineImage from '@/Presentation/Components/Table/Cells/DoubleLineImage'
import DynamicChangePPM from '@/Presentation/Components/DynamicChangePPM/View'
import Scale from '@/Presentation/Components/Scale/View'
import SensorChart from './SensorChart'

import clsx from 'clsx'

const ViewModel = () => {
	const intl = useIntl()
	const { updateLoading, updateError, updatePagination, updateSorting } = useContext(TableContext)
	const { mode } = useThemeMode()
	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const { data } = useMWAStore(state => ({
		data: state.selectedSensors,
	}))

	const setupTable = () => {
		updateLoading(false)
		updateError(false)
		updatePagination(true)
		updateSorting('sensors', true)
	}

	const calculateArrow = ({
		value,
		nearStd,
		std,
		lastValue,
	}: {
		value: number
		nearStd: number
		std: number
		lastValue: number
	}) => {
		let arrow = false
		let minus = false
		let direction: 'up' | 'down' = 'up'
		let type: 'success' | 'warning' | 'danger' = 'success'

		if (nearStd <= value && value < std) {
			direction = 'up'
			type = 'warning'
		} else if (std <= value) {
			direction = 'up'
			type = 'danger'
		} else if (value < nearStd) {
			direction = 'down'
			type = 'success'
		}

		if (value > lastValue || value < lastValue) {
			arrow = true
			minus = false
		} else if (value === lastValue) {
			arrow = false
			minus = true
		}

		return {
			arrow,
			minus,
			direction,
			type,
		}
	}

	const calculateScale = ({
		scaleMax,
		nearStd,
		std,
	}: {
		value: number
		scaleMin: number
		scaleMax: number
		nearStd: number
		std: number
	}) => {
		// Near Standard in Percentage of the scale
		const startScalePercentagePosition = (nearStd * 100) / scaleMax
		// Staddard in Percentage of the scale
		const endScalePercentagePosition = (std * 100) / scaleMax

		return {
			min: startScalePercentagePosition,
			max: endScalePercentagePosition,
		}
	}

	const findScale = (id: number) => {
		const scale = data.find((d: any) => d.id === id)

		// หาก mwa_sensor.value < mwa.sensor.near_std ให้แสดงเส้นสีเขียว
		if (scale?.value < scale?.nearStd) {
			return 'success'
		}
		// หาก mwa_sensor.near_std <= mwa_sensor.value < mwa.sensor.std ให้แสดงเส้นสีส้ม
		else if (scale?.nearStd <= scale?.value && scale?.value < scale?.std) {
			return 'warning'
		}
		// หาก mwa_sensor.value >= mwa_sensor.std ให้แสดงเส้นสีแดง
		else if (scale?.value >= scale?.std) {
			return 'danger'
		} else {
			return null
		}
	}

	const columns: any[] = [
		{
			Header: 'รายชื่อ Sensors',
			accessor: 'sensors',
			minWidth: 400,
			Cell: (props: any) => {
				return (
					<DoubleLineImage
						label={props.row.original.sensorName}
						description={
							props.row.original.valueStatus !== 1
								? props.row.original.lastValueStatusDetail ?? '-'
								: ''
						}
						img={props.row.original.image}
					/>
				)
			},
		},
		{
			Header: 'Status',
			accessor: 'status',
			minWidth: 40,
			Cell: (props: any) => {
				return (
					<span
						className={clsx('badge', {
							'badge-light-success': props.row.original.status === 1,
							'badge-light-danger': props.row.original.status === 0,
						})}>
						{props.row.original.status === 1 ? 'Online' : 'Offline'}
					</span>
				)
			},
		},
		{
			Header: 'Value',
			accessor: 'ppm',
			minWidth: 80,
			Cell: (props: any) => {
				if (props.row.original.valueStatus !== 1) {
					return <span>-</span>
				}

				const { arrow, direction, minus, type } = calculateArrow(props.row.original)
				// Find change in percentage between lastValue and value
				let change = (props.row.original.value * 100) / props.row.original.lastValue
				if (change > 100) change = 100

				return (
					<DynamicChangePPM
						value={props.row.original.value}
						arrow={arrow}
						minus={minus}
						direction={direction}
						type={type}
						change={isNaN(change) ? 0 : change}
					/>
				)
			},
		},
		{
			Header: '24 Hours',
			accessor: 'graph',
			minWidth: 50,
			Cell: () => {
				return <SensorChart />
			},
		},
		{
			Header: 'Scale',
			accessor: 'scale',
			minWidth: 250,
			Cell: (props: any) => {
				const type = findScale(props.row.original.id)

				const { min, max } = calculateScale(props.row.original)

				const valueInPercentage = (props.row.original.value * 100) / props.row.original.scaleMax

				if (!type) {
					return null
				}

				return (
					<div className="px-5">
						<Scale min={min} max={max} value={valueInPercentage} type={type} />
					</div>
				)
			},
		},
	]

	useEffect(() => {
		setupTable()
		// eslint-disable-next-line
	}, [])

	return {
		intl,
		themeMode,
		columns,
		data,
	}
}

export default ViewModel
