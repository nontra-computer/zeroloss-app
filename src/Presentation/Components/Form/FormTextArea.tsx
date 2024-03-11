import isValidClassName from '@/Utils/isValidClassName'
import { FormTextAreaProp } from '@/Types/Form'

const FormTextArea: React.FC<FormTextAreaProp> = ({
	label,
	additionalLabel,
	additionalLabelCom,
	value,
	onChange,
	isShowValid,
	disabled,
	additionalClassName,
	containerClassName,
	isHorizontal,
	placeholder,
	limitCharacter,
}) => {
	const validClassName: string = isValidClassName(isShowValid, value, disabled)

	const findCharacterLeft = () => {
		if (limitCharacter && value) {
			return limitCharacter - value.toString().length
		} else if (limitCharacter) {
			return limitCharacter
		} else {
			return 0
		}
	}

	return (
		<div className={`${containerClassName ?? ''} ${isHorizontal ? 'd-flex flex-row' : ''}`}>
			{label && (
				<label
					className={`form-label ${isHorizontal ? 'col-3 mb-0' : ''} d-flex flex-row`}
					data-testid="form-input-label-component">
					<div className="d-flex flex-column">
						<span>{label}</span>
						<span className="text-kumopack-grey-600 fs-8">{additionalLabel}</span>
					</div>

					{additionalLabelCom}
				</label>
			)}

			<div className="w-100">
				<textarea
					className={`form-control ${additionalClassName ?? ''} ${validClassName}`}
					value={value}
					onChange={e => {
						if (onChange) {
							if (limitCharacter && e.target.value.length > limitCharacter) return

							onChange(e)
						}
					}}
					disabled={disabled}
					rows={5}
					placeholder={placeholder}
					aria-label="form-input-component"
					data-testid="form-input-component"
				/>

				{limitCharacter && (
					<div className="text-kumopack-grey-600 mt-2">{findCharacterLeft()} characters left</div>
				)}
			</div>
		</div>
	)
}

export default FormTextArea
