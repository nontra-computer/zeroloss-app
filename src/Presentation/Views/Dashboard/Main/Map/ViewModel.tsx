import { useState } from 'react'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'

const TYPE_OPTIONS = [
	{
		label: 'ทั้งหมด',
		value: 'all',
	},
	{
		label: 'ข้อมูลทิศทางลม',
		value: 'wind-direction',
	},
	{
		label: 'ข้อมูลจำลอง',
		value: 'simulation',
	},
	{
		label: 'ข้อมูลการวัด',
		value: 'measurement',
	},
]

const MOCK_DATA: any[] = [
	{
		id: 1,
		type: 'success',
		draggable: false,
		popup: null,
		position: {
			lat: 13.7473729,
			lng: 100.5137062,
		},
	},
	{
		id: 2,
		type: 'error',
		draggable: false,
		popup: null,
		position: {
			lat: 13.8527366,
			lng: 100.6882377,
		},
	},
	{
		id: 3,
		type: 'warning',
		draggable: false,
		popup: null,
		position: {
			lat: 13.7374361,
			lng: 100.7136729,
		},
	},
	{
		id: 4,
		type: 'success',
		draggable: false,
		popup: null,
		position: {
			lat: 13.7723976,
			lng: 100.5680649,
		},
	},
	{
		id: 5,
		type: 'error',
		draggable: false,
		popup: null,
		position: {
			lat: 13.8010716,
			lng: 100.5355079,
		},
	},
	{
		id: 6,
		type: 'warning',
		draggable: false,
		popup: null,
		position: {
			lat: 13.7374361,
			lng: 100.7136729,
		},
	},
	{
		id: 7,
		type: 'success',
		draggable: false,
		popup: null,
		position: {
			lat: 13.7473729,
			lng: 100.5137062,
		},
	},
	{
		id: 8,
		type: 'error',
		draggable: false,
		popup: null,
		position: {
			lat: 13.8221382,
			lng: 100.4998724,
		},
	},
	{
		id: 9,
		type: 'warning',
		draggable: false,
		popup: null,
		position: {
			lat: 13.7240437,
			lng: 100.4826123,
		},
	},
	{
		id: 10,
		type: 'success',
		draggable: false,
		popup: null,
		position: {
			lat: 13.7093509,
			lng: 100.4475244,
		},
	},
	{
		id: 11,
		type: 'error',
		draggable: false,
		popup: null,
		position: {
			lat: 13.6126487,
			lng: 100.5380794,
		},
	},
]

const ViewModel = () => {
	const { mode } = useThemeMode()
	const [type, setType] = useState<'all' | 'wind-direction' | 'simulation' | 'measurement'>('all')

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const onTypeChange = (value: 'all' | 'wind-direction' | 'simulation' | 'measurement') => {
		setType(value)
	}

	return {
		TYPE_OPTIONS,
		themeMode,
		data: MOCK_DATA,
		type,
		onTypeChange,
	}
}

export default ViewModel
