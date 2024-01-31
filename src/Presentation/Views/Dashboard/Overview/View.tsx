import React from 'react'
import { PageTitle } from '@/_metronic/layout/core'
import useViewModel from './ViewModel'

const DashboardOverviewView: React.FC = () => {
	const { timeStr } = useViewModel()

	return (
		<React.Fragment>
			<PageTitle
				description={timeStr}
				aditionalDescription="Your current sales summary and activity.">
				การประปานครหลวง
			</PageTitle>
		</React.Fragment>
	)
}

export default DashboardOverviewView
