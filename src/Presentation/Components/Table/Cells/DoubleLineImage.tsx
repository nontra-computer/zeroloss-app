import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import clsx from 'clsx'

interface Props {
	img: string | null
	label: string
	description: string
}

const DoubleLineImage: React.FC<Props> = ({ img, label, description }) => {
	const { mode } = useThemeMode()
	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return (
		<div className="d-flex align-items-center" style={{ columnGap: '8px' }}>
			<div>
				<img
					className="rounded-circle object-fit-cover"
					alt="Logo"
					src={img ?? '/media/icons/zeroloss/default-placeholder.png'}
					onError={(e: any) => {
						e.target.src = '/media/icons/zeroloss/default-placeholder.png'
						e.target.onerror = null
					}}
					width={40}
					height={40}
				/>
			</div>

			<div className="d-flex flex-column">
				<span
					className={clsx('fw-bold', {
						'text-zeroloss-base-white': themeMode === 'dark',
						'text-zeroloss-grey-900': themeMode === 'light',
					})}>
					{label}
				</span>
				<span
					className={clsx({
						'text-zeroloss-base-white': themeMode === 'dark',
						'text-zeroloss-grey-900': themeMode === 'light',
					})}>
					{description}
				</span>
			</div>
		</div>
	)
}

export default DoubleLineImage
