import React from 'react'
import moment from 'moment'
import 'moment-timezone'

interface Props {
	data: {
		date: string
		title: string
	}[]
}

const EventListItem: React.FC<Props> = ({ data }) => {
	return (
		<React.Fragment>
			<div className="d-flex flex-column" style={{ gap: '8px' }}>
				{data.map((d, idx) => (
					<div key={idx}>
						{moment(d.date).tz('Asia/Bangkok').format('HH:mm:ss | DD/MM/YYYY')} - {d.title}
					</div>
				))}
			</div>
		</React.Fragment>
	)
}

export default EventListItem
