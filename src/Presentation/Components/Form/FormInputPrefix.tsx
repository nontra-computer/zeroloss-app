import React from 'react'
import { FormInputPrefixProp } from '@/Types/Form'
import clsx from 'clsx'
import { Tooltip } from 'react-tooltip'

const FormInputPrefix: React.FC<FormInputPrefixProp> = ({
	formKey,
	prefix,
	label,
	additionalLabel,
	additionalLabelCom,
	additionalComInput,
	value,
	onChange,
	isShowValid,
	disabled,
	containerClassName,
	isHorizontal,
	placeholder,
	tooltip,
}) => {
	return (
		<>
			<div
				id={`form-input-prefix-${formKey}`}
				className={`${containerClassName ?? ''} ${
					isHorizontal ? 'd-flex flex-row align-items-center' : ''
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

				<div className="row w-100">
					<div className="col-5 me-0" style={{ paddingRight: '0' }}>
						<input
							readOnly
							className={clsx('form-control')}
							type="text"
							value={prefix}
							style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, pointerEvents: 'none' }}
						/>

						{additionalComInput}
					</div>

					<div className="col-7 ms-0" style={{ paddingLeft: '0' }}>
						<div className="custom-input-tooltip-container w-100">
							<input
								className={clsx('form-control', {
									'is-invalid': isShowValid,
								})}
								type={'text'}
								value={value}
								onChange={onChange}
								placeholder={placeholder}
								disabled={disabled}
								aria-label="form-input-component"
								data-testid="form-input-component"
								style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
							/>

							{tooltip && (
								<div
									id={formKey + 'tooltip'}
									className="position-absolute cursor-pointer"
									style={{
										right: '3%',
										top: '0',
										bottom: '0',
										margin: 'auto 0',
										zIndex: 5,
										height: 'max-content',
									}}>
									<img src="/media/icons/kumopack/help-circle.svg" alt="Tooltip Icon Input" />
								</div>
							)}

							{tooltip && (
								<Tooltip
									anchorSelect={`#${formKey + 'tooltip'}`}
									place="top"
									style={{ zIndex: 50 }}>
									{tooltip}
								</Tooltip>
							)}
						</div>
					</div>
				</div>
			</div>

			<style>{`
				#form-input-prefix-${formKey} .form-control.is-invalid {
					background-position: right 8% center !important;
				}
			`}</style>
		</>
	)
}

export default FormInputPrefix
