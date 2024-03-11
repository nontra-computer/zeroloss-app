import isValidClassName from '@/Utils/isValidClassName'
import { FormDatePickerProp } from '@/Types/Form'

const FormDatePicker: React.FC<FormDatePickerProp> = ({
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
	const validClassName: string = isValidClassName(
		isShowValid,
		typeof value === 'object' ? value.toString() : value,
		disabled
	)

	return (
		<div
			className={`${containerClassName ?? ''} ${
				isHorizontal ? 'form-custom-horizontal-container' : ''
			}`}>
			{label && (
				<label
					className={`form-label ${isHorizontal ? 'col-3 mb-0' : ''} d-flex flex-row`}
					data-testid="form-input-label-component">
					<div className="d-flex flex-column">
						<span>{label}</span>
						<span className="text-kumopack-grey-600 fs-8 w-75">{additionalLabel}</span>
					</div>

					{additionalLabelCom}
				</label>
			)}

			<input
				className={`form-control ${additionalClassName ?? ''} ${validClassName}`}
				type="date"
				value={value?.toString()}
				onChange={onChange}
				disabled={disabled}
				aria-label="form-input-component"
				data-testid="form-input-component"
			/>
		</div>
	)
}

export default FormDatePicker
