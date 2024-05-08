import { useEffect, useMemo, useState, useContext } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useCurrentTime } from '@/Hooks/useCurrentTime'
import { useLang } from '@/_metronic/i18n/Metronici18n'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useEventStore, ICreateEvent } from '@/Store/Event'
import { useEventMediaStore } from '@/Store/EventMedia'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'
import { LocationSelectionContext } from './LocationSelection/Context'
import moment from 'moment-timezone'
import 'moment-timezone'
import {
	TAB_HEADER_ITEMS,
	IMPACT_WATER_RESOURCE,
	IMPACT_GROUND_RESOURCE,
	IMPACT_ANIMAL,
} from './Config'

import DoubleLineImage from '@/Presentation/Components/Table/Cells/DoubleLineImage'
import DoubleLine from '@/Presentation/Components/Table/Cells/DoubleLine'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import { EventDangerLevelOptions } from '@/Configuration/EventDangerLevel'

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
	impactAnnoyAmount: '',
	impactBreathTakingAmount: '',
	impactSkinAmount: '',
	impactEyeSightAmount: '',
	impactSickAmount: '',
	impactDeathAmount: '',
	impactWaterResource: '',
	impactGroundResource: '',
	impactAnimal: '',
	impactBelongingDamage: '',
	impactOther: '',
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

const MOCK_DATA_REPORTING = [
	{
		id: 1,
		name: 'เหตุการณ์ที่ 1',
		eventType: {
			id: 1,
			name: 'ประเภท 1',
		},
		eventSubTypeTitle: 'ประเภทย่อย 1',
		title: 'เหตุการณ์ที่ 1',
		detail: 'รายละเอียดเหตุการณ์ที่ 1',
		longDescription: 'รายละเอียดยาวเหตุการณ์ที่ 1',
		img: '/media/pictures/zeroloss/1.jpg',
	},
	{
		id: 2,
		name: 'เหตุการณ์ที่ 2',
		eventType: {
			id: 2,
			name: 'ประเภท 2',
		},
		eventSubTypeTitle: 'ประเภทย่อย 2',
		title: 'เหตุการณ์ที่ 2',
		detail: 'รายละเอียดเหตุการณ์ที่ 2',
		longDescription: 'รายละเอียดยาวเหตุการณ์ที่ 2',
		img: '/media/pictures/zeroloss/2.jpg',
	},
	{
		id: 3,
		name: 'เหตุการณ์ที่ 3',
		eventType: {
			id: 3,
			name: 'ประเภท 3',
		},
		eventSubTypeTitle: 'ประเภทย่อย 3',
		title: 'เหตุการณ์ที่ 3',
		detail: 'รายละเอียดเหตุการณ์ที่ 3',
		longDescription: 'รายละเอียดยาวเหตุการณ์ที่ 3',
		img: '/media/pictures/zeroloss/3.jpg',
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
		getMediaPath: state.getEventMediaPath,
		clearState: state.clearState,
	}))
	const { createEventMedia, removeEventMedia } = useEventMediaStore(state => ({
		createEventMedia: state.create,
		removeEventMedia: state.remove,
	}))
	const {
		setOpen: setOpenSelectLocation,
		changeConfirm,
		setChangeConfirm,
		position,
		setPosition,
	} = useContext(LocationSelectionContext)
	const { is4K, is8K } = useResolutionDetection()

	const isCreate = location.pathname === '/events/new'
	const title = isCreate ? 'All Events / สร้างเหตุการณ์ใหม่' : 'All Events / รายละเอียดเหตุการณ์'

	const [hasChanged, setHasChanged] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [formState, setFormState] = useState(INITIAL_STATE)
	const [pollutionState, setPollutionState] = useState<
		{
			label: string
			value: boolean
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
				value: '',
			},
			...IMPACT_WATER_RESOURCE.map(d => ({
				label: d.name,
				value: d.value,
			})),
		]
	}, [])
	const impactGroundResourceOptions = useMemo(() => {
		return [
			{
				label: 'ไม่มี',
				value: '',
			},
			...IMPACT_GROUND_RESOURCE.map(d => ({
				label: d.name,
				value: d.value,
			})),
		]
	}, [])
	const impactAnimalOptions = useMemo(() => {
		return [
			{
				label: 'ไม่มี',
				value: '',
			},
			...IMPACT_ANIMAL.map(d => ({
				label: d.name,
				value: d.value,
			})),
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
		setFormState(prevState => {
			const newPictures = [...prevState.galleries]
			newPictures.splice(index, 1)
			return {
				...prevState,
				galleries: newPictures,
			}
		})
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

	const onSubmit = () => {
		if (!hasChanged) {
			return
		}

		setIsSubmitting(true)
		if (isCreate) {
			const requiredFields = ['start', 'eventTypeId', 'eventSubTypeId', 'latitude', 'longitude']
			let hasAlertErrorField = false
			requiredFields.forEach(field => {
				if (field === 'start') {
					if (!moment(formState[field]).isValid()) {
						toast.error('กรุณากรอกวันและเวลาที่เกิดเหตุ')
					}
				} else {
					// @ts-ignore
					if ((formState[field] === '' || formState[field] === 0) && !hasAlertErrorField) {
						toast.error('กรุณากรอกข้อมูลให้ครบถ้วน')
						setIsSubmitting(false)
						hasAlertErrorField = true
					}
				}
			})

			const body: ICreateEvent = {
				start: formState.start,
				eventTypeId: formState.eventTypeId,
				eventSubTypeId: formState.eventSubTypeId,
				detail: formState.detail,
				pictureCover: formState.pictureCover,
				latitude: formState.latitude,
				longitude: formState.longitude,
			}

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
		} else if (eventId !== undefined) {
		}
	}

	const REPORTING_TABLE_CONFIGS: any[] = [
		{
			Header: 'รายชื่อเหตุการณ์',
			accessor: 'name',
			minWidth: is4K || is8K ? 450 : 300,
			Cell: (props: any) => (
				<DoubleLineImage
					img={props.row.original?.img}
					label={props.row.original?.eventSubTypeTitle ?? '-'}
					description={props.row.original?.title ?? '-'}
				/>
			),
		},
		{
			Header: 'ประเภทงาน',
			accessor: 'eventType',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: ({ value }: any) => {
				return (
					<span
						className={clsx('badge text-zeroloss-grey-700', {
							'bg-zeroloss-error-300': value?.id === 1,
							'bg-zeroloss-warning-300': value?.id === 2,
							'bg-zeroloss-success-300': value?.id === 3,
							'bg-zeroloss-primary-300': value?.id === 4,
							'bg-zeroloss-purple-1': value?.id === 5,
							'bg-zeroloss-primary-200': value?.id === 6,
						})}>
						<span
							className={clsx('p-1 rounded-circle w-2px h-2px me-2 animation-blink', {
								'bg-zeroloss-error': value?.id === 1,
								'bg-zeroloss-warning': value?.id === 2,
								'bg-zeroloss-success': value?.id === 3,
								'bg-zeroloss-primary': value?.id === 4,
								'bg-zeroloss-brand-600': value?.id === 5,
								'bg-zeroloss-primary-400': value?.id === 6,
							})}
						/>{' '}
						{value?.name}
					</span>
				)
			},
		},
		{
			Header: 'About',
			accessor: 'about',
			minWidth: is4K || is8K ? 450 : 300,
			Cell: (props: any) => {
				return (
					<DoubleLine
						label={props.row.original.detail ?? '-'}
						description={props.row.original.longDescription ?? ''}
					/>
				)
			},
		},
		{
			Header: '',
			accessor: 'action',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: () => (
				<div className="d-flex flex-row justify-content-center align-items-center">
					<button
						className="btn btn-sm btn-icon btn-muted btn-active-light"
						// onClick={() => onViewDetail(row.original.id)}
					>
						<img src="/media/icons/zeroloss/edit-01.svg" alt="Action Icon" />
					</button>
					{(isAdmin || isApprover) && (
						<button className="btn btn-sm btn-icon btn-muted btn-active-light">
							<img src="/media/icons/zeroloss/trash-01.svg" alt="Action Icon" />
						</button>
					)}
				</div>
			),
		},
	]

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
		isSubmitting,
		imageIdx,
		isOpenLightBox,
		timeStr,
		themeMode,
		title,
		reportingData: MOCK_DATA_REPORTING,
		eventTypesOptions,
		eventSubTypesOptions,
		eventDangerLevelOptions: EventDangerLevelOptions,
		eventCoordinators,
		steppers,
		formState,
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
		onSubmit,
		eventPictureCover,
		eventPictures,
	}
}

export default ViewModel
