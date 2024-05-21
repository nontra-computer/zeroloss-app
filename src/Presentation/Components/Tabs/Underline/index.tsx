import React from 'react'
import TabHeader from '../Underline/TabHeader'
import TabContent from '../Underline/TabContent'

import useViewModel from '../Underline/ViewModel'

interface TabsUnderlineProps {
	tabNames: string[]
	tabContents: JSX.Element[]
	changeTab?: (idx: number) => void
}

const TabsUnderline: React.FC<TabsUnderlineProps> = ({ tabNames, tabContents, changeTab }) => {
	const { activeTab, handleTabClick } = useViewModel(changeTab)

	return (
		<React.Fragment>
			<TabHeader activeTab={activeTab} tabNames={tabNames} handleTabClick={handleTabClick} />

			<TabContent activeTab={activeTab} tabContents={tabContents} />
		</React.Fragment>
	)
}

export default TabsUnderline
