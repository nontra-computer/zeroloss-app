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
				path: import.meta.env.VITE_APP_ZEROLOSS_EMCC_MONITORING,
				label: 'ZEROLOSS.MENU.MEASUREMENT',
				outside: true,
			},
			{
				key: 'mwa_measurement',
				icon: 'bi-activity',
				path: '/dashboard/mwa',
				label: 'ZEROLOSS.MENU.MWA_MEASUREMENT',
			},
			// {
			// 	key: 'monitoring',
			// 	icon: 'bi-broadcast-pin',
			// 	path: 'https://emcc.zeroloss.tech/monitoring',
			// 	label: 'ZEROLOSS.MENU.MONITORING',
			// 	outside: true,
			// },
		],
	},
	{
		key: 'gis',
		icon: 'bi-map-fill',
		path: import.meta.env.VITE_APP_ZEROLOSS_EMCC_GIS,
		label: 'ZEROLOSS.MENU.GIS',
		className: 'py-3',
		subMenu: [],
		outside: true,
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
				key: 'form-select',
				icon: 'bi-calendar3',
				path: '/report/form/time-series-report',
				// label: 'ZEROLOSS.MENU.REPORT_SELECT',
				// path: import.meta.env.VITE_APP_ZEROLOSS_EMCC_MEASUREMENT,
				label: 'ZEROLOSS.MENU.REPORT_MEASUREMENT',
				outside: true,
			},
			{
				key: 'event',
				icon: 'bi-flag-fill',
				path: import.meta.env.VITE_APP_ZEROLOSS_EMCC_EVENT_REPORT,
				label: 'ZEROLOSS.MENU.REPORT_EVENT',
				outside: true,
			},
			{
				key: 'event-summary',
				icon: 'bi-calendar3-event',
				path: '/report/event',
				label: 'ZEROLOSS.MENU.REPORT_EVENT_SUMMARY',
			},
			// {
			// 	key: 'summary',
			// 	icon: 'bi-calculator',
			// 	path: '/report/summary',
			// 	label: 'ZEROLOSS.MENU.REPORT_SUMMARY',
			// },
		],
	},
	// {
	// 	key: 'user_account',
	// 	icon: 'bi-people-fill',
	// 	path: '/user-account',
	// 	label: 'ZEROLOSS.MENU.USER',
	// 	className: 'py-3',
	// 	subMenu: [],
	// },
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
				path: import.meta.env.VITE_APP_ZEROLOSS_EMCC_CHEMICAL,
				label: 'ZEROLOSS.MENU.CHEMHUB',
				outside: true,
			},
			{
				key: 'hazard_modeling',
				icon: 'bi-droplet-half',
				path: import.meta.env.VITE_APP_ZEROLOSS_EMCC_HAZARD_MODELING,
				label: 'ZEROLOSS.MENU.HAZARD_MODELING',
				outside: true,
			},
			{
				key: 'import',
				icon: 'bi-upload',
				path: import.meta.env.VITE_APP_ZEROLOSS_EMCC_IMPORT,
				label: 'ZEROLOSS.MENU.IMPORT',
				outside: true,
			},
			{
				key: 'measurement_setup',
				icon: 'bi-database-fill-gear',
				path: import.meta.env.VITE_APP_ZEROLOSS_EMCC_MEASUREMENT_SETUP,
				label: 'ZEROLOSS.MENU.MEASUREMENT_SETUP',
				outside: true,
			},

			// {
			// 	key: 'chat',
			// 	icon: 'bi-chat-left-text-fill',
			// 	path: '/chat',
			// 	label: 'ZEROLOSS.MENU.CHAT',
			// },
		],
	},
	// {
	// 	key: 'setup',
	// 	icon: 'bi-gear-fill',
	// 	path: '/setup',
	// 	label: 'ZEROLOSS.MENU.SYSTEM_SETUP',
	// 	className: 'py-3',
	// 	subMenu: [],
	// },
	// {
	// 	key: 'profile',
	// 	icon: 'bi-person-circle',
	// 	path: '/profile',
	// 	label: 'ZEROLOSS.MENU.USER_PROFILE',
	// 	className: 'py-3',
	// 	subMenu: [],
	// },
]
