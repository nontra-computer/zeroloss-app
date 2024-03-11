import isValidClassName from '@/Utils/isValidClassName'
import { FormCheckRadioProp } from '@/Types/Form'

const FormRadio: React.FC<FormCheckRadioProp> = ({
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
		<div className={`${containerClassName ?? ''}`}>
			<div className={`form-check ${isHorizontal ? 'form-custom-horizontal-container' : ''}`}>
				{label && (
					<label
						htmlFor="form-radio"
						className={`form-label ${isHorizontal ? 'col-3 mb-0' : ''} d-flex flex-row`}
						data-testid="form-label-component">
						<div className="d-flex flex-column">
							<span>{label}</span>
							<span className="text-kumopack-grey-600 fs-8 w-75">{additionalLabel}</span>
						</div>

						{additionalLabelCom}
					</label>
				)}

				<input
					id={`form-radio`}
					className={`form-check-input ${validClassName} ${additionalClassName ?? ''}`}
					type="radio"
					checked={value}
					onChange={onChange}
					disabled={disabled}
				/>
			</div>
		</div>
	)
}

export default FormRadio
