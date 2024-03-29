import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AsideDefault } from './components/aside/AsideDefault'
// import { Footer } from './components/Footer'
import { HeaderWrapper } from './components/header/HeaderWrapper'
// import { RightToolbar } from '../partials/layout/RightToolbar'
import { ScrollTop } from './components/ScrollTop'
import { PageDataProvider } from './core'
import { ActivityDrawer, DrawerMessenger, InviteUsers, UpgradePlan } from '../partials'
import { MenuComponent } from '../assets/ts/components'

// Zeroloss Components
import ExpandedAside from '@/Presentation/Components/Aside/ExpandedAside/View'

const MasterLayout = () => {
	const location = useLocation()

	useEffect(() => {
		setTimeout(() => {
			MenuComponent.reinitialization()
		}, 500)
	}, [location.key])

	return (
		<PageDataProvider>
			<div className="d-flex flex-column flex-root">
				{/* begin::Page */}
				<div className="page d-flex flex-row flex-column-fluid">
					<div className="d-flex">
						<AsideDefault />
						<ExpandedAside />
					</div>
					{/* begin::Wrapper */}
					<div className="overflow-x-hidden wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
						<HeaderWrapper />
						{/* begin::Content */}
						<Outlet />
						{/* end::Content */}
						{/* <Footer /> */}
					</div>
					{/* end::Wrapper */}
				</div>
				{/* end::Page */}
			</div>

			{/* begin:: Drawers */}
			<ActivityDrawer />
			{/* <RightToolbar /> */}
			<DrawerMessenger />
			{/* end:: Drawers */}

			{/* begin:: Modals */}
			<InviteUsers />
			<UpgradePlan />
			{/* end:: Modals */}
			<ScrollTop />
		</PageDataProvider>
	)
}

export { MasterLayout }
