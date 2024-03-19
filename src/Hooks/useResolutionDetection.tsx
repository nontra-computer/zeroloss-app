import { useEffect, useState } from 'react'

interface ResolutionDetection {
	isMobile: boolean
	isLargeMobile: boolean
	isTablet: boolean
	isFullHD: boolean
	is4K: boolean
	is8K: boolean
}

export const useResolutionDetection = (): ResolutionDetection => {
	const [resolution, setResolution] = useState<ResolutionDetection>({
		isMobile: false,
		isLargeMobile: false,
		isTablet: false,
		isFullHD: false,
		is4K: false,
		is8K: false,
	})

	useEffect(() => {
		const handleResize = () => {
			const { width, height } = window.screen

			setResolution({
				isMobile: width < 768,
				isLargeMobile: width >= 768 && width < 992,
				isTablet: width >= 768 && width < 1920,
				isFullHD: width >= 1920 && height >= 1080,
				is4K: width >= 3840 && height >= 2160,
				is8K: width >= 7680 && height >= 4320,
			})
		}

		handleResize() // Check resolution on initial render

		window.addEventListener('resize', handleResize)
		window.addEventListener('orientationchange', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			window.removeEventListener('orientationchange', handleResize)
		}
	}, [])

	return resolution
}
