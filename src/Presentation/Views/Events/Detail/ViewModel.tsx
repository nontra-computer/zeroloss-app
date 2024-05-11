import { useEffect, useMemo, useState, useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useCurrentTime } from '@/Hooks/useCurrentTime'
import { useLang } from '@/_metronic/i18n/Metronici18n'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useEventStore } from '@/Store/Event'
import { useLocationStore } from '@/Store/Location'
import { useEventMessageStore } from '@/Store/EventMessage'
import { EventMessageFormContext } from '../MessageForm/Context'
import { toast } from 'react-toastify'
import moment from 'moment'
import 'moment-timezone'

const STEPPERS = [
	{
		id: 1,
		title: 'รับแจ้งเหตุ',
	},
	{
		id: 2,
		title: 'รอตรวจสอบ',
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
	const {
		onOpen: handleOpenEventMessageForm,
		setFormType,
		setEditId,
	} = useContext(EventMessageFormContext)
	const { data, eventSubTypes, getOne, getMediaPath, clearState } = useEventStore(state => ({
		data: state.selected,
		eventSubTypes: state.subTypes,
		getOne: state.getOne,
		getMediaPath: state.getEventMediaPath,
		clearState: state.clearState,
	}))
	const { locationData, setLocationData, getLocation } = useLocationStore(state => ({
		locationData: state.dataMapMarker,
		setLocationData: state.setDataMapMarker,
		getLocation: state.getAllMapMarker,
	}))
	const { eventMessageData, getAllEventMessage } = useEventMessageStore(state => ({
		eventMessageData: state.data,
		getAllEventMessage: state.getAll,
	}))
	const location = useLocation()
	const navigate = useNavigate()
	const intl = useIntl()
	const currentTime = useCurrentTime()
	const selectedLang = useLang()
	const timeStr = useMemo(() => {
		const time = moment(currentTime)
			.tz('Asia/Bangkok')
			.add(selectedLang === 'th' ? 543 : 0, 'year')
			.format('DD/MM/YYYY HH:mm')

		return intl.formatMessage({ id: 'ZEROLOSS.HEADER.CURRENT_TIME' }) + ' ' + time
	}, [currentTime, intl, selectedLang])
	const { mode } = useThemeMode()

	const [isOpenLightBox, setIsOpenLightBox] = useState(false)
	const [imageIdx, setImageIdx] = useState(0)

	const isDefaultView = location.pathname.includes('map') ? false : true
	const isMapView = !isDefaultView

	const [eventMessagePage, setEventMessagePage] = useState(1)

	const steppers = useMemo(
		() =>
			STEPPERS.map(step => {
				let status = 'pending'
				let description = '-'

				if (step.id === 1) {
					status = 'done'
					description = data?.calledTime
						? moment(data.calledTime).tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm')
						: '-'
				}
				if (step.id === 2) {
					if (data?.isApproved === true || data?.isApproved === 1) {
						status = 'done'
						description = `${data?.approvedTime ? moment(data.approvedTime).tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm') : '-'} ผลการตรวจสอบ: ${data?.isTrue ? 'เป็นจริง' : 'ไม่เป็นจริง'}`
					}
				}
				if (step.id === 3) {
					if ((data?.isApproved === true || data?.isApproved === 1) && data?.isTrue === true) {
						status = 'done'
						description = ''
					}
				}
				if (step.id === 4) {
					if (data?.state === 4) {
						status = 'done'
						description = `${data?.end ? moment(data.end).tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm') : '-'} สถานะ: สิ้นสุดเหตุการณ์`
					}
				}

				return {
					...step,
					status: status,
					description: description,
				}
			}),
		[data]
	)

	const pictureCover = useMemo(() => {
		const galleries = data?.galleries || []
		const finded = galleries.find((g: any) => g.isPictureCover === true)

		return finded ? getMediaPath(finded.picturePath) : null
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data])
	const galleryImages = useMemo(() => {
		const galleries = data?.galleries || []
		return galleries
			.filter((g: any) => g.isPictureCover === false)
			.map((g: any) => getMediaPath(g.picturePath))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data])
	const locationAddress = useMemo(() => {
		if (data?.isLocationFromDatabase !== undefined) {
			if (data.isLocationFromDatabase) {
				return data.location?.nameTh ?? null
			} else {
				const finded = locationData.find((l: any) => l.id === data.locationId)
				return finded?.nameTh ?? null
			}
		} else {
			return null
		}
	}, [data, locationData])
	const eventMessages = useMemo(
		() =>
			eventMessageData
				.slice(
					0,
					eventMessagePage * 4 < eventMessageData.length
						? eventMessagePage * 4
						: eventMessageData.length
				)
				.map(m => ({
					date: m.createdAt,
					img: (m?.medias ?? [])?.[0]?.picturePath
						? getMediaPath((m?.medias ?? [])?.[0]?.picturePath)
						: null,
					detail: m.detail,
				})),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[eventMessageData, eventMessagePage]
	)
	const isEventMessageMax = eventMessagePage * 4 >= eventMessageData.length

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const fetchData = () => {
		if (eventId) {
			getOne(eventId).then(({ success, data }) => {
				if (!success) {
					toast.error(`ดึงข้อมูลเหตุการณ์ไม่สำเร็จ : ${data}`)
				}
			})
			getAllEventMessage(eventId).then(({ success, data }) => {
				if (!success) {
					toast.error(`ดึงข้อมูลรายงานเหตุการณ์ไม่สำเร็จ : ${data}`)
				}
			})
			if (!location.pathname.includes('map')) getLocation()
		}
	}

	const loadMoreEventMessage = () => {
		setEventMessagePage(prev => prev + 1)
	}

	const onOpenEventMessageForm = () => {
		handleOpenEventMessageForm()
		setFormType('create')
		setEditId(0)
	}

	const onOpenLightBox = (imgIdx: number) => {
		setImageIdx(imgIdx)
		setIsOpenLightBox(true)
	}

	const onCloseLightBox = () => {
		setImageIdx(0)
		setIsOpenLightBox(false)
	}

	const onChangeViewType = (type: 'default' | 'map') => {
		if (eventId) {
			let path = `/events/detail/${eventId}`
			if (type === 'map') {
				path += '/map'
			}

			navigate(path)
		}
	}

	const onViewInDetail = () => {
		navigate(`/events/edit/${eventId}`)
	}

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventId, location.pathname])

	useEffect(() => {
		return () => {
			clearState()
			setLocationData([])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		isDefaultView,
		isMapView,
		timeStr,
		themeMode,
		data: data,
		pictureCover,
		galleryImages,
		locationAddress,
		eventSubTypes,
		steppers,
		eventMessages,
		imageIdx,
		isOpenLightBox,
		isEventMessageMax,
		onOpenLightBox,
		onCloseLightBox,
		onChangeViewType,
		onViewInDetail,
		onOpenEventMessageForm,
		loadMoreEventMessage,
	}
}

export default ViewModel
