const TableError = () => {
	const styles = {
		borderRadius: '0.475rem',
		boxShadow: '0 0 50px 0 rgb(82 63 105 / 15%)',
		backgroundColor: '#fff',
		fontWeight: '500',
		margin: '0',
		width: 'auto',
		padding: '1rem 2rem',
		top: 'calc(50% - 2rem)',
		left: 'calc(50% - 4rem)',
		color: 'red',
	}

	return (
		<div style={{ ...styles, position: 'absolute', textAlign: 'center' }}>
			Something Went Wrong <br /> Please Try Agian
		</div>
	)
}

export default TableError
