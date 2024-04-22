import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useCurrentTime } from '@/Hooks/useCurrentTime'
import { useLang } from '@/_metronic/i18n/Metronici18n'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import moment from 'moment'
import 'moment-timezone'

const MOCK_EVENT_DETAIL = {
	featurePicture: '/media/examples/incident-1.jpg',
	additionalPictures: [
		{
			path: '/media/examples/incident-1.jpg',
		},
		{
			path: '/media/examples/incident-1.jpg',
		},
		{
			path: '/media/examples/incident-1.jpg',
		},
		{
			path: '/media/examples/incident-1.jpg',
		},
		{
			path: '/media/examples/incident-1.jpg',
		},
		{
			path: '/media/examples/incident-1.jpg',
		},
		{
			path: '/media/examples/incident-1.jpg',
		},
		{
			path: '/media/examples/incident-1.jpg',
		},
		{
			path: '/media/examples/incident-1.jpg',
		},
		{
			path: '/media/examples/incident-1.jpg',
		},
		{
			path: '/media/examples/incident-1.jpg',
		},
		{
			path: '/media/examples/incident-1.jpg',
		},
	],
	locationName: 'บริษัท เอบีซี ดีอีเฟ จำกัด (มหาชน)',
	location: '55, พญาไท, เขตทวีวัฒนา, กรุงเทพฯ',
	events: [
		{
			date: moment()
				.tz('Asia/Bangkok')
				.set({
					hours: 8,
					minutes: 0,
					seconds: 0,
				})
				.toISOString(),
			title:
				'เกิดเหตุการณ์ เวณิกาคันถ ธุระอพาร์ทเมนต์พล็อตโอเปร่า ไฟลต์แอ็กชั่นเบิร์ดแจ็กพอต แกงค์ว้าวอพาร์ตเมนต์บาลานซ์',
		},
		{
			date: moment()
				.tz('Asia/Bangkok')
				.set({
					hours: 9,
					minutes: 0,
					seconds: 0,
				})
				.toISOString(),
			title: 'แจ้งเกิดเหตุการณ์',
		},
	],
}

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

	const steppers = useMemo(
		() =>
			STEPPERS.map((step, idx) => {
				let status = 'pending'
				if (idx === 0) {
					status = 'done'
				} else if (idx === 1) {
					status = 'active'
				}

				return {
					...step,
					status: status,
					description:
						idx === 0 || idx === 1
							? moment().locale('th').add(543, 'years').format('DD/MM/YYYY HH:mm')
							: '-',
				}
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
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

	return {
		isDefaultView,
		isMapView,
		timeStr,
		themeMode,
		data: MOCK_EVENT_DETAIL,
		steppers,
		imageIdx,
		isOpenLightBox,
		onOpenLightBox,
		onCloseLightBox,
		onChangeViewType,
		onViewInDetail,
	}
}

export default ViewModel
