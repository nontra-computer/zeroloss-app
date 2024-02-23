import React from 'react'
import { translateSensorColor } from '@/Utils/translateSensorColor'

interface Props {
	isDark: boolean
	gd11?: 'success' | 'warning' | 'danger' | 'default'
	gd12?: 'success' | 'warning' | 'danger' | 'default'
	gd13?: 'success' | 'warning' | 'danger' | 'default'
	gd14?: 'success' | 'warning' | 'danger' | 'default'
	gd15?: 'success' | 'warning' | 'danger' | 'default'
	gd16?: 'success' | 'warning' | 'danger' | 'default'
	gd17?: 'success' | 'warning' | 'danger' | 'default'
	gd18?: 'success' | 'warning' | 'danger' | 'default'
}

const Station1: React.FC<Props> = ({
	isDark,
	gd11 = 'default',
	gd12 = 'default',
	gd13 = 'default',
	gd14 = 'default',
	gd15 = 'default',
	gd16 = 'default',
	gd17 = 'default',
	gd18 = 'default',
}) => {
	const buildingSrc = isDark ? '/media/maps/dark-building-1.png' : '/media/maps/dark-building-1.png'

	return (
		<React.Fragment>
			<div className="position-relative">
				<img src={buildingSrc} alt="Chlorine Station 1" />

				<React.Fragment key="first-row">
					{/* GD 1-5 */}
					<div
						id="gd15"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '8.5%', left: '16%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd15)}-time.svg`}
							alt="GD 1-5 Sensor"
							width={50}
							height={50}
						/>
					</div>

					{/* GD 1-6 */}
					<div
						id="gd16"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '8.5%', left: '33.17%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd16)}-time.svg`}
							alt="GD 1-6 Sensor"
							width={50}
							height={50}
						/>
					</div>

					{/* GD 1-7 */}
					<div
						id="gd17"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '10%', left: '91.4%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd17)}-time.svg`}
							alt="GD 1-7 Sensor"
							width={50}
							height={50}
						/>
					</div>
				</React.Fragment>

				<React.Fragment key="second-row">
					{/* GD 1-8 */}
					<div
						id="gd18"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '38.2%', left: '26.4%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd18)}-time.svg`}
							alt="GD 1-8 Sensor"
							width={50}
							height={50}
						/>
					</div>
				</React.Fragment>

				<React.Fragment key="thrid-row">
					{/* GD 1-4 */}
					<div
						id="gd14"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '72.7%', left: '16.7%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd14)}-time.svg`}
							alt="GD 1-4 Sensor"
							width={50}
							height={50}
						/>
					</div>

					{/* GD 1-3 */}
					<div
						id="gd13"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '72.7%', left: '38.2%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd13)}-time.svg`}
							alt="GD 1-3 Sensor"
							width={50}
							height={50}
						/>
					</div>

					{/* GD 1-2 */}
					<div
						id="gd12"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '72.7%', left: '68.5%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd12)}-time.svg`}
							alt="GD 1-2 Sensor"
							width={50}
							height={50}
						/>
					</div>

					{/* GD 1-1 */}
					<div
						id="gd11"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '72.7%', left: '89.6%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd11)}-time.svg`}
							alt="GD 1-1 Sensor"
							width={50}
							height={50}
						/>
					</div>
				</React.Fragment>
			</div>
		</React.Fragment>
	)
}

export default Station1
