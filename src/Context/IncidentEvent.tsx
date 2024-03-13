import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { WithChildren } from '@/_metronic/helpers'

interface IContext {
	openPopupDetail: boolean
	setOpenPopupDetail: Dispatch<SetStateAction<boolean>>
}

export const IncidentEventContext = createContext<IContext>({
	openPopupDetail: false,
	setOpenPopupDetail: () => {},
})

export const IncidentEventContextProvider: React.FC<WithChildren> = ({ children }) => {
	const [openPopupDetail, setOpenPopupDetail] = useState<boolean>(false)

	return (
		<IncidentEventContext.Provider
			value={{
				openPopupDetail,
				setOpenPopupDetail,
			}}>
			{children}
		</IncidentEventContext.Provider>
	)
}
