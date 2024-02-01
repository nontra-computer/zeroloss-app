import { useState, useRef, useEffect } from 'react'
import { KonvaImageProps } from './View'

const ViewModel = (props: KonvaImageProps) => {
	const shapeRef = useRef<any>(null)
	const [image, setImage] = useState<HTMLImageElement>(new window.Image())

	useEffect(() => {
		const newImage = new window.Image()
		newImage.src = props.image
		newImage.addEventListener('load', () => {
			setImage(newImage)

			// Apply the filter after the image has loaded
			if (shapeRef.current) {
				const node = shapeRef.current
				node.cache()

				node.draw()
			}
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.image])

	return {
		image,
	}
}

export default ViewModel
