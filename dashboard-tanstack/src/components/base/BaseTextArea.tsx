import { FieldError, Label, TextArea, TextField } from '@heroui/react'
import type { TextFieldProps } from '@heroui/react'

interface Props extends TextFieldProps {
  label: string
  name: string
  errorMessage?: string
}

export default function BaseTextArea({
  label,
  errorMessage,
  isInvalid,
  ...rest
}: Props) {
  return (
    <TextField
      className="grow"
      variant="secondary"
      aria-label={label}
      isInvalid={isInvalid}
      {...rest}
    >
      <Label className="w-fit text-black">{label}: </Label>
      <TextArea rows={4} style={{ resize: 'none' }} />
      <FieldError>{errorMessage}</FieldError>
    </TextField>
  )
}
