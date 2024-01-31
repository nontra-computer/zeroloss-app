import React from 'react'
import { useAppStore } from '@/Store/App'
import clsx from 'clsx'

const ExpandedAside: React.FC = () => {
	const { isAsideExpanded } = useAppStore(state => ({
		isAsideExpanded: state.expandedAside,
	}))

	return (
		<React.Fragment>
			<div
				className={clsx('bg-zeroloss-error-200 h-100 transition-300', {
					'w-200px': isAsideExpanded,
					'w-0': !isAsideExpanded,
				})}
				style={{ visibility: 'hidden' }}>
				{/* This is the placeholder div */}
			</div>

			<div
				className={clsx('position-fixed bg-zeroloss-error-200 h-100 transition-300', {
					'w-200px': isAsideExpanded,
					'w-0 overflow-hidden text-break': !isAsideExpanded,
				})}
				style={{ zIndex: 98, marginLeft: 100 }}>
				Hi
			</div>
		</React.Fragment>
	)
}

export default ExpandedAside
