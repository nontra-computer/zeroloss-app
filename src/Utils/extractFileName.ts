export function extractFileName(file: any) {
	let fileName = ''

	if (file) {
		if (typeof file === 'string') {
			const splited = file.split('/')
			fileName = splited[splited.length - 1]
		} else {
			fileName = file.name
		}
	}

	return fileName
}
