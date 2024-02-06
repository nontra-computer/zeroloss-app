import { FC } from 'react'
import clsx from 'clsx'
import { KTIcon } from '../../../helpers'
import {
	HeaderNotificationsMenu,
	// HeaderUserMenu,
	// QuickLinks,
	// Search,
	ThemeModeSwitcher,
} from '../../../partials'
import { useLayout } from '../../core'
import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useLocation } from 'react-router-dom'

const itemClass = 'ms-1 ms-lg-3',
	// btnClass =
	// 	'btn btn-icon btn-color-primary btn-active-light-primary w-30px h-30px w-md-40px h-md-40px',
	// userAvatarClass = 'symbol-30px symbol-md-40px',
	btnIconClass = 'fs-1'

const Topbar: FC = () => {
	const { config } = useLayout()
	const intl = useIntl()
	const { mode } = useThemeMode()
	const location = useLocation()
	const isDashboard = location.pathname.includes('/dashboard')

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return (
		<div className="d-flex align-items-stretch justify-self-end flex-shrink-0">
			{/* begin::Theme mode */}
			{isDashboard && (
				<div className={'d-flex align-items-center ms-1 ms-lg-3'}>
					<ThemeModeSwitcher
						toggleBtnClass={clsx('w-30px h-30px w-md-40px h-md-40px', {
							'btn-color-primary btn-active-light-primary': themeMode === 'light',
							'btn-icon-white btn-active-light': themeMode === 'dark',
						})}
					/>
				</div>
			)}
			{/* end::Theme mode */}

			{/* Search */}
			{/* <div className={clsx('d-flex align-items-stretch', itemClass)}>
				<Search />
			</div> */}
			{/* Activities */}
			{/* <div className={clsx('d-flex align-items-center', itemClass)}>
        
        <div
          className={clsx('btn btn-icon btn-active-light-primary btn-custom', btnClass)}
          id='kt_activities_toggle'
        >
          <KTIcon iconName='chart-simple' className={btnIconClass} />
        </div>
        
      </div> */}

			{/* NOTIFICATIONS */}
			<div className={clsx('d-flex align-items-center', itemClass)}>
				{/* begin::Menu- wrapper */}
				<div
					className={clsx('btn btn-icon position-relative w-30px h-30px w-md-40px h-md-40px', {
						'btn-icon-primary btn-active-light-primary': themeMode === 'light',
						'btn-icon-white btn-active-light': themeMode === 'dark',
					})}
					data-kt-menu-trigger="click"
					data-kt-menu-attach="parent"
					data-kt-menu-placement="bottom-end">
					<KTIcon iconName="notification-on" className={btnIconClass} />

					<span className="bullet bullet-dot bg-danger h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"></span>
				</div>
				<HeaderNotificationsMenu />
				{/* end::Menu wrapper */}
			</div>

			{/* CHAT */}
			{/* <div className={clsx('d-flex align-items-center', itemClass)}>
				
				<div
					className={clsx(
						'btn btn-icon btn-active-light-primary btn-custom position-relative',
						btnClass
					)}
					id="kt_drawer_chat_toggle">
					<KTIcon iconName="message-text-2" className={btnIconClass} />

					<span className="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"></span>
				</div>
				
			</div> */}

			{/* Quick links */}
			{/* <div className={clsx('d-flex align-items-center', itemClass)}>
			
				<div
					className={clsx('btn btn-icon btn-active-light-primary btn-custom', btnClass)}
					data-kt-menu-trigger="click"
					data-kt-menu-attach="parent"
					data-kt-menu-placement="bottom-end">
					<KTIcon iconName="element-11" className={btnIconClass} />
				</div>
				<QuickLinks />
			
			</div> */}

			{/* begin::User */}
			{/* <div className={clsx('d-flex align-items-center', itemClass)} id="kt_header_user_menu_toggle">
				<div
					className={clsx('cursor-pointer symbol', userAvatarClass)}
					data-kt-menu-trigger="click"
					data-kt-menu-attach="parent"
					data-kt-menu-placement="bottom-end">
					<img src={toAbsoluteUrl('media/avatars/300-1.jpg')} alt="metronic" />
				</div>
				<HeaderUserMenu />
			</div> */}
			{/* end::User */}

			<div className={clsx(itemClass, 'd-flex align-items-center')}>
				<button className="btn btn-sm btn-zeroloss-base-white text-zeroloss-error-800 border-1px border-zeroloss-brand-600 fw-bold">
					<i className="bi bi-chat-left-text fs-5 me-2 mt-1 text-zeroloss-error-800"></i>

					{`4 ${intl.formatMessage({ id: 'ZEROLOSS.HEADER.NEW_MESSAGE' })}`}
				</button>
			</div>

			{/* begin::Aside Toggler */}
			{config.header.left === 'menu' && (
				<div className="d-flex align-items-center d-lg-none ms-2 me-n3" title="Show header menu">
					<div
						className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px"
						id="kt_header_menu_mobile_toggle">
						<KTIcon iconName="text-align-left" className="fs-1" />
					</div>
				</div>
			)}
		</div>
	)
}

export { Topbar }
