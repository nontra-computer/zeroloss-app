import { useAppStore } from '@/Store/App'

export const useAsideMenu = () => {
	const { isAsideExpanded, setIsAsideExpanded } = useAppStore(state => ({
		isAsideExpanded: state.expandedAside,
		setIsAsideExpanded: state.setExpandedAside,
	}))

	const toggleAside = () => {
		setIsAsideExpanded(!isAsideExpanded)
	}

	const openAside = () => {
		setIsAsideExpanded(true)
	}

	const closeAside = () => {
		setIsAsideExpanded(false)
	}

	return {
		isAsideExpanded,
		toggleAside,
		openAside,
		closeAside,
	}
}

export default useAsideMenu
