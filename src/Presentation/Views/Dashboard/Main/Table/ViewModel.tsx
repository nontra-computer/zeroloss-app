import { useContext, useEffect, useMemo, useState } from 'react'
import { TableContext } from '@/Context/Table'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'
import { useEventStore } from '@/Store/Event'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import moment from 'moment'
import 'moment/locale/th'

import Skeleton from 'react-loading-skeleton'
import DoubleLineImage from '@/Presentation/Components/Table/Cells/DoubleLineImage'

const INITIAL_STATE_FILTER = {
	type: 'all',
	search: '',
}

const ViewModel = () => {
	const { updatePagination, updateDefaultSorting, updateLoading } = useContext(TableContext)
	const { is4K, is8K } = useResolutionDetection()
	const { mode } = useThemeMode()
	const { rawData, dataTypes, getAll, getTypes, clearState } = useEventStore(state => ({
		rawData: state.data,
		dataTypes: state.types,
		getAll: state.getAll,
		getTypes: state.getTypes,
		clearState: state.clearState,
	}))
	const [isLoading, setIsLoading] = useState(false)
	const [filter, setFilter] = useState(INITIAL_STATE_FILTER)

	const data = useMemo(
		() =>
			rawData.filter(d => {
				if (filter.type === 'all') {
					return true
				} else {
					return d.idEventType === filter.type
				}
			}),
		[rawData, filter]
	)

	const dataTypeOptions: {
		label: string
		value: any
	}[] = [
		{
			label: 'ทั้งหมด',
			value: 'all',
		},
		...dataTypes.map(
			(d: any) => ({
				label: d.name,
				value: d.id,
			}),
			[]
		),
	]

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
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
					img={props.row.original?.img}
					label={props.row.original?.title}
					description={props.row.original?.title}
				/>
			),
		},
		{
			Header: 'สถานที่เกิดเหตุ',
			accessor: 'locationName',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: (props: any) => {
				return <span>{props.row.original.locationName}</span>
			},
		},
		{
			Header: 'วันที่เกิดเหตุ',
			accessor: 'start',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: (props: any) => {
				return (
					<span>
						{props.row.original?.start
							? moment(props.row.original?.start).format('DD/MM/YYYY HH:mm')
							: '-'}
					</span>
				)
			},
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
					<DoubleLineImage
						img={'/media/icons/zeroloss/default-placeholder.png'}
						label={props.row.original.longDescriptionHeader ?? '-'}
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
					<button className="btn btn-sm btn-icon btn-muted btn-active-light">
						<img src="/media/icons/zeroloss/trash-01.svg" alt="Action Icon" />
					</button>
					<button className="btn btn-sm btn-icon btn-muted btn-active-light">
						<img src="/media/icons/zeroloss/edit-01.svg" alt="Action Icon" />
					</button>
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

		return () => {
			clearState()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		themeMode,
		isLoading,
		filter,
		setFilter,
		data: data,
		dataTypeOptions,
		LOADING_TABLE_CONFIGS,
		TABLE_CONFIGS,
	}
}

export default ViewModel
