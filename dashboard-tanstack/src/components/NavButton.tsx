import { Button, Link } from '@heroui/react'
import type { LinkProps } from '@tanstack/react-router'

interface Props {
  label: string
  to: LinkProps['to']
}

export default function NavButton({ label, to }: Props) {
  return (
    <Link href={to} className="w-full no-underline">
      <Button size="lg" variant="secondary" fullWidth className="justify-start">
        {label}
      </Button>
    </Link>
  )
}
