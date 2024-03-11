import React from 'react'
import { translateSensorColor } from '@/Utils/translateSensorColor'

interface Props {
	isDark: boolean
	gd21?: 'success' | 'warning' | 'danger' | 'default'
	gd22?: 'success' | 'warning' | 'danger' | 'default'
	gd23?: 'success' | 'warning' | 'danger' | 'default'
	gd24?: 'success' | 'warning' | 'danger' | 'default'
	gd25?: 'success' | 'warning' | 'danger' | 'default'
	gd26?: 'success' | 'warning' | 'danger' | 'default'
	gd27?: 'success' | 'warning' | 'danger' | 'default'
	gd28?: 'success' | 'warning' | 'danger' | 'default'
}

const Station2: React.FC<Props> = ({
	isDark,
	gd21 = 'default',
	gd22 = 'default',
	gd23 = 'default',
	gd24 = 'default',
	gd25 = 'default',
	gd26 = 'default',
	gd27 = 'default',
	gd28 = 'default',
}) => {
	const buildingSrc = isDark ? '/media/maps/dark-building-2.png' : '/media/maps/building-2.png'

	return (
		<React.Fragment>
			<div className="position-relative w-100">
				<img src={buildingSrc} alt="Chlorine Station 2" />

				<React.Fragment key="first-row">
					{/* GD 2-4 */}
					<div
						id="gd24"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '20.2%', left: '11.5%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd24)}-time.svg`}
							alt="GD 2-4 Sensor"
							width={50}
							height={50}
						/>
					</div>

					{/* GD 2-5 */}
					<div
						id="gd25"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '20.2%', left: '26.5%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd25)}-time.svg`}
							alt="GD 2-5 Sensor"
							width={50}
							height={50}
						/>
					</div>

					{/* GD 2-6 */}
					<div
						id="gd26"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '20.2%', left: '52.5%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd26)}-time.svg`}
							alt="GD 2-6 Sensor"
							width={50}
							height={50}
						/>
					</div>

					{/* GD 2-7 */}
					<div
						id="gd27"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '20.2%', left: '70.5%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd27)}-time.svg`}
							alt="GD 2-7 Sensor"
							width={50}
							height={50}
						/>
					</div>
				</React.Fragment>

				<React.Fragment key="second-row">
					{/* GD 2-8 */}
					<div
						id="gd28"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '40%', left: '54.5%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd28)}-time.svg`}
							alt="GD 2-8 Sensor"
							width={50}
							height={50}
						/>
					</div>
				</React.Fragment>

				<React.Fragment key="third-row">
					{/* GD 2-3 */}
					<div
						id="gd23"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '64.3%', left: '11%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd23)}-time.svg`}
							alt="GD 2-3 Sensor"
							width={50}
							height={50}
						/>
					</div>

					{/* GD 2-2 */}
					<div
						id="gd22"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '64.3%', left: '60%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd22)}-time.svg`}
							alt="GD 2-2 Sensor"
							width={50}
							height={50}
						/>
					</div>

					{/* GD 2-1 */}
					<div
						id="gd21"
						className="cursor-pointer position-absolute"
						style={{ zIndex: 100, top: '64.3%', left: '67.5%' }}>
						<img
							src={`/media/maps/${translateSensorColor(gd21)}-time.svg`}
							alt="GD 2-1 Sensor"
							width={50}
							height={50}
						/>
					</div>
				</React.Fragment>
			</div>
		</React.Fragment>
	)
}

export default Station2
