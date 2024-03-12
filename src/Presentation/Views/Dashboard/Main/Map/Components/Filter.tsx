import React from 'react'
import { KTSVG } from '@/_metronic/helpers'

const Filter: React.FC = () => {
	return (
		<div
			id="kt_main_dashboard_map_filter"
			className="bg-body"
			data-kt-drawer="true"
			data-kt-drawer-name="chat"
			data-kt-drawer-activate="true"
			data-kt-drawer-overlay="true"
			data-kt-drawer-width="{default:'300px', 'md': '500px'}"
			data-kt-drawer-direction="end"
			data-kt-drawer-toggle="#kt_main_dashboard_map_filter_toggle"
			data-kt-drawer-close="#kt_main_dashboard_map_filter_close">
			<div className="card w-100 rounded-0">
				<div className="card-header pe-5">
					<div className="card-title">
						{/* begin:: Title */}
						<div className="d-flex justify-content-center flex-column me-3">
							<span className="fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1">
								ตัวกรอง
							</span>
						</div>
						{/* end:: Title */}
					</div>

					<div className="card-toolbar">
						{/* begin:: Close Button */}
						<button
							className="btn btn-sm btn-bg-white btn-active-light-danger text-center"
							id="kt_main_dashboard_map_filter_close">
							<KTSVG
								path="media/icons/duotune/arrows/arr015.svg"
								className="svg-icon svg-icon-2x mx-auto"
							/>
						</button>
						{/* end:: Close Button */}
					</div>
				</div>

				<div className="card-body">
					<div
						data-kt-element="messages"
						data-kt-scroll="true"
						data-kt-scroll-activate="{default: false, lg: true}"
						data-kt-scroll-max-height="auto"
						data-kt-scroll-offset="5px">
						<div className="row gy-5"></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Filter
