/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { CustomTablePaginationProp } from '@/Types/Table'

import { usePagination, DOTS } from '@/Hooks/usePagination'
import { KTSVG } from '@/_metronic/helpers'

const CustomTablePagination: React.FC<CustomTablePaginationProp> = ({
	totalCountData,
	page,
	links = [],
	updatePage,
	isLoading,
	items_per_page,
}) => {
	const paginationRange = usePagination({
		totalCount: totalCountData,
		pageSize: items_per_page,
		currentPage: page,
		siblingCount: 2,
	})

	/**
	 * *Remind for Developer
	 * This is the default pagination from KT
	 * <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"></div>
	 * <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
	 */

	return (
		<div className="row mt-3">
			<div id="kt_table_users_paginate">
				<ul className="pagination px-5">
					{/* Next */}
					<button
						className={clsx('btn btn-sm white-button', {
							disabled: page === 1 || isLoading,
						})}
						onClick={() => updatePage(page - 1)}>
						<KTSVG
							path={'/media/icons/kumopack/arrow-left.svg'}
							className="svg-icon svg-icon-light-primary svg-icon-1x"
						/>
						<span className="d-none d-xl-inline-block text-kumopack-grey-700 fw-bold">
							Previous
						</span>
					</button>

					{/* Mobile Pagination */}
					<div className="d-flex d-xl-none text-kumopack-grey-700 align-items-center justify-content-center">
						<div>
							Page {page} of {paginationRange[paginationRange.length - 1]}
						</div>
					</div>

					{/* Desktop Pagination */}
					<div className="d-none d-xl-flex flex-row align-items-center justify-content-center gx-10">
						{paginationRange.map((range, idx) =>
							range === DOTS ? (
								<li key={`page-item-dots-${idx}`} className="page-item disabled">
									...
								</li>
							) : (
								<li
									key={`page-item-${range}`}
									className={clsx('page-item', {
										active: page === parseInt(range.toString()),
										disabled: isLoading || page === parseInt(range.toString()),
										previous: range === 'Previous',
										next: range === 'Next',
									})}>
									<a
										className={clsx('page-link text-kumopack-grey-600', {
											'page-text': range === 'Previous' || range === 'Next',
											'me-5': range === 'Previous',
										})}
										onClick={() => {
											if (['Previous', 'Next'].includes(range.toString())) {
												updatePage(page + (range === 'Next' ? -1 : 1))
											} else {
												updatePage(parseInt(range.toString()))
											}
										}}
										style={{ cursor: 'pointer' }}>
										{range}
									</a>
								</li>
							)
						)}
					</div>

					{/* Previous */}
					<button
						className={clsx('btn btn-sm white-button', {
							disabled: page === paginationRange[paginationRange.length - 1] || isLoading,
						})}
						onClick={() => updatePage(page + 1)}>
						<span className="d-none d-xl-inline-block text-kumopack-grey-700 fw-bold me-2">
							Next
						</span>
						<KTSVG
							path={'/media/icons/kumopack/arrow-right.svg'}
							className="svg-icon svg-icon-light-primary svg-icon-1x me-0"
						/>
					</button>
				</ul>
			</div>
		</div>
	)
}

export default CustomTablePagination
