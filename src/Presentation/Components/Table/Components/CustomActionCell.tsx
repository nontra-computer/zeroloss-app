/* eslint-disable jsx-a11y/anchor-is-valid */
import { MenuComponent } from '_metronic/assets/ts/components'
import { useEffect } from 'react'

interface Prop {
	id: any
	onClickView?: (id: any) => void
	onClickEdit?: (id: any) => void
	onClickDelete?: (id: any) => void
	onClickDuplicate?: (id: any) => void
	hideView?: boolean
	hideEdit?: boolean
	hideDelete?: boolean
	hideDuplicate?: boolean
}

const CustomActionCell: React.FC<Prop> = ({
	id,
	onClickView,
	onClickEdit,
	onClickDelete,
	onClickDuplicate,
	hideView,
	hideEdit,
	hideDelete,
	hideDuplicate,
}) => {
	useEffect(() => {
		MenuComponent.reinitialization()
	}, [])

	return (
		<>
			<a
				className="btn btn-icon btn-custom btn-active-light rounded-circle"
				data-kt-menu-trigger="click"
				data-kt-menu-placement="bottom-end">
				<img
					src="/media/icons/kumopack/dots-vertical.png"
					alt="Dot Vertical Icon"
					width={20}
					height={20}
				/>
			</a>
			{/* begin::Menu */}

			<div
				className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
				data-kt-menu="true">
				{/* begin::Menu item */}
				{!hideView && (
					<div className="menu-item px-3" data-kt-menu-dismiss="true">
						<a
							className="menu-link px-3"
							onClick={() => {
								onClickView && onClickView(id)
							}}>
							<div className="d-flex flex-row align-items-center">
								<img className="me-2" src="/media/icons/kumopack/eye.svg" alt="Edit Icon" />{' '}
								<div className="text-kumopack-grey-700" style={{ marginTop: '0.1rem' }}>
									View
								</div>
							</div>
						</a>
					</div>
				)}
				{/* end::Menu item */}

				{/* begin::Menu item */}
				{!hideEdit && (
					<div className="menu-item px-3" data-kt-menu-dismiss="true">
						<a
							className="menu-link px-3 d-flex align-items-center flex-row"
							onClick={() => {
								if (onClickEdit) {
									onClickEdit(id)
								}
							}}>
							<img className="me-2" src="/media/icons/kumopack/edit-05.svg" alt="Edit Icon" />{' '}
							<div className="text-kumopack-grey-700" style={{ marginTop: '0.1rem' }}>
								Edit
							</div>
						</a>
					</div>
				)}
				{/* end::Menu item */}

				{/* begin::Menu item */}
				{!hideDuplicate && (
					<div className="menu-item px-3" data-kt-menu-dismiss="true">
						<a
							className="menu-link px-3 d-flex align-items-center flex-row"
							onClick={() => {
								if (onClickDuplicate) {
									onClickDuplicate(id)
								}
							}}>
							<img
								className="me-2"
								src="/media/icons/kumopack/copy.svg"
								alt="Edit Icon"
								width={16}
								height={16}
							/>{' '}
							<div className="text-kumopack-grey-700" style={{ marginTop: '0.1rem' }}>
								Duplicate
							</div>
						</a>
					</div>
				)}
				{/* end::Menu item */}

				{/* begin::Menu item */}
				{!hideDelete && (
					<div className="menu-item px-3" data-kt-menu-dismiss="true">
						<a
							className="menu-link px-3 d-flex align-items-center flex-row"
							onClick={() => {
								onClickDelete && onClickDelete(id)
							}}>
							<img className="me-2" src="/media/icons/kumopack/delete.svg" alt="Edit Icon" />
							<div className="text-kumopack-grey-700" style={{ marginTop: '0.1rem' }}>
								Delete
							</div>
						</a>
					</div>
				)}
				{/* end::Menu item */}
			</div>
			{/* end::Menu */}
		</>
	)
}

export default CustomActionCell
