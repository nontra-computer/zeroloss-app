import React from 'react'
import { PageTitle } from '@/_metronic/layout/core'

import useViewModel from './ViewModel'
import clsx from 'clsx'

const EventFormView: React.FC = () => {
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
				aditionalDescription="Your current sales summary and activity.">
				All Events / สร้างเหตุการณ์ใหม่
			</PageTitle>
		</React.Fragment>
	)
}

export default EventFormView
