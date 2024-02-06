import { useContext } from 'react'
import { TableContext } from '@/Context/Table'
import { KTSVG } from '@/_metronic/helpers'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import clsx from 'clsx'

interface Prop {
	column: any
	headerRight?: boolean
	additionalStyles?: React.CSSProperties
}

const CustomHeaderColumn: React.FC<Prop> = ({ headerRight, column, additionalStyles }) => {
	const { updateSorting } = useContext(TableContext)
	const { mode } = useThemeMode()
	const isCheckbox = column.getHeaderProps(column.getSortByToggleProps()).key.includes('checkbox')

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return (
		<>
			<th
				className={clsx('pt-2 pb-3', {
					'text-end': headerRight,
					'text-zeroloss-base-white': themeMode === 'dark',
				})}
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
					className={clsx({
						'd-none pointer-events-none position-absolute right-0': isCheckbox,
						'position-absolute right-0': !isCheckbox,
					})}>
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
