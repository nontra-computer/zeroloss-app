const isValidClassName = (
  isShowValid: boolean | undefined,
  value: string | number | boolean | File | undefined,
  disabled: boolean | undefined
) => {
  if (isShowValid) {
    if (!value) {
      return ''
    } else {
      if (disabled) {
        return 'is-invalid'
      } else {
        return 'is-valid'
      }
    }
  }

  return ''
}

export default isValidClassName
