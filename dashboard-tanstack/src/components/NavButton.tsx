import { Button } from '@heroui/react'
import { router } from '../router'
import type { LinkProps } from '@tanstack/react-router'

interface Props {
  label: string
  to: LinkProps['to']
}

export default function NavButton({ label, to }: Props) {
  return (
    <Button
      size="lg"
      variant="secondary"
      fullWidth
      className="justify-start"
      onClick={() => router.navigate({ to })}
    >
      {label}
    </Button>
  )
}
