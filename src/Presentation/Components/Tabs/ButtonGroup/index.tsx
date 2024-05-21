import React from 'react'
import TabHeader from './TabHeader'
import TabContent from './TabContext'

import useViewModel from './ViewModel'

interface TabsButtonGroupProps {
	tabNames: string[]
	tabContents: JSX.Element[]
	activeTab?: number
	changeTab?: (idx: number) => void
}

const TabsButtonGroup: React.FC<TabsButtonGroupProps> = ({
	tabNames,
	tabContents,
	activeTab,
	changeTab,
}) => {
	const { interalActiveTab, handleTabClick } = useViewModel(changeTab)

	return (
		<React.Fragment>
			<TabHeader
				tabNames={tabNames}
				activeTab={activeTab ?? interalActiveTab}
				handleTabClick={handleTabClick}
			/>

			<TabContent tabContents={tabContents} activeTab={activeTab ?? interalActiveTab} />
		</React.Fragment>
	)
}

export default TabsButtonGroup
