import clsx from 'clsx'

interface Props {
	value: boolean
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Radio: React.FC<Props> = ({ value, onChange }) => {
	return (
		<div className="d-flex align-items-center justify-content-end">
			<div className="form-check form-check-custom">
				<input
					className={clsx('form-check-input', {
						'bg-kumopack-primary-600 border-kumopack-base-white': value,
						'border-kumopack-gray-700': !value,
					})}
					type="radio"
					checked={value}
					onChange={e => (onChange ? onChange(e) : {})}
				/>
			</div>
		</div>
	)
}
export default Radio
