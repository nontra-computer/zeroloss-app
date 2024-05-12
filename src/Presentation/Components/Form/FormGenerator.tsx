import { ChangeEventHandler } from 'react'

import FormInput from './FormInput'
import FormInputPrefix from './FormInputPrefix'
import FormSelect from './FormSelect'
import FormCheckbox from './FormCheckbox'
import FormRadio from './FormRadio'
import FormInputFile from './FormInputFile'
import FormTextArea from './FormTextArea'
import FormDatePicker from './FormDatePicker'
import FormDragDropFile from './FormDragDropFile'
import FormDate from './FormDate'

import {
	FormInputProp,
	FormInputPrefixProp,
	FormInputFileProp,
	FormSelectProp,
	FormCheckboxProp,
	FormCheckRadioProp,
	FormDatePickerProp,
	FormTextAreaProp,
	FormDragAndDropFileProp,
} from 'Types/Form'

export type FormGeneratorInputType =
	| 'plain'
	| 'prefix'
	| 'select'
	| 'checkbox'
	| 'radio'
	| 'file'
	| 'dropzone'
	| 'drag-and-drop'
	| 'textarea'
	| 'datepicker'
	| 'date-time'

interface Prop
	extends Omit<FormInputFileProp, 'value'>,
		Omit<FormInputPrefixProp, 'value'>,
		Omit<FormSelectProp, 'value'>,
		Omit<FormInputProp, 'value'>,
		Omit<FormCheckboxProp, 'value'>,
		Omit<FormCheckRadioProp, 'value'>,
		Omit<FormDatePickerProp, 'value'>,
		Omit<FormTextAreaProp, 'value'>,
		FormDragAndDropFileProp {
	inputType: FormGeneratorInputType
	value?: string | boolean | number | Date | File | undefined
	onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	formKey: string
}

const FormGenerator: React.FC<Prop> = ({
	inputType,
	prefix,
	label,
	additionalLabel,
	additionalLabelCom,
	messageUnderBox,
	value,
	onChange,
	options,
	type,
	isShowValid,
	disabled,
	additionalClassName,
	containerClassName,
	additionalComInput,
	isHorizontal,
	formKey,
	placeholder,
	accept,
	files,
	multiple,
	onFileUpload,
	limitCharacter,
	tooltip,
	markInput,
	mark,
	markChar,
	onPressEnter,
}) => {
	switch (inputType) {
		case 'plain':
			return (
				<FormInput
					formKey={formKey}
					key={formKey}
					type={type}
					label={label}
					additionalLabel={additionalLabel}
					additionalLabelCom={additionalLabelCom}
					additionalComInput={additionalComInput}
					messageUnderBox={messageUnderBox}
					value={value as string | number | undefined}
					onChange={onChange}
					isShowValid={isShowValid}
					disabled={disabled}
					containerClassName={containerClassName}
					additionalClassName={additionalClassName}
					isHorizontal={isHorizontal}
					placeholder={placeholder}
					tooltip={tooltip}
					markInput={markInput}
					mark={mark}
					markChar={markChar}
					onPressEnter={onPressEnter}
					limitCharacter={limitCharacter}
				/>
			)
		case 'prefix':
			return (
				<FormInputPrefix
					key={formKey}
					prefix={prefix}
					label={label}
					additionalLabel={additionalLabel}
					additionalLabelCom={additionalLabelCom}
					value={value as string | number | undefined}
					onChange={onChange}
					isShowValid={isShowValid}
					disabled={disabled}
					containerClassName={containerClassName}
					additionalClassName={additionalClassName}
					isHorizontal={isHorizontal}
					placeholder={placeholder}
					tooltip={tooltip}
				/>
			)
		case 'select':
			return (
				<FormSelect
					key={formKey}
					options={options}
					label={label}
					additionalLabel={additionalLabel}
					additionalLabelCom={additionalLabelCom}
					value={value as string | number | undefined}
					onChange={onChange}
					containerClassName={containerClassName}
					additionalClassName={additionalClassName}
					isShowValid={isShowValid}
					disabled={disabled}
					isHorizontal={isHorizontal}
				/>
			)
		case 'checkbox':
			return (
				<FormCheckbox
					key={formKey}
					label={label}
					additionalLabel={additionalLabel}
					additionalLabelCom={additionalLabelCom}
					value={value as boolean | undefined}
					onChange={onChange}
					isShowValid={isShowValid}
					disabled={disabled}
					containerClassName={containerClassName}
					additionalClassName={additionalClassName}
					isHorizontal={isHorizontal}
				/>
			)
		case 'radio':
			return (
				<FormRadio
					key={formKey}
					label={label}
					additionalLabel={additionalLabel}
					additionalLabelCom={additionalLabelCom}
					value={value as boolean | undefined}
					onChange={onChange}
					isShowValid={isShowValid}
					disabled={disabled}
					containerClassName={containerClassName}
					additionalClassName={additionalClassName}
					isHorizontal={isHorizontal}
				/>
			)
		case 'file':
			return (
				<FormInputFile
					key={formKey}
					label={label}
					additionalLabel={additionalLabel}
					additionalLabelCom={additionalLabelCom}
					accept={accept}
					value={value as File | undefined}
					onChange={onChange}
					containerClassName={containerClassName}
					additionalClassName={additionalClassName}
					isShowValid={isShowValid}
					disabled={disabled}
					isHorizontal={isHorizontal}
				/>
			)
		case 'textarea':
			return (
				<FormTextArea
					key={formKey}
					label={label}
					additionalLabel={additionalLabel}
					additionalLabelCom={additionalLabelCom}
					value={value as string | number | undefined}
					onChange={onChange}
					isShowValid={isShowValid}
					disabled={disabled}
					containerClassName={containerClassName}
					additionalClassName={additionalClassName}
					isHorizontal={isHorizontal}
					placeholder={placeholder}
					limitCharacter={limitCharacter}
				/>
			)
		case 'datepicker':
			return (
				<FormDatePicker
					key={formKey}
					label={label}
					additionalLabel={additionalLabel}
					additionalLabelCom={additionalLabelCom}
					value={value as string | Date | undefined}
					onChange={onChange}
					isShowValid={isShowValid}
					disabled={disabled}
					containerClassName={containerClassName}
					additionalClassName={additionalClassName}
					isHorizontal={isHorizontal}
				/>
			)
		case 'date-time':
			return (
				<FormDate
					key={formKey}
					label={label}
					additionalLabel={additionalLabel}
					additionalLabelCom={additionalLabelCom}
					value={value as string | Date | undefined}
					onChange={onChange}
					isShowValid={isShowValid}
					disabled={disabled}
					containerClassName={containerClassName}
					additionalClassName={additionalClassName}
					isHorizontal={isHorizontal}
				/>
			)
		case 'drag-and-drop':
			return (
				<FormDragDropFile
					formKey={formKey}
					accept={accept}
					files={files}
					disabled={disabled}
					multiple={multiple}
					label={label}
					additionalLabel={additionalLabel}
					additionalLabelCom={additionalLabelCom}
					containerClassName={containerClassName}
					onFileUpload={onFileUpload}
				/>
			)
		default:
			return null
	}
}

export default FormGenerator
