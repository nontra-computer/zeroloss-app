interface Props {
	label: string
	description: string
}

const DoubleLine: React.FC<Props> = ({ label, description }) => {
	return (
		<div className="d-flex align-items-center" style={{ columnGap: '8px' }}>
			<div className="d-flex flex-column">
				<span className="text-kumopack-grey-900 fw-bold">{label}</span>
				<span className="text-kumopack-grey-600">{description}</span>
			</div>
		</div>
	)
}

export default DoubleLine
