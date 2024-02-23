export function vhToPixels(vh: number): number {
	// Get the viewport height
	const vhHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

	// Calculate the height in pixels
	const heightInPixels = (vh / 100) * vhHeight

	return heightInPixels
}
