export interface TableProps {
	data: { [key: string]: any }[]
	columns: any[]

	items_per_page: number

	// Optional
	sorting?: {
		id: string
		desc: boolean
	}[]
	updateSorting?: (columnId: string, isDesc: boolean) => void

	pagination?: boolean
	isLoading?: boolean
	isError?: boolean
	rowKey?: string
	onClickRow?: (id: string) => void

	// Apperance
	isGrey?: boolean
}

export interface ServerSideTableProps extends TableProps {
	page: number
	totalData: number
	totalPage?: number
	updatePage: (page: number | null) => void
}

export interface CustomTablePaginationProp {
	totalCountData: number
	page: number
	items_per_page: number
	updatePage: ((page: number | null) => void) | ((page: number) => void)
	links?: Array<{ label: string; active: boolean; url: string | null; page: number | null }>
	isLoading?: boolean
}
