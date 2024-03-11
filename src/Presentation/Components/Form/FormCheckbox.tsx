import isValidClassName from '@/Utils/isValidClassName'
import { FormCheckboxProp } from '@/Types/Form'

const FormCheckbox: React.FC<FormCheckboxProp> = ({
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
}) => {
	const validClassName: string = isValidClassName(isShowValid, value, disabled)

	return (
		<div
			className={`${containerClassName ?? ''} ${
				isHorizontal ? 'form-custom-horizontal-container' : ''
			}`}>
			<div className="form-check d-flex flex-row">
				{label && (
					<label
						className={`form-check-label text-black ${
							isHorizontal ? 'col-3 mb-0' : ''
						} d-flex flex-row`}
						data-testid="form-check-label-component">
						<div className="d-flex flex-column">
							<span>{label}</span>
							<span className="text-kumopack-grey-600 fs-8 w-75">{additionalLabel}</span>
						</div>

						{additionalLabelCom}
					</label>
				)}

				<input
					className={`form-check-input ${validClassName} ${additionalClassName}`}
					type="checkbox"
					checked={value}
					onChange={onChange}
					disabled={disabled}
				/>
			</div>
		</div>
	)
}

export default FormCheckbox
