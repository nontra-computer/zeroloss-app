import React from 'react'
import NewsNotification from '@/Presentation/Components/News/NewsNotification'
import clsx from 'clsx'
import useViewModel from './ViewModel'

const ZerolossNotificationView: React.FC = () => {
	const { unreadMessages, getMediaPath, onClick } = useViewModel()

	return (
		<div
			className="menu menu-sub menu-sub-dropdown menu-column w-400px w-lg-375px min-h-500px"
			data-kt-menu="true">
			<div className="d-flex flex-column bgi-no-repeat rounded-top">
				<div className="w-100 h-100" data-kt-menu="true">
					<div className="bg-zerloss-base-white px-7 py-7 w-100 h-100">
						<h3 className="fs-3 fw-bolder">ข่าวสารล่าสุด</h3>
						<div className="fs-5 text-zeroloss-grey-700 w-max-content mb-5">
							ข่าวสารจากหน่วยข่าวกรอง
						</div>

						<div className="h-400px overflow-y-scroll">
							{unreadMessages.map((e, i) => (
								<div
									key={`unread-message-${i}`}
									className={clsx('mx-auto', {
										'mb-5': i !== 9,
									})}>
									<NewsNotification
										{...e}
										img={e?.pictureCover ? getMediaPath(e.pictureCover) : null}
										onClick={() => onClick(e.id)}
									/>
								</div>
							))}
							{unreadMessages.length === 0 && (
								<div className="text-center text-muted my-10">ไม่มีเหตุการณ์ใหม่</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ZerolossNotificationView
