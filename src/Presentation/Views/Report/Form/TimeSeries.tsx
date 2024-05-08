import React from 'react'
import { PageTitle } from '@/_metronic/layout/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import clsx from 'clsx'

import useViewModel from './ViewModel'
import FormHeader from '../Component/FormHeader'

const TimeSeries: React.FC = () => {
	const { timeStr, themeMode } = useViewModel()

	const handleSubmit = values => {
		console.log(values)
	}

	return (
		<React.Fragment>
			<PageTitle
				description={
					<React.Fragment>
						<i
							className={clsx('bi bi-calendar3 me-3 fs-4 text-zeroloss-base-white', {
								'text-zeroloss-base-white': themeMode === 'dark',
								'text-zeroloss-base-grey-carbon': themeMode === 'light',
							})}
						/>
						{timeStr}
					</React.Fragment>
				}
				aditionalDescription="สามารถกรอกฟอร์มของคุณได้ที่นี่">
				ระบบออกรายงาน
			</PageTitle>

			<div className="row g-5 gy-10 px-10 pb-10 pt-10">
				<div className="col-12 mt-20 mt-lg-0">
					<FormHeader pagetitle="Time Series Report" />
				</div>

				<div className="row px-10">
					<Formik
						initialValues={{
							average: '',
							baseData: '',
							averageValue: '',
							timeUnit: '',
							displayFormat: '',
							summary: [],
						}}
						onSubmit={handleSubmit}>
						{({ values, setFieldValue }) => (
							<Form>
								<div className="col-12">
									<div className="form-group row">
										<label className=" col-2">เลือกค่าเฉลี่ย</label>
										<div className="col-10">
											<div>
												<label>
													<Field type="radio" name="average" value="minute" />
													รายนาที
												</label>
											</div>
											<div>
												<label>
													<Field type="radio" name="average" value="hour" />
													รายชั่วโมง
												</label>
											</div>
											<div>
												<label>
													<Field type="radio" name="average" value="day" />
													รายวัน
												</label>
											</div>
											<div className="row">
												<div className="col-2">
													<label>
														<Field type="radio" name="average" value="custom" />
														กำหนดเอง
													</label>
												</div>

												<div className="col-10">
													{values.average === 'custom' && (
														<React.Fragment>
															<div className="row">
																<div className="col-4">
																	<div className="form-group">
																		<label>ข้อมูลฐาน</label>
																		<Field as="select" name="baseData" className="form-control">
																			<option value="">Select an option</option>
																			<option value="60">60 นาที</option>
																			<option value="30">30 นาที</option>
																		</Field>
																	</div>
																</div>
																<div className="col-4">
																	<div className="form-group">
																		<label>ค่าเฉลี่ย</label>
																		<Field
																			type="text"
																			name="averageValue"
																			className="form-control"
																		/>
																	</div>
																</div>
																<div className="col-4">
																	<div className="form-group">
																		<label>หน่วยเวลา</label>
																		<Field as="select" name="timeUnit" className="form-control">
																			<option value="minute">นาที</option>
																			<option value="hour">ชั่วโมง</option>
																		</Field>
																	</div>
																</div>
															</div>
														</React.Fragment>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="col-12">
									<div className="form-group row pt-5">
										<label className="col-2">รูปแบบการแสดงผล</label>
										<div className="col-10">
											<div>
												<label>
													<Field type="radio" name="displayFormat" value="line" />
													กราฟเส้น
												</label>
											</div>
											<div>
												<label>
													<Field type="radio" name="displayFormat" value="bar" />
													กราฟแท่ง
												</label>
											</div>
											<div>
												<label>
													<Field type="radio" name="displayFormat" value="table" />
													ตารางข้อมูล
												</label>
											</div>
										</div>
									</div>
								</div>

								<div className="col-12">
									<div className="form-group row pt-5">
										<label className="col-2">คำนวณสรุปผล</label>
										<div className="col-10">
											<div>
												<label>
													<Field type="checkbox" name="summary" value="low" />
													ค่าต่ำ
												</label>
											</div>
											<div>
												<label>
													<Field type="checkbox" name="summary" value="high" />
													ค่าสูง
												</label>
											</div>
											<div>
												<label>
													<Field type="checkbox" name="summary" value="average" />
													ค่าเฉลี่ย
												</label>
											</div>
											<div>
												<label>
													<Field type="checkbox" name="summary" value="count" />
													สรุปจำนวนข้อมูล
												</label>
											</div>
											<div>
												<label>
													<Field type="checkbox" name="summary" value="percentage" />
													สรุปเปอร์เซ็นข้อมูล
												</label>
											</div>
										</div>
									</div>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</React.Fragment>
	)
}

export default TimeSeries
