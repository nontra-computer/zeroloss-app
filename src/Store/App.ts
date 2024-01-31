import { create } from 'zustand'

interface AppStore {
	expandedKey: string
	expandedAside: boolean
	subMenu: any[]
	setExpandedKey: (expandedKey: string) => void
	setExpandedAside: (expandedAside: boolean) => void
	setSubMenu: (subMenu: any[]) => void
	clearState: () => void
}

export const useAppStore = create<AppStore>(set => ({
	expandedKey: '',
	expandedAside: false,
	subMenu: [],
	setExpandedKey: (expandedKey: string) => set({ expandedKey }),
	setExpandedAside: (expandedAside: boolean) => set({ expandedAside }),
	setSubMenu: (subMenu: any[]) => set({ subMenu }),
	clearState: () => set({ expandedAside: false }),
}))
