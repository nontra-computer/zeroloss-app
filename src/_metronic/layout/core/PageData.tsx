/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { FC, createContext, useContext, useEffect, useState } from 'react'
import { WithChildren } from '../../helpers'

export interface PageLink {
	title: string
	path: string
	isActive: boolean
	isSeparator?: boolean
}

export interface PageDataContextModel {
	pageTitle?: string
	setPageTitle: (_title: string) => void
	pageDescription?: string
	setPageDescription: (_description: string) => void
	pageBreadcrumbs?: Array<PageLink>
	setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => void
	additionalPageDescription?: string
	setAdditionalPageDescription: (_description: string) => void
}

const PageDataContext = createContext<PageDataContextModel>({
	setPageTitle: (_title: string) => {},
	setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {},
	setPageDescription: (_description: string) => {},
	setAdditionalPageDescription: (_description: string) => {},
})

const PageDataProvider: FC<WithChildren> = ({ children }) => {
	const [pageTitle, setPageTitle] = useState<string>('')
	const [pageDescription, setPageDescription] = useState<string>('')
	const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([])
	const [additionalPageDescription, setAdditionalPageDescription] = useState<string>('')
	const value: PageDataContextModel = {
		pageTitle,
		setPageTitle,
		pageDescription,
		setPageDescription,
		pageBreadcrumbs,
		setPageBreadcrumbs,
		additionalPageDescription,
		setAdditionalPageDescription,
	}
	return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

function usePageData() {
	return useContext(PageDataContext)
}

type Props = {
	description?: string
	breadcrumbs?: Array<PageLink>
	aditionalDescription?: string
}

const PageTitle: FC<Props & WithChildren> = ({
	children,
	description,
	breadcrumbs,
	aditionalDescription,
}) => {
	const { setPageTitle, setPageDescription, setPageBreadcrumbs, setAdditionalPageDescription } =
		usePageData()
	useEffect(() => {
		if (children) {
			setPageTitle(children.toString())
		}
		return () => {
			setPageTitle('')
		}
	}, [children])

	useEffect(() => {
		if (description) {
			setPageDescription(description)
		}
		return () => {
			setPageDescription('')
		}
	}, [description])

	useEffect(() => {
		if (breadcrumbs) {
			setPageBreadcrumbs(breadcrumbs)
		}
		return () => {
			setPageBreadcrumbs([])
		}
	}, [breadcrumbs])

	useEffect(() => {
		if (aditionalDescription) {
			setAdditionalPageDescription(aditionalDescription)
		}
		return () => {
			setAdditionalPageDescription('')
		}
	}, [aditionalDescription])

	return <></>
}

const PageDescription: FC<WithChildren> = ({ children }) => {
	const { setPageDescription } = usePageData()
	useEffect(() => {
		if (children) {
			setPageDescription(children.toString())
		}
		return () => {
			setPageDescription('')
		}
	}, [children])
	return <></>
}

export { PageDescription, PageTitle, PageDataProvider, usePageData }
