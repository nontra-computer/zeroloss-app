import React from 'react'

interface TabsUnderlineContentProps {
	activeTab: number
	tabContents: JSX.Element[]
}

const TabContent: React.FC<TabsUnderlineContentProps> = ({ activeTab, tabContents }) => {
	return (
		<React.Fragment>
			{tabContents.map((tabContent, index) =>
				activeTab === index ? <div key={index}>{tabContent}</div> : null
			)}
		</React.Fragment>
	)
}

export default TabContent
