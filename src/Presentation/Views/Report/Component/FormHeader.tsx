import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import FormDropdownComponent from './Dropdown'

const validationSchema = Yup.object().shape({
	Industries: Yup.string().required('นิคมอุตสาหกรรม is required'),
	Company: Yup.string().required('โรงงาน is required'),
	IndicatorStation: Yup.string().required('สถานีตรวจวัด is required'),
	Activity: Yup.string().required('เลือกช่วงเวลากิจกรรม is required'),
})

const initialValues = {
	Industries: '',
	Company: '',
	IndicatorStation: '',
	Activity: '',
	ActivityDateTime: '',
}

const FormHeader = ({ pagetitle }) => {
	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema}>
			{({ touched, errors }) => (
				<Form>
					<div className="row g-5 gy-10 px-10 pb-10 pt-10">
						<div className="col-6">
							<h1>{pagetitle}</h1>
						</div>
						<div className="col-6 align-right">
							<FormDropdownComponent />
						</div>
						<div className="row">
							<div className="col-12">
								{/* <div className="form-group col-6">
									<label htmlFor="Industries">นิคมอุตสาหกรรม</label>
									<Field as="select" id="Industries" name="Industries" className="form-control">
										<option value="">Select an option</option>
										<option value="option1">Option 1</option>
										<option value="option2">Option 2</option>
										<option value="option3">Option 3</option>
									</Field>
									<ErrorMessage name="Industries" component="div" className="error-message" />
								</div>
								<br />
								<div className="form-group col-6">
									<label htmlFor="Company">โรงงาน</label>
									<Field as="select" id="Company" name="Company" className="form-control">
										<option value="">Select an option</option>
										<option value="Default">โปรดเลือก</option>
										<option value="option2">นอกเขตนิคมอุตสาหกรรม</option>
										<option value="option3">นิคมอุตสาหกรรมมาบตาพุด</option>
									</Field>
									<ErrorMessage name="Company" component="div" className="error-message" />
								</div>
								<br /> */}

								<div className="form-group col-6">
									<label htmlFor="IndicatorStation">สถานีตรวจวัด</label>
									<Field
										as="select"
										id="IndicatorStation"
										name="IndicatorStation"
										className="form-control">
										<option value="option1">โรงจ่ายคลอรีน 1</option>
										<option value="option2">โรงจ่ายคลอรีน 2</option>
										<option value="option3">โรงจ่ายคลอรีน 3</option>
									</Field>
									<ErrorMessage name="IndicatorStation" component="div" className="error-message" />
								</div>
								<br />
								<div className="row">
									<div className="form-group col-6">
										<label htmlFor="Activity">เลือกช่วงเวลากิจกรรม</label>
										<Field as="select" id="Activity" name="Activity" className="form-control">
											<option value="Daily">รายวัน</option>
											<option value="Weekly">รายสัปดาห์</option>
											<option value="Monthly">รายเดือน</option>
											<option value="Annually">รายปี</option>
											<option value="SetTime">กำหนดเวลา</option>
										</Field>
										<ErrorMessage name="Activity" component="div" className="error-message" />
										<br />
									</div>
									<div className="form-group col-4">
										<label htmlFor="ActivityDateTime">วันที่และเวลากิจกรรม</label>
										<Field
											type="datetime-local"
											id="ActivityDateTime"
											name="ActivityDateTime"
											className="form-control"
										/>
										<ErrorMessage
											name="ActivityDateTime"
											component="div"
											className="error-message"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default FormHeader
