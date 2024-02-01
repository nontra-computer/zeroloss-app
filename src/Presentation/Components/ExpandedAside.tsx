import React from 'react'
import { Link } from 'react-router-dom'
import useAsideMenu from '@/Hooks/useAsideMenu'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import clsx from 'clsx'

const ExpandedAside: React.FC = () => {
	const intl = useIntl()
	const { isAsideExpanded, subMenu, onClickLinkAside } = useAsideMenu()
	const { mode } = useThemeMode()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

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
				className={clsx('position-fixed h-100 transition-300 overflow-hidden text-nowrap', {
					'w-300px border-1px border-l-0 border-t-0 border-b-0': isAsideExpanded,
					'w-0': !isAsideExpanded,
					'border-zeroloss-grey-200': isAsideExpanded && themeMode === 'light',
					'border-zeroloss-grey-800': isAsideExpanded && themeMode === 'dark',
					'bg-zeroloss-base-white': themeMode === 'light',
					'bg-zeroloss-base-grey-carbon': themeMode === 'dark',
				})}
				style={{ marginLeft: 100 }}>
				<div className="row p-6 py-10 gy-3">
					{/* Logo */}
					<div className="col-12 mb-5">
						<img src="/media/icons/zeroloss/full-logo.svg" alt="Full Zeroloss Logo" />
					</div>
					<div className="col-12">
						<ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x nav-stretch mb-5 fs-6 border-b-0 text-nowrap">
							<li className="nav-item">
								<a
									className={clsx('nav-link active fw-bold', {
										'text-zeroloss-grey-25': themeMode === 'dark',
										'text-zeroloss-grey-700': themeMode === 'light',
									})}
									data-bs-toggle="tab"
									href="#my_details_tab_panel">
									My Details
								</a>
							</li>
							<li className="nav-item">
								<a
									className={clsx('nav-link fw-bold', {
										'text-zeroloss-grey-25': themeMode === 'dark',
										'text-zeroloss-grey-700': themeMode === 'light',
									})}
									data-bs-toggle="tab"
									href="#profile_tab_panel">
									Profile
								</a>
							</li>
						</ul>
						<div className="tab-content">
							<div className="tab-pane fade show active" id="my_details_tab_panel" role="tabpanel">
								{/* Menu */}
								{subMenu.map((menu, index) => (
									<React.Fragment key={`submenu-${index}`}>
										<Link to={menu.path} onClick={onClickLinkAside}>
											<div
												className={clsx(
													'd-flex flex-row p-4 cursor-pointer hover-enabled transition-300 rounded',
													{
														'bg-zeroloss-base-white': themeMode === 'light',
														'bg-zeroloss-base-grey-carbon': themeMode === 'dark',
													}
												)}>
												<div className="d-flex flex-column justify-content-center me-4">
													<i className={clsx('bi', menu.icon, 'fs-2')}></i>
												</div>
												<div className="d-flex flex-column justify-content-center">
													<span
														className={clsx('fw-bold', {
															'text-zeroloss-grey-25': themeMode === 'dark',
															'text-zeroloss-grey-700': themeMode === 'light',
														})}>
														{intl.formatMessage({ id: menu.label })}
													</span>
												</div>
											</div>
										</Link>
									</React.Fragment>
								))}
							</div>
							<div className="tab-pane fade" id="profile_tab_panel" role="tabpanel"></div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default ExpandedAside
