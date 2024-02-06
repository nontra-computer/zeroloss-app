import React from 'react'
import { Group, Image } from 'react-konva'
import useViewModel from './ViewModel'

export interface KonvaImageProps {
	image: string
}

const KonvaImage: React.FC<KonvaImageProps> = props => {
	const { image } = useViewModel(props)

	return (
		<Group draggable>
			<Image image={image} />
		</Group>
	)
}

export default KonvaImage
