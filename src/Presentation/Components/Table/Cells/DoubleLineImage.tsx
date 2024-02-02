interface Props {
	img: string | null
	label: string
	description: string
}

const DoubleLineImage: React.FC<Props> = ({ img, label, description }) => {
	return (
		<div className="d-flex align-items-center" style={{ columnGap: '8px' }}>
			<div>
				<img
					className="rounded-circle object-fit-cover"
					alt="Logo"
					src={img ?? '/media/icons/kumopack/default-placeholder.png'}
					onError={(e: any) => {
						e.target.onerror = null
						e.target.src = '/media/icons/zeroloss/default-placeholder.png'
					}}
					width={40}
					height={40}
				/>
			</div>

			<div className="d-flex flex-column">
				<span className="text-kumopack-grey-900 fw-bold">{label}</span>
				<span className="text-kumopack-grey-600">{description}</span>
			</div>
		</div>
	)
}

export default DoubleLineImage
