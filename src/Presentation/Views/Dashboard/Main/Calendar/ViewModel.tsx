import { useState, useMemo, useRef, useEffect } from 'react'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'

import moment from 'moment'
import 'moment/locale/th'

const MOCK_DATA: any[] = [
	{
		type: 'success',
		id: 'incident_1',
		title: 'เหตุร้องเรียน หมู่บ้าน วรารมณ์ โครงการ 2',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		img: '/media/examples/incident-1.jpg',
		start: moment(moment().format('YYYY-MM'), 'YYYY-MM').add(4, 'days').format('YYYY-MM-DD'),
		end: moment(moment().format('YYYY-MM'), 'YYYY-MM').add(5, 'days').format('YYYY-MM-DD'),
	},
	{
		type: 'warning',
		id: 'incident_2',
		title: 'ซ่อมบำรุง Sensor',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		img: '/media/examples/incident-1.jpg',
		start: moment(moment().format('YYYY-MM'), 'YYYY-MM').add(10, 'days').format('YYYY-MM-DD'),
		end: moment(moment().format('YYYY-MM'), 'YYYY-MM').add(10, 'days').format('YYYY-MM-DD'),
	},
	{
		type: 'info',
		id: 'incident_3',
		title: 'เหตุร้องเรียน หมู่บ้าน วรารมณ์ โครงการ 2',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		img: '/media/examples/incident-1.jpg',
		start: moment(moment().format('YYYY-MM'), 'YYYY-MM').add(12, 'days').format('YYYY-MM-DD'),
		end: moment(moment().format('YYYY-MM'), 'YYYY-MM').add(14, 'days').format('YYYY-MM-DD'),
	},
	{
		type: 'error',
		id: 'incident_4',
		title: 'เหตุร้องเรียน หมู่บ้าน วรารมณ์ โครงการ 2',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		img: '/media/examples/incident-1.jpg',
		start: moment(moment().format('YYYY-MM'), 'YYYY-MM').add(12, 'days').format('YYYY-MM-DD'),
		end: moment(moment().format('YYYY-MM'), 'YYYY-MM').add(19, 'days').format('YYYY-MM-DD'),
	},
	{
		type: 'error',
		id: 'incident_4',
		title: 'เหตุร้องเรียน หมู่บ้าน วรารมณ์ โครงการ 2',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		img: '/media/examples/incident-1.jpg',
		start: moment(moment().format('YYYY-MM'), 'YYYY-MM').add(12, 'days').format('YYYY-MM-DD'),
		end: moment(moment().format('YYYY-MM'), 'YYYY-MM').add(19, 'days').format('YYYY-MM-DD'),
	},
]

const ViewModel = () => {
	const { mode } = useThemeMode()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const calendarRef = useRef<any>(null)
	const [openDetail, setOpenDetail] = useState(false)
	const [selected, setSelected] = useState<string | null>(null)
	const selectedIncident = useMemo(() => {
		return MOCK_DATA.find(incident => incident.id === selected)
	}, [selected])

	const currentMonth = moment(calendarRef.current?.getApi().getDate()).format('MMMM YYYY')

	const onClick = (id: string) => {
		setSelected(id)
		setOpenDetail(true)
	}

	const onCloseDetail = () => {
		setOpenDetail(false)

		setTimeout(() => {
			setSelected(null)
		}, 200)
	}

	const nextMonth = () => {
		calendarRef.current?.getApi().next()
	}

	const prevMonth = () => {
		calendarRef.current?.getApi().prev()
	}

	const goToToday = () => {
		calendarRef.current?.getApi().today()
	}

	const addFullCalendarButtonStyle = () => {
		const prevButton = document.querySelector('.fc-prev-button')
		const nextButton = document.querySelector('.fc-next-button')
		const todayButton = document.querySelector('.fc-today-button')
		if (prevButton) {
			prevButton.classList.add('white-button')
			prevButton.classList.add('btn')
			prevButton.classList.add('btn-sm')
			prevButton.classList.remove('fc-button')
		}

		if (nextButton) {
			nextButton.classList.add('white-button')
			nextButton.classList.add('btn')
			nextButton.classList.add('btn-sm')
			nextButton.classList.remove('fc-button')
		}

		if (todayButton) {
			todayButton.classList.add('white-button')
			todayButton.classList.add('btn')
			todayButton.classList.add('btn-sm')
			todayButton.classList.remove('fc-button')
			todayButton.classList.add('text-capitalize')
		}
	}

	useEffect(() => {
		addFullCalendarButtonStyle()
	}, [])

	return {
		themeMode,
		calendarRef,
		data: MOCK_DATA,
		selectedIncident,
		openDetail,
		onClick,
		onCloseDetail,
		currentMonth,
		nextMonth,
		prevMonth,
		goToToday,
	}
}

export default ViewModel
