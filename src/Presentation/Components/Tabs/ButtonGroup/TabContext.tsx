import React from 'react'

interface TabsButtonGroupContentProps {
	activeTab: number
	tabContents: JSX.Element[]
}

const TabContent: React.FC<TabsButtonGroupContentProps> = ({ activeTab, tabContents }) => {
	return (
		<React.Fragment>
			{tabContents.map((tabContent, index) =>
				activeTab === index ? <div key={index}>{tabContent}</div> : null
			)}
		</React.Fragment>
	)
}

export default TabContent
