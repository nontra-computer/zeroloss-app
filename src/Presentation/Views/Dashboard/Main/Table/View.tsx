import React from 'react'
import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
import Select from 'react-select'
import useViewModel from './ViewModel'
import clsx from 'clsx'

const MainDashboardTableView: React.FC = () => {
	const { themeMode } = useViewModel()

	return (
		<React.Fragment>
			<div className="row gy-5">
				{/* Header */}
				<div className="col-12">
					<div className="d-flex flex-row justify-content-between align-items-center">
						<div>
							<div
								className={clsx('fs-2 fw-bolder', {
									'text-zeroloss-grey-900': themeMode === 'light',
									'text-zeroloss-base-white': themeMode === 'dark',
								})}>
								ตารางเหตุการณ์
							</div>
							<p
								className={clsx('fs-6', {
									'text-zeroloss-base-white': themeMode === 'dark',
									'text-zeroloss-grey-600': themeMode === 'light',
								})}>
								Keep track of vendors and their security ratings.
							</p>
						</div>

						<div className="d-flex flex-row justify-content-between" style={{ gap: '12px' }}>
							<FormGenerator
								formKey="search"
								inputType="plain"
								containerClassName="w-400px d-inline-block"
								additionalClassName="shadow-sm"
								placeholder="Search"
								label="ค้นหาเหตุการณ์"
							/>
							<div>
								<label className="form-label">ประเภทเหตุการณ์</label>
								<Select
									placeholder=""
									className="shadow-sm"
									styles={{
										container: styles => ({
											...styles,
											width: '200px',
											height: '44px',
										}),
										control: styles => ({
											...styles,
											height: '44px',
											borderColor: '#dbdfe9',
										}),
									}}
									components={{
										IndicatorSeparator: () => null,
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Table */}
				<div className="col-12">
					<div className="card h-500px"></div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default MainDashboardTableView
