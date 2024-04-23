import { useEffect, useMemo, useState, useContext } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useCurrentTime } from '@/Hooks/useCurrentTime'
import { useLang } from '@/_metronic/i18n/Metronici18n'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useEventStore } from '@/Store/Event'
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

const INITIAL_STATE = {
	createdAt: moment().toDate(),
	eventOccuredAt: moment().toDate(),
	eventType: 0,
	eventSubType: 0,
	title: '',
	detail: '',
	featurePicture: null,
	additionalPictures: [] as File[],
	latitude: 13.7563,
	longitude: 100.5018,
	informerName: '',
	informerPhone: '',
	informerLineID: '',
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
	const { is4K, is8K } = useResolutionDetection()

	const isCreate = location.pathname === '/events/new'
	const title = isCreate ? 'All Events / สร้างเหตุการณ์ใหม่' : 'All Events / รายละเอียดเหตุการณ์'

	const [hasChanged, setHasChanged] = useState(false)
	const [formState, setFormState] = useState(INITIAL_STATE)

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
			.filter((d: any) => d.eventTypeId === formState.eventType)
			.map((d: any) => ({
				label: d.name,
				value: d.id,
			}))
	}, [formState.eventType, eventSubTypes])

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
	}

	const onChangeFormState = (key: string, value: any) => {
		setFormState(prevState => ({
			...prevState,
			[key]: value,
		}))
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
		setFormState(prevState => ({
			...prevState,
			additionalPictures: [...prevState.additionalPictures, file],
		}))
	}

	const onRemoveAdditionalPicture = (index: number) => {
		setFormState(prevState => {
			const newPictures = [...prevState.additionalPictures]
			newPictures.splice(index, 1)
			return {
				...prevState,
				additionalPictures: newPictures,
			}
		})
	}

	const onDownloadAdditionalPicture = (index: number) => {
		const url = URL.createObjectURL(formState.additionalPictures[index])
		const fileType = formState.additionalPictures[index]?.type.split('/')[1]

		const a = document.createElement('a')
		a.href = url
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
			Cell: ({ row }: any) => (
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
		imageIdx,
		isOpenLightBox,
		timeStr,
		themeMode,
		title,
		reportingData: MOCK_DATA_REPORTING,
		eventTypesOptions,
		eventSubTypesOptions,
		steppers,
		formState,
		onChangeFormState,
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
	}
}

export default ViewModel
