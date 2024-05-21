export function cleanParamsFilter(filter: any) {
	if (!filter) return {}

	const finaleFilter = Object.keys(filter).reduce((acc: { [key: string]: any }, key: string) => {
		if (filter[key] && filter?.[key] !== '' && String(filter?.[key]).toLowerCase() !== 'all') {
			acc[key] = filter[key]
		}
		return acc
	}, {})

	return finaleFilter
}
