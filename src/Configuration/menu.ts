export const ZEROLOSS_MENU = [
	{
		key: 'favorite',
		icon: 'bi-star',
		path: '#',
		label: 'ZEROLOSS.MENU.FAVORITE',
		className: 'py-3',
		subMenu: [],
	},
	{
		key: 'dashboard',
		icon: 'bi-bar-chart-line',
		path: '#',
		label: 'ZEROLOSS.MENU.DASHBOARD',
		className: 'py-3',
		subMenu: [
			{
				key: 'main_dashboard',
				icon: 'bi-clipboard-data-fill',
				path: '/dashboard/overview',
				label: 'ZEROLOSS.MENU.MAIN_DASHBOARD',
			},
			{
				key: 'measurement',
				icon: 'bi-mask',
				path: '/dashboard/measurement',
				label: 'ZEROLOSS.MENU.MEASUREMENT',
			},
			{
				key: 'mwa_measurement',
				icon: 'bi-activity',
				path: '/dashboard/mwa',
				label: 'ZEROLOSS.MENU.MWA_MEASUREMENT',
			},
		],
	},
	{
		key: 'gis',
		icon: 'bi-map-fill',
		path: '/gis',
		label: 'ZEROLOSS.MENU.GIS',
		className: 'py-3',
		subMenu: [],
	},
	{
		key: 'events',
		icon: 'bi-calendar2-event-fill',
		path: '#',
		label: 'ZEROLOSS.MENU.EVENT',
		className: 'py-3',
		subMenu: [
			{
				key: 'dashboard',
				icon: 'bi-file-bar-graph-fill',
				path: '/events/overview',
				label: 'ZEROLOSS.MENU.EVENT_DASHBOARD',
			},
			{
				key: 'create',
				icon: 'bi-calendar2-plus-fill',
				path: '/events/new',
				label: 'ZEROLOSS.MENU.CREATE_EVENT',
			},
		],
	},
	{
		key: 'report',
		icon: 'bi-clipboard-check-fill',
		path: '#',
		label: 'ZEROLOSS.MENU.REPORT',
		className: 'py-3',
		subMenu: [
			{
				key: 'measurement',
				icon: 'bi-calendar3',
				path: '/report/measurement',
				label: 'ZEROLOSS.MENU.REPORT_MEASUREMENT',
			},
			{
				key: 'event',
				icon: 'bi-calendar3-event',
				path: '/report/event',
				label: 'ZEROLOSS.MENU.REPORT_EVENT',
			},
			{
				key: 'summary',
				icon: 'bi-calculator',
				path: '/report/summary',
				label: 'ZEROLOSS.MENU.REPORT_SUMMARY',
			},
		],
	},
	{
		key: 'user_account',
		icon: 'bi-people-fill',
		path: '/user-account',
		label: 'ZEROLOSS.MENU.USER',
		className: 'py-3',
		subMenu: [],
	},
]

export const ZEROLOSS_SETTING_MENU = [
	{
		key: 'tools',
		icon: 'bi-boxes',
		path: '#',
		label: 'ZEROLOSS.MENU.TOOLS',
		className: 'py-3',
		subMenu: [
			{
				key: 'chemhub',
				icon: 'bi-radioactive',
				path: '/chemhub',
				label: 'ZEROLOSS.MENU.CHEMHUB',
			},
			{
				key: 'hazard_modeling',
				icon: 'bi-droplet-half',
				path: '/dashboard/overview/hazard-model',
				label: 'ZEROLOSS.MENU.HAZARD_MODELING',
			},
			{
				key: 'import',
				icon: 'bi-upload',
				path: '/import',
				label: 'ZEROLOSS.MENU.IMPORT',
			},
			{
				key: 'measurement_setup',
				icon: 'bi-database-fill-gear',
				path: '/measurement-setup',
				label: 'ZEROLOSS.MENU.MEASUREMENT_SETUP',
			},
			{
				key: 'chat',
				icon: 'bi-chat-left-text-fill',
				path: '/chat',
				label: 'ZEROLOSS.MENU.CHAT',
			},
		],
	},
	{
		key: 'setup',
		icon: 'bi-gear-fill',
		path: '/setup',
		label: 'ZEROLOSS.MENU.SYSTEM_SETUP',
		className: 'py-3',
		subMenu: [],
	},
	// {
	// 	key: 'profile',
	// 	icon: 'bi-person-circle',
	// 	path: '/profile',
	// 	label: 'ZEROLOSS.MENU.USER_PROFILE',
	// 	className: 'py-3',
	// 	subMenu: [],
	// },
]
