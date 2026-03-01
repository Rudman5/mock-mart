import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'

interface Props {
  label: string
  to: LinkProps['to']
}

export default function NavButton({ label, to }: Props) {
  return (
    <Link
      to={to}
      className="p-2 text-left rounded-lg transition cursor-pointer block"
      activeProps={{
        className: 'text-black bg-gray-50',
      }}
      inactiveProps={{
        className: 'text-gray-500 hover:text-black hover:bg-gray-50',
      }}
    >
      {label}
    </Link>
  )
}
