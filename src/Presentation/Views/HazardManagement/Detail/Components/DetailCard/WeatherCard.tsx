import React from 'react'

interface Props {
	data: {
		ws?: number
		wsUnit?: string
		airTemperature?: number
		airTemperatureUnit?: string
		humidity?: number
		groundRoughness?: number
		stabilityClass?: string
		isInversion?: number
	}
}

const DetailCard: React.FC<Props> = ({ data }) => {
	return (
		<div className="d-flex flex-column mx-5 mt-5" style={{ gap: '8px' }}>
			{data.ws !== undefined && (
				<>
					<h2 className="mb-2">อุตุนิยมวิทยา</h2>
					<div className="row">
						<div className="col-4">Wind Speed</div>
						<div className="col-8">
							{data.ws} {data.wsUnit}
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-4">Air Temperature</div>
						<div className="col-8">
							{data.airTemperature} {data.airTemperatureUnit}
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-4">Humidity</div>
						<div className="col-8">{data.humidity}%</div>
					</div>
					<div className="row">
						<div className="col-4">Ground Roughness</div>
						<div className="col-8">{data.groundRoughness}</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-4">Stability Class</div>
						<div className="col-8">{data.stabilityClass}</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-4">Is Inversion?</div>
						<div className="col-8">{data.isInversion ? 'Yes' : 'No'}</div>
					</div>
					<hr />
				</>
			)}
		</div>
	)
}

export default DetailCard
