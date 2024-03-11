import isValidClassName from '@/Utils/isValidClassName'
import { FormInputFileProp } from '@/Types/Form'

const FormInputFile: React.FC<FormInputFileProp> = ({
	accept,
	label,
	additionalLabel,
	value,
	onChange,
	disabled,
	additionalClassName,
	additionalLabelCom,
	containerClassName,
	isHorizontal,
	isShowValid,
}) => {
	const validClassName: string = isValidClassName(isShowValid, value, disabled)

	return (
		<div
			className={`${containerClassName ?? ''} ${
				isHorizontal ? 'form-custom-horizontal-container' : ''
			}`}>
			{label && (
				<label
					className={`form-label ${isHorizontal ? 'col-2 mb-0' : ''} d-flex flex-row`}
					data-testid="form-input-file-label-component">
					<div className="d-flex flex-column">
						<span>{label}</span>
						<span className="text-kumopack-grey-600 fs-8 w-75">{additionalLabel}</span>
					</div>

					{additionalLabelCom}
				</label>
			)}

			<input
				type="file"
				accept={accept}
				className={`form-control ${additionalClassName ?? ''} ${validClassName}`}
				value={value ? value.name : undefined}
				onChange={onChange}
				disabled={disabled}
				aria-label="form-input-file-component"
				data-testid="form-input-file-component"
			/>
		</div>
	)
}

export default FormInputFile
