import React from 'react'
import { PageTitle } from '@/_metronic/layout/core'
import { FORM_SELECT_MENU } from '@/Configuration/formselectmenu'

import useViewModel from './ViewModel'
import clsx from 'clsx'
import FormButton from '../Component/FormButton'

const ReportSelectView: React.FC = () => {
	const { timeStr, themeMode } = useViewModel()

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
				aditionalDescription="You can select your form here">
				Report Form Select
			</PageTitle>

			<div className="row g-5 gy-10 px-10 pb-10 pt-10">
				<div className="col-12 mt-20 mt-lg-0">
					<div></div>
				</div>

				<div className="row">
					{FORM_SELECT_MENU.map((formGroup, index) => (
						<div key={index} className="row">
							<div
								className="my-5"
								style={{
									backgroundColor: '#5A5A5A',
									width: '120%',
									color: 'white',
									padding: '10px',
									fontSize: '20px',
								}}>
								{formGroup.topic}
							</div>
							{formGroup.formtype.map((form, formIndex) => (
								<div key={formIndex} className="col-4 py-3">
									<FormButton title={form.label} icon={form.icon} path={form.path} />
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</React.Fragment>
	)
}

export default ReportSelectView
