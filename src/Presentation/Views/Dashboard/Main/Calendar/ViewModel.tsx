import { useState, useMemo, useRef, useEffect } from 'react'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useEventStore } from '@/Store/Event'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'
import { toast } from 'react-toastify'
import moment from 'moment'
import 'moment/dist/locale/th'

const INITIAL_STATE_FILTER: {
	type: any[]
	search: any[]
} = {
	type: [],
	search: [],
}

const ViewModel = () => {
	const { mode } = useThemeMode()
	const { rawData, dataTypes, getAll, getTypes, getMedia, clearState } = useEventStore(state => ({
		rawData: state.data,
		dataTypes: state.types,
		getAll: state.getAll,
		getTypes: state.getTypes,
		getMedia: state.getEventMediaPath,
		clearState: state.clearState,
	}))
	const { isMobile } = useResolutionDetection()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const calendarRef = useRef<any>(null)
	const [openDetail, setOpenDetail] = useState(false)
	const [selected, setSelected] = useState<any>(null)
	const [searchText, setSearchText] = useState('')
	const [filter, setFilter] = useState(INITIAL_STATE_FILTER)

	const currentMonth = moment(calendarRef.current?.getApi().getDate())
		.locale('th')
		.format('MMM YYYY')

	const displayFilter = useMemo(() => {
		const results: any = {}

		Object.keys(filter).forEach(key => {
			if (key === 'type') {
				results[key] = dataTypes.filter((d: any) => filter[key].includes(d.id))
			} else if (key === 'search') {
				results[key] = filter[key]
			}
		})

		return results
	}, [filter, dataTypes])

	const dataTypeOptions: {
		label: string
		value: any
	}[] = dataTypes.map(
		(d: any) => ({
			label: d.name,
			value: d.id,
		}),
		[]
	)

	const data = useMemo(() => {
		return rawData
			.reduce((acc, rd: any) => {
				if (rd?.start) {
					acc.push({
						id: rd.id,
						title: rd?.title,
						detail: rd?.detail,
						start: rd?.start ? moment(rd?.start).toISOString() : null,
						end: rd?.end ? moment(rd?.end).toISOString() : null,
						type: rd?.eventTypeId ?? 0,
						eventSubTypeTitle: rd?.eventSubTypeTitle,
						img: rd?.pictureCover
							? getMedia(rd?.pictureCover)
							: '/media/icons/zeroloss/default-placeholder.png',
						location: '',
						locationName: rd?.location?.locationName ?? rd?.locationName ?? '',
					})
				}

				return acc
			}, [])
			.filter((d: any) => {
				if (filter.type.length > 0) {
					return filter.type.includes(d.type)
				}

				if (filter.search.length > 0) {
					const search = filter.search.join(' ')
					const regex = new RegExp(search, 'i')
					return regex.test(d.title)
				}

				return true
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rawData, filter])

	const selectedIncident = useMemo(() => {
		return data.find((incident: any) => {
			return incident.id === parseInt(selected ?? '0')
		})
	}, [selected, data])

	const onAddFilter = (key: string, value: any) => {
		setFilter((prev: any) => ({
			...prev,
			[key]: [...prev[key], value],
		}))

		if (key === 'search') {
			setSearchText('')
		}

		calendarRef.current?.getApi().refetchEvents()
	}

	const onRemoveFilter = (key: string, value: any) => {
		if (key === 'search') {
			setSearchText('')
			setFilter(prevState => ({
				...prevState,
				[key]: prevState[key].filter((v: any) => v !== value),
			}))
		} else if (key === 'type') {
			setFilter(prevState => ({
				...prevState,
				[key]: prevState[key].filter((v: any) => v !== value),
			}))
		}
	}

	const fetchData = () => {
		getTypes()
		getAll({}).then(({ data: dataFetch, success }) => {
			if (!success) {
				toast.error(dataFetch)
			} else {
				calendarRef.current?.getApi().rerenderEvents()
			}
		})
	}

	const onClick = (id: number) => {
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

	const changeView = (view: string) => {
		calendarRef.current?.getApi().changeView(view)
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

	useEffect(() => {
		fetchData()
		return () => {
			clearState()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		isMobile,
		themeMode,
		calendarRef,
		displayFilter,
		filter,
		searchText,
		data: data,
		dataTypeOptions,
		selectedIncident,
		setSearchText,
		openDetail,
		onClick,
		onCloseDetail,
		onAddFilter,
		onRemoveFilter,
		currentMonth,
		nextMonth,
		prevMonth,
		goToToday,
		changeView,
	}
}

export default ViewModel
