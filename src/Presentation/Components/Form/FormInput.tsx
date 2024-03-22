import isValidClassName from '@/Utils/isValidClassName'
import { FormInputProp } from '@/Types/Form'
import { Tooltip } from 'react-tooltip'
import ReactInputMask from 'react-input-mask'
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import clsx from 'clsx'

const FormInput: React.FC<FormInputProp> = ({
	formKey,
	type,
	label,
	additionalLabel,
	additionalLabelCom,
	messageUnderBox,
	value,
	onChange,
	isShowValid,
	disabled,
	additionalClassName,
	containerClassName,
	isHorizontal,
	placeholder,
	additionalComInput,
	tooltip,
	markInput,
	mark = '',
	markChar,
	onPressEnter,
}) => {
	const validClassName: string = isValidClassName(isShowValid, false, disabled)
	const { mode } = useThemeMode()

	let themeMode = ''
	if (mode === 'system') {
		themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		themeMode = mode
	}

	return (
		<>
			<div
				id={`plain-input-${formKey}`}
				className={`${containerClassName ?? ''} position-relative ${
					isHorizontal ? 'd-flex flex-row align-items-start' : ''
				}`}>
				{label && (
					<label
						className={`form-label ${isHorizontal ? 'col-3 mb-0' : ''} d-flex flex-row`}
						data-testid="form-input-label-component">
						<div className="d-flex flex-column">
							<span>{label}</span>
							<span className="text-kumopack-grey-600 fs-8 w-75">{additionalLabel}</span>
						</div>

						{additionalLabelCom}
					</label>
				)}

				<div className="custom-input-tooltip-container w-100 position-relative">
					{markInput ? (
						<ReactInputMask
							mask={mark}
							type={type}
							value={value}
							onChange={onChange}
							placeholder={placeholder}
							disabled={disabled}
							className={clsx('form-control', {
								[`${additionalClassName}`]: additionalClassName,
								[`${validClassName}`]: validClassName,
								'is-invalid': isShowValid,
							})}
							maskChar={markChar}
							onKeyDown={e => {
								if (e.key === 'Enter' && onPressEnter) {
									onPressEnter()
								}
							}}
						/>
					) : (
						<input
							className={clsx(`form-control ${additionalClassName ?? ''} ${validClassName}`, {
								'is-invalid': isShowValid,
								'text-zeroloss-base-white': themeMode === 'dark',
							})}
							type={type}
							value={value}
							onChange={onChange}
							placeholder={placeholder}
							disabled={disabled}
							aria-label="form-input-component"
							data-testid="form-input-component"
							onKeyDown={e => {
								if (e.key === 'Enter' && onPressEnter) {
									onPressEnter()
								}
							}}
						/>
					)}
					{additionalComInput}

					{tooltip && (
						<div
							id={formKey + 'tooltip'}
							className="position-absolute cursor-pointer"
							style={{
								right: '2%',
								top: isShowValid ? '20%' : messageUnderBox ? '15%' : '25%',
								// bottom: '0',
								margin: isShowValid ? '0' : 'auto 0',
								zIndex: 5,
								height: 'max-content',
							}}>
							<img src="/media/icons/kumopack/help-circle.svg" alt="Tooltip Icon Input" />
						</div>
					)}

					{tooltip && (
						<Tooltip anchorSelect={`#${formKey + 'tooltip'}`} place="top" style={{ zIndex: 50 }}>
							{tooltip}
						</Tooltip>
					)}

					{messageUnderBox && <div className="fs-8 mt-2 ml-2 w-100">{messageUnderBox}</div>}
				</div>
			</div>

			<style>{`
				#plain-input-${formKey} .form-control.is-invalid {
					background-position: right 5% center !important;
				}
			`}</style>
		</>
	)
}

export default FormInput
