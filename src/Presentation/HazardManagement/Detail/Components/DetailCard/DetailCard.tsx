import React from 'react'

interface Detail {
	title: string
	content: string
}

interface CardData {
	title: string
	detail: Detail[]
}

interface Props {
	data: CardData
}

const DetailCard: React.FC<Props> = ({ data }) => {
	return (
		<div className="d-flex flex-column mx-5 mt-5" style={{ gap: '8px' }}>
			<h2 className="mb-2">{data.title}</h2>
			{data.detail.map((item, index) => (
				<div key={index}>
					<div className="row">
						<div className="col-4">{item.title}</div>
						<div className="col-8">{item.content}</div>
					</div>
					<hr />
				</div>
			))}
		</div>
	)
}

export default DetailCard
