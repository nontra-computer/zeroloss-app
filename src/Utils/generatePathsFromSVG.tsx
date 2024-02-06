import { Path } from 'react-konva'
import { xml2json } from 'xml-js' // Using xml-js for SVG parsing

interface SVGPath {
	_attributes: {
		d: string
		fill?: string
		stroke?: string
		opacity?: number
		// Add any other attributes you need
	}
}

export function generatePathsFromSVG(svgString: string): JSX.Element[] {
	// Parse SVG string to JSON
	const svgJson = JSON.parse(xml2json(svgString, { compact: true }))

	// Extract paths from SVG JSON
	const paths: SVGPath[] = svgJson.svg.g.path

	// Generate Path components from extracted paths
	return paths.map((path, index) => {
		return (
			<Path
				key={index}
				data={path._attributes.d}
				fill={path._attributes.fill || 'none'} // default to 'none' if fill is not defined
				stroke={path._attributes.stroke || 'none'} // default to 'none' if stroke is not defined
				opacity={path._attributes.opacity || 1} // default to 1 if opacity is not defined
			/>
		)
	})
}
