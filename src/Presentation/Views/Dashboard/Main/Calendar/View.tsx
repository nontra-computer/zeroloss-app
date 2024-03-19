import React from 'react'

import FormGenerator from '@/Presentation/Components/Form/FormGenerator'
import Select from 'react-select'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
// import scrollGridPlugin from '@fullcalendar/scrollgrid'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'

import IncidentEvent from '@/Presentation/Components/FullCalendar/IncidentEvent'
import IncidentEventDetailPopup from '@/Presentation/Components/FullCalendar/IncidentEventDetailPopup'

import useViewModel from './ViewModel'
import clsx from 'clsx'

const MainDashboardCalendarView: React.FC = () => {
	const {
		themeMode,
		calendarRef,
		data,
		openDetail,
		selectedIncident,
		onClick,
		onCloseDetail,
		currentMonth,
		nextMonth,
		prevMonth,
		goToToday,
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

						<div
							className="w-100 w-lg-auto d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between"
							style={{ gap: '12px' }}>
							<FormGenerator
								formKey="search"
								inputType="plain"
								containerClassName="w-100 w-lg-400px d-inline-block"
								additionalClassName="shadow-sm"
								placeholder="พิมพ์ค้นหาที่นี่"
								label="ค้นหาเหตุการณ์"
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

				<div className="col-12">
					<div className="card">
						<div className="card-header px-4 px-10">
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
							</div>
							<div className="card-toolbar w-100 w-md-auto my-5 my-xxl-0">
								<div
									className="mx-auto d-flex flex-column flex-sm-row align-items-sm-center justify-content-center justify-content-md-between h-100"
									style={{ gap: '24px' }}>
									<div className="fs-6">
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
									</div>
								</div>
							</div>
						</div>
						<div className="card-body p-0">
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
								initialEvents={data}
								eventColor="transparent"
								eventContent={function (arg) {
									return (
										<IncidentEvent
											{...arg}
											type={arg.event.extendedProps.type}
											name={arg.event.title}
											description={arg.event.extendedProps.description}
											img={arg.event.extendedProps.img}
											onClick={onClick}
										/>
									)
								}}
								headerToolbar={false}
							/>
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

export default MainDashboardCalendarView
