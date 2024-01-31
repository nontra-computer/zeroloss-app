import { useAppStore } from '@/Store/App'
import { ZEROLOSS_MENU, ZEROLOSS_SETTING_MENU } from '@/Configuration/menu'

export const useAsideMenu = () => {
	const { isAsideExpanded, expandedKey, subMenu, setIsAsideExpanded, setSubMenu, setExpandedKey } =
		useAppStore(state => ({
			isAsideExpanded: state.expandedAside,
			expandedKey: state.expandedKey,
			subMenu: state.subMenu,
			setSubMenu: state.setSubMenu,
			setExpandedKey: state.setExpandedKey,
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

	const onClick = (key: string) => {
		const menu = ZEROLOSS_MENU.find(menu => menu.key === key)
		const settingMenu = ZEROLOSS_SETTING_MENU.find(menu => menu.key === key)

		if (menu && settingMenu) {
			console.error('Menu key is duplicated')
		}

		if (menu || settingMenu) {
			if (expandedKey === key) {
				setExpandedKey('')
				setSubMenu([])
				setIsAsideExpanded(false)
			} else {
				if (menu) {
					setExpandedKey(key)
					setSubMenu(menu.subMenu)
					setIsAsideExpanded(menu.subMenu.length > 0 ? true : false)
				} else if (settingMenu) {
					setExpandedKey(key)
					setSubMenu(settingMenu.subMenu)
					setIsAsideExpanded(settingMenu.subMenu.length > 0 ? true : false)
				}
			}
		} else {
			setSubMenu([])
			setIsAsideExpanded(false)
		}
	}

	const checkIsAsideMenuActive = (key: string) => {
		return expandedKey === key
	}

	return {
		isAsideExpanded,
		subMenu,
		checkIsAsideMenuActive,
		onClick,
		toggleAside,
		openAside,
		closeAside,
	}
}

export default useAsideMenu
