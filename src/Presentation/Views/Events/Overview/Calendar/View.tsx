import React from 'react'

// import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
// import Select, { components } from 'react-select'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'

import IncidentEvent from '@/Presentation/Components/FullCalendar/IncidentEvent'
import IncidentEventDetailPopup from '@/Presentation/Components/FullCalendar/IncidentEventDetailPopup'

import useViewModel from './ViewModel'
import clsx from 'clsx'

const EventListCalendarView: React.FC = () => {
	const {
		themeMode,
		calendarRef,
		data,
		dataTypeOptions,
		openDetail,
		selectedIncident,
		onClick,
		onCloseDetail,
		currentMonth,
		nextMonth,
		prevMonth,
		goToToday,
		changeView,
		// filter,
		// displayFilter,
		// searchText,
		// setSearchText,
		// onAddFilter,
		// onRemoveFilter,
		// onCreateEvent,
	} = useViewModel()

	return (
		<React.Fragment>
			<IncidentEventDetailPopup open={openDetail} onClose={onCloseDetail} {...selectedIncident} />

			<div className="row gy-5">
				<div className="col-12">
					<div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">
						<div>
							<div
								className={clsx('fs-2 fw-bolder', {
									'text-zeroloss-grey-900': themeMode === 'light',
									'text-zeroloss-base-white': themeMode === 'dark',
								})}>
								ปฏิทินเหตุการณ์
							</div>
							<p
								className={clsx('fs-6', {
									'text-zeroloss-base-white': themeMode === 'dark',
									'text-zeroloss-grey-600': themeMode === 'light',
								})}>
								Keep track of vendors and their security ratings.
							</p>
						</div>

						{/* <div
							className="w-100 w-lg-auto d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-end mb-1"
							style={{ gap: '12px' }}>
							<button
								className="btn btn-sm btn-zeroloss-primary text-zeroloss-base-white fw-bold w-100 w-lg-auto"
								onClick={onCreateEvent}
								style={{ height: isMobile ? 40 : 44 }}>
								<img
									className="me-1"
									src="/media/icons/zeroloss/white-plus.svg"
									alt="White Plus Icon"
								/>
								<span>สร้างเหตุการณ์</span>
							</button>

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
											zIndex: 1000,
											backgroundColor: themeMode === 'dark' ? '#15171c' : '#FFFFFF',
											color: themeMode === 'dark' ? '#FFFFFF' : '#000000',
										}),
										input: styles => ({
											...styles,
											color: themeMode === 'dark' ? '#FFFFFF' : '#000000',
										}),
									}}
									options={dataTypeOptions}
									value={dataTypeOptions.find(option => option.value === filter.type) ?? null}
									onChange={option => onAddFilter('type', option?.value)}
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
						</div> */}
					</div>
				</div>

				<div className="col-12">
					<div className="card">
						{/* <div className="card-header">
							<div className="card-title fw-bold w-100 w-lg-auto flex-column flex-lg-row align-items-lg-center">
								<div className="d-none d-lg-block">ตัวกรอง:</div>
								{(displayFilter?.search ?? []).length + (displayFilter?.type ?? []).length === 0 ? (
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
													key={'filter-search' + index}
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
													key={'filter-type' + index}
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
								)}
							</div>
						</div> */}

						<div className="card-body p-0">
							<div className="card">
								<div className="card-header px-4 px-9">
									<div
										className="card-title flex-column flex-lg-row w-100 w-lg-auto align-items-center"
										style={{ gap: '12px' }}>
										<div className="d-flex flex-row align-items-center justify-content-between w-100 w-lg-auto">
											<button className="btn btn-sm white-button me-4" onClick={prevMonth}>
												<i className="bi bi-arrow-left fs-2"></i>
											</button>
											<h2 className="fs-2 fw-bold">{currentMonth}</h2>
											<button className="btn btn-sm white-button ms-4" onClick={nextMonth}>
												<i className="bi bi-arrow-right fs-2"></i>
											</button>
										</div>
										<button
											className="btn btn-sm btn-zeroloss-primary text-zeroloss-base-white fw-bold fs-5 w-100 w-lg-auto"
											onClick={goToToday}>
											<i className="bi bi-flag-fill text-zeroloss-base-white d-inline-block"></i>
											<span>Today</span>
										</button>
										<div className="zeroloss-button-group w-fit-content shadow">
											<button
												className={clsx('btn btn-sm left cursor-pointer', {
													'white-button': themeMode === 'light',
													'btn-zeroloss-base-grey-carbon border-zeroloss-base-white border-1px':
														themeMode === 'dark',
													active: calendarRef?.current?.getApi().view.type === 'dayGridMonth',
												})}
												onClick={() => changeView('dayGridMonth')}>
												{/* {calendarRef?.current.getApi().view.type === 'dayGridMonth' && (
										<span className="d-inline-block bg-zeroloss-success-500 p-1 rounded-circle w-2px h-2px me-2" />
									)}
									Month */}
												<img
													src="/media/icons/zeroloss/table.svg"
													width={24}
													alt="Main Dashboard Calendar Month View Icon"
												/>
											</button>
											<button
												className={clsx('btn btn-sm right cursor-pointer', {
													'white-button': themeMode === 'light',
													'btn-zeroloss-base-grey-carbon border-zeroloss-base-white border-1px':
														themeMode === 'dark',
													active: calendarRef?.current?.getApi().view.type === 'dayGridWeek',
												})}
												onClick={() => changeView('dayGridWeek')}>
												{/* {calendarRef?.current.getApi().view.type === 'dayGridWeek' && (
										<span className="d-inline-block bg-zeroloss-success-500 p-1 rounded-circle w-2px h-2px me-2" />
									)}
									Week */}
												<img
													src="/media/icons/zeroloss/list.svg"
													width={24}
													alt="Main Dashboard Calendar Week View Icon"
												/>
											</button>
										</div>
									</div>
									<div className="card-toolbar w-100 w-md-auto my-5 my-xxl-0">
										<div
											className="mx-auto d-flex flex-column flex-sm-row align-items-sm-center justify-content-center justify-content-md-between h-100"
											style={{ gap: '24px' }}>
											{dataTypeOptions.map(option => (
												<div className="fs-6">
													<span
														className={clsx('me-2 bullet bullet-dot h-10px w-10px', {
															'bg-zeroloss-error': option.value === 1,
															'bg-zeroloss-warning': option.value === 2,
															'bg-zeroloss-success': option.value === 3,
															'bg-zeroloss-primary': option.value === 4,
															'bg-zeroloss-brand-600': option.value === 5,
															'bg-zeroloss-primary-400': option.value === 6,
														})}></span>
													{option.label}
												</div>
											))}

											{/* <div className="fs-6">
							<span
								className={'me-2 bullet bullet-dot h-10px w-10px bg-zeroloss-warning'}></span>
							เหตุการณ์อื่นๆ
						</div>
						<div className="fs-6">
							<span
								className={'me-2 bullet bullet-dot h-10px w-10px bg-zeroloss-error'}></span>
							กิจกรรมซ่อมบำรุง
						</div>
						<div className="fs-6">
							<span
								className={'me-2 bullet bullet-dot h-10px w-10px bg-zeroloss-success'}></span>
							กิจกรรมซ่อมบำรุง
						</div> */}
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									{/* {data.length > 0 && ( */}
									<FullCalendar
										viewClassNames={'main-dashboard-calendar'}
										ref={calendarRef}
										plugins={[
											dayGridPlugin,
											timeGridPlugin,
											interactionPlugin,
											// scrollGridPlugin,
											momentTimezonePlugin,
										]}
										initialView="dayGridMonth"
										initialEvents={[]}
										events={data}
										eventColor="transparent"
										eventContent={function (arg) {
											return (
												<IncidentEvent
													{...arg}
													eventSubTypeTitle={arg.event.extendedProps.eventSubTypeTitle}
													type={arg.event.extendedProps.type}
													title={arg.event.extendedProps.title}
													detail={arg.event.extendedProps.detail}
													img={arg.event.extendedProps.img}
													onClick={onClick}
												/>
											)
										}}
										headerToolbar={false}
									/>
									{/* )} */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<style>{`
				#kt_wrapper > div.row.g-5.gy-10.px-10.pb-10 > div.col-12.mt-lg-20 > div > div.fc-header-toolbar.fc-toolbar.fc-toolbar-ltr > div:nth-child(1) {
					width: max-content !important;
					display: flex;
					flex-direction: row;
					align-items: center;
				} 
			`}</style>
		</React.Fragment>
	)
}

export default EventListCalendarView
