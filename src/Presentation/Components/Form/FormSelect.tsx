import isValidClassName from '@/Utils/isValidClassName'
import { FormSelectProp } from '@/Types/Form'

const FormSelect: React.FC<FormSelectProp> = ({
	label,
	additionalLabel,
	additionalLabelCom,
	disabled,
	onChange,
	options = [],
	value,
	isShowValid,
	additionalClassName,
	containerClassName,
	isHorizontal,
}) => {
	const validClassName: string = isValidClassName(isShowValid, value, disabled)

	return (
		<div
			className={`${containerClassName ?? ''} ${
				isHorizontal ? 'form-custom-horizontal-container' : ''
			}`}
			data-testid="form-select">
			{label && (
				<label
					className={`form-label ${isHorizontal ? 'col-3 mb-0' : ''} d-flex flex-row`}
					data-testid="form-select-label-component">
					<div className="d-flex flex-column">
						<span>{label}</span>
						<span className="text-kumopack-grey-600 fs-8 w-75">{additionalLabel}</span>
					</div>

					{additionalLabelCom}
				</label>
			)}

			<select
				value={value}
				onChange={onChange}
				className={`form-select ${validClassName} ${additionalClassName ?? ''}`}
				aria-label="Select example"
				disabled={disabled}>
				{options.map((o, idx) => (
					<option value={o.value} key={`form-select-option-${label}-${idx}`}>
						{o.label}
					</option>
				))}
			</select>
		</div>
	)
}

export default FormSelect
