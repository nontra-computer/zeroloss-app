import ReactSwitch from 'react-switch'

interface Props {
	value: any
	onChange: (checked: boolean) => void
}

const Switch: React.FC<Props> = ({ value, onChange }) => {
	return (
		<ReactSwitch
			checked={value === 1 || value === true}
			onChange={val => onChange(val)}
			onColor="#0096D4"
			onHandleColor="#ffffff"
			uncheckedIcon={false}
			checkedIcon={false}
			height={20}
			width={36}
			boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
			activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
			className="react-switch"
		/>
	)
}

export default Switch
