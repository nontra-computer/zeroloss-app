import React from 'react'
import { Row } from 'react-table'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import clsx from 'clsx'
interface Prop {
	row: Row
	rowKey?: string
	onClickRow?: (id: string) => void

	isGrey?: boolean
}

const CustomRow: React.FC<Prop> = React.memo(({ row, rowKey, onClickRow, isGrey }) => {
	const { mode } = useThemeMode()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return (
		<tr
			{...row.getRowProps()}
			onClick={() => {
				if (onClickRow && rowKey) {
					// @ts-ignore
					onClickRow(row.original[rowKey])
				}
			}}
			className={clsx(
				{
					// @ts-ignore
					'bg-gray-100': row.isSelected || isGrey,
					'border-zeroloss-base-white': themeMode === 'dark',
				},
				'cursor-pointer'
			)}
			style={{ borderStyle: 'solid' }}>
			{row.cells.map(cell => {
				const className: React.CSSProperties = {
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
})

export default CustomRow
