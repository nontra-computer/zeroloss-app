import { createContext, useState } from 'react'
import { WithChildren } from '@/_metronic/helpers'

interface IContext {
	defaultSorting: {
		id: string
		desc: boolean
	}[]
	currentSorting: { id: string; desc: boolean }[]
	hasSorting: boolean
	isLoading: boolean
	isError: boolean
	pagination: boolean
	setHasSorting: (hasSorting: boolean) => void
	updateDefaultSorting: (columnId: string, isDesc: boolean) => void
	updatePagination: (isPagination: boolean) => void
	updateSorting: (columnId: string, isDesc: boolean) => void
	clearSorting: () => void
	updateLoading: (isLoading: boolean) => void
	updateError: (isError: boolean) => void
	resetState: () => void
}

export const TableContext = createContext<IContext>({
	defaultSorting: [],
	currentSorting: [],
	hasSorting: false,
	isLoading: true,
	isError: false,
	pagination: false,
	setHasSorting: () => {},
	updateDefaultSorting: () => {},
	updatePagination: () => {},
	updateSorting: () => {},
	clearSorting: () => {},
	updateLoading: () => {},
	updateError: () => {},
	resetState: () => {},
})

export const TableContextProvider: React.FC<WithChildren> = ({ children }) => {
	const [defaultSorting, setterDefaultSorting] = useState<
		{
			id: string
			desc: boolean
		}[]
	>([
		{
			id: 'id',
			desc: true,
		},
	])
	const [currentSorting, setCurrentSorting] = useState<
		{
			id: string
			desc: boolean
		}[]
	>([
		{
			id: 'id',
			desc: true,
		},
	])
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	const [pagination, setPagination] = useState(false)
	const [hasSorting, setHasSorting] = useState(false)

	const updateLoading = (isLoading: boolean) => {
		setIsLoading(isLoading)
	}

	const updateError = (isError: boolean) => {
		setIsError(isError)
	}

	const updateDefaultSorting = (columnId: string, isDesc: boolean) => {
		setterDefaultSorting([
			{
				id: columnId,
				desc: isDesc,
			},
		])
	}

	const updateSorting = (columnId: string, isDesc: boolean) => {
		setCurrentSorting([
			{
				id: columnId,
				desc: isDesc,
			},
		])
	}

	const clearSorting = () => {
		setCurrentSorting([])
	}

	const updatePagination = (isPagination: boolean) => {
		setPagination(isPagination)
	}

	const resetState = () => {
		setterDefaultSorting([
			{
				id: 'id',
				desc: true,
			},
		])
		setCurrentSorting([
			{
				id: 'id',
				desc: true,
			},
		])
		setIsLoading(true)
		setIsError(false)
		setPagination(false)
	}

	return (
		<TableContext.Provider
			value={{
				defaultSorting,
				currentSorting,
				hasSorting,
				isLoading,
				isError,
				pagination,
				setHasSorting,
				updateDefaultSorting,
				updateSorting,
				clearSorting,
				updateLoading,
				updateError,
				updatePagination,
				resetState,
			}}>
			{children}
		</TableContext.Provider>
	)
}
