import React from 'react'
import { ClientSideTable } from '@/Presentation/Components/Table'
import useViewModel from './ViewModel'
import moment from 'moment'
import 'moment/locale/th'

interface Props {
	data: any
	onClose: () => void
}

const MeasurementTable: React.FC<Props> = ({ data, onClose }) => {
	const { tableRef, TABLE_CONFIGS } = useViewModel({ onClose })

	return (
		<React.Fragment>
			<div
				ref={tableRef}
				className="card position-absolute overflow-scroll h-500px"
				style={{
					height: '40%',
					width: '35%',
					top: '15%',
					left: '1%',
					zIndex: 1000,
				}}>
				<div className="card-body px-0">
					<div className="px-5 mb-2">
						<div className="fs-5 fw-bold text-zeroloss-grey-900 mb-1">
							สถานี : <span className="text-zeroloss-700">{data?.title}</span>
						</div>
						<div className="fs-5 fw-bold text-zeroloss-grey-900">
							ข้อมูลล่าสุด :{' '}
							<span className="text-zeroloss-700">
								{moment().locale('th').format('DD/MM/YYYY HH:mm')}
							</span>
						</div>
					</div>

					<ClientSideTable
						data={data?.parameters ?? []}
						columns={TABLE_CONFIGS}
						items_per_page={9999}
					/>
				</div>
			</div>
		</React.Fragment>
	)
}

export default MeasurementTable
