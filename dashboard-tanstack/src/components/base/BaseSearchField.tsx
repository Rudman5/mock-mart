import { SearchField } from '@heroui/react'
import type { SearchFieldProps } from '@heroui/react'

interface Props extends Omit<SearchFieldProps, 'children' | 'onChange'> {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function BaseSearchField({
  value,
  onChange,
  placeholder = 'Search...',
  ...rest
}: Props) {
  return (
    <SearchField
      value={value ?? ''}
      onChange={onChange}
      variant="secondary"
      aria-label="Search"
      {...rest}
    >
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input className="w-70" placeholder={placeholder} />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  )
}
