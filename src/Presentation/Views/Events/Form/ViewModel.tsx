import { Fragment, useEffect, useMemo, useState, useContext } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useCurrentTime } from '@/Hooks/useCurrentTime'
import { useLang } from '@/_metronic/i18n/Metronici18n'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useEventStore, ICreateEvent } from '@/Store/Event'
import { useEventMediaStore } from '@/Store/EventMedia'
import { useEventMessageStore } from '@/Store/EventMessage'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'
import { TableContext } from '@/Context/Table'
import { LocationSelectionContext } from './LocationSelection/Context'
import { EventMessageFormContext } from '../MessageForm/Context'
import moment from 'moment-timezone'
import 'moment-timezone'
import { TAB_HEADER_ITEMS } from './Config'

import DoubleLineImage from '@/Presentation/Components/Table/Cells/DoubleLineImage'
import { toast } from 'react-toastify'
import { EventDangerLevelOptions } from '@/Configuration/EventDangerLevel'
import Swal from 'sweetalert2'

const INITIAL_STATE = {
	id: 0,
	location: {} as any,
	calledTime: moment().toISOString(),
	start: moment().toISOString(),
	end: moment().toISOString(),
	eventTypeId: 0,
	eventType: {
		id: 0,
		name: '',
	},
	eventSubTypeId: 0,
	title: '',
	detail: '',
	pictureCover: null,
	galleries: [] as any[],
	dangerLevel: 0,
	latitude: 13.7563,
	longitude: 100.5018,
	wastewater: 0,
	dust: 0,
	smell: 0,
	soot: 0,
	waste: 0,
	noise: 0,
	isLocationFromDatabase: false,
	informerName: '',
	informerTel: '',
	informerLineId: '',
	informerEmail: '',
	effectOnPeople: '',
	effectOnBreathing: '',
	effectOnSkin: '',
	effectOnEyes: '',
	effectOnSickness: '',
	effectOnDeaths: '',
	isWasteWater: false,
	isSoilPollution: false,
	isAnimal: false,
	effectOnProperty: '',
	impactOther: '',
	locationName: '',
	locationAddress: '',
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
	const {
		selected,
		eventTypes,
		eventSubTypes,
		pollutionTypes,
		getPollution,
		getOne,
		getTypes,
		getSubTypes,
		createEvent,
		editEvent,
		getMediaPath,
		clearState,
	} = useEventStore(state => ({
		selected: state.selected,
		pollutionTypes: state.pollutions,
		eventTypes: state.types,
		eventSubTypes: state.subTypes,
		getOne: state.getOne,
		getTypes: state.getTypes,
		getPollution: state.getPollution,
		getSubTypes: state.getSubTypes,
		createEvent: state.create,
		editEvent: state.edit,
		getMediaPath: state.getEventMediaPath,
		clearState: state.clearState,
	}))
	const { createEventMedia, removeEventMedia } = useEventMediaStore(state => ({
		createEventMedia: state.create,
		removeEventMedia: state.remove,
	}))
	const { messages, getAllMessages, removeMessage } = useEventMessageStore(state => ({
		messages: state.data,
		getAllMessages: state.getAll,
		removeMessage: state.remove,
	}))
	const {
		setOpen: setOpenSelectLocation,
		changeConfirm,
		setChangeConfirm,
		position,
		setPosition,
	} = useContext(LocationSelectionContext)
	const { updateLoading, updatePagination, updateSorting, updateError } = useContext(TableContext)
	const {
		onOpen: onOpenEventMessageForm,
		setEditId,
		setFormType,
	} = useContext(EventMessageFormContext)
	const { is4K, is8K } = useResolutionDetection()

	const isCreate = location.pathname === '/events/new'
	const title = isCreate ? 'All Events / สร้างเหตุการณ์ใหม่' : 'All Events / รายละเอียดเหตุการณ์'

	const [hasChanged, setHasChanged] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [formState, setFormState] = useState(INITIAL_STATE)
	const [pollutionState, setPollutionState] = useState<
		{
			label: string
			value: string
		}[]
	>([])

	const [isOpenLightBox, setIsOpenLightBox] = useState(false)
	const [imageIdx, setImageIdx] = useState(0)

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
			.filter((d: any) => d.eventTypeId === formState.eventTypeId)
			.map((d: any) => ({
				label: d.name,
				value: d.id,
			}))
	}, [formState.eventTypeId, eventSubTypes])

	const pollutionOptions = useMemo(() => {
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
					acc[curr] = {
						label: pollutionTypes[curr],
						value: curr,
					}

					return acc
				},
				{}
			)
		}

		return Object.entries(pollutionData).map(([, value]) => value)
	}, [pollutionTypes])

	const impactWaterResourceOptions = useMemo(() => {
		return [
			{
				label: 'ไม่มี',
				value: false,
			},
			{
				label: 'มี',
				value: true,
			},
		]
	}, [])
	const impactGroundResourceOptions = useMemo(() => {
		return [
			{
				label: 'ไม่มี',
				value: false,
			},
			{
				label: 'มี',
				value: true,
			},
		]
	}, [])
	const impactAnimalOptions = useMemo(() => {
		return [
			{
				label: 'ไม่มี',
				value: false,
			},
			{
				label: 'มี',
				value: true,
			},
		]
	}, [])

	const steppers = useMemo(() => {
		if (isCreate) {
			return STEPPERS.map((step, idx) => ({
				...step,
				status: isCreate && idx === 0 ? 'done' : 'pending',
				description:
					idx === 0 && isCreate
						? moment().locale('th').add(543, 'years').format('DD/MM/YYYY HH:mm')
						: '-',
			}))
		} else {
			return STEPPERS.map(step => {
				let status = 'pending'
				let description = '-'

				if (step.id === 1) {
					status = 'done'
					description = selected?.calledTime
						? moment(selected.calledTime).tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm')
						: '-'
				}
				if (step.id === 2) {
					if (selected?.isApproved === true || selected?.isApproved === 1) {
						status = 'done'
						description = `${selected?.approvedTime ? moment(selected.approvedTime).tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm') : '-'} ผลการตรวจสอบ: ${selected?.isTrue ? 'เป็นจริง' : 'ไม่เป็นจริง'}`
					}
				}
				if (step.id === 3) {
					if (
						(selected?.isApproved === true || selected?.isApproved === 1) &&
						selected?.isTrue === true
					) {
						status = 'done'
						description = ''
					}
				}
				if (step.id === 4) {
					if (selected?.state === 4) {
						status = 'done'
						description = `${selected?.end ? moment(selected.end).tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm') : '-'} สถานะ: สิ้นสุดเหตุการณ์`
					}
				}

				return {
					...step,
					status: status,
					description: description,
				}
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isCreate, selected])

	const eventCoordinators = useMemo(() => {
		if (formState.isLocationFromDatabase) {
			return {
				latitude: formState?.location?.latitude,
				longitude: formState?.location?.longitude,
			}
		} else {
			return {
				latitude: formState.latitude,
				longitude: formState.longitude,
			}
		}
	}, [formState])

	const eventPictureCover = useMemo(() => {
		const galleries = selected?.galleries || []
		const finded = galleries.find((g: any) => g.isPictureCover === true)

		return finded ? getMediaPath(finded.picturePath) : null
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected])
	const eventPictures = useMemo(() => {
		const galleries = selected?.galleries || []

		return galleries
			.filter((g: any) => g.isPictureCover !== true)
			.map((g: any) => {
				return {
					...g,
					picturePath: getMediaPath(g.picturePath),
				}
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected])

	const isAdmin = useMemo(() => {
		return true
	}, [])
	const isApprover = useMemo(() => {
		return true
	}, [])

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

	const setupTable = () => {
		updatePagination(true)
		updateSorting('name', true)
	}

	const fetchData = () => {
		getTypes()
		getSubTypes()
		getPollution().then(({ data: dataPollution }) => {
			if (eventId !== undefined && location.pathname.includes('edit')) {
				getOne(eventId).then(({ success, data }) => {
					if (!success) {
						toast.error(`เกิดข้อผิดพลาดในการดึงข้อมูล : ${data}`)
					} else {
						const galleries = (data?.galleries || []).map((g: any) => {
							return {
								...g,
								picturePath: getMediaPath(g.picturePath),
								isPictureCover: g.isPictureCover === true || g.isPictureCover === 1,
							}
						})
						const pictureCover = galleries.find((g: any) => g.isPictureCover === true)?.picturePath

						setFormState({
							...data,
							galleries,
							pictureCover,
						})

						let pollutionData: {
							[key: string]: {
								label: string
								value: any
							}
						} = {}

						if (Object.keys(dataPollution).length !== 0) {
							pollutionData = Object.keys(dataPollution).reduce(
								(
									acc: {
										[key: string]: {
											label: string
											value: any
										}
									},
									curr
								) => {
									if (data[curr] === true || data[curr] === 1)
										acc[curr] = {
											label: dataPollution[curr],
											value: curr,
										}

									return acc
								},
								{}
							)

							const pollutionDataOptions = Object.entries(pollutionData).map(([, value]) => value)

							setPollutionState(pollutionDataOptions)
						}
					}
				})

				updateLoading(true)
				updateError(false)
				getAllMessages(eventId).then(({ success: successMessage, data: dataMessage }) => {
					if (!successMessage) {
						toast.error(`เกิดข้อผิดพลาดในการดึงข้อมูล : ${dataMessage}`)
						updateLoading(false)
						updateError(true)
					} else {
						updateLoading(false)
						updateError(false)
					}
				})
			}
		})
	}

	const onChangeFormState = (key: string, value: any) => {
		if (key === 'start' || key === 'end') {
			setFormState(prevState => ({
				...prevState,
				[key]: moment(value).toISOString(),
			}))
		} else {
			setFormState(prevState => ({
				...prevState,
				[key]: value,
			}))
		}

		setHasChanged(true)
	}

	const onChangePollutionState = (input: any[]) => {
		setPollutionState(input)
		setHasChanged(true)
	}

	const onOpenLightBox = (imgIdx: number) => {
		setImageIdx(imgIdx)
		setIsOpenLightBox(true)
	}

	const onCloseLightBox = () => {
		setImageIdx(0)
		setIsOpenLightBox(false)
	}

	const onAddAdditionalPicture = (file: File) => {
		// setFormState(prevState => ({
		// 	...prevState,
		// 	galleries: [
		// 		...prevState.galleries,
		// 		{
		// 			picturePath: file,
		// 			isPictureCover: false,
		// 			isCreate: true,
		// 		},
		// 	],
		// }))

		createEventMedia(eventId ?? '', {
			pictureCovers: file,
		}).then(({ success, data }) => {
			if (!success) {
				toast.error(`เกิดข้อผิดพลาดในการเพิ่มรูปภาพ : ${data}`)
			} else {
				toast.success('เพิ่มรูปภาพสำเร็จ')
				fetchData()
			}
		})
	}

	const onRemoveAdditionalPicture = (index: number) => {
		removeEventMedia(eventId ?? '', eventPictures[index].id).then(({ success, data }) => {
			if (!success) {
				toast.error(`เกิดข้อผิดพลาดในการลบรูปภาพ : ${data}`)
			} else {
				toast.success('ลบรูปภาพสำเร็จ')
				fetchData()
			}
		})
		// setFormState(prevState => {
		// 	const newPictures = [...prevState.galleries]
		// 	newPictures.splice(index, 1)
		// 	return {
		// 		...prevState,
		// 		galleries: newPictures,
		// 	}
		// })
	}

	const onDownloadAdditionalPicture = (index: number) => {
		const isFileTypeIncludedImage = (formState.galleries[index]?.picturePath?.type ?? '').includes(
			'image'
		)

		const url = isFileTypeIncludedImage
			? URL.createObjectURL(formState.galleries[index]?.picturePath)
			: formState.galleries[index]?.picturePath
		let fileType = ''
		if (isFileTypeIncludedImage) {
			fileType = formState.galleries[index]?.type.split('/')[1]
		} else {
			fileType = formState.galleries[index]?.picturePath?.split('.')[1]
		}

		const a = document.createElement('a')
		a.href = url
		a.target = '_blank'
		a.rel = 'noopener noreferrer'
		a.download = `download.${fileType}`
		a.click()
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

	const onCancel = () => {
		navigate('/events')
	}

	const onSubmit = () => {
		if (!hasChanged) {
			return
		}

		setIsSubmitting(true)
		if (isCreate) {
			const requiredFields = [
				'start',
				'eventTypeId',
				'eventSubTypeId',
				'latitude',
				'longitude',
				'title',
			]
			let hasAlertErrorField = false
			requiredFields.forEach(field => {
				if (field === 'start') {
					if (!moment(formState[field]).isValid()) {
						toast.error('กรุณากรอกวันและเวลาที่เกิดเหตุ')
					}
				} else {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					if ((formState[field] === '' || formState[field] === 0) && !hasAlertErrorField) {
						toast.error('กรุณากรอกข้อมูลให้ครบถ้วน')
						setIsSubmitting(false)
						hasAlertErrorField = true
					}
				}
			})

			if (hasAlertErrorField) return

			const body: ICreateEvent = {
				start: formState.start,
				eventTypeId: formState.eventTypeId,
				eventSubTypeId: formState.eventSubTypeId,
				title: formState.title,
				pictureCover: formState.pictureCover,
				latitude: formState.latitude,
				longitude: formState.longitude,
			}

			Swal.fire({
				title: 'คุณต้องการสร้างเหตุการณ์ใช่หรือไม่',
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'ใช่',
				cancelButtonText: 'ไม่ใช่',
			}).then(result => {
				if (result.isConfirmed) {
					createEvent(body).then(({ success, data }) => {
						if (!success) {
							toast.error(`เกิดข้อผิดพลาดในการสร้างเหตุการณ์ : ${data}`)
							setIsSubmitting(false)
						} else {
							toast.success('สร้างเหตุการณ์สำเร็จ')
							setTimeout(() => {
								navigate(`/events/edit/${data.id}`)
								setIsSubmitting(false)
							}, 500)
						}
					})
				} else {
					setIsSubmitting(false)
				}
			})
		} else if (eventId !== undefined) {
			const editableFields = [
				'start',
				'end',
				'title',
				'eventTypeId',
				'eventSubTypeId',
				'detail',
				'dangerLevel',
				'locationName',
				'locationAddress',
				'latitude',
				'longitude',
				'informerName',
				'informerTel',
				'informerLineId',
				'informerEmail',
				'pictureCover',
				'effectOnPeople',
				'effectOnBreathing',
				'effectOnSkin',
				'effectOnEyes',
				'effectOnSickness',
				'effectOnDeaths',
				'effectOnProperty',
				'isWasteWater',
				'isSoilPollution',
				'isAnimal',
			]

			const body: { [key: string]: any } = {}
			editableFields.forEach(field => {
				if (['start', 'end'].includes(field)) {
					if (
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						moment(formState[field]).isValid() &&
						moment(selected?.[field]).isValid() &&
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						moment(formState[field]).toISOString() !== moment(selected?.[field]).toISOString()
					)
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						body[field] = moment(formState[field]).toISOString()
				} else if (field === 'pictureCover') {
					if (formState[field] !== null && typeof formState[field] === 'object') {
						body[field] = formState[field]
					} else if (formState[field] === null) {
						body[field] = null
					}
				} else {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					if (selected?.[field] !== formState[field])
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						body[field] = formState[field]
				}
			})

			const availablePollutionTypes = Object.keys(pollutionTypes)
			availablePollutionTypes.forEach(pollutionType => {
				const foundPollution = pollutionState.find(p => p.value === pollutionType)
				if (foundPollution) {
					body[pollutionType] = true
				} else {
					body[pollutionType] = false
				}
			})

			Swal.fire({
				title: 'คุณต้องการที่จะแก้ไขเหตุการณ์นี้ใช่หรือไม่',
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'ใช่',
				cancelButtonText: 'ไม่ใช่',
			}).then(result => {
				if (result.isConfirmed) {
					editEvent(eventId, body).then(({ success, data }) => {
						if (!success) {
							toast.error(`แก้ไขเหตุการณ์ไม่สำเร็จ : ${data}`)
							setIsSubmitting(false)
						} else {
							toast.success('แก้ไขเหตุการณ์สำเร็จ')
							setIsSubmitting(false)
							fetchData()
						}
					})
				} else {
					setIsSubmitting(false)
				}
			})
		}
	}

	const onCreateReportingMessage = () => {
		setFormType('create')
		onOpenEventMessageForm()
	}

	const onEditReportingMessage = (id: number) => {
		setFormType('edit')
		setEditId(id)
		onOpenEventMessageForm()
	}

	const onRemoveReportingMessage = (id: string) => {
		Swal.fire({
			title: 'คุณต้องการที่จะลบรายงานเหตุการณ์นี้ใช่หรือไม่',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'ใช่',
			cancelButtonText: 'ไม่ใช่',
		}).then(result => {
			if (result.isConfirmed) {
				removeMessage(eventId ?? '', id).then(({ success, data }) => {
					if (!success) {
						toast.error(`ลบรายงานเหตุการณ์ไม่สำเร็จ : ${data}`)
					} else {
						toast.success('ลบรายงานเหตุการณ์สำเร็จ')
						fetchData()
					}
				})
			}
		})
	}

	const onViewReportingMedia = (path: string) => {
		const a = document.createElement('a')
		a.href = path
		a.target = '_blank'
		a.rel = 'noopener noreferrer'
		a.click()
	}

	const REPORTING_TABLE_CONFIGS: any[] = [
		{
			Header: 'รายชื่อเหตุการณ์',
			accessor: 'name',
			minWidth: is4K || is8K ? 450 : 300,
			Cell: (props: any) => {
				const findedMediaImage = props.row.original?.medias?.find(
					(m: any) =>
						m.picturePath.includes('.png') ||
						m.picturePath.includes('.jpg') ||
						m.picturePath.includes('.jpeg')
				)

				return (
					<DoubleLineImage
						img={findedMediaImage?.picturePath ? getMediaPath(findedMediaImage?.picturePath) : null}
						label={props.row.original?.detail ?? '-'}
						description={''}
					/>
				)
			},
		},
		{
			Header: 'ไฟล์ที่แนบมา',
			accessor: 'eventType',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: ({ row }: any) => {
				const medias = row.original?.medias ?? []
				const hasImage =
					medias.length > 0
						? medias.find(
								(m: any) =>
									m.picturePath.includes('.png') ||
									m.picturePath.includes('.jpg') ||
									m.picturePath.includes('.jpeg')
							)
						: false

				const hasVideo =
					medias.length > 0
						? medias.find(
								(m: any) =>
									m.picturePath.includes('.mp4') ||
									m.picturePath.includes('.avi') ||
									m.picturePath.includes('.mov') ||
									m.picturePath.includes('.flv')
							)
						: false

				const mediaPath = getMediaPath(medias?.[0]?.picturePath)
				const videoMediaPath = (medias ?? []).find(
					(m: any) =>
						m.picturePath.includes('.mp4') ||
						m.picturePath.includes('.avi') ||
						m.picturePath.includes('.mov') ||
						m.picturePath.includes('.flv')
				)?.picturePath

				return (
					<Fragment>
						{hasImage && (
							<span
								className={'badge text-zeroloss-grey-700 bg-zeroloss-success-300 me-3'}
								onClick={() => onViewReportingMedia(mediaPath)}>
								<span
									className={
										'p-1 rounded-circle w-2px h-2px me-2 animation-blink bg-zeroloss-success'
									}
								/>{' '}
								รูปภาพ
							</span>
						)}

						{hasVideo && (
							<span
								className={'badge text-zeroloss-grey-700 bg-zeroloss-warning-300'}
								onClick={() => onViewReportingMedia(getMediaPath(videoMediaPath))}>
								<span
									className={
										'p-1 rounded-circle w-2px h-2px me-2 animation-blink bg-zeroloss-warning'
									}
								/>{' '}
								วีดีโอ
							</span>
						)}
					</Fragment>
				)
			},
		},
		{
			Header: '',
			accessor: 'action',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: ({ row }: any) => (
				<Fragment>
					{(isAdmin || isApprover) && (
						<div className="d-flex flex-row justify-content-center align-items-center">
							<button
								className="btn btn-sm btn-icon btn-muted btn-active-light"
								onClick={() => onEditReportingMessage(row.original.id)}>
								<img src="/media/icons/zeroloss/edit-01.svg" alt="Action Icon" />
							</button>

							<button
								className="btn btn-sm btn-icon btn-muted btn-active-light"
								onClick={() => onRemoveReportingMessage(row.original.id)}>
								<img src="/media/icons/zeroloss/trash-01.svg" alt="Action Icon" />
							</button>
						</div>
					)}
				</Fragment>
			),
			disableSortBy: true,
		},
	]

	useEffect(() => {
		setupTable()
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
		isSubmitting,
		imageIdx,
		isOpenLightBox,
		timeStr,
		themeMode,
		title,
		eventTypesOptions,
		eventSubTypesOptions,
		eventDangerLevelOptions: EventDangerLevelOptions,
		eventCoordinators,
		steppers,
		formState,
		messages,
		pollutionOptions,
		pollutionState,
		onChangeFormState,
		onChangePollutionState,
		onOpenLocationSelection,
		onChangeEditTab,
		onAddAdditionalPicture,
		onRemoveAdditionalPicture,
		onDownloadAdditionalPicture,
		onOpenLightBox,
		onCloseLightBox,
		REPORTING_TABLE_CONFIGS,
		impactWaterResourceOptions,
		impactGroundResourceOptions,
		impactAnimalOptions,
		onCancel,
		onSubmit,
		onCreateReportingMessage,
		eventPictureCover,
		eventPictures,
	}
}

export default ViewModel
