import React, { useContext, useEffect } from 'react'
import { TableContext } from '@/Context/Table'
import { ClientSideTable } from '@/Presentation/Components/Table'
import DoubleLineImage from '@/Presentation/Components/Table/Cells/DoubleLineImage'
import DynamicChangePPM from '@/Presentation/Components/DynamicChangePPM/View'
import Scale from '@/Presentation/Components/Scale/View'
import SensorChart from './SensorChart'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import clsx from 'clsx'

interface Props {
	datas: any[]
}

const MeasurementTable: React.FC<Props> = ({ datas }) => {
	const intl = useIntl()
	const { updateLoading, updateError, updatePagination, updateSorting } = useContext(TableContext)
	const { mode } = useThemeMode()
	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const setupTable = () => {
		updateLoading(false)
		updateError(false)
		updatePagination(true)
		updateSorting('sensors', true)
	}

	const columns: any[] = [
		{
			Header: 'รายชื่อ Sensors',
			accessor: 'sensors',
			minWidth: 400,
			Cell: (props: any) => {
				return (
					<DoubleLineImage
						label={props.row.original.sensors}
						description={props.row.original.location}
						img={props.row.original.image}
					/>
				)
			},
		},
		{
			Header: 'Status',
			accessor: 'status',
			minWidth: 40,
			Cell: (props: any) => {
				return (
					<span
						className={clsx('badge', {
							'badge-light-success': props.row.original.status === 1,
							'badge-light-danger': props.row.original.status === 0,
						})}>
						{props.row.original.status === 1 ? 'Online' : 'Offline'}
					</span>
				)
			},
		},
		{
			Header: 'Value',
			accessor: 'ppm',
			minWidth: 80,
			Cell: (props: any) => {
				return (
					<DynamicChangePPM
						value={props.row.original.ppm}
						isPositive={Math.random() * 100 >= 35}
						change={Math.random() * 100}
					/>
				)
			},
		},
		{
			Header: '24 Hours',
			accessor: 'graph',
			minWidth: 50,
			Cell: (props: any) => {
				return <SensorChart />
			},
		},
		{
			Header: 'Scale',
			accessor: 'scale',
			minWidth: 250,
			Cell: (props: any) => {
				return (
					<div className="px-5">
						<Scale value={props.value} type={props.row.original.scaleType} />
					</div>
				)
			},
		},
	]

	useEffect(() => {
		setupTable()
		// eslint-disable-next-line
	}, [])

	return (
		<React.Fragment>
			<div className="row">
				<div className="col-12" style={{ height: 'fit-content' }}>
					<div
						className={clsx('fs-2 fw-bolder', {
							'text-zeroloss-grey-900': themeMode === 'light',
							'text-zeroloss-base-white': themeMode === 'dark',
						})}>
						{intl.formatMessage({
							id: 'ZEROLOSS.DASHBOARD.BUILDING_MWA_MEASUREMENT.SENSOR_TITLE',
						})}
					</div>
					<p
						className={clsx('fs-6', {
							'text-zeroloss-base-white': themeMode === 'dark',
							'text-zeroloss-grey-600': themeMode === 'light',
						})}>
						{intl.formatMessage({
							id: 'ZEROLOSS.DASHBOARD.BUILDING_MWA_MEASUREMENT.SENSOR_DESCRIPTION',
						})}
					</p>
				</div>
				<div className="col-12">
					<div
						className={clsx('card border-radius-12px border-1px h-100', {
							'bg-zeroloss-base-white border-zeroloss-grey-200': themeMode === 'light',
							'bg-zeroloss-grey-true-800 border-zeroloss-base-white': themeMode === 'dark',
						})}>
						<div className="card-body px-0 pt-2">
							<ClientSideTable columns={columns} data={datas} items_per_page={10} />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default MeasurementTable
