import { useEffect, useState } from 'react'

interface ResolutionDetection {
	isFullHD: boolean
	is4K: boolean
	is8K: boolean
}

export const useResolutionDetection = (): ResolutionDetection => {
	const [resolution, setResolution] = useState<ResolutionDetection>({
		isFullHD: false,
		is4K: false,
		is8K: false,
	})

	useEffect(() => {
		const handleResize = () => {
			const { width, height } = window.screen

			setResolution({
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
