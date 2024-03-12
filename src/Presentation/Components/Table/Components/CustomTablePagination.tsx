import { CustomTablePaginationProp } from '@/Types/Table'

import { usePagination, DOTS } from '@/Hooks/usePagination'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import clsx from 'clsx'

const CustomTablePagination: React.FC<CustomTablePaginationProp> = ({
	totalCountData,
	page,
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
	const { mode } = useThemeMode()
	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	/**
	 * *Remind for Developer
	 * This is the default pagination from KT
	 * <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"></div>
	 * <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
	 */

	return (
		<div className="row mt-3">
			<div id="kt_table_users_paginate">
				<ul className="pagination px-5 justify-content-between">
					{/* Next */}
					<button
						className={clsx('btn btn-sm', {
							disabled: page === 1 || isLoading,
							'white-button': themeMode === 'light',
							'btn-zeroloss-base-grey-carbon border-zeroloss-base-white border-1px':
								themeMode === 'dark',
						})}
						onClick={() => updatePage(page - 1)}>
						<span
							className={clsx('d-none d-xl-inline-block text-zeroloss-grey-700 fw-bold', {
								'text-zeroloss-base-white': themeMode === 'dark' && (page !== 1 || !isLoading),
								'text-zeroloss-grey-200': themeMode === 'dark' && (page === 1 || isLoading),
								'text-zeroloss-grey-700': themeMode === 'light' && (page !== 1 || !isLoading),
							})}>
							Previous
						</span>
					</button>

					{/* Mobile Pagination */}
					<div
						className={clsx('d-flex d-xl-none align-items-center justify-content-center', {
							'text-zeroloss-grey-700': themeMode === 'light',
							'text-zeroloss-grey-400': themeMode === 'dark',
						})}>
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
										'text-zeroloss-base-white': themeMode === 'dark',
									})}>
									<a
										className={clsx('page-link text-zeroloss-grey-600', {
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
						className={clsx('btn btn-sm', {
							disabled: page === paginationRange[paginationRange.length - 1] || isLoading,
							'white-button': themeMode === 'light',
							'btn-zeroloss-base-grey-carbon border-zeroloss-base-white border-1px':
								themeMode === 'dark',
						})}
						onClick={() => updatePage(page + 1)}>
						<span
							className={clsx('d-none d-xl-inline-block fw-bold me-2', {
								'text-zeroloss-base-white':
									themeMode === 'dark' &&
									(page !== paginationRange[paginationRange.length - 1] || !isLoading),
								'text-zeroloss-grey-200':
									themeMode === 'dark' &&
									(page === paginationRange[paginationRange.length - 1] || isLoading),
								'text-zeroloss-grey-700':
									themeMode === 'light' &&
									(page !== paginationRange[paginationRange.length - 1] || !isLoading),
							})}>
							Next
						</span>
					</button>
				</ul>
			</div>
		</div>
	)
}

export default CustomTablePagination
