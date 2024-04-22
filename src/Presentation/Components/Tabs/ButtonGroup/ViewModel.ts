import { useState } from 'react'

const ViewModel = (changeTab?: (idx: number) => void) => {
	const [interalActiveTab, setActiveTab] = useState(0)

	const handleTabClick = (index: number) => {
		setActiveTab(index)

		if (changeTab) {
			changeTab(index)
		}
	}

	return {
		interalActiveTab,
		handleTabClick,
	}
}

export default ViewModel
