import { useContext } from 'react'
import { useMemo } from 'react'
import { TableContext } from '@/Context/Table'

import CustomHeaderColumn from './Components/CustomHeaderColumn'
import CustomRow from './Components/CustomRow'
import CustomTablePagination from './Components/CustomTablePagination'
import TableLoading from './Components/TableLoading'
import TableError from './Components/TableError'

import {
	useTable,
	useSortBy,
	useFilters,
	Row,
	TableInstance,
	UsePaginationInstanceProps,
} from 'react-table'

import { ServerSideTableProps } from '@/Types/Table'

type ReactTableProps = TableInstance & UsePaginationInstanceProps<{}>

const ServerSideTable: React.FC<ServerSideTableProps> = ({
	data,
	totalData,
	columns,
	items_per_page,
	page,
	totalPage = 0,

	isError,
	pagination = false,

	updatePage,
	rowKey,
	onClickRow,

	isGrey,
}) => {
	const { isLoading, currentSorting } = useContext(TableContext)
	const isShowLoading = useMemo(() => {
		if (isLoading !== undefined) {
			return isLoading
		} else {
			return false
		}
	}, [isLoading])
	const memorizedColumns = useMemo(() => columns, [columns])

	const {
		getTableProps,
		getTableBodyProps,
		headers,

		rows,
		prepareRow,
		state,
	} = useTable(
		{
			manualSortBy: true,
			columns: memorizedColumns,
			data,
			initialState: { pageSize: items_per_page, sortBy: currentSorting } as any,
		} as any,
		useFilters,
		useSortBy
	) as ReactTableProps

	const { pageIndex } = state as any

	return (
		<>
			<div className="table-responsive">
				<div className="tableWrap">
					<table
						className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
						{...getTableProps()}
						style={{ height: '1px' }}>
						<thead>
							<tr className="text-start text-muted fs-7 text-uppercase gs-0">
								{headers.map((column: any, idx) => {
									let className: React.CSSProperties = {
										color: '#475467',
										textTransform: 'none',
										// backgroundColor: theme === 'light' ? '#eee' : '#151521',
									}

									className = {
										...className,
										paddingLeft: '1.25rem',
										paddingRight: '1.25rem',
										width: column.width,
										minWidth: column.minWidth,
										maxWidth: column.maxWidth,
									}

									return (
										<CustomHeaderColumn
											key={column.id}
											headerRight={column.headerRight}
											column={column}
											additionalStyles={className}
										/>
									)
								})}
							</tr>
						</thead>
						<tbody className="text-black px-5" {...getTableBodyProps()}>
							{rows.length > 0 ? (
								rows.map((row: Row, i) => {
									prepareRow(row)

									return (
										<CustomRow
											row={row}
											rowKey={rowKey}
											onClickRow={onClickRow}
											isGrey={isGrey && i % 2 === 0}
											key={`row-${i}-${row.id}`}
										/>
									)
								})
							) : (
								<tr>
									<td colSpan={7}>
										<div className="d-flex text-center w-100 align-content-center justify-content-center">
											{!isError ? 'No matching records found' : ''}
										</div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			{pagination && (
				<CustomTablePagination
					isLoading={isLoading}
					page={page}
					totalCountData={totalData}
					items_per_page={items_per_page}
					updatePage={updatePage}
					links={[...Array(totalPage)].map((_, idx) => ({
						label: `${idx + 1}`,
						active: idx + 1 === pageIndex + 1,
						page: idx + 1,
						url: null,
					}))}
				/>
			)}

			{isShowLoading && <TableLoading />}

			{isError && <TableError />}
		</>
	)
}

export default ServerSideTable
