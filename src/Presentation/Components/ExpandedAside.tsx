import React from 'react'
import { Link } from 'react-router-dom'
import useAsideMenu from '@/Hooks/useAsideMenu'
import { useIntl } from 'react-intl'
import clsx from 'clsx'

const ExpandedAside: React.FC = () => {
	const intl = useIntl()
	const { isAsideExpanded, subMenu } = useAsideMenu()

	return (
		<React.Fragment>
			<div
				className={clsx('bg-zeroloss-base-white h-100 transition-300', {
					'w-300px': isAsideExpanded,
					'w-0': !isAsideExpanded,
				})}
				style={{ visibility: 'hidden' }}>
				{/* This is the placeholder div */}
			</div>

			<div
				className={clsx(
					'position-fixed bg-zeroloss-base-white h-100 transition-300 overflow-hidden text-nowrap',
					{
						'w-300px border-1px border-zeroloss-grey-200 ': isAsideExpanded,
						'w-0': !isAsideExpanded,
					}
				)}
				style={{ marginLeft: 100 }}>
				<div className="row p-6 py-10 gy-3">
					{/* Logo */}
					<div className="col-12 mb-5">
						<img src="/media/icons/zeroloss/full-logo.svg" alt="Full Zeroloss Logo" />
					</div>
					{/* Menu */}
					{subMenu.map((menu, index) => (
						<React.Fragment key={`submenu-${index}`}>
							<div className="col-12">
								<Link to={menu.path}>
									<div className="d-flex flex-row p-4 cursor-pointer bg-zeroloss-base-white hover-enabled transition-300 rounded">
										<div className="d-flex flex-column justify-content-center me-4">
											<i className={clsx('bi', menu.icon, 'fs-2')}></i>
										</div>
										<div className="d-flex flex-column justify-content-center">
											<span className="text-zeroloss-grey-700 fw-bold">
												{intl.formatMessage({ id: menu.label })}
											</span>
										</div>
									</div>
								</Link>
							</div>
						</React.Fragment>
					))}
				</div>
			</div>
		</React.Fragment>
	)
}

export default ExpandedAside
