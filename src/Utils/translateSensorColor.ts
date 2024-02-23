export const translateSensorColor = (color: 'success' | 'warning' | 'danger' | 'default') => {
	switch (color) {
		case 'success':
			return 'green'
		case 'warning':
			return 'orange'
		case 'danger':
			return 'red'
		case 'default':
			return 'grey'
		default:
			return 'green'
	}
}
