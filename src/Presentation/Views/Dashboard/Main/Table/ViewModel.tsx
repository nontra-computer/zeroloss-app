import { useContext, useEffect } from 'react'
import { TableContext } from '@/Context/Table'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useResolutionDetection } from '@/Hooks/useResolutionDetection'
import clsx from 'clsx'

import DoubleLineImage from '@/Presentation/Components/Table/Cells/DoubleLineImage'
import DoubleLine from '@/Presentation/Components/Table/Cells/DoubleLine'

const MOCK_DATA: any[] = [
	{
		img: null,
		name: 'JOB123',
		type: 'maintenance',
		status: 0,
		description: 'เหตุซ่อมบำรุง Sensor วัดคุณภาพ อากาศ อาคาร A',
		longDescriptionHeader: 'Web app integrations',
		longDescription: 'Connect web apps seamlessly',
	},
	{
		img: null,
		name: 'JOB123',
		type: 'maintenance',
		status: 1,
		description: 'เหตุซ่อมบำรุง Sensor วัดคุณภาพ อากาศ อาคาร A',
		longDescriptionHeader: 'Web app integrations',
		longDescription: 'Connect web apps seamlessly',
	},
	{
		img: null,
		name: 'JOB123',
		type: 'maintenance',
		status: 1,
		description: 'เหตุซ่อมบำรุง Sensor วัดคุณภาพ อากาศ อาคาร A',
		longDescriptionHeader: 'Web app integrations',
		longDescription: 'Connect web apps seamlessly',
	},
	{
		img: null,
		name: 'JOB123',
		type: 'maintenance',
		status: 0,
		description: 'เหตุซ่อมบำรุง Sensor วัดคุณภาพ อากาศ อาคาร A',
		longDescriptionHeader: 'Web app integrations',
		longDescription: 'Connect web apps seamlessly',
	},
	{
		img: null,
		name: 'JOB123',
		type: 'maintenance',
		status: 0,
		description: 'เหตุซ่อมบำรุง Sensor วัดคุณภาพ อากาศ อาคาร A',
		longDescriptionHeader: 'Web app integrations',
		longDescription: 'Connect web apps seamlessly',
	},
	{
		img: null,
		name: 'JOB123',
		type: 'maintenance',
		status: 1,
		description: 'เหตุซ่อมบำรุง Sensor วัดคุณภาพ อากาศ อาคาร A',
		longDescriptionHeader: 'Web app integrations',
		longDescription: 'Connect web apps seamlessly',
	},
]

const ViewModel = () => {
	const { updatePagination, updateDefaultSorting, updateLoading } = useContext(TableContext)
	const { is4K, is8K } = useResolutionDetection()
	const { mode } = useThemeMode()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
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
					img={props.row.original.img}
					label={props.row.original.name}
					description={props.row.original.description}
				/>
			),
		},
		{
			Header: 'ประเภทงาน',
			accessor: 'type',
			minWidth: is4K || is8K ? 60 : 40,
			Cell: () => {
				return (
					<span className={clsx('badge badge-light-danger', {})}>
						<span className="bg-zeroloss-error-500 p-1 rounded-circle w-2px h-2px me-2" />{' '}
						งานซ่อมบำรุง
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
						label={props.row.original.longDescriptionHeader}
						description={props.row.original.longDescription}
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

	useEffect(() => {
		setupTable()

		return () => {}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		themeMode,
		data: MOCK_DATA,
		TABLE_CONFIGS,
	}
}

export default ViewModel
