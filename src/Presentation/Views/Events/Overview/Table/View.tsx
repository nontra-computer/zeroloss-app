import React from 'react'

import { ClientSideTable } from '@/Presentation/Components/Table'
// import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
// import Select, { components } from 'react-select'

import useViewModel from './ViewModel'
import clsx from 'clsx'

const EventListTableView: React.FC = () => {
	const {
		themeMode,
		isLoading,
		// isMobile,
		// displayFilter,
		// searchText,
		// selectedEventTypeId,
		// setSearchText,
		// setSelectedEventTypeId,
		// onClearFilter,
		onCreateEvent,
		// onRemoveFilter,
		data,
		// dataTypeOptions,
		TABLE_CONFIGS,
		LOADING_TABLE_CONFIGS,
	} = useViewModel()

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

						<div>
							<button
								className="btn btn-sm btn-zeroloss-primary text-zeroloss-base-white fw-bold w-100 w-lg-auto"
								onClick={onCreateEvent}>
								<img
									className="me-1"
									src="/media/icons/zeroloss/white-plus.svg"
									alt="White Plus Icon"
								/>
								<span>สร้างเหตุการณ์</span>
							</button>
						</div>
					</div>
				</div>

				<div className="col-12">
					<div className="card">
						{/* <div className="card-header border-b-0">
							<div className="card-title fw-bold w-100 w-lg-auto flex-column flex-lg-row align-items-lg-center justify-content-lg-end">
								<div
									className="w-100 w-lg-auto d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center"
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
									/>
									<div className="w-100 w-lg-auto">
										<label className="form-label">ประเภทเหตุการณ์</label>
										<Select
											placeholder="เลือกประเภทเหตุการณ์"
											noOptionsMessage={() => 'ไม่พบข้อมูล'}
											className="w-100 shadow-sm w-lg-200px"
											options={dataTypeOptions}
											value={
												dataTypeOptions.find(option => option.value === selectedEventTypeId) ?? null
											}
											onChange={option => setSelectedEventTypeId(option?.value)}
											styles={{
												container: styles => ({
													...styles,
													height: '44px',
													marginTop: '-2px',
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
													<components.SingleValue
														{...props}
														className="cursor-pointer fs-7 fw-normal">
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
													<components.Option {...props} className="cursor-pointer fs-7 fw-normal">
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
												Placeholder: props => (
													<components.Placeholder
														{...props}
														className="cursor-pointer fs-7 fw-normal">
														เลือกประเภทเหตุการณ์
													</components.Placeholder>
												),
												NoOptionsMessage: props => (
													<components.NoOptionsMessage
														{...props}
														className="cursor-pointer fs-7 fw-normal">
														ไม่พบข้อมูล
													</components.NoOptionsMessage>
												),
											}}
										/>
									</div>
								</div>
							</div>

							<div className="card-toolbar">
								<button
									className="btn btn-sm white-button text-zeroloss-grey-900"
									onClick={onClearFilter}>
									Clear All
								</button>
							</div>
						</div> */}

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

export default EventListTableView
