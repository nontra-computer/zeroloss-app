import React from 'react'

interface LocationData {
	name: string
	fullAddress: string
}

interface ChemicalData {
	id: number
	nameEn: string
	aegl3: number
	aegl2: number
	aegl1: number
	cas: string
	un: string
	typeNameTh: string
}

interface Props {
	data: {
		location?: LocationData
		chemical?: ChemicalData
		locationName?: string
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
			{data.location && (
				<>
					<h2 className="mb-2">สถานที่</h2>
					<div className="row">
						<div className="col-4">ชื่อ</div>
						<div className="col-8">{data.locationName}</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-4">ที่อยู่</div>
						<div className="col-8">{data.location.fullAddress}</div>
					</div>
					<hr />
				</>
			)}
			{data.chemical && (
				<>
					<h2 className="mb-2">สารเคมี</h2>
					<div className="row">
						<div className="col-4">ID</div>
						<div className="col-8">{data.chemical.id}</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-4">ชื่อ</div>
						<div className="col-8">{data.chemical.nameEn}</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-4">CAS</div>
						<div className="col-8">{data.chemical.cas}</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-4">UN</div>
						<div className="col-8">{data.chemical.un}</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-4">ประเภท</div>
						<div className="col-8">{data.chemical.typeNameTh}</div>
					</div>
					<hr />
				</>
			)}
			
		</div>
	)
}

export default DetailCard
