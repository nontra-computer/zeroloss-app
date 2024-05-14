import { useContext, useEffect, useMemo, useState } from 'react'
import { TableContext } from '@/Context/Table'
// import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'
import { useEventStore } from '@/Store/Event'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import moment from 'moment'
import 'moment/locale/th'

import Skeleton from 'react-loading-skeleton'
import DoubleLineImage from '@/Presentation/Components/Table/Cells/DoubleLineImage'
import DoubleLine from '@/Presentation/Components/Table/Cells/DoubleLine'

const INITIAL_STATE_FILTER: {
	type: any[]
	search: any[]
} = {
	type: [],
	search: [],
}

const ViewModel = () => {
	// const navigate = useNavigate()
	const { updatePagination, updateDefaultSorting, updateLoading } = useContext(TableContext)
	const { isMobile, is4K, is8K } = useResolutionDetection()
	const { mode } = useThemeMode()
	const { rawData, dataTypes, getAll, getTypes, getEventMediaPath } = useEventStore(state => ({
		rawData: state.data,
		dataTypes: state.types,
		getAll: state.getAll,
		getTypes: state.getTypes,
		getEventMediaPath: state.getEventMediaPath,
		clearState: state.clearState,
	}))
	const [isLoading, setIsLoading] = useState(false)
	const [searchText, setSearchText] = useState('')
	const [filter, setFilter] = useState(INITIAL_STATE_FILTER)

	const data = useMemo(
		() =>
			rawData
				.filter(d => {
					if (filter.search.length > 0) {
						const search = filter.search.join(' ').toLowerCase()
						const searchValues = Object.values(d).join(' ').toLowerCase()
						if (!searchValues.includes(search)) return false
					}

					if (filter.type.length > 0) {
						const type = filter.type.map((t: any) => t)
						if (!type.includes(d.eventTypeId)) return false
					}

					return true
				})
				.map((d: any) => ({
					...d,
					pictureCover: d?.pictureCover
						? getEventMediaPath(d.pictureCover)
						: '/media/icons/zeroloss/default-placeholder.png',
				})),
		// 	eslint-disable-next-line react-hooks/exhaustive-deps
		[rawData, filter]
	)
	const displayFilter = useMemo(() => {
		const results: any = {}

		Object.keys(filter).forEach(key => {
			if (key === 'type') {
				results[key] = dataTypes.filter((d: any) => filter[key].includes(d?.id))
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

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const onAddFilter = (key: string, value: any) => {
		setFilter((prev: any) => ({
			...prev,
			[key]: [...prev[key], value],
		}))

		if (key === 'search') {
			setSearchText('')
		}
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
		setIsLoading(true)
		getTypes()
		getAll({}).then(({ data, success }) => {
			if (!success) {
				toast.error(data)
			} else {
				setIsLoading(false)
			}
		})
	}

	const setupTable = () => {
		updatePagination(true)
		updateDefaultSorting('name', true)
		updateLoading(false)
	}

	const TABLE_CONFIGS: any[] = [
		{
			Header: 'รายชื่อเหตุการณ์',
			accessor: 'name',
			minWidth: is4K || is8K ? 450 : 300,
			Cell: (props: any) => (
				<DoubleLineImage
					img={props.row.original?.pictureCover}
					label={props.row.original?.eventSubTypeTitle ?? '-'}
					description={props.row.original?.title ?? '-'}
				/>
			),
		},
		{
			Header: 'สถานที่เกิดเหตุ',
			accessor: 'locationName',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: (props: any) => {
				return (
					<span
						className={clsx({
							'text-zeroloss-base-white': themeMode === 'dark',
							'text-zeroloss-grey-900': themeMode === 'light',
						})}>
						{props.row.original.locationName}
					</span>
				)
			},
		},
		{
			Header: 'วันที่เกิดเหตุ',
			accessor: 'start',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: (props: any) => {
				return (
					<span
						className={clsx({
							'text-zeroloss-base-white': themeMode === 'dark',
							'text-zeroloss-grey-900': themeMode === 'light',
						})}>
						{props.row.original?.start
							? moment(props.row.original?.start).format('DD/MM/YYYY HH:mm')
							: '-'}
					</span>
				)
			},
		},
		{
			Header: 'ประเภทงาน',
			accessor: 'eventTypeId',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: ({ value, row }: any) => {
				return (
					<span
						className={clsx('badge text-zeroloss-grey-700', {
							'bg-zeroloss-error-300': value === 1,
							'bg-zeroloss-warning-300': value === 2,
							'bg-zeroloss-success-300': value === 3,
							'bg-zeroloss-primary-300': value === 4,
							'bg-zeroloss-purple-1': value === 5,
							'bg-zeroloss-primary-200': value === 6,
						})}>
						<span
							className={clsx('p-1 rounded-circle w-2px h-2px me-2 animation-blink', {
								'bg-zeroloss-error': value === 1,
								'bg-zeroloss-warning': value === 2,
								'bg-zeroloss-success': value === 3,
								'bg-zeroloss-primary': value === 4,
								'bg-zeroloss-brand-600': value === 5,
								'bg-zeroloss-primary-400': value === 6,
							})}
						/>{' '}
						{row?.original?.eventTypeTitle}
					</span>
				)
			},
		},
		{
			Header: 'Status',
			accessor: 'status',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: () => {
				return (
					<div
						className={clsx(
							'border-radius-6px badge text-zeroloss-grey-900 bg-zeroloss-base-white border border-zeroloss-grey-200'
						)}>
						<span
							className={clsx('me-2 bullet bullet-dot h-6px w-6px animation-blink', {
								'bg-success': true,
								// 'bg-danger': !weatherInfo.metStatus,
							})}></span>
						ปิดงานแล้ว
					</div>
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
						// img={'/media/icons/zeroloss/default-placeholder.png'}
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
						onClick={() => {
							window.open(`/events/detail/${row.original.id}`, '_blank')
							// navigate(`/events/detail/${row.original.id}`)
						}}>
						<img src="/media/icons/zeroloss/edit-01.svg" alt="Action Icon" />
					</button>
					{/* <button className="btn btn-sm btn-icon btn-muted btn-active-light">
						<img src="/media/icons/zeroloss/trash-01.svg" alt="Action Icon" />
					</button> */}
				</div>
			),
		},
	]

	const LOADING_TABLE_CONFIGS: any[] = [
		{
			Header: 'รายชื่อเหตุการณ์',
			accessor: 'name',
			minWidth: is4K || is8K ? 450 : 300,
			Cell: () => <Skeleton width={is4K || is8K ? 450 : 300} height={40} />,
		},
		{
			Header: 'ประเภทงาน',
			accessor: 'type',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: () => <Skeleton width={is4K || is8K ? 60 : 40} height={40} />,
		},
		{
			Header: 'Status',
			accessor: 'status',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: () => <Skeleton width={is4K || is8K ? 60 : 40} height={40} />,
		},
		{
			Header: 'About',
			accessor: 'about',
			minWidth: is4K || is8K ? 450 : 300,
			Cell: () => <Skeleton width={is4K || is8K ? 450 : 300} height={40} />,
		},
		{
			Header: '',
			accessor: 'action',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: () => <Skeleton width={is4K || is8K ? 60 : 40} height={40} />,
		},
	]

	useEffect(() => {
		setupTable()

		return () => {}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		fetchData()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		themeMode,
		isLoading,
		isMobile,
		filter,
		displayFilter,
		searchText,
		setSearchText,
		onAddFilter,
		onRemoveFilter,
		data: data,
		dataTypeOptions,
		LOADING_TABLE_CONFIGS,
		TABLE_CONFIGS,
	}
}

export default ViewModel
