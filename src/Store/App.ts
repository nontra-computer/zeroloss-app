import { create } from 'zustand'

interface AppStore {
	expandedAside: boolean
	setExpandedAside: (expandedAside: boolean) => void
	clearState: () => void
}

export const useAppStore = create<AppStore>(set => ({
	expandedAside: false,
	setExpandedAside: (expandedAside: boolean) => set({ expandedAside }),
	clearState: () => set({ expandedAside: false }),
}))
