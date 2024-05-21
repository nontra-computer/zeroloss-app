interface TabsButtonGroupHeaderProps {
	activeTab: number
	tabNames: string[]
	handleTabClick: (index: number) => void
}

const TabHeader: React.FC<TabsButtonGroupHeaderProps> = ({
	tabNames,
	activeTab,
	handleTabClick,
}) => {
	return (
		<div className="tabs-button-group-container">
			{tabNames.map((tabName, idx) => (
				<button
					key={`tab-button-group-header-item-${idx}`}
					className={`btn btn-sm fw-bold ${
						activeTab === idx
							? 'btn-zeroloss-primary text-zeroloss-base-white'
							: 'bg-transparent border-0 text-kumopack-grey-500'
					}`}
					onClick={() => handleTabClick(idx)}>
					{tabName}
				</button>
			))}
		</div>
	)
}

export default TabHeader
