import React, { useRef, ChangeEvent } from 'react'
import { useDropzone } from 'react-dropzone'

import { FormDragAndDropFileProp } from '@/Types/Form'

const FormDragDropFile: React.FC<FormDragAndDropFileProp> = ({
	formKey,
	label,
	additionalLabel,
	additionalLabelCom,

	containerClassName,
	isHorizontal,
	accept,
	libAccept,
	multiple,
	onFileUpload,
	disabled,
}) => {
	// ref
	const inputRef = useRef<HTMLInputElement>(null)

	const onDrop = (acceptedFiles: any) => {
		// Do something with the files
		if (onFileUpload && acceptedFiles.length > 0) onFileUpload(acceptedFiles)
	}
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		onError: e => console.log(e),
		multiple: multiple ?? false,
		accept: libAccept,
	})

	// triggers when file is selected with click
	const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
		// e.preventDefault()

		if (!e.target.files) return

		if (e.target.files && e.target.files[0] && onFileUpload) {
			onFileUpload(e.target.files)
		}

		e.target.value = ''
	}

	// triggers the input when the button is clicked
	const onButtonClick = () => {
		if (inputRef.current) inputRef.current.click()
	}

	return (
		<div
			className={`${containerClassName ?? ''} ${
				isHorizontal ? 'd-flex flex-row align-items-center' : ''
			}`}>
			{label && (
				<label
					className={`form-label ${isHorizontal ? 'col-3 mb-0' : ''} d-flex flex-row`}
					data-testid="form-input-label-component">
					<div className="d-flex flex-column">
						<span>{label}</span>
						<span className="text-zeroloss-grey-600 fs-8 w-75">{additionalLabel}</span>
					</div>

					{additionalLabelCom}
				</label>
			)}

			{/* begin:: Drag and Drop */}
			<form
				{...getRootProps()}
				key={formKey}
				onSubmit={e => e.preventDefault()}
				className="form-file-upload"
				onClick={onButtonClick}>
				<input
					{...getInputProps()}
					type="file"
					className=""
					ref={inputRef}
					multiple={multiple}
					accept={accept}
					onChange={handleChange}
				/>

				<div id="label-file-upload" className={disabled ? ' disabled' : ''}>
					<div>
						<div
							className="mb-10 cursor-pointer bg-zeroloss-grey-100 rounded-circle d-flex align-items-center justify-content-center mx-auto"
							style={{ border: '6px solid #F9FAFB', width: '40px', height: '40px' }}>
							<img
								src={'/media/icons/zeroloss/upload-cloud-02.png'}
								alt="Upload Drag and Drop Icon"
							/>
						</div>
						<button
							className="upload-button text-zeroloss-primary fw-bold"
							// onClick={onButtonClick}
						>
							{isDragActive ? 'Drop the file here' : 'Click to upload'}
						</button>
						{!isDragActive && (
							<React.Fragment>
								<span>or drag and drop</span>
								<p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
							</React.Fragment>
						)}
					</div>
				</div>
			</form>
			{/* end:: Drag and Drop */}
		</div>
	)
}

export default FormDragDropFile
