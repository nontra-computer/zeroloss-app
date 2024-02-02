// @ts-nocheck

import clsx from 'clsx'
import { Row } from 'react-table'

interface Prop {
	row: Row
	rowKey?: string
	onClickRow?: (id: string) => void

	isGrey?: boolean
}

const CustomRow: React.FC<Prop> = ({ row, rowKey, onClickRow, isGrey }) => {
	return (
		<tr
			{...row.getRowProps()}
			onClick={() => {
				if (onClickRow && rowKey) {
					onClickRow(row.original[rowKey])
				}
			}}
			className={clsx({ 'bg-gray-100': row.isSelected || isGrey }, 'cursor-pointer')}>
			{row.cells.map(cell => {
				let className: React.CSSProperties = {
					width: cell.column.width,
					minWidth: cell.column.minWidth,
					maxWidth: cell.column.maxWidth,
				}

				return (
					<td
						{...cell.getCellProps()}
						className={clsx({ 'text-end min-w-100px': cell.column.id === 'actions' }, 'px-5')}
						style={className}>
						{cell.render('Cell')}
					</td>
				)
			})}
		</tr>
	)
}

export default CustomRow
