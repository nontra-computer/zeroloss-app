import { useIntl } from 'react-intl'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { useParams, useNavigate } from 'react-router-dom'
import { useMWAStore } from '@/Store/MWA'

const ViewModel = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { buildingId } = useParams<{ buildingId?: string }>()
	const { mode } = useThemeMode()
	const { stations } = useMWAStore(state => ({
		stations: state.stations,
	}))

	const stationDropdownOptions = stations.map((b: any) => ({
		label: b.building,
		value: b.id,
	}))
	const currentDropdownOption = stationDropdownOptions.find(
		(b: any) => b.value === parseInt(buildingId ?? '0')
	)

	const onSelectBuilding = (id: string) => {
		navigate(`/dashboard/mwa/building/${id}`)
	}

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return {
		mode,
		themeMode,
		intl,
		currentDropdownOption,
		stationDropdownOptions,
		onSelectBuilding,
	}
}

export default ViewModel
