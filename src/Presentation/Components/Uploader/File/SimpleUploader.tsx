import clsx from 'clsx'
import React from 'react'
import { extractFileName } from '@/Utils/extractFileName'

interface Props {
	fileKey: string
	file: any
	onChange: (name: string, value: any) => void
	download?: () => void
	hasUpdate?: boolean
	hideDownload?: boolean
	hideUpdate?: boolean
	isError?: boolean
}

const SimpleFileUploader: React.FC<Props> = ({
	fileKey,
	file,
	onChange,
	download,
	hasUpdate,
	hideDownload,
	hideUpdate,
	isError,
}) => {
	return (
		<div className="d-flex flex-row align-items-center" style={{ gap: '12px' }}>
			<div className="w-40px h-40px bg-zeroloss-grey-50 d-flex justify-content-center align-items-center rounded-circle border-20px border-zeroloss-grey-100">
				<img src="/media/icons/zeroloss/file-04.svg" alt="Blue File Icon" />
			</div>
			<div>
				<div
					className={clsx({
						'text-zeroloss-error-400': isError,
						'text-zeroloss-grey-600': !isError,
					})}>
					{file ? extractFileName(file) : 'ยังไม่ได้อัพโหลด'}
				</div>
				<div className="d-flex flex-row align-items-center">
					{file && (
						<span
							className="fw-bolder text-zeroloss-grey-600 cursor-pointer me-2 cursor-pointer"
							onClick={() => onChange(fileKey, null)}>
							Delete
						</span>
					)}
					<span
						className="fw-bolder text-zeroloss-primary-700 cursor-pointer me-2"
						onClick={() => {
							document.getElementById(fileKey)?.click()
						}}>
						{file && !hideUpdate ? 'Update' : 'Upload'}
					</span>
					{!hideDownload && (
						<React.Fragment>
							{!hasUpdate && file && (
								<span
									className="fw-bolder text-zeroloss-primary-700 cursor-pointer"
									onClick={download}>
									Download
								</span>
							)}
						</React.Fragment>
					)}
				</div>
			</div>

			<input
				id={fileKey}
				type="file"
				className="d-none"
				accept="image/*,.pdf"
				onChange={e => {
					onChange(fileKey, e.target.files?.[0])
				}}
			/>
		</div>
	)
}

export default SimpleFileUploader
