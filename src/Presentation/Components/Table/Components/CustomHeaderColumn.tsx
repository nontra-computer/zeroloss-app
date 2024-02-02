import { useContext } from 'react'
import { TableContext } from '@/Context/Table'
import { KTSVG } from '@/_metronic/helpers'

interface Prop {
	column: any
	headerRight?: boolean
	additionalStyles?: React.CSSProperties
}

const CustomHeaderColumn: React.FC<Prop> = ({ headerRight, column, additionalStyles }) => {
	const { updateSorting } = useContext(TableContext)
	const isCheckbox = column.getHeaderProps(column.getSortByToggleProps()).key.includes('checkbox')

	return (
		<>
			<th
				className={`pt-2 pb-3 ${headerRight ? 'text-end' : ''}`}
				{...column.getHeaderProps(column.getSortByToggleProps())}
				onClick={() => {
					if (column.canSort) {
						updateSorting(column.id, !column.isSortedDesc)
						column.toggleSortBy(!column.isSortedDesc)
					}
				}}
				style={additionalStyles}>
				{column.render('Header')}
				<span
					className={
						isCheckbox
							? 'd-none pointer-events-none position-absolute right-0'
							: 'position-absolute right-0'
					}>
					{column.isSorted ? (
						column.isSortedDesc ? (
							<KTSVG
								path="/media/icons/duotune/arrows/arr004.svg"
								className="svg-icon-2 svg-icon-primary"
							/>
						) : (
							<KTSVG
								path="/media/icons/duotune/arrows/arr003.svg"
								className="svg-icon-2 svg-icon-primary"
							/>
						)
					) : (
						''
					)}
				</span>
			</th>
		</>
	)
}

export default CustomHeaderColumn
