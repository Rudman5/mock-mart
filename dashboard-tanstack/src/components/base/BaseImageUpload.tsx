import { FieldError, Input, Label, TextField } from '@heroui/react'
import type { TextFieldProps } from '@heroui/react'

interface Props extends TextFieldProps {
  label: string
  placeholder?: string
  errorMessage?: string
}

export default function BaseImageUpload({
  label,
  placeholder,
  errorMessage,
  ...rest
}: Props) {
  return (
    <div></div>
    // <div className="grow" variant="secondary" aria-label={label} {...rest}>
    //   <Label className="w-fit text-black">{label}: </Label>
    //   <Input type="file" />
    //   <FieldError>{errorMessage}</FieldError>
    // </div>
  )
}
