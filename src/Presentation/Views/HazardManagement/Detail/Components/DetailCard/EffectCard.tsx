import React from 'react'

interface Props {}

const DetailCard: React.FC<Props> = () => {
	return (
		<div className="d-flex flex-column mx-5 mt-5 mb-5" style={{ gap: '8px' }}>
			<>
				<h2 className="mb-2">ผลกระทบ</h2>
				<div className="row">
					<div className="col-4">Red zone</div>
					<div className="col-8">
						โรงเรียน : 2 <br />
						สถานพยาบาล : 3
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-4">Orange zone</div>
					<div className="col-8">
						โรงเรียน : 2 <br />
						สถานพยาบาล : 3
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-4">Yellow zone</div>
					<div className="col-8">
						โรงเรียน : 2 <br />
						สถานพยาบาล : 3
					</div>
				</div>
			</>
		</div>
	)
}

export default DetailCard
