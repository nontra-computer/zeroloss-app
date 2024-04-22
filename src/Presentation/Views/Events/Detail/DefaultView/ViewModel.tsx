import { useEffect } from 'react'
import { useEventStore } from '@/Store/Event'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import moment from 'moment'
import 'moment-timezone'

const MOCK_DATA = {
	eventOccuredAt: moment().tz('Asia/Bangkok').toDate(),
	eventType: 1,
	eventTitle: 'เหตุการณ์ที่เกิดขึ้น',
	detail: 'รายละเอียดเหตุการณ์ที่เกิดขึ้น',
	pollution: [
		{
			title: 'กลิ่นเหม็น',
		},
		{
			title: 'สารเคมีรั่วไหล',
		},
	],
}

const ViewModel = () => {
	const { mode } = useThemeMode()
	const { eventTypes, getTypes, clearState } = useEventStore(state => ({
		eventTypes: state.types,
		getTypes: state.getTypes,
		clearState: state.clearState,
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

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const fetchData = () => {
		getTypes()
	}

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		return () => {
			clearState()
		}
		// eslint-disable-next-line
	}, [])

	return {
		themeMode,
		data: MOCK_DATA,
		eventTypesOptions,
	}
}

export default ViewModel
