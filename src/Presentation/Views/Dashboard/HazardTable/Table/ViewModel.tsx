import { useContext, useEffect, useMemo, useState } from 'react'
import { TableContext } from '@/Context/Table'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useNavigate } from 'react-router-dom'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'
import { useHazardManagementStore } from '@/Store/Hazard'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import 'moment/locale/th'

import Skeleton from 'react-loading-skeleton'
import moment from 'moment'

const INITIAL_STATE_FILTER: {
	type: any[]
	search: any[]
} = {
	type: [],
	search: [],
}

const ViewModel = () => {
	const navigate = useNavigate()
	const { updatePagination, updateDefaultSorting, updateLoading } = useContext(TableContext)
	const { isMobile, is4K, is8K } = useResolutionDetection()
	const { mode } = useThemeMode()
	const { rawData, getAll } = useHazardManagementStore(state => ({
		rawData: state.data,

		getAll: state.getAll,
	}))
	const [isLoading, setIsLoading] = useState(false)
	const [searchText, setSearchText] = useState('')
	const [filter, setFilter] = useState(INITIAL_STATE_FILTER)

	const data = useMemo(
		() =>
			rawData.filter(d => {
				if (filter.search.length > 0) {
					const search = filter.search.join(' ').toLowerCase()
					const searchValues = Object.values(d).join(' ').toLowerCase()
					if (!searchValues.includes(search)) return false
				}

				if (filter.type.length > 0) {
					const type = filter.type.map((t: any) => t)
					if (!type.includes(d.eventType.id)) return false
				}

				return true
			}),
		[rawData, filter]
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

	const onViewDetail = (id: string) => {
		navigate(`/hazard-modeling/detail/${id}`)
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
			Header: 'วันที่',
			accessor: 'id',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: (props: any) => (
				<span
					className={clsx({
						'text-zeroloss-base-white': themeMode === 'dark',
						'text-zeroloss-grey-900': themeMode === 'light',
					})}>
					{props.row.original.createdAt
						? moment(props.row.original.createdAt).format('DD/MM/YYYY HH:MM')
						: ''}
				</span>
			),
		},
		{
			Header: 'สถานที่',
			accessor: 'location',
			minWidth: is4K || is8K ? 450 : 300,
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
			Header: 'action',
			accessor: 'action',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: ({ row }: any) => (
				<div className="d-flex flex-row justify-content-center align-items-center">
					<button
						className="btn btn-sm btn-icon btn-muted btn-active-light"
						onClick={() => onViewDetail(row.original.id)}>
						<img src="/media/icons/zeroloss/edit-01.svg" alt="Action Icon" />
					</button>
					<button className="btn btn-sm btn-icon btn-muted btn-active-light">
						<img src="/media/icons/zeroloss/trash-01.svg" alt="Action Icon" />
					</button>
				</div>
			),
		},
	]

	const LOADING_TABLE_CONFIGS: any[] = [
		{
			Header: 'ID',
			accessor: 'id',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: () => <Skeleton width={is4K || is8K ? 450 : 300} height={40} />,
		},
		{
			Header: 'สถานที่',
			accessor: 'location',
			minWidth: is4K || is8K ? 450 : 300,
			Cell: () => <Skeleton width={is4K || is8K ? 60 : 40} height={40} />,
		},
		{
			Header: 'action',
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

		return () => {}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		themeMode,
		isLoading,
		isMobile,
		filter,
		searchText,
		setSearchText,
		onAddFilter,
		onRemoveFilter,
		data: data,
		LOADING_TABLE_CONFIGS,
		TABLE_CONFIGS,
		onViewDetail,
	}
}

export default ViewModel
