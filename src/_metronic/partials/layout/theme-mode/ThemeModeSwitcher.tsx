import { KTIcon } from '../../../helpers'
import { ThemeModeComponent } from '../../../assets/ts/layout'
import { ThemeModeType, useThemeMode } from './ThemeModeProvider'
import Switch from 'react-switch'
import clsx from 'clsx'
import { isMobileDevice } from '@/_metronic/assets/ts/_utils'

type Props = {
	toggleBtnClass?: string
	toggleBtnIconClass?: string
	menuPlacement?: string
	menuTrigger?: string
}

const systemMode = ThemeModeComponent.getSystemMode() as 'light' | 'dark'

const ThemeModeSwitcher = (
	// eslint-disable-next-line no-empty-pattern
	{
		// toggleBtnClass = '',
		// toggleBtnIconClass = 'fs-1',
		// menuPlacement = 'bottom-end',
		// menuTrigger = "{default: 'click', lg: 'hover'}",
	}: Props
) => {
	const { mode, menuMode, updateMode, updateMenuMode } = useThemeMode()
	const calculatedMode = mode === 'system' ? systemMode : mode
	const switchMode = (_mode: ThemeModeType) => {
		updateMenuMode(_mode)
		updateMode(_mode)
	}

	return (
		<>
			{/* begin::Menu toggle */}
			<Switch
				onChange={() => {
					switchMode(calculatedMode === 'light' ? 'dark' : 'light')
				}}
				checked={calculatedMode === 'light'}
				checkedIcon={false}
				uncheckedIcon={false}
				onColor="#C3CED5"
				offColor="#525252"
				onHandleColor="#ffffff"
				offHandleColor="#141414"
				boxShadow={
					calculatedMode === 'light' ? '0px 1px 5px rgba(0, 0, 0, 0.6)' : '0px 1px 5px #FFFFFF'
				}
				activeBoxShadow={'0px 0px 1px 10px rgba(0, 0, 0, 0.2)'}
				checkedHandleIcon={
					<div
						className={clsx(
							'd-flex flex-col align-items-center justify-content-center h-100 w-100'
						)}>
						<img
							src={'/media/icons/zeroloss/day.svg'}
							alt="Theme Mode Icon"
							style={{ marginRight: '0.05rem' }}
						/>
					</div>
				}
				uncheckedHandleIcon={
					<div
						className={clsx(
							'd-flex flex-col align-items-center justify-content-center h-100 w-100'
						)}>
						<img
							src={'/media/icons/zeroloss/night.svg'}
							alt="Theme Mode Icon"
							style={{ marginRight: '0.05rem' }}
						/>
					</div>
				}
				width={isMobileDevice() ? 40 : undefined}
				height={isMobileDevice() ? 20 : undefined}
			/>
			{/* <a
				href="#"
				className={clsx('btn btn-icon ', toggleBtnClass)}
				data-kt-menu-trigger={menuTrigger}
				data-kt-menu-attach="parent"
				data-kt-menu-placement={menuPlacement}>
				{calculatedMode === 'dark' && (
					<KTIcon iconName="moon" className={clsx('theme-light-hide', toggleBtnIconClass)} />
				)}

				{calculatedMode === 'light' && (
					<KTIcon iconName="night-day" className={clsx('theme-dark-hide', toggleBtnIconClass)} />
				)}
			</a> */}
			{/* begin::Menu toggle */}

			{/* begin::Menu */}
			<div
				id="custom-theme-mode-switcher"
				className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px"
				data-kt-menu="true">
				{/* begin::Menu item */}
				<div className="menu-item px-3 my-0">
					<a
						href="#"
						className={clsx('menu-link px-3 py-2', { active: menuMode === 'light' })}
						onClick={() => switchMode('light')}>
						<span className="menu-icon" data-kt-element="icon">
							<KTIcon iconName="night-day" className={clsx('fs-1')} />
						</span>
						<span className="menu-title">Light</span>
					</a>
				</div>
				{/* end::Menu item */}

				{/* begin::Menu item */}
				<div className="menu-item px-3 my-0">
					<a
						href="#"
						className={clsx('menu-link px-3 py-2', { active: menuMode === 'dark' })}
						onClick={() => switchMode('dark')}>
						<span className="menu-icon" data-kt-element="icon">
							<KTIcon iconName="moon" className={clsx('fs-1')} />
						</span>
						<span className="menu-title">Dark</span>
					</a>
				</div>
				{/* end::Menu item */}

				{/* begin::Menu item */}
				{/* <div className="menu-item px-3 my-0">
					<a
						href="#"
						className={clsx('menu-link px-3 py-2', { active: menuMode === 'system' })}
						onClick={() => switchMode('system')}>
						<span className="menu-icon" data-kt-element="icon">
							<KTIcon iconName="screen" className="fs-1" />
						</span>
						<span className="menu-title">System</span>
					</a>
				</div> */}
				{/* end::Menu item */}
			</div>
			{/* end::Menu */}
		</>
	)
}

export { ThemeModeSwitcher }
