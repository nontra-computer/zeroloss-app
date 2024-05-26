import React from 'react'

interface Props {
	data: {
		diameter?: number
		diameterUnit?: string
		length?: number
		lengthUnit?: string
		maxVolume?: number
		maxVolumeUnit?: string
		chemicalState?: string
		volume?: number
		volumeUnit?: string
		groundTemp?: number
		groundTempUnit?: string
		groundTypeDisplay?: string
		leakTypeDisplay?: string
		shapeHoleDisplay?: string
		holeDiameter?: number
	}
}

const DetailCard: React.FC<Props> = ({ data }) => {
	return (
		<div className="d-flex flex-column mx-5 mt-5 mb-5" style={{ gap: '8px' }}>
			<>
				<h2 className="mb-2">แหล่งกำเนิด</h2>
				<div className="row">
					<div className="col-4">ประเภท</div>
					<div className="col-8">Tank</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-4">เส้นผ่าศูนย์กลาง</div>
					<div className="col-8">
						{data.diameter} {data.diameterUnit}
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-4">ความยาว/ความสูง</div>
					<div className="col-8">
						{data.length} {data.lengthUnit}
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-4">ปริมาณการจัดเก็บสูงสุด</div>
					<div className="col-8">
						{data.maxVolume} {data.maxVolumeUnit}
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-4">สถานสาร</div>
					<div className="col-8">{data.chemicalState}</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-4">ปริมาณการจัดเก็บ</div>
					<div className="col-8">
						{data.volume} {data.volumeUnit}
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-4">อุณหภูมิภายใน</div>
					<div className="col-8">
						{data.groundTemp} {data.groundTempUnit}
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-4">ลักษณะพื้น</div>
					<div className="col-8">{data.groundTypeDisplay}</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-4">ลักษณะการรั่วไหล</div>
					<div className="col-8">{data.leakTypeDisplay}</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-4">รอยรั่ว</div>
					<div className="col-8">{data.leakTypeDisplay}</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-4">ขนาดรอยรั่ว</div>
					<div className="col-8">{data.holeDiameter}</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-4">ปริมาณการรั่วไหล</div>
					<div className="col-8">...</div>
				</div>
			</>
		</div>
	)
}

export default DetailCard
