import { useEffect, useMemo, useState, useContext } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useCurrentTime } from '@/Hooks/useCurrentTime'
import { useLang } from '@/_metronic/i18n/Metronici18n'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useEventStore } from '@/Store/Event'
import { LocationSelectionContext } from './LocationSelection/Context'
import moment from 'moment-timezone'
import 'moment-timezone'
import { TAB_HEADER_ITEMS } from './Config'

const INITIAL_STATE = {
	createdAt: moment().toDate(),
	eventOccuredAt: moment().toDate(),
	eventType: 0,
	eventSubType: 0,
	title: '',
	detail: '',
	featurePicture: null,
	latitude: 13.7563,
	longitude: 100.5018,
	informerName: '',
	informerPhone: '',
	informerLineID: '',
	informerEmail: '',
}

const STEPPERS = [
	{
		id: 1,
		title: 'รับแจ้งเหตุ',
	},
	{
		id: 2,
		title: 'ยืนยันเหตุการณ์',
	},
	{
		id: 3,
		title: 'เหตุการณ์ต่อเนื่อง',
	},
	{
		id: 4,
		title: 'เหตุการณ์สิ้นสุด',
	},
]

const ViewModel = () => {
	const { eventId } = useParams()
	const navigate = useNavigate()
	const intl = useIntl()
	const currentTime = useCurrentTime()
	const selectedLang = useLang()
	const location = useLocation()
	const timeStr = useMemo(() => {
		const time = moment(currentTime)
			.tz('Asia/Bangkok')
			.add(selectedLang === 'th' ? 543 : 0, 'year')
			.format('DD/MM/YYYY HH:mm')

		return intl.formatMessage({ id: 'ZEROLOSS.HEADER.CURRENT_TIME' }) + ' ' + time
	}, [currentTime, intl, selectedLang])
	const { mode } = useThemeMode()
	const { eventTypes, eventSubTypes, getTypes, getSubTypes, clearState } = useEventStore(state => ({
		eventTypes: state.types,
		eventSubTypes: state.subTypes,
		getTypes: state.getTypes,
		getSubTypes: state.getSubTypes,
		clearState: state.clearState,
	}))
	const {
		setOpen: setOpenSelectLocation,
		changeConfirm,
		setChangeConfirm,
		position,
		setPosition,
	} = useContext(LocationSelectionContext)

	const isCreate = location.pathname === '/events/new'
	const title = isCreate ? 'All Events / สร้างเหตุการณ์ใหม่' : 'All Events / รายละเอียดเหตุการณ์'

	const [hasChanged, setHasChanged] = useState(false)
	const [formState, setFormState] = useState(INITIAL_STATE)

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const isEditDetail = useMemo(() => {
		if (isCreate) {
			return false
		} else {
			return location.pathname === `/events/edit/${eventId}`
		}
	}, [isCreate, location.pathname, eventId])
	const isEditLocation = useMemo(() => {
		if (isCreate) {
			return false
		} else {
			return location.pathname === `/events/edit/${eventId}/location`
		}
	}, [isCreate, location.pathname, eventId])
	const isEditInformer = useMemo(() => {
		if (isCreate) {
			return false
		} else {
			return location.pathname === `/events/edit/${eventId}/informer`
		}
	}, [isCreate, location.pathname, eventId])
	const isEditImages = useMemo(() => {
		if (isCreate) {
			return false
		} else {
			return location.pathname === `/events/edit/${eventId}/images`
		}
	}, [isCreate, location.pathname, eventId])
	const isEditReporting = useMemo(() => {
		if (isCreate) {
			return false
		} else {
			return location.pathname === `/events/edit/${eventId}/reporting`
		}
	}, [isCreate, location.pathname, eventId])
	const isEditImpact = useMemo(() => {
		if (isCreate) {
			return false
		} else {
			return location.pathname === `/events/edit/${eventId}/impact`
		}
	}, [isCreate, location.pathname, eventId])
	const currentActiveTabIdx = useMemo(() => {
		if (isEditDetail) {
			return 0
		} else if (isEditLocation) {
			return 1
		} else if (isEditInformer) {
			return 2
		} else if (isEditImages) {
			return 3
		} else if (isEditReporting) {
			return 4
		} else if (isEditImpact) {
			return 5
		} else {
			return 0
		}
	}, [isEditDetail, isEditLocation, isEditInformer, isEditImages, isEditReporting, isEditImpact])

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
	const eventSubTypesOptions = useMemo(() => {
		return eventSubTypes
			.filter((d: any) => d.eventTypeId === formState.eventType)
			.map((d: any) => ({
				label: d.name,
				value: d.id,
			}))
	}, [formState.eventType, eventSubTypes])

	const steppers = useMemo(() => {
		return STEPPERS.map((step, idx) => ({
			...step,
			status: isCreate && idx === 0 ? 'done' : 'pending',
			description:
				idx === 0 && isCreate
					? moment().locale('th').add(543, 'years').format('DD/MM/YYYY HH:mm')
					: '-',
		}))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isCreate])

	const onChangeEditTab = (tabIdx: number) => {
		switch (tabIdx) {
			case 0: {
				navigate(`/events/edit/${eventId}`)
				return
			}
			case 1: {
				navigate(`/events/edit/${eventId}/location`)
				return
			}
			case 2: {
				navigate(`/events/edit/${eventId}/informer`)
				return
			}
			case 3:
				navigate(`/events/edit/${eventId}/images`)
				return
			case 4: {
				navigate(`/events/edit/${eventId}/reporting`)
				return
			}
			case 5: {
				navigate(`/events/edit/${eventId}/impact`)
				return
			}
			default: {
				navigate(`/events/edit/${eventId}`)
				return
			}
		}
	}

	const fetchData = () => {
		getTypes()
		getSubTypes()
	}

	const onChangeFormState = (key: string, value: any) => {
		setFormState(prevState => ({
			...prevState,
			[key]: value,
		}))
	}

	const handlePositionChange = () => {
		if (changeConfirm) {
			setFormState(prevState => ({
				...prevState,
				latitude: position.lat,
				longitude: position.lng,
			}))
			setChangeConfirm(false)
			setHasChanged(true)
		}
	}

	const onOpenLocationSelection = () => {
		setPosition({
			lat: formState.latitude,
			lng: formState.longitude,
		})

		setChangeConfirm(false)
		setOpenSelectLocation(true)
	}

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (changeConfirm) {
			handlePositionChange()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [changeConfirm])

	useEffect(() => {
		return () => {
			clearState()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		currentActiveTabIdx,
		isEditDetail,
		isEditLocation,
		isEditInformer,
		isEditImages,
		isEditReporting,
		isEditImpact,
		availableTabs: TAB_HEADER_ITEMS.map(d => d.tabName),
		selectedTabName: TAB_HEADER_ITEMS[currentActiveTabIdx].tabName,
		isCreate,
		timeStr,
		themeMode,
		title,
		eventTypesOptions,
		eventSubTypesOptions,
		steppers,
		formState,
		onChangeFormState,
		onOpenLocationSelection,
		onChangeEditTab,
	}
}

export default ViewModel
