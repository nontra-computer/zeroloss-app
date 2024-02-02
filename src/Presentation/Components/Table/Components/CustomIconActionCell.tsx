import { Tooltip } from 'react-tooltip'

interface Prop {
	id: number
	canView?: boolean
	canEdit?: boolean
	canDelete?: boolean
	canDuplicate?: boolean
	viewTooltip?: string
	editTooltip?: string
	deleteTooltip?: string
	duplicateTooltip?: string
	onClickView?: (id: number) => void
	onClickEdit?: (id: number) => void
	onClickDelete?: (id: number) => void
	onClickDuplicate?: (id: number) => void
}

const CustomIconActionCell: React.FC<Prop> = ({
	id,
	onClickView,
	onClickEdit,
	onClickDelete,
	onClickDuplicate,
	canView,
	canEdit,
	canDelete,
	canDuplicate,
	viewTooltip,
	editTooltip,
	deleteTooltip,
	duplicateTooltip,
}) => {
	let columnClass = ''

	if (canView && canEdit && canDelete && canDuplicate) {
		columnClass = 'col-3'
	} else if (
		(canView && canEdit && canDelete) ||
		(canView && canEdit && canDuplicate) ||
		(canView && canDelete && canDuplicate) ||
		(canEdit && canDelete && canDuplicate)
	) {
		columnClass = 'col-4'
	} else if ((canView && canEdit) || (canView && canDelete) || (canEdit && canDelete)) {
		columnClass = 'col-6'
	} else {
		columnClass = 'col-12'
	}

	const viewId = `table-action-view-${id}`
	const editId = `table-action-edit-${id}`
	const deleteId = `table-action-delete-${id}`
	const duplicateId = `table-action-duplicate-${id}`

	return (
		<div>
			<div className="row gx-10">
				{canView && (
					<div className={columnClass} onClick={() => onClickView && onClickView(id)}>
						{viewTooltip && (
							<Tooltip anchorSelect={`#${viewId}`} place="top">
								{viewTooltip}
							</Tooltip>
						)}
					</div>
				)}

				{canEdit && (
					<div className={columnClass} onClick={() => onClickEdit && onClickEdit(id)}>
						<button className="btn btn-icon btn-custom btn-active-light rounded-circle">
							<img src="/media/icons/kumopack/edit-01.svg" alt="Edit Icon" width={20} height={20} />
						</button>

						{editTooltip && (
							<Tooltip anchorSelect={`#${editId}`} place="top">
								{editTooltip}
							</Tooltip>
						)}
					</div>
				)}

				{canDuplicate && (
					<div className={columnClass} onClick={() => onClickDuplicate && onClickDuplicate(id)}>
						<button className="btn btn-icon btn-custom btn-active-light rounded-circle">
							<img src="/media/icons/kumopack/copy.svg" alt="Trash Icon" width={16} height={16} />
						</button>

						{duplicateTooltip && (
							<Tooltip anchorSelect={`#${duplicateId}`} place="top">
								{duplicateTooltip}
							</Tooltip>
						)}
					</div>
				)}

				{canDelete && (
					<div className={columnClass} onClick={() => onClickDelete && onClickDelete(id)}>
						<button className="btn btn-icon btn-custom btn-active-light rounded-circle">
							<img
								src="/media/icons/kumopack/trash-01.svg"
								alt="Trash Icon"
								width={20}
								height={20}
							/>
						</button>

						{deleteTooltip && (
							<Tooltip anchorSelect={`#${deleteId}`} place="top">
								{deleteTooltip}
							</Tooltip>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default CustomIconActionCell
