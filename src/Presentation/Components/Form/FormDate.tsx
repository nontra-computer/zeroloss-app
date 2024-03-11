import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import isValidClassName from '@/Utils/isValidClassName'
import { FormDatePickerProp } from '@/Types/Form'

const FormDate: React.FC<FormDatePickerProp> = ({
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
	const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null)

	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date)
		if (onChange) {
			onChange({
				target: {
					value: date ? date.toISOString() : '',
				},
			} as React.ChangeEvent<HTMLInputElement>)
		}
	}

	const formattedValue = selectedDate ? format(selectedDate, 'HH:mm dd/MM/yyyy') : ''

	const validClassName: string = isValidClassName(isShowValid, formattedValue, disabled)

	return (
		<div
			className={`${containerClassName ?? ''} ${
				isHorizontal ? 'd-flex flex-row align-items-center' : ''
			}`}>
			{label && (
				<label
					className={`form-label ${isHorizontal ? 'col-3 mb-0 d-flex align-items-center' : ''}`}
					data-testid="form-input-label-component">
					<div className="d-flex flex-column">
						<span>{label}</span>
						<span className="text-kumopack-grey-600 fs-8 w-75">{additionalLabel}</span>
					</div>

					{additionalLabelCom}
				</label>
			)}

			<div className={`d-flex ${isHorizontal ? 'col-9' : ''}`}>
				<DatePicker
					selected={selectedDate}
					onChange={handleDateChange}
					showTimeSelect
					timeFormat="HH:mm"
					timeIntervals={15}
					timeCaption="Time"
					dateFormat="HH:mm dd/MM/yyyy"
					disabled={disabled}
					placeholderText="00:00 dd/mm/yyyy" // Add placeholder text
					className={`form-control ${additionalClassName ?? ''} ${validClassName}`}
					aria-label="form-input-component"
					data-testid="form-input-component"
				/>
			</div>
		</div>
	)
}

export default FormDate
