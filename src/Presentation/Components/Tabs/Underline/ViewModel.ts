import { useState } from 'react'

const ViewModel = (changeTab?: (idx: number) => void) => {
	const [activeTab, setActiveTab] = useState(0)

	const handleTabClick = (index: number) => {
		setActiveTab(index)

		if (changeTab) {
			changeTab(index)
		}
	}

	return {
		activeTab,
		handleTabClick,
	}
}

export default ViewModel
