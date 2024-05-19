export const useGoogleMap = () => {
	const onNavigate = (lat: number, lng: number) => {
		window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank')
	}

	return { onNavigate }
}
