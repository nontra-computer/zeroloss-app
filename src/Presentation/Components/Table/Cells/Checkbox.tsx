interface Props {
	value: boolean
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<Props> = ({ value, onChange }) => {
	return (
		<div className="d-flex align-items-center justify-content-center">
			<div className="form-check form-check-custom">
				<input
					className="form-check-input"
					type="checkbox"
					checked={value}
					onChange={e => (onChange ? onChange(e) : {})}
				/>
			</div>
		</div>
	)
}
export default Checkbox
