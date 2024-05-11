import { useContext, useEffect, useRef } from 'react'
import { TableContext } from '@/Context/Table'
import clsx from 'clsx'

const ViewModel = ({ onClose }: { onClose: () => void }) => {
	const { updatePagination, updateLoading } = useContext(TableContext)
	const tableRef = useRef<any>(null)

	const setupTable = () => {
		updatePagination(false)
		updateLoading(false)
	}

	const handleOnClickOutside = (e: any) => {
		if (tableRef.current && !tableRef.current.contains(e.target)) {
			onClose()
		}
	}

	const TABLE_CONFIGS: any[] = [
		{
			Header: 'พารามิเตอร์',
			accessor: 'name',
			minWidth: 150,
		},
		{
			Header: 'ข้อมูล',
			accessor: 'value',
			minWidth: 30,
		},
		{
			Header: 'มาตรฐาน',
			accessor: 'std',
			minWidth: 30,
		},
		{
			Header: 'หน่วย',
			accessor: 'unit',
			minWidth: 30,
		},
		{
			Header: 'สถานะ',
			accessor: 'measurementStatus',
			minWidth: 10,
			Cell: (props: any) => (
				<div
					className={clsx('p-1 rounded-circle w-2px h-2px me-2', {
						'bg-zeroloss-base-black': props.row.original.status === 0,
						'bg-zeroloss-success-500 animation-blink': props.row.original.status === 1,
						'bg-zeroloss-warning animation-blink': props.row.original.status === 2,
						'bg-zeroloss-error-500 animation-blink': props.row.original.status === 3,
					})}
				/>
			),
		},
	]

	useEffect(() => {
		setupTable()
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		document.addEventListener('mousedown', handleOnClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleOnClickOutside)
		}
		// eslint-disable-next-line
	}, [onClose])

	return {
		tableRef,
		TABLE_CONFIGS,
	}
}

export default ViewModel
