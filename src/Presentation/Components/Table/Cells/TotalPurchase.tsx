import formatNumberCommas from 'Utils/formatNumberCommas'

const TotalPurchase = ({ value }: { value: string }) => {
	const isNegativeOrZero = () => {
		return parseFloat(value) <= 0
	}

	return (
		<div className="d-flex flex-column" style={{ columnGap: '8px' }}>
			<div className="d-flex flex-column">
				<span className="fw-bold">
					{formatNumberCommas(isNegativeOrZero() ? parseFloat(value) * -1 : parseFloat(value))}
				</span>
			</div>

			{parseFloat(value) > 0 ? (
				<div
					className="bg-kumopack-success-50 text-kumopack-success-700 px-2 w-fit-content"
					style={{ borderRadius: '16px' }}>
					<img src="/media/icons/kumopack/arrow-up-green.png" alt="Percentage Changing Icon" /> 20%
				</div>
			) : (
				<div
					className="bg-kumopack-error-50 text-kumopack-error-700 px-2 w-fit-content"
					style={{ borderRadius: '16px' }}>
					<img src="/media/icons/kumopack/arrow-down-red.png" alt="Percentage Changing Icon" /> 20%
				</div>
			)}
		</div>
	)
}

export default TotalPurchase
