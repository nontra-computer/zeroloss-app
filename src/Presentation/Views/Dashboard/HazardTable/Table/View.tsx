import React from 'react'
import { ClientSideTable } from '@/Presentation/Components/Table'
// import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
// import Select, { components } from 'react-select'
import useViewModel from './ViewModel'
import clsx from 'clsx'

const HazardTable: React.FC = () => {
	const {
		themeMode,
		isLoading,
		// isMobile,
		// filter,

		// searchText,
		// setSearchText,
		// onAddFilter,
		// onRemoveFilter,
		data,

		TABLE_CONFIGS,
		LOADING_TABLE_CONFIGS,
	} = useViewModel()

	return (
		<React.Fragment>
			<div className="row gy-5 mx-5">
				{/* Header */}
				<div className="col-12">
					<div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">
						<div>
							<div
								className={clsx('fs-2 fw-bolder w-100', {
									'text-zeroloss-grey-900': themeMode === 'light',
									'text-zeroloss-base-white': themeMode === 'dark',
								})}>
								ตารางการคำนวณ
							</div>
							<p
								className={clsx('fs-6', {
									'text-zeroloss-base-white': themeMode === 'dark',
									'text-zeroloss-grey-600': themeMode === 'light',
								})}>
								Keep track of vendors and their security ratings.
							</p>
						</div>

						{/* Start Filter */}
						{/* <div
							className="w-100 w-lg-auto d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between"
							style={{ gap: '12px' }}>
							<FormGenerator
								formKey="search"
								inputType="plain"
								containerClassName="w-100 w-lg-400px d-inline-block"
								additionalClassName="shadow-sm"
								placeholder="พิมพ์ค้นหาที่นี่"
								label="ค้นหาเหตุการณ์"
								value={searchText}
								onChange={e => setSearchText(e.target.value)}
								onPressEnter={() => {
									onAddFilter('search', searchText)
									setSearchText('')
								}}
							/>
							<div className="w-100 w-lg-auto">
								<label className="form-label">ประเภทเหตุการณ์</label>
								<Select
									placeholder="เลือกประเภทเหตุการณ์"
									noOptionsMessage={() => 'ไม่พบข้อมูล'}
									className="w-100 shadow-sm w-lg-200px"
									options={dataTypeOptions}
									value={dataTypeOptions.find(option => option.value === filter.type) ?? null}
									onChange={option => onAddFilter('type', option?.value)}
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
										SingleValue: props => (
											<components.SingleValue {...props} className="cursor-pointer">
												<span
													className={clsx('me-2 bullet bullet-dot h-6px w-6px', {
														'bg-zeroloss-error': props.data.value === 1,
														'bg-zeroloss-warning': props.data.value === 2,
														'bg-zeroloss-success': props.data.value === 3,
														'bg-zeroloss-primary': props.data.value === 4,
														'bg-zeroloss-brand-600': props.data.value === 5,
														'bg-zeroloss-primary-400': props.data.value === 6,
													})}></span>
												{props.data.label}
											</components.SingleValue>
										),
										Option: props => (
											<components.Option {...props} className="cursor-pointer">
												<span
													className={clsx('me-2 bullet bullet-dot h-6px w-6px', {
														'bg-zeroloss-error': props.data.value === 1,
														'bg-zeroloss-warning': props.data.value === 2,
														'bg-zeroloss-success': props.data.value === 3,
														'bg-zeroloss-primary': props.data.value === 4,
														'bg-zeroloss-brand-600': props.data.value === 5,
														'bg-zeroloss-primary-400': props.data.value === 6,
													})}></span>
												{props.data.label}
											</components.Option>
										),
									}}
								/>
							</div>
						</div>*/}
						{/* End Filter */}
					</div>
				</div>

				{/* Table */}
				<div className="col-12">
					<div className="card">
						<div className="card-header">
							<div className="card-title fw-bold w-100 w-lg-auto flex-column flex-lg-row align-items-lg-center">
								<div className="d-none d-lg-block">ตัวกรอง:</div>
								{/* {(displayFilter?.search ?? []).length + (displayFilter?.type ?? []).length === 0 ? (
									<span
										className={clsx('fw-normal', {
											'ms-3': !isMobile,
											'mt-3': isMobile,
										})}>
										<span className="d-inine-block d-lg-none">ตัวกรอง: </span> ไม่มีตัวกรอง
									</span>
								) : (
									<React.Fragment>
										<div
											className="d-flex flex-column flex-lg-row align-items-center w-100 w-lg-auto ms-3"
											style={{ gap: '12px' }}>
											{(displayFilter?.search ?? []).map((item: any, index: number) => (
												<div
													key={index}
													className={clsx(
														'btn btn-sm btn-light-danger text-zeroloss-error fw-bolder d-flex',
														{
															'w-100': isMobile,
															'flex-row justify-content-between': isMobile,
														}
													)}>
													<span>{item}</span>
													<button
														className="btn-close ms-2 text-zeroloss-error"
														onClick={() => onRemoveFilter('search', item)}
													/>
												</div>
											))}
											{(displayFilter?.type ?? []).map((item: any, index: number) => (
												<div
													key={index}
													className={clsx(
														'btn btn-sm btn-light-danger text-zeroloss-error fw-bolder d-flex',
														{
															'w-100': isMobile,
															'flex-row justify-content-between': isMobile,
														}
													)}>
													<span>{item?.name}</span>
													<button
														className="btn-close ms-2 text-zeroloss-error"
														onClick={() => onRemoveFilter('type', item?.id)}
													/>
												</div>
											))}
										</div>
									</React.Fragment>
								)} */}
							</div>
						</div>
						<div className="card-body p-0 pb-5">
							<ClientSideTable
								pagination
								columns={isLoading ? LOADING_TABLE_CONFIGS : TABLE_CONFIGS}
								data={data}
								items_per_page={10}
							/>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default HazardTable
