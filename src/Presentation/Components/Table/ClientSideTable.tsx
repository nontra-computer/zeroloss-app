import { useMemo, useContext } from 'react'
import { TableContext } from '@/Context/Table'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import clsx from 'clsx'

import CustomHeaderColumn from './Components/CustomHeaderColumn'
import CustomRow from './Components/CustomRow'
import CustomTablePagination from './Components/CustomTablePagination'
import TableLoading from './Components/TableLoading'
import TableError from './Components/TableError'

import {
	useTable,
	useSortBy,
	useFilters,
	usePagination,
	Row,
	TableInstance,
	UsePaginationInstanceProps,
} from 'react-table'

import { TableProps } from '@/Types/Table'

type ReactTableProps = TableInstance & UsePaginationInstanceProps<any>

const ClientSideTable: React.FC<TableProps> = ({
	data,
	columns,
	items_per_page,

	rowKey,
	onClickRow,

	isGrey,
}) => {
	const { mode } = useThemeMode()
	const { isLoading, isError, currentSorting, pagination } = useContext(TableContext)
	const isShowLoading = useMemo(() => {
		if (isLoading !== undefined) {
			return isLoading
		} else {
			return false
		}
	}, [isLoading])
	const memorizedColumns = useMemo(() => columns, [columns])

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	const {
		getTableProps,
		getTableBodyProps,
		headers,

		gotoPage,

		page,
		pageOptions,
		prepareRow,
		state,
	} = useTable(
		{
			columns: memorizedColumns,
			data,
			initialState: {
				pageSize: items_per_page,
				sortBy: currentSorting,
			} as any,
		} as any,
		useFilters,
		useSortBy,
		usePagination
	) as ReactTableProps

	const { pageIndex } = state as any

	const gotoPageClientSide = (page: number) => {
		gotoPage(page - 1)
	}

	return (
		<>
			<div className="table-responsive">
				<div className="tableWrap">
					<table
						className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
						{...getTableProps()}
						style={{ height: '1px' }}>
						<thead>
							<tr
								className={clsx('text-start text-muted fs-7 text-uppercase gs-0', {
									'border-zeroloss-base-white': themeMode === 'dark',
								})}
								style={{ borderStyle: 'solid' }}>
								{headers.map((column: any) => {
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
							{page.length > 0 ? (
								page.map((row: Row, i) => {
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
					totalCountData={data.length}
					page={pageIndex + 1}
					items_per_page={items_per_page}
					updatePage={gotoPageClientSide}
					links={[...Array(pageOptions.length)].map((_, idx) => ({
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

export default ClientSideTable
