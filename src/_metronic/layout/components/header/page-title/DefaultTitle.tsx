import React from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useLayout } from '../../../core/LayoutProvider'
import { usePageData } from '../../../core/PageData'
import { useLocation } from 'react-router-dom'

const DefaultTitle: React.FC = () => {
	const { pageTitle, pageDescription, pageBreadcrumbs, additionalPageDescription } = usePageData()
	const { config } = useLayout()
	const location = useLocation()
	const isMWA = location.pathname.includes('mwa')

	return (
		<div
			data-kt-swapper="true"
			data-kt-swapper-mode="prepend"
			data-kt-swapper-parent="{default: '#kt_content_container', lg: '#kt_header_wrapper'}"
			className="page-title d-flex flex-row align-items-center justify-content-center flex-wrap me-lg-20 pb-2 pb-lg-0"
			style={{ columnGap: '12px' }}>
			{isMWA && <img src="/media/icons/zeroloss/customer.svg" alt="Customer Icon" />}

			{/* begin::Heading */}
			{pageTitle && (
				<div>
					<h1
						id="page-title"
						className="fw-bolder my-1 lh-base fw-bold"
						style={{ fontSize: '30px' }}>
						{pageTitle}
						{pageDescription && config.pageTitle && config.pageTitle.description && (
							<small id="page-description" className="fs-5 fw-normal ms-3">
								{pageDescription}
							</small>
						)}
					</h1>
					{additionalPageDescription && (
						<div id="additional-page-description" className="mt-2 fs-6">
							{additionalPageDescription}
						</div>
					)}
				</div>
			)}
			{/* end::Heading */}

			{pageBreadcrumbs &&
				pageBreadcrumbs.length > 0 &&
				config.pageTitle &&
				config.pageTitle.breadCrumbs && (
					<ul className="breadcrumb fw-bold fs-8 my-1">
						{Array.from(pageBreadcrumbs)
							.filter(l => !l.isSeparator)
							.map((item, index) => (
								<li
									className={clsx('breadcrumb-item', {
										'text-muted': !item.isSeparator && !item.isActive,
									})}
									key={`${item.path}${index}`}>
									<Link className="text-muted" to={item.path}>
										{item.title}
									</Link>
								</li>
							))}
						<li className="breadcrumb-item text-muted">{pageTitle}</li>
					</ul>
				)}
		</div>
	)
}

export { DefaultTitle }
