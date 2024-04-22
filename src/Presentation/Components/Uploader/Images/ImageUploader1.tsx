import { useDropzone } from 'react-dropzone'

interface ImageUploader1Props {
	formKey: string
	image: File | string | null
	changeImage: (image: File | null) => void
	accept?: string
}

const ImageUploader1: React.FC<ImageUploader1Props> = ({ formKey, image, changeImage }) => {
	const { getInputProps, open } = useDropzone({
		onDrop: acceptedFiles => {
			if (acceptedFiles.length === 0) return

			changeImage(acceptedFiles[0] ?? null)
		},
		noDrag: true,
		accept: {
			'image/png': [],
			'image/jpeg': [],
			'image/jpg': [],
		},
	})

	const clickInput = () => {
		open()
	}

	return (
		<div className="mb-5">
			<div className="d-flex flex-row align-items-center py-2" style={{ columnGap: '12px' }}>
				<input {...getInputProps()} className="d-none" id={formKey} />

				{/* begin:: No Image Uploaded */}
				{!image && (
					<div
						onClick={clickInput}
						className="bg-zeroloss-grey-100 d-flex justify-content-center align-items-center cursor-pointer rounded-2"
						style={{ width: '64px', height: '64px', border: '6px solid #F9FAFB' }}>
						<img
							src={'/media/icons/zeroloss/upload-1.png'}
							alt="Uploader 1"
							style={{ width: '20px', height: '20px' }}
						/>
					</div>
				)}
				{/* end:: No Image Uploaded */}

				{/* begin:: Image Uploaded */}
				{image && (
					<img
						onClick={clickInput}
						className="shadow-lg"
						width={64}
						height={64}
						src={typeof image !== 'string' ? URL.createObjectURL(image as any) : image}
						alt={'Image, Picture or Photo'}
						style={{ objectFit: 'cover' }}
						onError={(e: any) => {
							e.target.onerror = null
							e.target.src = '/media/icons/zeroloss/default-placeholder.png'
						}}
					/>
				)}
				{/* end:: Image Uploaded */}

				{/* begin: Delete Button */}
				{image && (
					<div
						className="fw-semibold cursor-pointer"
						onClick={() => {
							changeImage(null)
						}}>
						Delete
					</div>
				)}
				{/* end:: Delete Button */}

				{/* begin:: Update Button */}
				{image && (
					<div
						className="fw-semibold cursor-pointer"
						style={{ color: '#175CD3' }}
						onClick={clickInput}>
						Update
					</div>
				)}
				{/* end:: Update Button */}
			</div>
		</div>
	)
}

export default ImageUploader1
