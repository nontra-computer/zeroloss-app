import { FC } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { useLayout } from '../../core'
import { toAbsoluteUrl } from '../../../helpers'
import { AsideMenu } from './AsideMenu'
import useAsideMenu from '@/Hooks/useAsideMenu'
import { HeaderUserMenu } from '@/_metronic/partials'
import { ZEROLOSS_SETTING_MENU } from '@/Configuration/menu'

const AsideDefault: FC = () => {
	const { classes } = useLayout()
	const { onClick } = useAsideMenu()

	return (
		<div
			id="kt_aside"
			className={clsx('aside overflow-y-auto overflow-x-visible bg-zeroloss-primary', classes.aside.join(' '))}
			data-kt-drawer="true"
			data-kt-drawer-name="aside"
			data-kt-drawer-activate="{default: true, lg: false}"
			data-kt-drawer-overlay="true"
			data-kt-drawer-width="auto"
			data-kt-drawer-direction="start"
			data-kt-drawer-toggle="#kt_aside_toggle">
			{/* begin::Logo */}
			<div
				className="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto py-8"
				id="kt_aside_logo">
				<Link to="/dashboard">
					<img src={toAbsoluteUrl('media/icons/zeroloss/logo.svg')} alt="logo" className="h-55px" />
				</Link>
			</div>
			{/* end::Logo */}

			{/* begin::Nav */}
			<div
				className="asaside-nav d-flex flex-column align-lg-center flex-column-fluid w-100 pt-5 pt-lg-0"
				id="kt_aside_nav">
				<AsideMenu asideMenuCSSClasses={classes.asideMenu} />
			</div>
			{/* end::Nav */}

			{/* begin::Footer */}
			<div
				className="aside-footer d-flex flex-column align-items-center flex-column-auto"
				id="kt_aside_footer">
				{/* begin::Menu */}

				{ZEROLOSS_SETTING_MENU.map((menu, index) => (
					<div key={`setting-icon-${index}`} className={'mb-5'} onClick={() => onClick(menu.key)}>
						<button
							type="button"
							className={clsx('btn btm-sm btn-icon btn-color-white btn-active-light', {})}
							data-kt-menu-trigger="click"
							data-kt-menu-overflow="true"
							data-kt-menu-placement="top-start"
							data-bs-toggle="tooltip"
							data-bs-placement="right"
							data-bs-dismiss="click"
							title="Quick actions">
							<i className={clsx('bi', menu.icon, 'fs-2')}></i>
						</button>
					</div>
				))}

				<div
					className={clsx('d-flex align-items-center', 'mb-10')}
					id="kt_header_user_menu_toggle">
					{/* begin::Toggle */}
					<div
						className={clsx('cursor-pointer symbol', 'symbol-30px symbol-md-40px')}
						data-kt-menu-trigger="click"
						data-kt-menu-attach="parent"
						data-kt-menu-placement="top-start">
						<img src={toAbsoluteUrl('media/avatars/300-1.jpg')} alt="metronic" />
					</div>
					<HeaderUserMenu />
					{/* end::Toggle */}
				</div>

				{/* end::Menu */}
			</div>
			{/* end::Footer */}
		</div>
	)
}

export { AsideDefault }
