import { useEffect, useMemo } from 'react'
import { useEventStore } from '@/Store/Event'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { EventDangerLevelOptions } from '@/Configuration/EventDangerLevel'

const ViewModel = () => {
	const { mode } = useThemeMode()
	const { data, eventTypes, eventSubTypes, pollutionTypes, getTypes, getSubTypes, getPollution } =
		useEventStore(state => ({
			data: state.selected,
			eventTypes: state.types,
			eventSubTypes: state.subTypes,
			pollutionTypes: state.pollutions,
			getTypes: state.getTypes,
			getSubTypes: state.getSubTypes,
			getPollution: state.getPollution,
		}))

	const eventTypesOptions: {
		label: string
		value: any
	}[] = eventTypes.map(
		(d: any) => ({
			label: d.name,
			value: d.id,
		}),
		[]
	)

	const eventSubTypesOptions = eventSubTypes
		.filter((d: any) => d.eventTypeId === data?.eventTypeId)
		.map((d: any) => ({
			label: d.name,
			value: d.id,
		}))

	const pollution = useMemo(() => {
		let pollutionData: {
			[key: string]: {
				label: string
				value: any
			}
		} = {}

		if (Object.keys(pollutionTypes).length !== 0) {
			pollutionData = Object.keys(pollutionTypes).reduce(
				(
					acc: {
						[key: string]: {
							label: string
							value: any
						}
					},
					curr
				) => {
					if (data[curr] !== undefined && (data[curr] === 1 || data[curr] === true)) {
						acc[curr] = {
							label: pollutionTypes[curr],
							value: data[curr],
						}
					}

					return acc
				},
				{}
			)
		}

		return Object.entries(pollutionData).map(([, value]) => value)
	}, [data, pollutionTypes])

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const fetchData = () => {
		getTypes()
		getSubTypes()
		getPollution()
	}

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line
	}, [])

	return {
		themeMode,
		data: data,
		pollution,
		eventTypesOptions,
		eventSubTypesOptions,
		eventDangerLevelOptions: EventDangerLevelOptions,
	}
}

export default ViewModel
