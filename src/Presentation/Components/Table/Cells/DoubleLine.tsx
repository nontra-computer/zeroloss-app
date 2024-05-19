import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import clsx from 'clsx'

interface Props {
	label: string
	description: string | JSX.Element
}

const DoubleLine: React.FC<Props> = ({ label, description }) => {
	const { mode } = useThemeMode()
	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return (
		<div className="d-flex align-items-center" style={{ columnGap: '8px' }}>
			<div className="d-flex flex-column">
				<span
					className={clsx('fw-bold', {
						'text-zerolos-grey-900': themeMode === 'light',
						'text-zeroloss-base-white': themeMode === 'dark',
					})}>
					{label}
				</span>
				<span
					className={clsx('', {
						'text-zeroloss-base-white': themeMode === 'dark',
						'text-zeroloss-grey-600': themeMode === 'light',
					})}>
					{description}
				</span>
			</div>
		</div>
	)
}

export default DoubleLine
