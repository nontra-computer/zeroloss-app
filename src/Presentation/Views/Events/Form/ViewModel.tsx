import { useEffect, useMemo, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useCurrentTime } from '@/Hooks/useCurrentTime'
import { useLang } from '@/_metronic/i18n/Metronici18n'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useEventStore } from '@/Store/Event'
import { LocationSelectionContext } from './LocationSelection/Context'
import moment from 'moment-timezone'
import 'moment-timezone'

const INITIAL_STATE = {
	createdAt: moment().toDate(),
	eventOccuredAt: moment().toDate(),
	eventType: 0,
	detail: '',
	featurePicture: null,
	latitude: 13.7563,
	longitude: 100.5018,
}

const ViewModel = () => {
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
	const { eventTypes, getTypes, clearState } = useEventStore(state => ({
		eventTypes: state.types,
		getTypes: state.getTypes,
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

	const fetchData = () => {
		getTypes()
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
		isCreate,
		timeStr,
		themeMode,
		title,
		eventTypesOptions,
		formState,
		onChangeFormState,
		onOpenLocationSelection,
	}
}

export default ViewModel
