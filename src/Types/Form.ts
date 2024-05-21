import { ChangeEventHandler } from 'react'
import { Accept } from 'react-dropzone'
import { FormGeneratorInputType } from '@/Presentation/Components/Form/FormGenerator'

///////////
// Props //
///////////

export interface FormInputProp {
	formKey: string
	type?: React.HTMLInputTypeAttribute
	label?: string
	additionalLabel?: string
	additionalLabelCom?: string | JSX.Element
	value?: string | number
	onChange?: ChangeEventHandler<HTMLInputElement>
	isShowValid?: boolean
	disabled?: boolean
	additionalClassName?: string
	containerClassName?: string
	messageUnderBox?: string
	isHorizontal?: boolean
	placeholder?: string
	additionalComInput?: string | JSX.Element
	tooltip?: string
	markInput?: boolean
	mark?: string
	markChar?: string | null
	limitCharacter?: number
	onPressEnter?: () => void
}

export interface FormInputPrefixProp {
	formKey?: string
	prefix?: string
	label?: string
	additionalLabel?: string
	additionalLabelCom?: string | JSX.Element
	value?: string | number
	onChange?: ChangeEventHandler<HTMLInputElement>
	isShowValid?: boolean
	disabled?: boolean
	additionalClassName?: string
	containerClassName?: string
	isHorizontal?: boolean
	placeholder?: string
	additionalComInput?: string | JSX.Element
	tooltip?: string
}

export interface FormDatePickerProp {
	label?: string
	additionalLabel?: string
	additionalLabelCom?: string | JSX.Element
	value?: string | Date
	onChange?: ChangeEventHandler<HTMLInputElement>
	isShowValid?: boolean
	disabled?: boolean
	additionalClassName?: string
	containerClassName?: string
	isHorizontal?: boolean
	additionalComInput?: string | JSX.Element
	placeholder?: string
}

export interface FormInputFileProp {
	accept?: string
	label?: string
	additionalLabel?: string
	additionalLabelCom?: string | JSX.Element
	value?: File
	onChange?: ChangeEventHandler<HTMLInputElement>
	isShowValid?: boolean
	disabled?: boolean
	additionalClassName?: string
	containerClassName?: string
	isHorizontal?: boolean
	additionalComInput?: string | JSX.Element
	placeholder?: string
}

export interface FormSelectProp {
	label?: string
	additionalLabel?: string
	additionalLabelCom?: string | JSX.Element
	value?: string | number
	onChange?: ChangeEventHandler<HTMLSelectElement>
	disabled?: boolean
	options?: {
		label: string
		value: any
	}[]
	isShowValid?: boolean
	additionalClassName?: string
	containerClassName?: string
	isHorizontal?: boolean
	placeholder?: string
}

export interface FormCheckboxProp {
	label?: string
	additionalLabel?: string
	additionalLabelCom?: string | JSX.Element
	value?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement>
	disabled?: boolean
	isShowValid?: boolean
	additionalClassName?: string
	containerClassName?: string
	isHorizontal?: boolean
}

export interface FormCheckRadioProp {
	label?: string
	additionalLabel?: string
	additionalLabelCom?: string | JSX.Element
	value?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement>
	disabled?: boolean
	isShowValid?: boolean
	additionalClassName?: string
	containerClassName?: string
	isHorizontal?: boolean
}

export interface FormTextAreaProp {
	label?: string
	additionalLabel?: string
	additionalLabelCom?: string | JSX.Element
	value?: string | number
	onChange?: ChangeEventHandler<HTMLTextAreaElement>
	isShowValid?: boolean
	disabled?: boolean
	additionalClassName?: string
	containerClassName?: string
	additionalComInput?: string | JSX.Element
	isHorizontal?: boolean
	placeholder?: string
	limitCharacter?: number
}

export interface FormDropZoneProp {
	maxFiles?: number
	maxSize?: number
	accept?: Accept
	multiple?: boolean
	label?: string
	additionalLabel?: string
	additionalLabelCom?: string | JSX.Element
	files?: File[]
	onFileUpload?: (files: File[]) => void
	disabled?: boolean
	isShowValid?: boolean
	additionalClassName?: string
	containerClassName?: string
	isHorizontal?: boolean
}

export interface FormDragAndDropFileProp {
	formKey: string
	label?: string
	additionalLabel?: string
	additionalLabelCom?: string | JSX.Element
	isShowValid?: boolean
	disabled?: boolean
	additionalClassName?: string
	containerClassName?: string
	isHorizontal?: boolean
	accept?: string
	libAccept?: Accept
	multiple?: boolean
	files?: File[]
	onFileUpload?: (files: FileList) => void
	customHelpText?: string | JSX.Element
}

/////////////////////////
// Configuration Types //
/////////////////////////

export interface FormGeneratorConfig {
	accept?: string
	prefix?: string
	label?: string
	additionalLabel?: string
	inputType: FormGeneratorInputType
	type?: string
	formKey: string
	isHorizontal: boolean
	options?: {
		label: string
		value: any
	}[]
	containerClassName?: string
	placeholder?: string
	multiple?: boolean
	limitCharacter?: number
	tooltip?: string
}
