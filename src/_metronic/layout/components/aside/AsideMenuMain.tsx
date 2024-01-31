import React from 'react'
import { useIntl } from 'react-intl'
// import { AsideMenuItemWithSubMain } from './AsideMenuItemWithSubMain'
// import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'

import { ZEROLOSS_MENU } from '@/Configuration/menu'

export function AsideMenuMain() {
	const intl = useIntl()

	return (
		<React.Fragment>
			{ZEROLOSS_MENU.map((menu, index) => (
				<React.Fragment key={`menu-icon-${index}`}>
					<AsideMenuItem
						to={menu.path}
						title={intl.formatMessage({ id: menu.label })}
						fontIcon={menu.icon}
						bsTitle={intl.formatMessage({ id: menu.label })}
						className={menu.className}
					/>
				</React.Fragment>
			))}

			{/* <AsideMenuItemWithSubMain
				to="/crafted/pages"
				title="Crafted"
				fontIcon="bi-file-text"
				bsTitle="Crafted">
				<AsideMenuItemWithSub to="/crafted/pages/profile" title="Profile" hasBullet={true}>
					<AsideMenuItem
						to="/crafted/pages/profile/overview"
						title="Overview"
						bsTitle="Overview"
						hasBullet={true}
					/>
					<AsideMenuItem
						to="/crafted/pages/profile/projects"
						title="Projects"
						bsTitle="Projects"
						hasBullet={true}
					/>
					<AsideMenuItem
						to="/crafted/pages/profile/campaigns"
						title="Campaigns"
						bsTitle="Campaigns"
						hasBullet={true}
					/>
					<AsideMenuItem
						to="/crafted/pages/profile/documents"
						title="Documents"
						bsTitle="Documents"
						hasBullet={true}
					/>
					<AsideMenuItem
						to="/crafted/pages/profile/connections"
						title="Connections"
						hasBullet={true}
						bsTitle="Connections"
					/>
				</AsideMenuItemWithSub>

				<AsideMenuItemWithSub to="/crafted/pages/wizards" title="Wizards" hasBullet={true}>
					<AsideMenuItem
						to="/crafted/pages/wizards/horizontal"
						title="Horizontal"
						hasBullet={true}
						bsTitle="Horizontal"
					/>
					<AsideMenuItem
						to="/crafted/pages/wizards/vertical"
						title="Vertical"
						bsTitle="Vertical"
						hasBullet={true}
					/>
				</AsideMenuItemWithSub>

				<AsideMenuItemWithSub to="/crafted/accounts" title="Accounts" hasBullet={true}>
					<AsideMenuItem
						to="/crafted/account/overview"
						title="Overview"
						hasBullet={true}
						bsTitle="Overview"
					/>
					<AsideMenuItem
						to="/crafted/account/settings"
						title="Settings"
						hasBullet={true}
						bsTitle="Settings"
					/>
				</AsideMenuItemWithSub>

				<AsideMenuItemWithSub to="/crafted/widgets" title="Widgets" hasBullet={true}>
					<AsideMenuItem
						to="/crafted/widgets/lists"
						title="Lists"
						bsTitle="Lists"
						hasBullet={true}
					/>
					<AsideMenuItem
						to="/crafted/widgets/statistics"
						title="Statistics"
						bsTitle="Statistics"
						hasBullet={true}
					/>
					<AsideMenuItem
						to="/crafted/widgets/charts"
						title="Charts"
						bsTitle="Charts"
						hasBullet={true}
					/>
					<AsideMenuItem
						to="/crafted/widgets/mixed"
						title="Mixed"
						bsTitle="Mixed"
						hasBullet={true}
					/>
					<AsideMenuItem
						to="/crafted/widgets/tables"
						title="Tables"
						bsTitle="Tables"
						hasBullet={true}
					/>
					<AsideMenuItem
						to="/crafted/widgets/feeds"
						title="Feeds"
						bsTitle="Feeds"
						hasBullet={true}
					/>
				</AsideMenuItemWithSub>

				<AsideMenuItemWithSub to="/apps/chat" title="Chat" hasBullet={true}>
					<AsideMenuItem
						to="/apps/chat/private-chat"
						title="Private Chat"
						bsTitle="Private Chat"
						hasBullet={true}
					/>
					<AsideMenuItem
						to="/apps/chat/group-chat"
						title="Group Chart"
						bsTitle="Group Chart"
						hasBullet={true}
					/>
					<AsideMenuItem
						to="/apps/chat/drawer-chat"
						title="Drawer Chart"
						bsTitle="Drawer Chart"
						hasBullet={true}
					/>
				</AsideMenuItemWithSub>
			</AsideMenuItemWithSubMain> */}
		</React.Fragment>
	)
}
