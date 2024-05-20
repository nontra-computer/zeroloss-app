import { create } from 'zustand'

interface AppStore {
	isPlaySoundEffect: boolean
	expandedKey: string
	expandedAside: boolean
	subMenu: any[]
	setIsPlaySoundEffect: (isPlaySoundEffect: boolean) => void
	setExpandedKey: (expandedKey: string) => void
	setExpandedAside: (expandedAside: boolean) => void
	setSubMenu: (subMenu: any[]) => void
	clearState: () => void
}

export const useAppStore = create<AppStore>(set => ({
	isPlaySoundEffect: false,
	expandedKey: '',
	expandedAside: false,
	subMenu: [],
	setIsPlaySoundEffect: (isPlaySoundEffect: boolean) => set({ isPlaySoundEffect }),
	setExpandedKey: (expandedKey: string) => set({ expandedKey }),
	setExpandedAside: (expandedAside: boolean) => set({ expandedAside }),
	setSubMenu: (subMenu: any[]) => set({ subMenu }),
	clearState: () => set({ expandedAside: false }),
}))
