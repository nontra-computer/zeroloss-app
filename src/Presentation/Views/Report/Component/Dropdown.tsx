import React, { useState } from 'react'
import Select from 'react-select'

const options = [
	{ value: 'time-series-report', label: 'Time Series Report' },
	{ value: 'windrose-report', label: 'Windrose Report' },
	{ value: 'page3', label: 'Page 3' },
]

const FormDropdownComponent = () => {
	const [selectedOption, setSelectedOption] = useState(null)

	const handleChange = selectedOption => {
		setSelectedOption(selectedOption)
		if (selectedOption) {
			window.location.href = `/report/form/${selectedOption.value}`
		}
	}

	return (
		<div>
			<Select
				value={selectedOption}
				onChange={handleChange}
				options={options}
				placeholder="Select a Page..."
			/>
		</div>
	)
}

export default FormDropdownComponent
