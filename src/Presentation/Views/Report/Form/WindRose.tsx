import React from 'react'
import { PageTitle } from '@/_metronic/layout/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import clsx from 'clsx'

import useViewModel from './ViewModel'
import FormHeader from '../Component/FormHeader'

const WindRose: React.FC = () => {
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
					<FormHeader pagetitle={'Windrose Report'} />
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
								<div className="row g-5 gy-10 px-2">
									<div className="row">
										<div className="col-12">
											<div className="form-group col-6">
												<label htmlFor="Industries">Wind Speed</label>
												<Field
													as="select"
													id="Industries"
													name="Industries"
													className="form-control">
													<option value="Default">โปรดเลือก</option>
													<option value="option2">Option 2</option>
													<option value="option3">Option 3</option>
												</Field>
												<ErrorMessage name="Industries" component="div" className="error-message" />
											</div>
											<br />
											<div className="form-group col-6">
												<label htmlFor="Company">Wind Direction</label>
												<Field as="select" id="Company" name="Company" className="form-control">
													<option value="Default">โปรดเลือก</option>
													<option value="option2">ซ้าย</option>
													<option value="option3">ขวา</option>
													{/* Add more options */}
												</Field>
												<ErrorMessage name="Company" component="div" className="error-message" />
											</div>
											<br />

											<div className="form-group col-6">
												<label htmlFor="IndicatorStation">Calm</label>
												<Field
													type="text"
													id="activity"
													name="activity"
													className="form-control"
													placeholder="Enter your value"
												/>
												<ErrorMessage
													name="IndicatorStation"
													component="div"
													className="error-message"
												/>
											</div>
											<br />
											<div className="form-group col-6">
												<label htmlFor="Activity">Sector</label>
												<Field
													type="text"
													id="activity"
													name="activity"
													className="form-control"
													placeholder="Enter your value"
												/>
												<ErrorMessage name="Activity" component="div" className="error-message" />
												<br />
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

export default WindRose
