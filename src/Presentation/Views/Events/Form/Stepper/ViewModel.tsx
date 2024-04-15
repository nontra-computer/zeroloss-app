import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import 'moment-timezone'
import 'moment/dist/locale/th'

const ViewModel = () => {
	const STEPPERS = [
		{
			id: 1,
			title: 'แจ้งเหตุ',
		},
		{
			id: 2,
			title: 'ยืนยันเหตุการณ์',
		},
		{
			id: 3,
			title: 'เหตุการณ์ต่อเนื่อง',
		},
		{
			id: 4,
			title: 'เหตุการณ์สิ้นสุด',
		},
	]

	const location = useLocation()

	const isCreate = location.pathname === '/events/new'
	const steppers = useMemo(() => {
		return STEPPERS.map((step, idx) => ({
			...step,
			status: isCreate && idx === 0 ? true : false,
			description:
				idx === 0 && isCreate
					? moment().locale('th').add(543, 'years').format('DD/MM/YYYY HH:mm')
					: '-',
		}))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isCreate])

	return {
		steppers,
	}
}

export default ViewModel
