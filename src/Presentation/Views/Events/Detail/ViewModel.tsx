import { useEffect, useMemo, useState, useContext, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useCurrentTime } from '@/Hooks/useCurrentTime'
import { useLang } from '@/_metronic/i18n/Metronici18n'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useEventStore } from '@/Store/Event'
import { useEventMessageStore } from '@/Store/EventMessage'
import { EventMessageFormContext } from '../MessageForm/Context'
import { toast } from 'react-toastify'
import { useReactToPrint } from 'react-to-print'
import Swal from 'sweetalert2'
import { Packer, Document, Paragraph, TextRun, AlignmentType } from 'docx'
import { saveAs } from 'file-saver'
import moment from 'moment'
import 'moment-timezone'
import { EventDangerLevelOptions } from '@/Configuration/EventDangerLevel'

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

const EVENT_STATUS_OPTIONS = [
	{
		label: 'ไม่เป็นจริงและสิ้นสุดเหตุการณ์',
		value: 1,
	},
	{
		label: 'เป็นจริงและสิ้นสุดเหตุการณ์',
		value: 2,
	},
	{
		label: 'เป็นจริงและเหตุการณ์ต่อเนื่อง',
		value: 3,
	},
	{
		label: 'เหตุการณ์สิ้นสุด',
		value: 4,
	},
]

const ViewModel = () => {
	const downloadComponentRef = useRef<any>(null)
	const { eventId } = useParams()
	const {
		onOpen: handleOpenEventMessageForm,
		setFormType,
		setEditId,
	} = useContext(EventMessageFormContext)
	const {
		data,
		eventSubTypes,
		getOne,
		getMediaPath,
		pollutionTypes,
		getPollution,
		approveEvent,
		clearState,
	} = useEventStore(state => ({
		data: state.selected,
		eventSubTypes: state.subTypes,
		getOne: state.getOne,
		getMediaPath: state.getEventMediaPath,
		pollutionTypes: state.pollutions,
		getPollution: state.getPollution,
		approveEvent: state.approve,
		clearState: state.clearState,
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

	const [openChangeEventStatus, setOpenChangeEventStatus] = useState(false)

	const [isOpenLightBox, setIsOpenLightBox] = useState(false)
	const [imageIdx, setImageIdx] = useState(0)

	const isDefaultView = location.pathname.includes('map') ? false : true
	const isMapView = !isDefaultView

	const [eventMessagePage, setEventMessagePage] = useState(1)

	const [isPrinting, setIsPrinting] = useState(false)
	const [isOpenExportType, setIsOpenExportType] = useState(false)

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
				return data.locationAddress + ' ' + data.locationName
			}
		} else {
			return null
		}
	}, [data])
	const eventMessages = useMemo(
		() =>
			(isPrinting === false
				? eventMessageData.slice(
						0,
						eventMessagePage * 4 < eventMessageData.length
							? eventMessagePage * 4
							: eventMessageData.length
					)
				: eventMessageData
			).map(m => ({
				id: m.id,
				date: m.createdAt,
				img: (m?.medias ?? [])?.[0]?.picturePath
					? getMediaPath((m?.medias ?? [])?.[0]?.picturePath)
					: null,
				detail: m.detail,
			})),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[eventMessageData, eventMessagePage, isPrinting]
	)
	const eventStatusOptions = useMemo(() => {
		const options = EVENT_STATUS_OPTIONS

		if (data?.state !== 3) {
			return options.filter(o => o.value !== 4)
		} else if (data?.state === 3) {
			return options.filter(o => o.value === 4)
		} else if (data?.state === 4) {
			return []
		} else {
			return options
		}
	}, [data])
	const isHideEventChangeStatusButton = data?.state === 4
	const isEventMessageMax = eventMessagePage * 4 >= eventMessageData.length

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

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

	const handlePrint = useReactToPrint({
		content: () => downloadComponentRef.current,
		documentTitle: `Event_${eventId}`,
		onBeforePrint: () => {
			setIsPrinting(true)

			// Mute the video before printing
			const videoElement = document.querySelector('video')
			if (videoElement) {
				videoElement.muted = true
				videoElement.volume = 0
				videoElement.pause()
			}

			const fadeElement = document.querySelector('#event-detail-printing') as HTMLElement
			if (fadeElement) {
				fadeElement.style.zIndex = '9999'
				fadeElement.style.opacity = '0.8'
			}
		},
		onAfterPrint: () => {
			setIsPrinting(false)
		},
		pageStyle: ` 
		  @media print {
			.no-print {
			  display: none !important;
			}
		  }
		`,
	})

	const handleDocxExport = () => {
		const doc = new Document({
			sections: [
				{
					children: [
						new Paragraph({
							alignment: AlignmentType.LEFT,
							children: [
								new TextRun({
									text: 'วันที่แจ้งเหตุ: ',
									size: 16,
								}),
								new TextRun({
									text: moment(data?.calledTime).tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm'),
									size: 16,
								}),
							],
						}),
						new Paragraph({}),
						new Paragraph({
							alignment: AlignmentType.LEFT,
							children: [
								new TextRun({
									text: 'วันที่เกิดเหตุ: ',
									size: 16,
								}),
								new TextRun({
									text: data?.start
										? moment(data?.start).tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm')
										: '-',
									size: 16,
								}),
							],
						}),
						new Paragraph({}),
						new Paragraph({
							alignment: AlignmentType.LEFT,
							children: [
								new TextRun({
									text: 'วันที่สิ้นสุด: ',
									size: 16,
								}),
								new TextRun({
									text: data?.start
										? moment(data?.start).tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm')
										: '-',
									size: 16,
								}),
							],
						}),
						new Paragraph({}),
						new Paragraph({
							alignment: AlignmentType.LEFT,
							children: [
								new TextRun({
									text: 'ประเภทเหตุการณ์หลัก: ',
									size: 16,
								}),
								new TextRun({
									text: data?.eventType?.name ?? '',
									size: 18,
								}),
							],
						}),
						new Paragraph({}),
						new Paragraph({
							alignment: AlignmentType.LEFT,
							children: [
								new TextRun({
									text: 'ประเภทเหตุการณ์ย่อย: ',
									size: 16,
								}),
								new TextRun({
									text: eventSubTypes.find(item => item.id === data?.eventSubTypeId)?.name ?? '',
									size: 18,
								}),
							],
						}),
						new Paragraph({}),
						new Paragraph({
							alignment: AlignmentType.LEFT,
							children: [
								new TextRun({
									text: 'เหตุการณ์เบื้องต้น: ',
									size: 16,
								}),
								new TextRun({
									text: data?.title ?? '',
									size: 18,
								}),
							],
						}),
						new Paragraph({}),
						new Paragraph({
							alignment: AlignmentType.LEFT,
							children: [
								new TextRun({
									text: 'บรรยายเหตุการณ์: ',
									size: 16,
								}),
								new TextRun({
									text: data?.detail ?? '',
									size: 18,
								}),
							],
						}),
						new Paragraph({}),
						new Paragraph({
							alignment: AlignmentType.LEFT,
							children: [
								new TextRun({
									text: 'ระดับความรุนแรง: ',
									size: 16,
								}),
								new TextRun({
									text:
										EventDangerLevelOptions.find(option => option.value === data?.dangerLevel)
											?.label ?? '',
									size: 18,
								}),
							],
						}),
						new Paragraph({}),
						new Paragraph({
							alignment: AlignmentType.LEFT,
							children: [
								new TextRun({
									text: 'มลพิษ: ',
									size: 16,
								}),
								new TextRun({
									text: pollution.map(p => p.label).join(', ') ?? '',
									size: 18,
								}),
							],
						}),
						new Paragraph({}),
						new Paragraph({
							alignment: AlignmentType.LEFT,
							children: [
								new TextRun({
									text: 'สารเคมีที่เกี่ยวข้อง: ',
									size: 16,
								}),
								new TextRun({
									text: data?.chemical
										? `${data?.chemical?.nameTh ? data?.chemical?.nameTh + ' - ' : ''} (${data?.chemical?.nameEn ? data?.chemical?.nameEn : ''})`
										: '',
									size: 18,
								}),
							],
						}),
						new Paragraph({}),
						new Paragraph({
							alignment: AlignmentType.LEFT,
							children: [
								new TextRun({
									text: 'คำแนะนำในการปฎิบัติ: ',
									size: 16,
								}),
								new TextRun({
									text: data?.emergencyResponse ?? '',
									size: 18,
								}),
							],
						}),
						new Paragraph({}),
						new Paragraph({
							alignment: AlignmentType.LEFT,
							children: [
								new TextRun({
									text: 'สถานที่เกิดเหตุ: ',
									size: 16,
								}),
								new TextRun({
									text: locationAddress ?? '',
									size: 18,
								}),
							],
						}),
						new Paragraph({}),
						new Paragraph({
							alignment: AlignmentType.LEFT,
							children: [
								new TextRun({
									text: 'ที่ตั้ง: ',
									size: 16,
								}),
								new TextRun({
									text: data?.locationAddress ?? '',
									size: 18,
								}),
							],
						}),
					],
				},
			],
		})

		Packer.toBlob(doc).then(blob => {
			saveAs(blob, `Event_${eventId}.docx`)
			setIsPrinting(false)
		})
	}

	const onExportPrint = (input?: 'pdf' | 'docx') => {
		const type = input ?? 'pdf'

		toast.info('กำลังจัดเตรียมเอกสาร...')
		setIsPrinting(true)

		setTimeout(() => {
			if (type === 'pdf') {
				handlePrint()
				setIsOpenExportType(false)
			} else if (type === 'docx') {
				handleDocxExport()
				setIsOpenExportType(false)
			}
		}, 100)
	}

	const onApproveEvent = (optionValue: number) => {
		const option = EVENT_STATUS_OPTIONS.find(o => o.value === optionValue)
		if (option) {
			setOpenChangeEventStatus(false)
			Swal.fire({
				icon: 'question',
				title: 'ยืนยันการเปลี่ยนสถานะเหตุการณ์',
				html: `คุณต้องการเปลี่ยนสถานะเหตุการณ์เป็น <br /><b>"${option.label}"</b><br /> หรือไม่?`,
				confirmButtonText: 'ยืนยัน',
				cancelButtonText: 'ยกเลิก',
				showConfirmButton: true,
				showCancelButton: true,
			}).then(({ isConfirmed }) => {
				if (isConfirmed) {
					let isTrue = false
					let isInProgress = false

					switch (optionValue) {
						case 1: {
							isTrue = false
							isInProgress = false
							break
						}
						case 2: {
							isTrue = true
							isInProgress = false
							break
						}
						case 3: {
							isTrue = true
							isInProgress = true
							break
						}
						case 4: {
							isTrue = true
							isInProgress = false
							break
						}
					}

					approveEvent(eventId ?? '', {
						isTrue,
						isInProgress,
					}).then(({ success, data }) => {
						if (success) {
							toast.success('เปลี่ยนสถานะเหตุการณ์สำเร็จ')
							fetchData()
						} else {
							toast.error(`เปลี่ยนสถานะเหตุการณ์ไม่สำเร็จ : ${data}`)
						}
					})
				}
			})
		}
	}

	const fetchData = () => {
		getPollution()

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

	const onViewDetailEventMessageForm = (id: number) => {
		setFormType('edit')
		setEditId(id)
		handleOpenEventMessageForm()
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
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		downloadComponentRef,
		isPrinting,
		isOpenExportType,
		isDefaultView,
		isMapView,
		timeStr,
		themeMode,
		isHideEventChangeStatusButton,
		eventStatusOptions: eventStatusOptions,
		openChangeEventStatus,
		setOpenChangeEventStatus,
		setIsOpenExportType,
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
		onViewDetailEventMessageForm,
		onApproveEvent,
		loadMoreEventMessage,
		onExportPrint,
	}
}

export default ViewModel
