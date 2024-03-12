import { useContext, useEffect } from 'react'
import { TableContext } from '@/Context/Table'
import clsx from 'clsx'

const MOCK_DATA: any[] = [
	{
		parameter: 'Temperature',
		value: '30',
		standard: '25-30',
		unit: 'C',
		status: 1,
	},
	{
		parameter: 'Humidity',
		value: '60',
		standard: '50-60',
		unit: '%',
		status: 1,
	},
	{
		parameter: 'CO2',
		value: '400',
		standard: '300-500',
		unit: 'ppm',
		status: 1,
	},
	{
		parameter: 'PM2.5',
		value: '10',
		standard: '0-50',
		unit: 'ug/m3',
		status: 0,
	},
	{
		parameter: 'PM10',
		value: '20',
		standard: '0-50',
		unit: 'ug/m3',
		status: 0,
	},
]

const ViewModel = () => {
	const { updatePagination, updateLoading } = useContext(TableContext)

	const setupTable = () => {
		updatePagination(false)
		updateLoading(false)
	}

	const TABLE_CONFIGS: any[] = [
		{
			Header: 'พารามิเตอร์',
			accessor: 'parameter',
			minWidth: 150,
		},
		{
			Header: 'ข้อมูล',
			accessor: 'value',
			minWidth: 30,
		},
		{
			Header: 'มาตรฐาน',
			accessor: 'standard',
			minWidth: 30,
		},
		{
			Header: 'หน่วย',
			accessor: 'unit',
			minWidth: 30,
		},
		{
			Header: 'สถานะ',
			accessor: 'status',
			minWidth: 10,
			Cell: (props: any) => (
				<div
					className={clsx('p-1 rounded-circle w-2px h-2px me-2', {
						'bg-zeroloss-error-500': props.row.original.status === 0,
						'bg-zeroloss-success-500 animation-blink': props.row.original.status === 1,
					})}
				/>
			),
		},
	]

	useEffect(() => {
		setupTable()
		// eslint-disable-next-line
	}, [])

	return {
		data: MOCK_DATA,
		TABLE_CONFIGS,
	}
}

export default ViewModel
