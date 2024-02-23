import React from 'react'
import { translateSensorColor } from '@/Utils/translateSensorColor'

interface Props {
	isDark: boolean
	gd31?: 'success' | 'warning' | 'danger' | 'default'
	gd32?: 'success' | 'warning' | 'danger' | 'default'
	gd33?: 'success' | 'warning' | 'danger' | 'default'
	gd34?: 'success' | 'warning' | 'danger' | 'default'
	gd35?: 'success' | 'warning' | 'danger' | 'default'
	gd36?: 'success' | 'warning' | 'danger' | 'default'
	gd37?: 'success' | 'warning' | 'danger' | 'default'
	gd38?: 'success' | 'warning' | 'danger' | 'default'
}

const Station3: React.FC<Props> = ({
	isDark,
	gd31 = 'default',
	gd32 = 'default',
	gd33 = 'default',
	gd34 = 'default',
	gd35 = 'default',
	gd36 = 'default',
	gd37 = 'default',
	gd38 = 'default',
}) => {
	const bulidingSrc = isDark ? '/media/maps/building-3.png' : '/media/maps/building-3.png'

	return (
		<React.Fragment>
			<div className="position-relative">
				<img src={bulidingSrc} alt="Chlorine Station 3" />

				<React.Fragment key="first-row">
					{/* GD 3-8 */}
					<div
						id="gd38"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '21%', left: '32.8%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd38)}-time.svg`}
							alt="GD 3-8 Sensor"
							width={50}
							height={50}
						/>
					</div>

					{/* GD 3-7 */}
					<div
						id="gd37"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '21%', left: '56.5%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd37)}-time.svg`}
							alt="GD 3-7 Sensor"
							width={50}
							height={50}
						/>
					</div>

					{/* GD 3-6 */}
					<div
						id="gd36"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '21%', left: '88%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd36)}-time.svg`}
							alt="GD 3-6 Sensor"
							width={50}
							height={50}
						/>
					</div>

					{/* GD 3-5 */}
					<div
						id="gd35"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '21%', left: '92%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd35)}-time.svg`}
							alt="GD 3-5 Sensor"
							width={50}
							height={50}
						/>
					</div>
				</React.Fragment>

				<React.Fragment key="second-row">
					{/* GD 3-1 */}
					<div
						id="gd31"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '63.5%', left: '45%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd31)}-time.svg`}
							alt="GD 3-1 Sensor"
							width={50}
							height={50}
						/>
					</div>

					{/* GD 3-2 */}
					<div
						id="gd32"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '63.5%', left: '50.5%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd32)}-time.svg`}
							alt="GD 3-2 Sensor"
							width={50}
							height={50}
						/>
					</div>

					{/* GD 3-3 */}
					<div
						id="gd33"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '63.5%', left: '77.5%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd33)}-time.svg`}
							alt="GD 3-3 Sensor"
							width={50}
							height={50}
						/>
					</div>

					{/* GD 3-4 */}
					<div
						id="gd34"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '63.5%', left: '92%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd34)}-time.svg`}
							alt="GD 3-4 Sensor"
							width={50}
							height={50}
						/>
					</div>
				</React.Fragment>
			</div>
		</React.Fragment>
	)
}

export default Station3
