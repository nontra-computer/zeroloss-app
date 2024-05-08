import { Link } from 'react-router-dom'
import { KTSVG } from '@/_metronic/helpers'

interface Props {
	title: string
	icon: string
	path?: string
	onClick?: () => void
}

const FormButton: React.FC<Props> = ({ title, path, icon, onClick }) => {
	return (
		<Link to={path ?? '#'} onClick={() => (onClick ? onClick() : {})}>
			<div className="p-4 text-white btn btn-lg btn-success d-flex flex-column align-items-start shadow">
				<span className="fs-2 px-2 fw-bold">{title}</span>
				<span className="menu-icon">
					<KTSVG path={icon} className="svg-icon-1 home-shortcut" />
				</span>
			</div>
		</Link>
	)
}

export default FormButton
