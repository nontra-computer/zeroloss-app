interface TabsUnderlineHeaderProps {
	activeTab: number
	tabNames: string[]
	handleTabClick: (index: number) => void
}

const TabHeader: React.FC<TabsUnderlineHeaderProps> = ({ activeTab, tabNames, handleTabClick }) => {
	return (
		<ul className="tabs">
			{tabNames.map((tabName, index) => (
				<li
					key={`tab-underline-header-item-${index}`}
					className={`tab-item ${activeTab === index ? 'active' : ''}`}
					onClick={() => handleTabClick(index)}>
					<div className={`tab-link`}>{tabName}</div>
				</li>
			))}
		</ul>
	)
}

export default TabHeader
