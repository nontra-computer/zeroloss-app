import React from 'react'
import { ClientSideTable } from '@/Presentation/Components/Table'
import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
import Select from 'react-select'
import useViewModel from './ViewModel'
import clsx from 'clsx'

const MainDashboardTableView: React.FC = () => {
	const { themeMode, data, TABLE_CONFIGS } = useViewModel()

	return (
		<React.Fragment>
			<div className="row gy-5">
				{/* Header */}
				<div className="col-12">
					<div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">
						<div>
							<div
								className={clsx('fs-2 fw-bolder w-100', {
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

						<div className="w-100 w-lg-auto d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between" style={{ gap: '12px' }}>
							<FormGenerator
								formKey="search"
								inputType="plain"
								containerClassName="w-100 w-lg-400px d-inline-block"
								additionalClassName="shadow-sm"
								placeholder="พิมพ์ค้นหาที่นี่"
								label="ค้นหาเหตุการณ์"
							/>
							<div className='w-100 w-lg-auto'>
								<label className="form-label">ประเภทเหตุการณ์</label>
								<Select
									placeholder="เลือกประเภทเหตุการณ์"
									noOptionsMessage={() => 'ไม่พบข้อมูล'}
									className="w-100 shadow-sm w-lg-200px"
									styles={{
										container: styles => ({
											...styles,
											height: '44px',
										}),
										control: styles => ({
											...styles,
											height: '44px',
											borderColor: themeMode === 'dark' ? '#363843' : '#dbdfe9',
											backgroundColor: themeMode === 'dark' ? '#15171c' : '#FFFFFF',
											color: themeMode === 'dark' ? '#FFFFFF' : '#000000',
										}),
										menu: styles => ({
											...styles,
											backgroundColor: themeMode === 'dark' ? '#15171c' : '#FFFFFF',
											color: themeMode === 'dark' ? '#FFFFFF' : '#000000',
										}),
										input: styles => ({
											...styles,
											color: themeMode === 'dark' ? '#FFFFFF' : '#000000',
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
					<div className="card">
						<div className="card-header">
							<div className="card-title fw-bold">
								Current Filter:
								<span className="ms-3 fw-normal">None</span>
							</div>
						</div>
						<div className="card-body p-0 pb-5">
							<ClientSideTable pagination columns={TABLE_CONFIGS} data={data} items_per_page={10} />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default MainDashboardTableView
