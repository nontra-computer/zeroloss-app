import { useState, useEffect } from 'react'
import moment from 'moment-timezone'

export const useCurrentTime = (): Date => {
	const [time, setTime] = useState(moment().tz('Asia/Bangkok').toDate())

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(moment().tz('Asia/Bangkok').toDate())
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	return time
}
